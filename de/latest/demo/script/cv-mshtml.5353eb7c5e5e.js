//PROCESSED
qx.$$packageData['16384']={"locales":{},"resources":{"plugins/openweathermap/openweathermap.css":"cv","plugins/openweathermap/owm/jquery.owm.js":"cv"},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("16384", function() {
(function(){var a='plugins/openweathermap/openweathermap.css',b='plugins/openweathermap/owm/jquery.owm.js',c='"><div id="owm_',d='cssClass',e="",f="openweathermap",g='<div class="',h=" ",i='cv.plugins.OpenweatherMap',j='" class="openweathermap_value"></div></div>',k="String",l="widget clearfix text openweathermap";qx.Class.define(i,{extend:cv.ui.structure.AbstractBasicWidget,include:cv.ui.common.Refresh,construct:function(m){m.refresh=m.refresh*60;cv.ui.structure.AbstractBasicWidget.call(this,m);this.__uj=m;},statics:{parse:function(n,r,p,o){var q=cv.parser.WidgetParser.parseElement(this,n,r,p,o,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseRefresh(n,r);return q;},getAttributeToPropertyMappings:function(){return {'class':{target:d},'lang':{},'q':{},'lat':{},'lon':{},'units':{},'type':{},'forecastItems':{},'detailItems':{},'appid':{}};}},properties:{cssClass:{check:k,init:e},lang:{check:k,init:e},q:{check:k,init:e},lat:{check:k,init:e},lon:{check:k,init:e},units:{check:k,init:e},type:{check:k,init:e},forecastItems:{check:k,init:e},detailItems:{check:k,init:e},appid:{check:k,init:e}},members:{__uj:null,_getInnerDomString:function(){var s=l;if(this.getCssClass()){s+=h+this.getCssClass();};return g+s+c+this.getPath()+j;},_refreshAction:function(){var t=$(this.getDomElement());t.openweathermap(this.options);return false;}},defer:function(u){var v=cv.util.ScriptLoader.getInstance();v.addStyles(a);v.addScripts(b);cv.parser.WidgetParser.addHandler(f,cv.plugins.OpenweatherMap);cv.ui.structure.WidgetFactory.registerClass(f,u);}});})();
}); var jOWM=jOWM||{};(function($){$.fn.openweathermap=function(options,fn){var defaults={baseURL:'http://api.openweathermap.org/data/2.5/',detailItems:4,forecastItems:5,forecastToday:true,units:'metric',type:'like',refresh:30,appid:''};var options=$.extend(defaults,options);options.detailItems=parseInt(options.detailItems,10);if(options.detailItems<0){options.detailItems=0;}
if(options.detailItems>4){options.detailItems=4;}
options.forecastItems=parseInt(options.forecastItems,10);if(options.forecastItems<0){options.forecastItems=0;}
if(options.forecastItems>16){options.forecastItems=16;}
Date.ext.locales['de']={a:['So','Mo','Di','Mi','Do','Fr','Sa'],A:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],b:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],B:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],};return this.each(function(i,e){$element=$(e);if(!$element.hasClass('jowm')){$element.addClass('jowm');}
_process(e,options);});};var _process=function(e,options){var html='';var paramsDefault=_parametersFromOptions(options);var currentURL=options.baseURL+'forecast?'+paramsDefault.join('&');var forecastItems=paramsDefault;forecastItems.push('cnt='+options.forecastItems);var forecastURL=options.baseURL+'forecast/daily?'+forecastItems.join('&');if($('ul.detailed',$(e)).length===0){$('<ul>').addClass('detailed').addClass('clearfix').appendTo($(e));}
if($('ul.forecast',$(e)).length===0){$('<ul>').addClass('forecast').addClass('clearfix').appendTo($(e));}
$.getJSON(options.baseURL+'weather?'+paramsDefault.join('&'),function(data){if(data.cod==200){options.sunrise=data.sys.sunrise;options.sunset=data.sys.sunset;_processDataDetailed(e,currentURL,options);_processDataForecast(e,forecastURL,options);}
else{$(e).after('<!-- Failed to fetch detailed weather data. -->');}});}
var _processDataDetailed=function(e,url,options){$('ul.detailed',$(e)).html('');if(options.detailItems===0){return;}
$.getJSON(url,function(data){if(data.cod==200){var dataItems=data.list.slice(0,options.detailItems);$.each(dataItems,function(index,elem){$item=$('<li>');if(elem.dt<options.sunrise||elem.dt>options.sunset){$item.addClass('night');}
if(index===0){$item.addClass('first');}
if(index===(dataItems.length-1)){$item.addClass('last');}
$item.html(jOWM.theme('weatherDetailItem',elem,options));$item.appendTo($('ul.detailed',$(e)));});}
else{$(e).after('<!-- Failed to fetch detailed weather data. -->');}});}
var _processDataForecast=function(e,url,options){$('ul.forecast',$(e)).html('');if(options.forecastItems===0){return;}
$.getJSON(url,function(data){if(data.cod==200){var dataItems=data.list;if(!options.forecastToday){dataItems.shift();}
$.each(dataItems,function(index,elem){$item=$('<li>');if(index===0){$item.addClass('first');}
if(index===(dataItems.length-1)){$item.addClass('last');}
$item.html(jOWM.theme('weatherForecastItem',elem,options));$item.appendTo($('ul.forecast',$(e)));});}
else{$(e).after('<!-- Failed to fetch forecast weather data. -->');}});}
var _parametersFromOptions=function(options){var items=[];if(options.hasOwnProperty('lang')){items.push('lang='+options.lang);}
if(options.hasOwnProperty('q')){items.push('q='+options.q);}
else if(options.hasOwnProperty('lat')&&options.hasOwnProperty('lon')){items.push('lat='+options.lat);items.push('lon='+options.lon);}
if(options.hasOwnProperty('units')){items.push('units='+options.units);}
if(options.hasOwnProperty('type')){items.push('type='+options.type);}
if(options.hasOwnProperty('appid')){items.push('appid='+options.appid);}
return items;}
jOWM.theme=function(func){var args=Array.prototype.slice.apply(arguments,[1]);return(jOWM.theme[func]||jOWM.theme.prototype[func]).apply(this,args);};jOWM.theme.prototype.weatherTemperature=function(temperature,precision,suffix){suffix=suffix||'°';return parseFloat(temperature).toFixed(precision)+suffix;}
jOWM.theme.prototype.weatherDetailItem=function(data,options){var weather=data.weather[0];var temperature=data.main;var d=new Date(data.dt*1000);d.locale=options.lang;var output='<div class="weather-detailed weather-'+weather.id+' clearfix">';output+=' <div class="weather">';output+='  <span class="weather-icon" data-weather-text="'+weather.description+'" data-weather-code="'+weather.id+'"></span>';output+=' </div>';output+=' <div class="temperature">'+jOWM.theme('weatherTemperature',temperature.temp,1)+'</div>';output+='</div>';return output;};jOWM.theme.prototype.weatherForecastItem=function(data,options){var weather=data.weather[0];var temperature=data.temp;var d=new Date(data.dt*1000);d.locale=options.lang;var output='<div class="weather-forecast weather-'+weather.id+' clearfix">';output+=' <div class="day">'+d.strftime('%a')+'</div>';output+=' <div class="weather-icon" data-weather-text="'+weather.description+'" data-weather-code="'+weather.id+'"></div>';output+=' <div class="temperature high">'+jOWM.theme('weatherTemperature',temperature.max,0,' °C')+'</div>';output+=' <div class="temperature low">'+jOWM.theme('weatherTemperature',temperature.max,0,' °C')+'</div>';output+='</div>';return output;};})(jQuery);