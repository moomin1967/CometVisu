qx.$$packageData['8']={"locales":{},"resources":{"plugins/strftime/strftime.css":"cv"},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("8", function() {
(function(){var a='September',b='November',c='déc',e='Freitag',f='jeudi',g="strftime",h='Aug',i='cv.plugins.Strftime',j='Juli',k='dimanche',l='April',m='Okt',n='Do',o='locale',p='Feb',q='Dienstag',r='Nov',s='Sonntag',t='mer',u='Mo',v='mai',w='Sep',x='Juni',y="text",z='%d.%m.%Y',A='Dezember',B='mercredi',C='Sa',D='Mär',E='aoû',F='Montag',G='vendredi',H='janvier',I='Mai',J='juin',K='Jul',L='März',M='<div class="strftime_value"></div>',N='ven',O='Mi',P='August',Q='jeu',R='octobre',S='mar',T='Jun',U='Oktober',V='plugins/strftime/strftime.css',W='Februar',X='jan',Y='février',bP='sam',bQ='jun',bR='Jan',bL='Mittwoch',bM='jui',bN='septembre',bO=".strftime_value",bW='lun',bX='avril',bY='So',ca='août',bS='lundi',bT='%T',bU='',bV="%c",ce='mardi',cr='Donnerstag',cs='Fr',cf="interval",cb='fév',cc='oct',cu="String",cd='Apr',cg='nov',ch='Januar',ci='dim',cm='Di',cw='mars',cn='novembre',cj='sep',ck='samedi',ct='Samstag',cl='avr',co='décembre',cp='Dez',cx='juillet',cq='%a %d %b %Y %T %Z';qx.Class.define(i,{extend:cv.ui.structure.AbstractWidget,properties:{format:{check:cu,init:bV},locale:{check:cu,nullable:true}},statics:{__tn:{},__tu:0,__kv:null,parse:function(cy,cB,cA,cz){return cv.parser.WidgetParser.parseElement(this,cy,cB,cA,cz,this.getAttributeToPropertyMappings());},getAttributeToPropertyMappings:function(){return {'lang':{target:o},'format':{"default":bV}};},uniqid:function(){return this.__tu++ ;},startTimer:function(){if(!this.__kv){this.__kv=new qx.event.Timer(1000);};if(!this.__kv.isEnabled()){this.__kv.start();};}},members:{__tv:false,__tw:null,_getInnerDomString:function(){return M;},getValueElement:function(){if(!this.__tw){this.__tw=qx.bom.Selector.query(bO,this.getDomElement())[0];};return this.__tw;},_onDomReady:function(){this.self(arguments).startTimer();this.self(arguments).__kv.addListener(cf,this.__tx,this);},__tx:function(){var cC=this.getValueElement();var d=new Date();d.locale=this.getLocale();qx.bom.element.Attribute.set(cC,y,d.strftime(this.getFormat()));}},destruct:function(){this.self(arguments).__kv.removeListener(cf,this.__tx,this);},defer:function(cD){var cE=cv.util.ScriptLoader.getInstance();cE.addStyles(V);cv.parser.WidgetParser.addHandler(g,cD);cv.ui.structure.WidgetFactory.registerClass(g,cD);Date.ext.locales.de={a:[bY,u,cm,O,n,cs,C],A:[s,F,q,bL,cr,e,ct],b:[bR,p,D,cd,I,T,K,h,w,m,r,cp],B:[ch,W,L,l,I,x,j,P,a,U,b,A],c:cq,p:[bU,bU],P:[bU,bU],x:z,X:bT};Date.ext.locales.fr={a:[ci,bW,S,t,Q,N,bP],A:[k,bS,ce,B,f,G,ck],b:[X,cb,S,cl,v,bQ,bM,E,cj,cc,cg,c],B:[H,Y,cw,bX,v,J,cx,ca,bN,R,cn,co],c:cq,p:[bU,bU],P:[bU,bU],x:z,X:bT};}});})();
});