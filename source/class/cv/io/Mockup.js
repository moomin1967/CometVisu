/* Mockup.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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


/**
 * Mockup simulating a backend + client for the Cometvisu protocol
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
qx.Class.define('cv.io.Mockup', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.base(arguments);
    cv.io.Client.CLIENTS.push(this);
    // make some functions accessible for the protactor runner
    window._receive = this.receive.bind(this);
    var model = cv.data.Model.getInstance();
    window._widgetDataGet = model.getWidgetData.bind(model);
    window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
    window.writeHistory = [];

    this.addresses = [];
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    dataReceived : {
      check: "Boolean",
      init: true
    },
    server: {
      check: "String",
      init: "Mockup"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    addresses: null,
    __xhr: null,

    /**
     * This function gets called once the communication is established and session information is available
     *
     */
    receive: function (json) {
      if (json) {
        this.update(json.d);
      }
    },

    login: function (loginOnly, callback, context) {
      if (callback) {
        callback.call(context);
        if (cv.Config.initialDemoData) {
          this.receive({
            i: new Date().getTime(),
            d: cv.Config.initialDemoData.states
          });
          if (qx.core.Environment.get('cv.testMode') && cv.Config.initialDemoData.xhr) {
            this.__xhr = cv.Config.initialDemoData.xhr;
            // configure server
            var server = qx.dev.FakeServer.getInstance().getFakeServer();
            server.respondWith(function (request) {
              var url = cv.report.Record.normalizeUrl(request.url);
              if (url.indexOf("nocache=") >= 0) {
                url = url.replace(/[\?|&]nocache=[0-9]+/, "");
              }
              if (!this.__xhr[url] || this.__xhr[url].length === 0) {
                qx.log.Logger.error(this, "404: no logged responses for URI "+url+" found");
              } else {
                qx.log.Logger.debug(this, "faking response for "+url);
                var response = "";
                if (this.__xhr[url].length === 1) {
                  response = this.__xhr[url][0];
                } else {
                  // multiple responses recorded use them as LIFO stack
                  response = this.__xhr[url].shift();
                }

                if (request.readyState === 4 && request.status === 404) {
                  // This is a hack, sometimes the request has a 404 status and send readystate
                  // the respond would fail if we do not override it here
                  request.readyState = 1;
                }
                request.respond(response.status, response.headers, qx.lang.Json.stringify(response.body));
              }
            }.bind(this));
          }
          cv.Config.initialDemoData = null;
        }
      }
    },

    /**
     * Subscribe to the addresses in the parameter
     *
     */
    subscribe: function (addresses) {
      this.addresses = addresses ? addresses : [];
    },

    /**
     * This function sends a value
     *
     */
    write: function (address, value) {
      if (cv.report.Record.REPLAYING === true) {
        // do nothing in replay mode
        return;
      }
      var ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      window.writeHistory.push({
        address: address,
        value: value,
        ts: ts
      });

      // send update
      var answer = {
        i: ts,
        d: {}
      };
      answer.d[address] = value;
      this.debug('sending value: ' + value + ' to address: ' + address);
      this.receive(answer);
    },

    restart: function() {},

    stop: function () {},

    getResourcePath: function (name) {
      return name;
    }
  }
});