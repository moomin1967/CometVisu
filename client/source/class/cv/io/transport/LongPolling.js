/* LongPolling.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


qx.Class.define('cv.io.transport.LongPolling', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  /**
   *
   * @param client {cv.io.Client}
   */
  construct: function(client) {
    this.client = client;
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    doRestart: false, // are we currently in a restart, e.g. due to the watchdog
    xhr: null, // the ongoing AJAX request
    lastIndex: -1,    // index returned by the last request
    retryCounter: 0,      // count number of retries (reset with each valid response)
    sessionId: null,
    client: null,
    running: null,

    /**
     * This function gets called once the communication is established
     * and this.client information is available.
     *
     * @param ev {Event|Object} qx event or json response
     * @param connect {Boolean} whether to start the connection or not
     */
    handleSession: function (ev, connect) {
      var json =  this.client.getResponse(ev);
      this.sessionId = json.s;
      this.version = json.v.split('.', 3);

      if (0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1])) {
        this.error('ERROR CometVisu Client: too new protocol version (' + json.v + ') used!');
      }
      if (connect) {
        this.connect();
      }
    },

    connect: function () {
      this.running = true;
      // send first request

      var options = {
        beforeSend: this.beforeSend.bind(this),
        listeners: {
          error: this.handleError
        }
      };
      var data = [];
      var successCallback = null;
      if (this.client.initialAddresses.length) {
        data = this.client.buildRequest(this.client.initialAddresses);
        successCallback = this.handleReadStart;
      } else {
        // old behaviour -> start full query
        data = this.client.buildRequest();
        successCallback = this.handleRead;
      }
      data.t = 0;
      this.xhr = this.client.doRequest(this.client.getResourcePath("read"), data, successCallback, this, options);
      this.client.watchdog.start(5);
    },

    /**
     * This function gets called once the communication is established
     * and this.client information is available
     *
     * @param ev {Event}
     */
    handleRead: function (ev) {
      var json = this.client.getResponse(ev);
      if (this.doRestart || (!json && (-1 === this.lastIndex))) {
        this.client.setDataReceived(false);
        if (this.running) { // retry initial request
          this.retryCounter++;
          qx.event.Timer.once(function () {
            this.error("read request received emtpy response => retrying");
            this.xhr.send();
            this.client.watchdog.ping(true);
          }, this, 100 * Math.pow(this.retryCounter, 2));
        }
        return;
      }

      var data;
      if (json && !this.doRestart) {
        this.lastIndex = json.i;
        data = json.d;
        this.readResendHeaderValues();
        this.client.update(data);
        this.retryCounter = 0;
        this.client.setDataReceived(true);
      }

      if (this.running) { // keep the requests going
        this.retryCounter++;
        data = this.client.buildRequest();
        data.i = this.lastIndex;
        this.xhr.set({
          requestData: data
        });
        this.xhr.send();
        this.client.watchdog.ping();
      }
    },

    handleReadStart: function (ev) {
      var json = this.client.getResponse(ev);
      if (!json && (-1 === this.lastIndex)) {
        this.client.setDataReceived(false);
        if (this.running) { // retry initial request
          this.xhr.send();
          this.client.watchdog.ping();
        }
        return;
      }
      if (json && !this.doRestart) {
        this.readResendHeaderValues();
        this.client.update(json.d);
        this.client.setDataReceived(true);
      }
      if (this.running) { // keep the requests going, but only
        // request
        // addresses-startPageAddresses
        var diffAddresses = [];
        for (var i = 0; i < this.client.addresses.length; i++) {
          if (qx.lang.Array.contains(this.client.addresses[i], this.client.initialAddresses) < 0) {
            diffAddresses.push(this.client.addresses[i]);
          }
        }
        var data = this.client.buildRequest(diffAddresses);
        data.t = 0;
        this.xhr.set({
          requestData: data
        });
        this.xhr.removeListener("success", this.handleReadStart, this);
        this.xhr.addListener("success", this.handleRead, this);
        this.xhr.send();
        this.client.watchdog.ping();
      }
    },

    /**
     * This function gets called on an error
     *
     *
     * @param ev {Event}
     */
    handleError: qx.core.Environment.select("cv.xhr", {
      "qx": function (ev) {
        var req = ev.getTarget();
        // ignore error when connection is irrelevant
        if (this.running && req.getReadyState() !== 4 && !this.doRestart && req.getStatus() !== 0) {
          this.error('Error! Type: "' + req.getResponse() + '" readyState: ' + req.getStatusText());
        }
      },
      "jquery": function(xhr, str, excptObj) {
        // ignore error when connection is irrelevant
        if (this.running && xhr.readyState !== 4 && !this.doRestart && xhr.status !== 0) {
          var readyState = 'UNKNOWN';
          switch (xhr.readyState) {
            case 0:
              readyState = 'UNINITIALIZED';
              break;
            case 1:
              readyState = 'LOADING';
              break;
            case 2:
              readyState = 'LOADED';
              break;
            case 3:
              readyState = 'INTERACTIVE';
              break;
            case 4:
              readyState = 'COMPLETED';
              break;
          }
          this.error('Error! Type: "' + str + '" ExceptionObject: "'+ excptObj + '" readyState: ' + readyState);
        }
      }
    }),

    /**
     * manipulates the header of the current ajax query before it is
     * been send to the server
     *
     * @param xhr {Object} the native XHR object
     *
     */
    beforeSend: function (xhr) {
      for (var headerName in this.resendHeaders) {
        if (this.resendHeaders[headerName] !== undefined) {
          xhr.setRequestHeader(headerName, this.resendHeaders[headerName]);
        }
      }
      for (headerName in this.headers) {
        if (this.headers[headerName] !== undefined) {
          xhr.setRequestHeader(headerName, this.headers[headerName]);
        }
      }
    },

    /**
     * read the header values of a response and stores them to the
     * resendHeaders array
     */
    readResendHeaderValues: function () {
      for (var headerName in this.resendHeaders) {
        this.resendHeaders[headerName] = this.xhr
          .getResponseHeader(headerName);
      }
    },

    /**
     * Check if the connection is still running.
     */
    isConnectionRunning: function () {
      return true;
    },

    /**
     * Restart the read request, e.g. when the watchdog kicks in
     *
     * @param doFullReload {Boolean} reload all data and not only restart connection
     */
    restart: function (doFullReload) {
      if (doFullReload) {
        this.lastIndex = -1; // reload all data
      }
      this.doRestart = true;
      this.abort();
      this.handleRead(); // restart
      this.doRestart = false;
    },
    /**
     * Abort the read request properly
     *
     */
    abort: function () {
      if (this.xhr && this.xhr.abort) {
        this.xhr.abort();

        if (this.client.backend && this.client.backend.hooks.onClose) {
          this.client.backend.hooks.onClose.bind(this);
        }
      }
    }
  }
});