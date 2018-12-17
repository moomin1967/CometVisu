//PROCESSED
qx.$$packageData['32768']={"locales":{},"resources":{"plugins/colorchooser/farbtastic/farbtastic.css":"cv","plugins/colorchooser/farbtastic/farbtastic.js":"cv"},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("32768", function() {
(function(){var a='b',c="Boolean",d='#',e="Number",f='0',h='plugins/colorchooser/farbtastic/farbtastic.css',i=' .actor',j='<div class="actor"></div>',k='r',l='g',m='cv.plugins.ColorChooser',n="colorchooser",o='#000000',p='plugins/colorchooser/farbtastic/farbtastic.js',q='rgb',s=",";qx.Class.define(m,{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Update,cv.ui.common.Operate],statics:{parse:function(t,z,w,u){var y=cv.parser.WidgetParser.parseElement(this,t,z,w,u);cv.parser.WidgetParser.parseFormat(t,z);cv.parser.WidgetParser.parseAddress(t,z,this.makeAddressListFn);return y;},makeAddressListFn:function(A,C,D,B){return [true,B];}},properties:{valueR:{check:e,init:0},valueG:{check:e,init:0},valueB:{check:e,init:0},busR:{check:e,init:0},busG:{check:e,init:0},busB:{check:e,init:0},rateLimiter:{check:c,init:false}},members:{__uk:false,_onDomReady:function(){cv.ui.structure.AbstractWidget.prototype._onDomReady.call(this);var E=$(d+this.getPath()+i);E.farbtastic(function(F){this.setValueR(parseInt(F.substring(1,3),16)*100/255.0);this.setValueG(parseInt(F.substring(3,5),16)*100/255.0);this.setValueB(parseInt(F.substring(5,7),16)*100/255.0);if(this.getRateLimiter()===false&&this.__uk===false){this._rateLimitedSend(E);};}.bind(this));},_rateLimitedSend:function(){var I=false;var H=this.getAddress();var r=this.getValueR();var g=this.getValueG();var b=this.getValueB();var K=this.getBusR();var M=this.getBusG();var G=this.getBusB();var v;var J=cv.TemplateEngine.getInstance();for(var P in H){if(!cv.data.Model.isWriteAddress(H[P])){continue;};switch(H[P][2]){case k:v=cv.Transform.encode(H[P][0],r);if(v!==cv.Transform.encode(H[P][0],K)){J.visu.write(P,v);I=true;};break;case l:v=cv.Transform.encode(H[P][0],g);if(v!==cv.Transform.encode(H[P][0],M)){J.visu.write(P,v);I=true;};break;case a:v=cv.Transform.encode(H[P][0],b);if(v!==cv.Transform.encode(H[P][0],G)){J.visu.write(P,v);I=true;};break;case q:var L=[r*255/100.0,g*255/100.0,b*255/100.0];var O=[K*255/100.0,M*255/100.0,G*255/100.0];v=cv.Transform.encode(H[P][0],L);var N=cv.Transform.encode(H[P][0],O);if(v[0]!==N[0]||v[1]!==N[1]||v[2]!==N[2]){J.visu.write(P,v.join(s));I=true;};break;};};if(I){this.setBusR(this.getValueR());this.setBusG(this.getValueG());this.setBusB(this.getValueB());this.setRateLimiter(true);this.__kv=qx.event.Timer.once(this._rateLimitedSend,this,250);}else {this.setRateLimiter(false);};},_getInnerDomString:function(){return j;},_update:function(S,T){if(S===undefined){return;};function V(x){var r=parseInt(x).toString(16);return r.length===1?f+r:r;};var R=cv.Transform.decode(this.getAddress()[S][0],T),U=jQuery.farbtastic(this.getActor()),Q=U.color||o;switch(this.getAddress()[S][2]){case k:this.setBusR(R);Q=Q.substring(0,1)+V(R*255/100)+Q.substring(3);break;case l:this.setBusG(R);Q=Q.substring(0,3)+V(R*255/100)+Q.substring(5);break;case a:this.setBusB(R);Q=Q.substring(0,5)+V(R*255/100)+Q.substring(7);break;case q:this.setBusR(R[0]);this.setBusG(R[1]);this.setBusB(R[2]);Q=Q.substring(0,1)+V(R[0]*255/100)+V(R[1]*255/100)+V(R[2]*255/100)+Q.substring(7);break;};this.__uk=true;if(this.__kv){this.__kv.stop();this.__kv=null;this.setRateLimiter(false);};U.setColor(Q);this.__uk=false;}},defer:function(W){var X=cv.util.ScriptLoader.getInstance();X.addStyles(h);X.addScripts(p);cv.parser.WidgetParser.addHandler(n,W);cv.ui.structure.WidgetFactory.registerClass(n,W);}});})();
}); /*!
 * Farbtastic: jQuery color picker plug-in v1.3u
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 */(function($){$.fn.farbtastic=function(options){$.farbtastic(this,options);return this;};$.farbtastic=function(container,callback){var container=$(container).get(0);return container.farbtastic||(container.farbtastic=new $._farbtastic(container,callback));};$._farbtastic=function(container,callback){var fb=this;$(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var e=$('.farbtastic',container);fb.wheel=$('.wheel',container).get(0);fb.radius=84;fb.square=100;fb.width=194;if(navigator.appVersion.match(/MSIE [0-6]\./)){$('*',e).each(function(){if(this.currentStyle.backgroundImage!='none'){var image=this.currentStyle.backgroundImage;image=this.currentStyle.backgroundImage.substring(5,image.length-2);$(this).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+image+"')"});}});}
fb.linkTo=function(callback){if(typeof fb.callback=='object'){$(fb.callback).unbind('keyup',fb.updateValue);}
fb.color=null;if(typeof callback=='function'){fb.callback=callback;}
else if(typeof callback=='object'||typeof callback=='string'){fb.callback=$(callback);fb.callback.bind('keyup',fb.updateValue);if(fb.callback.get(0).value){fb.setColor(fb.callback.get(0).value);}}
return this;};fb.updateValue=function(event){if(this.value&&this.value!=fb.color){fb.setColor(this.value);}};fb.setColor=function(color){var unpack=fb.unpack(color);if(fb.color!=color&&unpack){fb.color=color;fb.rgb=unpack;fb.hsl=fb.RGBToHSL(fb.rgb);fb.updateDisplay();}
return this;};fb.setHSL=function(hsl){fb.hsl=hsl;fb.rgb=fb.HSLToRGB(hsl);fb.color=fb.pack(fb.rgb);fb.updateDisplay();return this;};fb.widgetCoords=function(event){var offset=$(fb.wheel).offset();return{x:(event.pageX-offset.left)-fb.width/2,y:(event.pageY-offset.top)-fb.width/2};};fb.mousedown=function(event){var pos=fb.widgetCoords(event);fb.circleDrag=Math.max(Math.abs(pos.x),Math.abs(pos.y))*2>fb.square;fb.mousemove(event);return false;};fb.touchconvert=function(e){var e=e.originalEvent.touches.item(0);return e;}
fb.touchmove=function(e){fb.mousemove(fb.touchconvert(e));event.preventDefault();return false;}
fb.touchend=function(event){$(document).unbind('touchmove',fb.touchmove);$(document).unbind('touchend',fb.touchend);document.dragging=false;event.preventDefault();return false;}
fb.mousemove=function(event){var pos=fb.widgetCoords(event);if(fb.circleDrag){var hue=Math.atan2(pos.x,-pos.y)/6.28;if(hue<0)hue+=1;fb.setHSL([hue,fb.hsl[1],fb.hsl[2]]);}
else{var sat=Math.max(0,Math.min(1,-(pos.x/fb.square)+.5));var lum=Math.max(0,Math.min(1,-(pos.y/fb.square)+.5));fb.setHSL([fb.hsl[0],sat,lum]);}
return false;};fb.mouseup=function(){$(document).unbind('mousemove',fb.mousemove);$(document).unbind('mouseup',fb.mouseup);document.dragging=false;};fb.updateDisplay=function(){var angle=fb.hsl[0]*6.28;$('.h-marker',e).css({left:Math.round(Math.sin(angle)*fb.radius+fb.width/2)+'px',top:Math.round(-Math.cos(angle)*fb.radius+fb.width/2)+'px'});$('.sl-marker',e).css({left:Math.round(fb.square*(.5-fb.hsl[1])+fb.width/2)+'px',top:Math.round(fb.square*(.5-fb.hsl[2])+fb.width/2)+'px'});$('.color',e).css('backgroundColor',fb.pack(fb.HSLToRGB([fb.hsl[0],1,0.5])));if(typeof fb.callback=='object'){$(fb.callback).css({backgroundColor:fb.color,color:fb.hsl[2]>0.5?'#000':'#fff'});$(fb.callback).each(function(){if(this.value&&this.value!=fb.color){this.value=fb.color;}});}
else if(typeof fb.callback=='function'){fb.callback.call(fb,fb.color);}};fb.pack=function(rgb){var r=Math.round(rgb[0]*255);var g=Math.round(rgb[1]*255);var b=Math.round(rgb[2]*255);return'#'+(r<16?'0':'')+r.toString(16)+
(g<16?'0':'')+g.toString(16)+
(b<16?'0':'')+b.toString(16);};fb.unpack=function(color){if(color.length==7){return[parseInt('0x'+color.substring(1,3))/255,parseInt('0x'+color.substring(3,5))/255,parseInt('0x'+color.substring(5,7))/255];}
else if(color.length==4){return[parseInt('0x'+color.substring(1,2))/15,parseInt('0x'+color.substring(2,3))/15,parseInt('0x'+color.substring(3,4))/15];}};fb.HSLToRGB=function(hsl){var m1,m2,r,g,b;var h=hsl[0],s=hsl[1],l=hsl[2];m2=(l<=0.5)?l*(s+1):l+s-l*s;m1=l*2-m2;return[this.hueToRGB(m1,m2,h+0.33333),this.hueToRGB(m1,m2,h),this.hueToRGB(m1,m2,h-0.33333)];};fb.hueToRGB=function(m1,m2,h){h=(h<0)?h+1:((h>1)?h-1:h);if(h*6<1)return m1+(m2-m1)*h*6;if(h*2<1)return m2;if(h*3<2)return m1+(m2-m1)*(0.66666-h)*6;return m1;};fb.RGBToHSL=function(rgb){var min,max,delta,h,s,l;var r=rgb[0],g=rgb[1],b=rgb[2];min=Math.min(r,Math.min(g,b));max=Math.max(r,Math.max(g,b));delta=max-min;l=(min+max)/2;s=0;if(l>0&&l<1){s=delta/(l<0.5?(2*l):(2-2*l));}
h=0;if(delta>0){if(max==r&&max!=g)h+=(g-b)/delta;if(max==g&&max!=b)h+=(2+(b-r)/delta);if(max==b&&max!=r)h+=(4+(r-g)/delta);h/=6;}
return[h,s,l];};$('*',e).mousedown(function(e){if(!document.dragging){$(document).bind('mousemove',fb.mousemove).bind('mouseup',fb.mouseup);document.dragging=true;}
fb.mousedown(e);});$('*',e).bind("touchstart",function(e){if(!document.dragging){$(document).bind('touchmove',fb.touchmove).bind('touchend',fb.touchend);document.dragging=true;}
fb.mousedown(fb.touchconvert(e));e.preventDefault();return false;});fb.setColor('#000000');if(callback){fb.linkTo(callback);}};})(jQuery);