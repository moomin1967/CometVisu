qx.$$packageData['1048381']={"locales":{},"resources":{},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("1048381", function() {
(function(){var a="text",b="id_",c="abstract",d='#',e="set",f="page",g="3d",h="2d",i="navbar",j='cv.ui.structure.AbstractBasicWidget',k="String";qx.Class.define(j,{extend:qx.core.Object,type:c,construct:function(l){for(var m in l){if(this[e+qx.Bootstrap.firstUp(m)]!==undefined){this.set(m,l[m]);};};},properties:{path:{check:k},$$type:{check:k},pageType:{check:[a,h,g],init:a}},members:{__qR:null,setParentWidget:function(n){this.__qR=n;},getParentWidget:function(){if(cv.Config.lazyLoading===true&&this.__qR===null&&this.getPath()!==b){var o=cv.util.Tree.getParentData(this.getPath());var parent=cv.ui.structure.WidgetFactory.createInstance(o.$$type,o);this.setParentWidget(parent);};return this.__qR;},getDomElement:function(){return qx.bom.Selector.query(d+this.getPath())[0];},getDomString:function(){return this._getInnerDomString?this._getInnerDomString():undefined;},getParentPage:function(){var parent=this.getParentWidget();while(parent){if(parent.get$$type()===f){return parent;};parent=parent.getParentWidget();};return null;},getVisibilityParent:function(){var parent=this.getParentWidget();while(parent){if(parent.get$$type()===f||parent.get$$type()===i){return parent;};parent=parent.getParentWidget();};return null;}}});})();
});