/*Leaflet,
aJavaScriptlibraryformobile-friendlyinteractivemaps.http: //leafletjs.com(c)2010-2013,
VladimirAgafonkin(c)2010-2011,
CloudMade*/!function(t,
e,
i){
	varn=t.L,
	o={
		
	};o.version="0.7.3",
	"object"==typeofmodule&&"object"==typeofmodule.exports?module.exports=o: "function"==typeofdefine&&define.amd&&define(o),
	o.noConflict=function(){
		returnt.L=n,
		this
	},
	t.L=o,
	o.Util={
		extend: function(t){
			vare,
			i,
			n,
			o,
			s=Array.prototype.slice.call(arguments,
			1);for(i=0,
			n=s.length;n>i;i++){
				o=s[i]||{
					
				};for(eino)o.hasOwnProperty(e)&&(t[e]=o[e])
			}returnt
		},
		bind: function(t,
		e){
			vari=arguments.length>2?Array.prototype.slice.call(arguments,
			2): null;returnfunction(){
				returnt.apply(e,
				i||arguments)
			}
		},
		stamp: function(){
			vart=0,
			e="_leaflet_id";returnfunction(i){
				returni[e]=i[e]||++t,
				i[e]
			}
		}(),
		invokeEach: function(t,
		e,
		i){
			varn,
			o;if("object"==typeoft){
				o=Array.prototype.slice.call(arguments,
				3);for(nint)e.apply(i,
				[n,
				t[n]].concat(o));return!0
			}return!1
		},
		limitExecByInterval: function(t,
		e,
		i){
			varn,
			o;returnfunctions(){
				vara=arguments;returnn?void(o=!0): (n=!0,
				setTimeout(function(){
					n=!1,
					o&&(s.apply(i,
					a),
					o=!1)
				},
				e),
				voidt.apply(i,
				a))
			}
		},
		falseFn: function(){
			return!1
		},
		formatNum: function(t,
		e){
			vari=Math.pow(10,
			e||5);returnMath.round(t*i)/i
		},
		trim: function(t){
			returnt.trim?t.trim(): t.replace(/^\s+|\s+$/g,
			"")
		},
		splitWords: function(t){
			returno.Util.trim(t).split(/\s+/)
		},
		setOptions: function(t,
		e){
			returnt.options=o.extend({
				
			},
			t.options,
			e),
			t.options
		},
		getParamString: function(t,
		e,
		i){
			varn=[];for(varoint)n.push(encodeURIComponent(i?o.toUpperCase(): o)+"="+encodeURIComponent(t[o]));return(e&&-1!==e.indexOf("?")?"&": "?")+n.join("&")
		},
		template: function(t,
		e){
			returnt.replace(/\{
				*([\w_]+)*\
			}/g,
			function(t,
			n){
				varo=e[n];if(o===i)thrownewError("No value provided for variable "+t);return"function"==typeofo&&(o=o(e)),
				o
			})
		},
		isArray: Array.isArray||function(t){
			return"[object Array]"===Object.prototype.toString.call(t)
		},
		emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
	},
	function(){
		functione(e){
			vari,
			n,
			o=["webkit",
			"moz",
			"o",
			"ms"];for(i=0;i<o.length&&!n;i++)n=t[o[i]+e];returnn
		}functioni(e){
			vari=+newDate,
			o=Math.max(0,
			16-(i-n));returnn=i+o,
			t.setTimeout(e,
			o)
		}varn=0,
		s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,
		a=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){
			t.clearTimeout(e)
		};o.Util.requestAnimFrame=function(e,
		n,
		a,
		r){
			returne=o.bind(e,
			n),
			a&&s===i?voide(): s.call(t,
			e,
			r)
		},
		o.Util.cancelAnimFrame=function(e){
			e&&a.call(t,
			e)
		}
	}(),
	o.extend=o.Util.extend,
	o.bind=o.Util.bind,
	o.stamp=o.Util.stamp,
	o.setOptions=o.Util.setOptions,
	o.Class=function(){
		
	},
	o.Class.extend=function(t){
		vare=function(){
			this.initialize&&this.initialize.apply(this,
			arguments),
			this._initHooks&&this.callInitHooks()
		},
		i=function(){
			
		};i.prototype=this.prototype;varn=newi;n.constructor=e,
		e.prototype=n;for(varsinthis)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);t.statics&&(o.extend(e,
		t.statics),
		deletet.statics),
		t.includes&&(o.Util.extend.apply(null,
		[n].concat(t.includes)),
		deletet.includes),
		t.options&&n.options&&(t.options=o.extend({
			
		},
		n.options,
		t.options)),
		o.extend(n,
		t),
		n._initHooks=[];vara=this;returne.__super__=a.prototype,
		n.callInitHooks=function(){
			if(!this._initHooksCalled){
				a.prototype.callInitHooks&&a.prototype.callInitHooks.call(this),
				this._initHooksCalled=!0;for(vart=0,
				e=n._initHooks.length;e>t;t++)n._initHooks[t].call(this)
			}
		},
		e
	},
	o.Class.include=function(t){
		o.extend(this.prototype,
		t)
	},
	o.Class.mergeOptions=function(t){
		o.extend(this.prototype.options,
		t)
	},
	o.Class.addInitHook=function(t){
		vare=Array.prototype.slice.call(arguments,
		1),
		i="function"==typeoft?t: function(){
			this[t].apply(this,
			e)
		};this.prototype._initHooks=this.prototype._initHooks||[],
		this.prototype._initHooks.push(i)
	};vars="_leaflet_events";o.Mixin={
		
	},
	o.Mixin.Events={
		addEventListener: function(t,
		e,
		i){
			if(o.Util.invokeEach(t,
			this.addEventListener,
			this,
			e,
			i))returnthis;varn,
			a,
			r,
			h,
			l,
			u,
			c,
			d=this[s]=this[s]||{
				
			},
			p=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),
			n=0,
			a=t.length;a>n;n++)r={
				action: e,
				context: i||this
			},
			h=t[n],
			p?(l=h+"_idx",
			u=l+"_len",
			c=d[l]=d[l]||{
				
			},
			c[p]||(c[p]=[],
			d[u]=(d[u]||0)+1),
			c[p].push(r)): (d[h]=d[h]||[],
			d[h].push(r));returnthis
		},
		hasEventListeners: function(t){
			vare=this[s];return!!e&&(tine&&e[t].length>0||t+"_idx"ine&&e[t+"_idx_len"]>0)
		},
		removeEventListener: function(t,
		e,
		i){
			if(!this[s])returnthis;if(!t)returnthis.clearAllEventListeners();if(o.Util.invokeEach(t,
			this.removeEventListener,
			this,
			e,
			i))returnthis;varn,
			a,
			r,
			h,
			l,
			u,
			c,
			d,
			p,
			_=this[s],
			m=i&&i!==this&&o.stamp(i);for(t=o.Util.splitWords(t),
			n=0,
			a=t.length;a>n;n++)if(r=t[n],
			u=r+"_idx",
			c=u+"_len",
			d=_[u],
			e){
				if(h=m&&d?d[m]: _[r]){
					for(l=h.length-1;l>=0;l--)h[l].action!==e||i&&h[l].context!==i||(p=h.splice(l,
					1),
					p[0].action=o.Util.falseFn);i&&d&&0===h.length&&(deleted[m],
					_[c]--)
				}
			}elsedelete_[r],
			delete_[u],
			delete_[c];returnthis
		},
		clearAllEventListeners: function(){
			returndeletethis[s],
			this
		},
		fireEvent: function(t,
		e){
			if(!this.hasEventListeners(t))returnthis;vari,
			n,
			a,
			r,
			h,
			l=o.Util.extend({
				
			},
			e,
			{
				type: t,
				target: this
			}),
			u=this[s];if(u[t])for(i=u[t].slice(),
			n=0,
			a=i.length;a>n;n++)i[n].action.call(i[n].context,
			l);r=u[t+"_idx"];for(hinr)if(i=r[h].slice())for(n=0,
			a=i.length;a>n;n++)i[n].action.call(i[n].context,
			l);returnthis
		},
		addOneTimeEventListener: function(t,
		e,
		i){
			if(o.Util.invokeEach(t,
			this.addOneTimeEventListener,
			this,
			e,
			i))returnthis;varn=o.bind(function(){
				this.removeEventListener(t,
				e,
				i).removeEventListener(t,
				n,
				i)
			},
			this);returnthis.addEventListener(t,
			e,
			i).addEventListener(t,
			n,
			i)
		}
	},
	o.Mixin.Events.on=o.Mixin.Events.addEventListener,
	o.Mixin.Events.off=o.Mixin.Events.removeEventListener,
	o.Mixin.Events.once=o.Mixin.Events.addOneTimeEventListener,
	o.Mixin.Events.fire=o.Mixin.Events.fireEvent,
	function(){
		varn="ActiveXObject"int,
		s=n&&!e.addEventListener,
		a=navigator.userAgent.toLowerCase(),
		r=-1!==a.indexOf("webkit"),
		h=-1!==a.indexOf("chrome"),
		l=-1!==a.indexOf("phantom"),
		u=-1!==a.indexOf("android"),
		c=-1!==a.search("android [23]"),
		d=-1!==a.indexOf("gecko"),
		p=typeoforientation!=i+"",
		_=t.navigator&&t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints&&!t.PointerEvent,
		m=t.PointerEvent&&t.navigator.pointerEnabled&&t.navigator.maxTouchPoints||_,
		f="devicePixelRatio"int&&t.devicePixelRatio>1||"matchMedia"int&&t.matchMedia("(min-resolution:144dpi)")&&t.matchMedia("(min-resolution:144dpi)").matches,
		g=e.documentElement,
		v=n&&"transition"ing.style,
		y="WebKitCSSMatrix"int&&"m11"innewt.WebKitCSSMatrix&&!c,
		P="MozPerspective"ing.style,
		L="OTransition"ing.style,
		x=!t.L_DISABLE_3D&&(v||y||P||L)&&!l,
		w=!t.L_NO_TOUCH&&!l&&function(){
			vart="ontouchstart";if(m||ting)return!0;vari=e.createElement("div"),
			n=!1;returni.setAttribute?(i.setAttribute(t,
			"return;"),
			"function"==typeofi[t]&&(n=!0),
			i.removeAttribute(t),
			i=null,
			n): !1
		}();o.Browser={
			ie: n,
			ielt9: s,
			webkit: r,
			gecko: d&&!r&&!t.opera&&!n,
			android: u,
			android23: c,
			chrome: h,
			ie3d: v,
			webkit3d: y,
			gecko3d: P,
			opera3d: L,
			any3d: x,
			mobile: p,
			mobileWebkit: p&&r,
			mobileWebkit3d: p&&y,
			mobileOpera: p&&t.opera,
			touch: w,
			msPointer: _,
			pointer: m,
			retina: f
		}
	}(),
	o.Point=function(t,
	e,
	i){
		this.x=i?Math.round(t): t,
		this.y=i?Math.round(e): e
	},
	o.Point.prototype={
		clone: function(){
			returnnewo.Point(this.x,
			this.y)
		},
		add: function(t){
			returnthis.clone()._add(o.point(t))
		},
		_add: function(t){
			returnthis.x+=t.x,
			this.y+=t.y,
			this
		},
		subtract: function(t){
			returnthis.clone()._subtract(o.point(t))
		},
		_subtract: function(t){
			returnthis.x-=t.x,
			this.y-=t.y,
			this
		},
		divideBy: function(t){
			returnthis.clone()._divideBy(t)
		},
		_divideBy: function(t){
			returnthis.x/=t,
			this.y/=t,
			this
		},
		multiplyBy: function(t){
			returnthis.clone()._multiplyBy(t)
		},
		_multiplyBy: function(t){
			returnthis.x*=t,
			this.y*=t,
			this
		},
		round: function(){
			returnthis.clone()._round()
		},
		_round: function(){
			returnthis.x=Math.round(this.x),
			this.y=Math.round(this.y),
			this
		},
		floor: function(){
			returnthis.clone()._floor()
		},
		_floor: function(){
			returnthis.x=Math.floor(this.x),
			this.y=Math.floor(this.y),
			this
		},
		distanceTo: function(t){
			t=o.point(t);vare=t.x-this.x,
			i=t.y-this.y;returnMath.sqrt(e*e+i*i)
		},
		equals: function(t){
			returnt=o.point(t),
			t.x===this.x&&t.y===this.y
		},
		contains: function(t){
			returnt=o.point(t),
			Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)
		},
		toString: function(){
			return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"
		}
	},
	o.point=function(t,
	e,
	n){
		returntinstanceofo.Point?t: o.Util.isArray(t)?newo.Point(t[0],
		t[1]): t===i||null===t?t: newo.Point(t,
		e,
		n)
	},
	o.Bounds=function(t,
	e){
		if(t)for(vari=e?[t,
		e]: t,
		n=0,
		o=i.length;o>n;n++)this.extend(i[n])
	},
	o.Bounds.prototype={
		extend: function(t){
			returnt=o.point(t),
			this.min||this.max?(this.min.x=Math.min(t.x,
			this.min.x),
			this.max.x=Math.max(t.x,
			this.max.x),
			this.min.y=Math.min(t.y,
			this.min.y),
			this.max.y=Math.max(t.y,
			this.max.y)): (this.min=t.clone(),
			this.max=t.clone()),
			this
		},
		getCenter: function(t){
			returnnewo.Point((this.min.x+this.max.x)/2,
			(this.min.y+this.max.y)/2,
			t)
		},
		getBottomLeft: function(){
			returnnewo.Point(this.min.x,
			this.max.y)
		},
		getTopRight: function(){
			returnnewo.Point(this.max.x,
			this.min.y)
		},
		getSize: function(){
			returnthis.max.subtract(this.min)
		},
		contains: function(t){
			vare,
			i;returnt="number"==typeoft[0]||tinstanceofo.Point?o.point(t): o.bounds(t),
			tinstanceofo.Bounds?(e=t.min,
			i=t.max): e=i=t,
			e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y
		},
		intersects: function(t){
			t=o.bounds(t);vare=this.min,
			i=this.max,
			n=t.min,
			s=t.max,
			a=s.x>=e.x&&n.x<=i.x,
			r=s.y>=e.y&&n.y<=i.y;returna&&r
		},
		isValid: function(){
			return!(!this.min||!this.max)
		}
	},
	o.bounds=function(t,
	e){
		return!t||tinstanceofo.Bounds?t: newo.Bounds(t,
		e)
	},
	o.Transformation=function(t,
	e,
	i,
	n){
		this._a=t,
		this._b=e,
		this._c=i,
		this._d=n
	},
	o.Transformation.prototype={
		transform: function(t,
		e){
			returnthis._transform(t.clone(),
			e)
		},
		_transform: function(t,
		e){
			returne=e||1,
			t.x=e*(this._a*t.x+this._b),
			t.y=e*(this._c*t.y+this._d),
			t
		},
		untransform: function(t,
		e){
			returne=e||1,
			newo.Point((t.x/e-this._b)/this._a,
			(t.y/e-this._d)/this._c)
		}
	},
	o.DomUtil={
		get: function(t){
			return"string"==typeoft?e.getElementById(t): t
		},
		getStyle: function(t,
		i){
			varn=t.style[i];if(!n&&t.currentStyle&&(n=t.currentStyle[i]),
			(!n||"auto"===n)&&e.defaultView){
				varo=e.defaultView.getComputedStyle(t,
				null);n=o?o[i]: null
			}return"auto"===n?null: n
		},
		getViewportOffset: function(t){
			vari,
			n=0,
			s=0,
			a=t,
			r=e.body,
			h=e.documentElement;do{
				if(n+=a.offsetTop||0,
				s+=a.offsetLeft||0,
				n+=parseInt(o.DomUtil.getStyle(a,
				"borderTopWidth"),
				10)||0,
				s+=parseInt(o.DomUtil.getStyle(a,
				"borderLeftWidth"),
				10)||0,
				i=o.DomUtil.getStyle(a,
				"position"),
				a.offsetParent===r&&"absolute"===i)break;if("fixed"===i){
					n+=r.scrollTop||h.scrollTop||0,
					s+=r.scrollLeft||h.scrollLeft||0;break
				}if("relative"===i&&!a.offsetLeft){
					varl=o.DomUtil.getStyle(a,
					"width"),
					u=o.DomUtil.getStyle(a,
					"max-width"),
					c=a.getBoundingClientRect();("none"!==l||"none"!==u)&&(s+=c.left+a.clientLeft),
					n+=c.top+(r.scrollTop||h.scrollTop||0);break
				}a=a.offsetParent
			}while(a);a=t;do{
				if(a===r)break;n-=a.scrollTop||0,
				s-=a.scrollLeft||0,
				a=a.parentNode
			}while(a);returnnewo.Point(s,
			n)
		},
		documentIsLtr: function(){
			returno.DomUtil._docIsLtrCached||(o.DomUtil._docIsLtrCached=!0,
			o.DomUtil._docIsLtr="ltr"===o.DomUtil.getStyle(e.body,
			"direction")),
			o.DomUtil._docIsLtr
		},
		create: function(t,
		i,
		n){
			varo=e.createElement(t);returno.className=i,
			n&&n.appendChild(o),
			o
		},
		hasClass: function(t,
		e){
			if(t.classList!==i)returnt.classList.contains(e);varn=o.DomUtil._getClass(t);returnn.length>0&&newRegExp("(^|\\s)"+e+"(\\s|$)").test(n)
		},
		addClass: function(t,
		e){
			if(t.classList!==i)for(varn=o.Util.splitWords(e),
			s=0,
			a=n.length;a>s;s++)t.classList.add(n[s]);elseif(!o.DomUtil.hasClass(t,
			e)){
				varr=o.DomUtil._getClass(t);o.DomUtil._setClass(t,
				(r?r+" ": "")+e)
			}
		},
		removeClass: function(t,
		e){
			t.classList!==i?t.classList.remove(e): o.DomUtil._setClass(t,
			o.Util.trim((" "+o.DomUtil._getClass(t)+" ").replace(" "+e+" ",
			" ")))
		},
		_setClass: function(t,
		e){
			t.className.baseVal===i?t.className=e: t.className.baseVal=e
		},
		_getClass: function(t){
			returnt.className.baseVal===i?t.className: t.className.baseVal
		},
		setOpacity: function(t,
		e){
			if("opacity"int.style)t.style.opacity=e;elseif("filter"int.style){
				vari=!1,
				n="DXImageTransform.Microsoft.Alpha";try{
					i=t.filters.item(n)
				}catch(o){
					if(1===e)return
				}e=Math.round(100*e),
				i?(i.Enabled=100!==e,
				i.Opacity=e): t.style.filter+=" progid:"+n+"(opacity="+e+")"
			}
		},
		testProp: function(t){
			for(vari=e.documentElement.style,
			n=0;n<t.length;n++)if(t[n]ini)returnt[n];return!1
		},
		getTranslateString: function(t){
			vare=o.Browser.webkit3d,
			i="translate"+(e?"3d": "")+"(",
			n=(e?",0": "")+")";returni+t.x+"px,"+t.y+"px"+n
		},
		getScaleString: function(t,
		e){
			vari=o.DomUtil.getTranslateString(e.add(e.multiplyBy(-1*t))),
			n=" scale("+t+") ";returni+n
		},
		setPosition: function(t,
		e,
		i){
			t._leaflet_pos=e,
			!i&&o.Browser.any3d?t.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(e): (t.style.left=e.x+"px",
			t.style.top=e.y+"px")
		},
		getPosition: function(t){
			returnt._leaflet_pos
		}
	},
	o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform",
	"WebkitTransform",
	"OTransform",
	"MozTransform",
	"msTransform"]),
	o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition",
	"transition",
	"OTransition",
	"MozTransition",
	"msTransition"]),
	o.DomUtil.TRANSITION_END="webkitTransition"===o.DomUtil.TRANSITION||"OTransition"===o.DomUtil.TRANSITION?o.DomUtil.TRANSITION+"End": "transitionend",
	function(){
		if("onselectstart"ine)o.extend(o.DomUtil,
		{
			disableTextSelection: function(){
				o.DomEvent.on(t,
				"selectstart",
				o.DomEvent.preventDefault)
			},
			enableTextSelection: function(){
				o.DomEvent.off(t,
				"selectstart",
				o.DomEvent.preventDefault)
			}
		});else{
			vari=o.DomUtil.testProp(["userSelect",
			"WebkitUserSelect",
			"OUserSelect",
			"MozUserSelect",
			"msUserSelect"]);o.extend(o.DomUtil,
			{
				disableTextSelection: function(){
					if(i){
						vart=e.documentElement.style;this._userSelect=t[i],
						t[i]="none"
					}
				},
				enableTextSelection: function(){
					i&&(e.documentElement.style[i]=this._userSelect,
					deletethis._userSelect)
				}
			})
		}o.extend(o.DomUtil,
		{
			disableImageDrag: function(){
				o.DomEvent.on(t,
				"dragstart",
				o.DomEvent.preventDefault)
			},
			enableImageDrag: function(){
				o.DomEvent.off(t,
				"dragstart",
				o.DomEvent.preventDefault)
			}
		})
	}(),
	o.LatLng=function(t,
	e,
	n){
		if(t=parseFloat(t),
		e=parseFloat(e),
		isNaN(t)||isNaN(e))thrownewError("Invalid LatLng object: ("+t+", "+e+")");this.lat=t,
		this.lng=e,
		n!==i&&(this.alt=parseFloat(n))
	},
	o.extend(o.LatLng,
	{
		DEG_TO_RAD: Math.PI/180,
		RAD_TO_DEG: 180/Math.PI,
		MAX_MARGIN: 1e-9
	}),
	o.LatLng.prototype={
		equals: function(t){
			if(!t)return!1;t=o.latLng(t);vare=Math.max(Math.abs(this.lat-t.lat),
			Math.abs(this.lng-t.lng));returne<=o.LatLng.MAX_MARGIN
		},
		toString: function(t){
			return"LatLng("+o.Util.formatNum(this.lat,
			t)+", "+o.Util.formatNum(this.lng,
			t)+")"
		},
		distanceTo: function(t){
			t=o.latLng(t);vare=6378137,
			i=o.LatLng.DEG_TO_RAD,
			n=(t.lat-this.lat)*i,
			s=(t.lng-this.lng)*i,
			a=this.lat*i,
			r=t.lat*i,
			h=Math.sin(n/2),
			l=Math.sin(s/2),
			u=h*h+l*l*Math.cos(a)*Math.cos(r);return2*e*Math.atan2(Math.sqrt(u),
			Math.sqrt(1-u))
		},
		wrap: function(t,
		e){
			vari=this.lng;returnt=t||-180,
			e=e||180,
			i=(i+e)%(e-t)+(t>i||i===e?e: t),
			newo.LatLng(this.lat,
			i)
		}
	},
	o.latLng=function(t,
	e){
		returntinstanceofo.LatLng?t: o.Util.isArray(t)?"number"==typeoft[0]||"string"==typeoft[0]?newo.LatLng(t[0],
		t[1],
		t[2]): null: t===i||null===t?t: "object"==typeoft&&"lat"int?newo.LatLng(t.lat,
		"lng"int?t.lng: t.lon): e===i?null: newo.LatLng(t,
		e)
	},
	o.LatLngBounds=function(t,
	e){
		if(t)for(vari=e?[t,
		e]: t,
		n=0,
		o=i.length;o>n;n++)this.extend(i[n])
	},
	o.LatLngBounds.prototype={
		extend: function(t){
			if(!t)returnthis;vare=o.latLng(t);returnt=null!==e?e: o.latLngBounds(t),
			tinstanceofo.LatLng?this._southWest||this._northEast?(this._southWest.lat=Math.min(t.lat,
			this._southWest.lat),
			this._southWest.lng=Math.min(t.lng,
			this._southWest.lng),
			this._northEast.lat=Math.max(t.lat,
			this._northEast.lat),
			this._northEast.lng=Math.max(t.lng,
			this._northEast.lng)): (this._southWest=newo.LatLng(t.lat,
			t.lng),
			this._northEast=newo.LatLng(t.lat,
			t.lng)): tinstanceofo.LatLngBounds&&(this.extend(t._southWest),
			this.extend(t._northEast)),
			this
		},
		pad: function(t){
			vare=this._southWest,
			i=this._northEast,
			n=Math.abs(e.lat-i.lat)*t,
			s=Math.abs(e.lng-i.lng)*t;returnnewo.LatLngBounds(newo.LatLng(e.lat-n,
			e.lng-s),
			newo.LatLng(i.lat+n,
			i.lng+s))
		},
		getCenter: function(){
			returnnewo.LatLng((this._southWest.lat+this._northEast.lat)/2,
			(this._southWest.lng+this._northEast.lng)/2)
		},
		getSouthWest: function(){
			returnthis._southWest
		},
		getNorthEast: function(){
			returnthis._northEast
		},
		getNorthWest: function(){
			returnnewo.LatLng(this.getNorth(),
			this.getWest())
		},
		getSouthEast: function(){
			returnnewo.LatLng(this.getSouth(),
			this.getEast())
		},
		getWest: function(){
			returnthis._southWest.lng
		},
		getSouth: function(){
			returnthis._southWest.lat
		},
		getEast: function(){
			returnthis._northEast.lng
		},
		getNorth: function(){
			returnthis._northEast.lat
		},
		contains: function(t){
			t="number"==typeoft[0]||tinstanceofo.LatLng?o.latLng(t): o.latLngBounds(t);vare,
			i,
			n=this._southWest,
			s=this._northEast;returntinstanceofo.LatLngBounds?(e=t.getSouthWest(),
			i=t.getNorthEast()): e=i=t,
			e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng
		},
		intersects: function(t){
			t=o.latLngBounds(t);vare=this._southWest,
			i=this._northEast,
			n=t.getSouthWest(),
			s=t.getNorthEast(),
			a=s.lat>=e.lat&&n.lat<=i.lat,
			r=s.lng>=e.lng&&n.lng<=i.lng;returna&&r
		},
		toBBoxString: function(){
			return[this.getWest(),
			this.getSouth(),
			this.getEast(),
			this.getNorth()].join(",")
		},
		equals: function(t){
			returnt?(t=o.latLngBounds(t),
			this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast())): !1
		},
		isValid: function(){
			return!(!this._southWest||!this._northEast)
		}
	},
	o.latLngBounds=function(t,
	e){
		return!t||tinstanceofo.LatLngBounds?t: newo.LatLngBounds(t,
		e)
	},
	o.Projection={
		
	},
	o.Projection.SphericalMercator={
		MAX_LATITUDE: 85.0511287798,
		project: function(t){
			vare=o.LatLng.DEG_TO_RAD,
			i=this.MAX_LATITUDE,
			n=Math.max(Math.min(i,
			t.lat),
			-i),
			s=t.lng*e,
			a=n*e;returna=Math.log(Math.tan(Math.PI/4+a/2)),
			newo.Point(s,
			a)
		},
		unproject: function(t){
			vare=o.LatLng.RAD_TO_DEG,
			i=t.x*e,
			n=(2*Math.atan(Math.exp(t.y))-Math.PI/2)*e;returnnewo.LatLng(n,
			i)
		}
	},
	o.Projection.LonLat={
		project: function(t){
			returnnewo.Point(t.lng,
			t.lat)
		},
		unproject: function(t){
			returnnewo.LatLng(t.y,
			t.x)
		}
	},
	o.CRS={
		latLngToPoint: function(t,
		e){
			vari=this.projection.project(t),
			n=this.scale(e);returnthis.transformation._transform(i,
			n)
		},
		pointToLatLng: function(t,
		e){
			vari=this.scale(e),
			n=this.transformation.untransform(t,
			i);returnthis.projection.unproject(n)
		},
		project: function(t){
			returnthis.projection.project(t)
		},
		scale: function(t){
			return256*Math.pow(2,
			t)
		},
		getSize: function(t){
			vare=this.scale(t);returno.point(e,
			e)
		}
	},
	o.CRS.Simple=o.extend({
		
	},
	o.CRS,
	{
		projection: o.Projection.LonLat,
		transformation: newo.Transformation(1,
		0,
		-1,
		0),
		scale: function(t){
			returnMath.pow(2,
			t)
		}
	}),
	o.CRS.EPSG3857=o.extend({
		
	},
	o.CRS,
	{
		code: "EPSG:3857",
		projection: o.Projection.SphericalMercator,
		transformation: newo.Transformation(.5/Math.PI,
		.5,
		-.5/Math.PI,
		.5),
		project: function(t){
			vare=this.projection.project(t),
			i=6378137;returne.multiplyBy(i)
		}
	}),
	o.CRS.EPSG900913=o.extend({
		
	},
	o.CRS.EPSG3857,
	{
		code: "EPSG:900913"
	}),
	o.CRS.EPSG4326=o.extend({
		
	},
	o.CRS,
	{
		code: "EPSG:4326",
		projection: o.Projection.LonLat,
		transformation: newo.Transformation(1/360,
		.5,
		-1/360,
		.5)
	}),
	o.Map=o.Class.extend({
		includes: o.Mixin.Events,
		options: {
			crs: o.CRS.EPSG3857,
			fadeAnimation: o.DomUtil.TRANSITION&&!o.Browser.android23,
			trackResize: !0,
			markerZoomAnimation: o.DomUtil.TRANSITION&&o.Browser.any3d
		},
		initialize: function(t,
		e){
			e=o.setOptions(this,
			e),
			this._initContainer(t),
			this._initLayout(),
			this._onResize=o.bind(this._onResize,
			this),
			this._initEvents(),
			e.maxBounds&&this.setMaxBounds(e.maxBounds),
			e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),
			e.zoom,
			{
				reset: !0
			}),
			this._handlers=[],
			this._layers={
				
			},
			this._zoomBoundLayers={
				
			},
			this._tileLayersNum=0,
			this.callInitHooks(),
			this._addLayers(e.layers)
		},
		setView: function(t,
		e){
			returne=e===i?this.getZoom(): e,
			this._resetView(o.latLng(t),
			this._limitZoom(e)),
			this
		},
		setZoom: function(t,
		e){
			returnthis._loaded?this.setView(this.getCenter(),
			t,
			{
				zoom: e
			}): (this._zoom=this._limitZoom(t),
			this)
		},
		zoomIn: function(t,
		e){
			returnthis.setZoom(this._zoom+(t||1),
			e)
		},
		zoomOut: function(t,
		e){
			returnthis.setZoom(this._zoom-(t||1),
			e)
		},
		setZoomAround: function(t,
		e,
		i){
			varn=this.getZoomScale(e),
			s=this.getSize().divideBy(2),
			a=tinstanceofo.Point?t: this.latLngToContainerPoint(t),
			r=a.subtract(s).multiplyBy(1-1/n),
			h=this.containerPointToLatLng(s.add(r));returnthis.setView(h,
			e,
			{
				zoom: i
			})
		},
		fitBounds: function(t,
		e){
			e=e||{
				
			},
			t=t.getBounds?t.getBounds(): o.latLngBounds(t);vari=o.point(e.paddingTopLeft||e.padding||[0,
			0]),
			n=o.point(e.paddingBottomRight||e.padding||[0,
			0]),
			s=this.getBoundsZoom(t,
			!1,
			i.add(n)),
			a=n.subtract(i).divideBy(2),
			r=this.project(t.getSouthWest(),
			s),
			h=this.project(t.getNorthEast(),
			s),
			l=this.unproject(r.add(h).divideBy(2).add(a),
			s);returns=e&&e.maxZoom?Math.min(e.maxZoom,
			s): s,
			this.setView(l,
			s,
			e)
		},
		fitWorld: function(t){
			returnthis.fitBounds([[-90,
			-180],
			[90,
			180]],
			t)
		},
		panTo: function(t,
		e){
			returnthis.setView(t,
			this._zoom,
			{
				pan: e
			})
		},
		panBy: function(t){
			returnthis.fire("movestart"),
			this._rawPanBy(o.point(t)),
			this.fire("move"),
			this.fire("moveend")
		},
		setMaxBounds: function(t){
			returnt=o.latLngBounds(t),
			this.options.maxBounds=t,
			t?(this._loaded&&this._panInsideMaxBounds(),
			this.on("moveend",
			this._panInsideMaxBounds,
			this)): this.off("moveend",
			this._panInsideMaxBounds,
			this)
		},
		panInsideBounds: function(t,
		e){
			vari=this.getCenter(),
			n=this._limitCenter(i,
			this._zoom,
			t);returni.equals(n)?this: this.panTo(n,
			e)
		},
		addLayer: function(t){
			vare=o.stamp(t);returnthis._layers[e]?this: (this._layers[e]=t,
			!t.options||isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[e]=t,
			this._updateZoomLevels()),
			this.options.zoomAnimation&&o.TileLayer&&tinstanceofo.TileLayer&&(this._tileLayersNum++,
			this._tileLayersToLoad++,
			t.on("load",
			this._onTileLayerLoad,
			this)),
			this._loaded&&this._layerAdd(t),
			this)
		},
		removeLayer: function(t){
			vare=o.stamp(t);returnthis._layers[e]?(this._loaded&&t.onRemove(this),
			deletethis._layers[e],
			this._loaded&&this.fire("layerremove",
			{
				layer: t
			}),
			this._zoomBoundLayers[e]&&(deletethis._zoomBoundLayers[e],
			this._updateZoomLevels()),
			this.options.zoomAnimation&&o.TileLayer&&tinstanceofo.TileLayer&&(this._tileLayersNum--,
			this._tileLayersToLoad--,
			t.off("load",
			this._onTileLayerLoad,
			this)),
			this): this
		},
		hasLayer: function(t){
			returnt?o.stamp(t)inthis._layers: !1
		},
		eachLayer: function(t,
		e){
			for(variinthis._layers)t.call(e,
			this._layers[i]);returnthis
		},
		invalidateSize: function(t){
			if(!this._loaded)returnthis;t=o.extend({
				animate: !1,
				pan: !0
			},
			t===!0?{
				animate: !0
			}: t);vare=this.getSize();this._sizeChanged=!0,
			this._initialCenter=null;vari=this.getSize(),
			n=e.divideBy(2).round(),
			s=i.divideBy(2).round(),
			a=n.subtract(s);returna.x||a.y?(t.animate&&t.pan?this.panBy(a): (t.pan&&this._rawPanBy(a),
			this.fire("move"),
			t.debounceMoveend?(clearTimeout(this._sizeTimer),
			this._sizeTimer=setTimeout(o.bind(this.fire,
			this,
			"moveend"),
			200)): this.fire("moveend")),
			this.fire("resize",
			{
				oldSize: e,
				newSize: i
			})): this
		},
		addHandler: function(t,
		e){
			if(!e)returnthis;vari=this[t]=newe(this);returnthis._handlers.push(i),
			this.options[t]&&i.enable(),
			this
		},
		remove: function(){
			this._loaded&&this.fire("unload"),
			this._initEvents("off");try{
				deletethis._container._leaflet
			}catch(t){
				this._container._leaflet=i
			}returnthis._clearPanes(),
			this._clearControlPos&&this._clearControlPos(),
			this._clearHandlers(),
			this
		},
		getCenter: function(){
			returnthis._checkIfLoaded(),
			this._initialCenter&&!this._moved()?this._initialCenter: this.layerPointToLatLng(this._getCenterLayerPoint())
		},
		getZoom: function(){
			returnthis._zoom
		},
		getBounds: function(){
			vart=this.getPixelBounds(),
			e=this.unproject(t.getBottomLeft()),
			i=this.unproject(t.getTopRight());returnnewo.LatLngBounds(e,
			i)
		},
		getMinZoom: function(){
			returnthis.options.minZoom===i?this._layersMinZoom===i?0: this._layersMinZoom: this.options.minZoom
		},
		getMaxZoom: function(){
			returnthis.options.maxZoom===i?this._layersMaxZoom===i?1/0: this._layersMaxZoom: this.options.maxZoom
		},
		getBoundsZoom: function(t,
		e,
		i){
			t=o.latLngBounds(t);varn,
			s=this.getMinZoom()-(e?1: 0),
			a=this.getMaxZoom(),
			r=this.getSize(),
			h=t.getNorthWest(),
			l=t.getSouthEast(),
			u=!0;i=o.point(i||[0,
			0]);dos++,
			n=this.project(l,
			s).subtract(this.project(h,
			s)).add(i),
			u=e?n.x<r.x||n.y<r.y: r.contains(n);while(u&&a>=s);returnu&&e?null: e?s: s-1
		},
		getSize: function(){
			return(!this._size||this._sizeChanged)&&(this._size=newo.Point(this._container.clientWidth,
			this._container.clientHeight),
			this._sizeChanged=!1),
			this._size.clone()
		},
		getPixelBounds: function(){
			vart=this._getTopLeftPoint();returnnewo.Bounds(t,
			t.add(this.getSize()))
		},
		getPixelOrigin: function(){
			returnthis._checkIfLoaded(),
			this._initialTopLeftPoint
		},
		getPanes: function(){
			returnthis._panes
		},
		getContainer: function(){
			returnthis._container
		},
		getZoomScale: function(t){
			vare=this.options.crs;returne.scale(t)/e.scale(this._zoom)
		},
		getScaleZoom: function(t){
			returnthis._zoom+Math.log(t)/Math.LN2
		},
		project: function(t,
		e){
			returne=e===i?this._zoom: e,
			this.options.crs.latLngToPoint(o.latLng(t),
			e)
		},
		unproject: function(t,
		e){
			returne=e===i?this._zoom: e,
			this.options.crs.pointToLatLng(o.point(t),
			e)
		},
		layerPointToLatLng: function(t){
			vare=o.point(t).add(this.getPixelOrigin());returnthis.unproject(e)
		},
		latLngToLayerPoint: function(t){
			vare=this.project(o.latLng(t))._round();returne._subtract(this.getPixelOrigin())
		},
		containerPointToLayerPoint: function(t){
			returno.point(t).subtract(this._getMapPanePos())
		},
		layerPointToContainerPoint: function(t){
			returno.point(t).add(this._getMapPanePos())
		},
		containerPointToLatLng: function(t){
			vare=this.containerPointToLayerPoint(o.point(t));returnthis.layerPointToLatLng(e)
		},
		latLngToContainerPoint: function(t){
			returnthis.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
		},
		mouseEventToContainerPoint: function(t){
			returno.DomEvent.getMousePosition(t,
			this._container)
		},
		mouseEventToLayerPoint: function(t){
			returnthis.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
		},
		mouseEventToLatLng: function(t){
			returnthis.layerPointToLatLng(this.mouseEventToLayerPoint(t))
		},
		_initContainer: function(t){
			vare=this._container=o.DomUtil.get(t);if(!e)thrownewError("Map container not found.");if(e._leaflet)thrownewError("Map container is already initialized.");e._leaflet=!0
		},
		_initLayout: function(){
			vart=this._container;o.DomUtil.addClass(t,
			"leaflet-container"+(o.Browser.touch?" leaflet-touch": "")+(o.Browser.retina?" leaflet-retina": "")+(o.Browser.ielt9?" leaflet-oldie": "")+(this.options.fadeAnimation?" leaflet-fade-anim": ""));vare=o.DomUtil.getStyle(t,
			"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),
			this._initPanes(),
			this._initControlPos&&this._initControlPos()
		},
		_initPanes: function(){
			vart=this._panes={
				
			};this._mapPane=t.mapPane=this._createPane("leaflet-map-pane",
			this._container),
			this._tilePane=t.tilePane=this._createPane("leaflet-tile-pane",
			this._mapPane),
			t.objectsPane=this._createPane("leaflet-objects-pane",
			this._mapPane),
			t.shadowPane=this._createPane("leaflet-shadow-pane"),
			t.overlayPane=this._createPane("leaflet-overlay-pane"),
			t.markerPane=this._createPane("leaflet-marker-pane"),
			t.popupPane=this._createPane("leaflet-popup-pane");vare=" leaflet-zoom-hide";this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,
			e),
			o.DomUtil.addClass(t.shadowPane,
			e),
			o.DomUtil.addClass(t.popupPane,
			e))
		},
		_createPane: function(t,
		e){
			returno.DomUtil.create("div",
			t,
			e||this._panes.objectsPane)
		},
		_clearPanes: function(){
			this._container.removeChild(this._mapPane)
		},
		_addLayers: function(t){
			t=t?o.Util.isArray(t)?t: [t]: [];for(vare=0,
			i=t.length;i>e;e++)this.addLayer(t[e])
		},
		_resetView: function(t,
		e,
		i,
		n){
			vars=this._zoom!==e;n||(this.fire("movestart"),
			s&&this.fire("zoomstart")),
			this._zoom=e,
			this._initialCenter=t,
			this._initialTopLeftPoint=this._getNewTopLeftPoint(t),
			i?this._initialTopLeftPoint._add(this._getMapPanePos()): o.DomUtil.setPosition(this._mapPane,
			newo.Point(0,
			0)),
			this._tileLayersToLoad=this._tileLayersNum;vara=!this._loaded;this._loaded=!0,
			this.fire("viewreset",
			{
				hard: !i
			}),
			a&&(this.fire("load"),
			this.eachLayer(this._layerAdd,
			this)),
			this.fire("move"),
			(s||n)&&this.fire("zoomend"),
			this.fire("moveend",
			{
				hard: !i
			})
		},
		_rawPanBy: function(t){
			o.DomUtil.setPosition(this._mapPane,
			this._getMapPanePos().subtract(t))
		},
		_getZoomSpan: function(){
			returnthis.getMaxZoom()-this.getMinZoom()
		},
		_updateZoomLevels: function(){
			vart,
			e=1/0,
			n=-1/0,
			o=this._getZoomSpan();for(tinthis._zoomBoundLayers){
				vars=this._zoomBoundLayers[t];isNaN(s.options.minZoom)||(e=Math.min(e,
				s.options.minZoom)),
				isNaN(s.options.maxZoom)||(n=Math.max(n,
				s.options.maxZoom))
			}t===i?this._layersMaxZoom=this._layersMinZoom=i: (this._layersMaxZoom=n,
			this._layersMinZoom=e),
			o!==this._getZoomSpan()&&this.fire("zoomlevelschange")
		},
		_panInsideMaxBounds: function(){
			this.panInsideBounds(this.options.maxBounds)
		},
		_checkIfLoaded: function(){
			if(!this._loaded)thrownewError("Set map center and zoom first.")
		},
		_initEvents: function(e){
			if(o.DomEvent){
				e=e||"on",
				o.DomEvent[e](this._container,
				"click",
				this._onMouseClick,
				this);vari,
				n,
				s=["dblclick",
				"mousedown",
				"mouseup",
				"mouseenter",
				"mouseleave",
				"mousemove",
				"contextmenu"];for(i=0,
				n=s.length;n>i;i++)o.DomEvent[e](this._container,
				s[i],
				this._fireMouseEvent,
				this);this.options.trackResize&&o.DomEvent[e](t,
				"resize",
				this._onResize,
				this)
			}
		},
		_onResize: function(){
			o.Util.cancelAnimFrame(this._resizeRequest),
			this._resizeRequest=o.Util.requestAnimFrame(function(){
				this.invalidateSize({
					debounceMoveend: !0
				})
			},
			this,
			!1,
			this._container)
		},
		_onMouseClick: function(t){
			!this._loaded||!t._simulated&&(this.dragging&&this.dragging.moved()||this.boxZoom&&this.boxZoom.moved())||o.DomEvent._skipped(t)||(this.fire("preclick"),
			this._fireMouseEvent(t))
		},
		_fireMouseEvent: function(t){
			if(this._loaded&&!o.DomEvent._skipped(t)){
				vare=t.type;if(e="mouseenter"===e?"mouseover": "mouseleave"===e?"mouseout": e,
				this.hasEventListeners(e)){
					"contextmenu"===e&&o.DomEvent.preventDefault(t);vari=this.mouseEventToContainerPoint(t),
					n=this.containerPointToLayerPoint(i),
					s=this.layerPointToLatLng(n);this.fire(e,
					{
						latlng: s,
						layerPoint: n,
						containerPoint: i,
						originalEvent: t
					})
				}
			}
		},
		_onTileLayerLoad: function(){
			this._tileLayersToLoad--,
			this._tileLayersNum&&!this._tileLayersToLoad&&this.fire("tilelayersload")
		},
		_clearHandlers: function(){
			for(vart=0,
			e=this._handlers.length;e>t;t++)this._handlers[t].disable()
		},
		whenReady: function(t,
		e){
			returnthis._loaded?t.call(e||this,
			this): this.on("load",
			t,
			e),
			this
		},
		_layerAdd: function(t){
			t.onAdd(this),
			this.fire("layeradd",
			{
				layer: t
			})
		},
		_getMapPanePos: function(){
			returno.DomUtil.getPosition(this._mapPane)
		},
		_moved: function(){
			vart=this._getMapPanePos();returnt&&!t.equals([0,
			0])
		},
		_getTopLeftPoint: function(){
			returnthis.getPixelOrigin().subtract(this._getMapPanePos())
		},
		_getNewTopLeftPoint: function(t,
		e){
			vari=this.getSize()._divideBy(2);returnthis.project(t,
			e)._subtract(i)._round()
		},
		_latLngToNewLayerPoint: function(t,
		e,
		i){
			varn=this._getNewTopLeftPoint(i,
			e).add(this._getMapPanePos());returnthis.project(t,
			e)._subtract(n)
		},
		_getCenterLayerPoint: function(){
			returnthis.containerPointToLayerPoint(this.getSize()._divideBy(2))
		},
		_getCenterOffset: function(t){
			returnthis.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
		},
		_limitCenter: function(t,
		e,
		i){
			if(!i)returnt;varn=this.project(t,
			e),
			s=this.getSize().divideBy(2),
			a=newo.Bounds(n.subtract(s),
			n.add(s)),
			r=this._getBoundsOffset(a,
			i,
			e);returnthis.unproject(n.add(r),
			e)
		},
		_limitOffset: function(t,
		e){
			if(!e)returnt;vari=this.getPixelBounds(),
			n=newo.Bounds(i.min.add(t),
			i.max.add(t));returnt.add(this._getBoundsOffset(n,
			e))
		},
		_getBoundsOffset: function(t,
		e,
		i){
			varn=this.project(e.getNorthWest(),
			i).subtract(t.min),
			s=this.project(e.getSouthEast(),
			i).subtract(t.max),
			a=this._rebound(n.x,
			-s.x),
			r=this._rebound(n.y,
			-s.y);returnnewo.Point(a,
			r)
		},
		_rebound: function(t,
		e){
			returnt+e>0?Math.round(t-e)/2: Math.max(0,
			Math.ceil(t))-Math.max(0,
			Math.floor(e))
		},
		_limitZoom: function(t){
			vare=this.getMinZoom(),
			i=this.getMaxZoom();returnMath.max(e,
			Math.min(i,
			t))
		}
	}),
	o.map=function(t,
	e){
		returnnewo.Map(t,
		e)
	},
	o.Projection.Mercator={
		MAX_LATITUDE: 85.0840591556,
		R_MINOR: 6356752.314245179,
		R_MAJOR: 6378137,
		project: function(t){
			vare=o.LatLng.DEG_TO_RAD,
			i=this.MAX_LATITUDE,
			n=Math.max(Math.min(i,
			t.lat),
			-i),
			s=this.R_MAJOR,
			a=this.R_MINOR,
			r=t.lng*e*s,
			h=n*e,
			l=a/s,
			u=Math.sqrt(1-l*l),
			c=u*Math.sin(h);c=Math.pow((1-c)/(1+c),
			.5*u);vard=Math.tan(.5*(.5*Math.PI-h))/c;returnh=-s*Math.log(d),
			newo.Point(r,
			h)
		},
		unproject: function(t){
			for(vare,
			i=o.LatLng.RAD_TO_DEG,
			n=this.R_MAJOR,
			s=this.R_MINOR,
			a=t.x*i/n,
			r=s/n,
			h=Math.sqrt(1-r*r),
			l=Math.exp(-t.y/n),
			u=Math.PI/2-2*Math.atan(l),
			c=15,
			d=1e-7,
			p=c,
			_=.1;Math.abs(_)>d&&--p>0;)e=h*Math.sin(u),
			_=Math.PI/2-2*Math.atan(l*Math.pow((1-e)/(1+e),
			.5*h))-u,
			u+=_;returnnewo.LatLng(u*i,
			a)
		}
	},
	o.CRS.EPSG3395=o.extend({
		
	},
	o.CRS,
	{
		code: "EPSG:3395",
		projection: o.Projection.Mercator,
		transformation: function(){
			vart=o.Projection.Mercator,
			e=t.R_MAJOR,
			i=.5/(Math.PI*e);returnnewo.Transformation(i,
			.5,
			-i,
			.5)
		}()
	}),
	o.TileLayer=o.Class.extend({
		includes: o.Mixin.Events,
		options: {
			minZoom: 0,
			maxZoom: 18,
			tileSize: 256,
			subdomains: "abc",
			errorTileUrl: "",
			attribution: "",
			zoomOffset: 0,
			opacity: 1,
			unloadInvisibleTiles: o.Browser.mobile,
			updateWhenIdle: o.Browser.mobile
		},
		initialize: function(t,
		e){
			e=o.setOptions(this,
			e),
			e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),
			e.zoomOffset++,
			e.minZoom>0&&e.minZoom--,
			this.options.maxZoom--),
			e.bounds&&(e.bounds=o.latLngBounds(e.bounds)),
			this._url=t;vari=this.options.subdomains;"string"==typeofi&&(this.options.subdomains=i.split(""))
		},
		onAdd: function(t){
			this._map=t,
			this._animated=t._zoomAnimated,
			this._initContainer(),
			t.on({
				viewreset: this._reset,
				moveend: this._update
			},
			this),
			this._animated&&t.on({
				zoomanim: this._animateZoom,
				zoomend: this._endZoomAnim
			},
			this),
			this.options.updateWhenIdle||(this._limitedUpdate=o.Util.limitExecByInterval(this._update,
			150,
			this),
			t.on("move",
			this._limitedUpdate,
			this)),
			this._reset(),
			this._update()
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		onRemove: function(t){
			this._container.parentNode.removeChild(this._container),
			t.off({
				viewreset: this._reset,
				moveend: this._update
			},
			this),
			this._animated&&t.off({
				zoomanim: this._animateZoom,
				zoomend: this._endZoomAnim
			},
			this),
			this.options.updateWhenIdle||t.off("move",
			this._limitedUpdate,
			this),
			this._container=null,
			this._map=null
		},
		bringToFront: function(){
			vart=this._map._panes.tilePane;returnthis._container&&(t.appendChild(this._container),
			this._setAutoZIndex(t,
			Math.max)),
			this
		},
		bringToBack: function(){
			vart=this._map._panes.tilePane;returnthis._container&&(t.insertBefore(this._container,
			t.firstChild),
			this._setAutoZIndex(t,
			Math.min)),
			this
		},
		getAttribution: function(){
			returnthis.options.attribution
		},
		getContainer: function(){
			returnthis._container
		},
		setOpacity: function(t){
			returnthis.options.opacity=t,
			this._map&&this._updateOpacity(),
			this
		},
		setZIndex: function(t){
			returnthis.options.zIndex=t,
			this._updateZIndex(),
			this
		},
		setUrl: function(t,
		e){
			returnthis._url=t,
			e||this.redraw(),
			this
		},
		redraw: function(){
			returnthis._map&&(this._reset({
				hard: !0
			}),
			this._update()),
			this
		},
		_updateZIndex: function(){
			this._container&&this.options.zIndex!==i&&(this._container.style.zIndex=this.options.zIndex)
		},
		_setAutoZIndex: function(t,
		e){
			vari,
			n,
			o,
			s=t.children,
			a=-e(1/0,
			-1/0);for(n=0,
			o=s.length;o>n;n++)s[n]!==this._container&&(i=parseInt(s[n].style.zIndex,
			10),
			isNaN(i)||(a=e(a,
			i)));this.options.zIndex=this._container.style.zIndex=(isFinite(a)?a: 0)+e(1,
			-1)
		},
		_updateOpacity: function(){
			vart,
			e=this._tiles;if(o.Browser.ielt9)for(tine)o.DomUtil.setOpacity(e[t],
			this.options.opacity);elseo.DomUtil.setOpacity(this._container,
			this.options.opacity)
		},
		_initContainer: function(){
			vart=this._map._panes.tilePane;if(!this._container){
				if(this._container=o.DomUtil.create("div",
				"leaflet-layer"),
				this._updateZIndex(),
				this._animated){
					vare="leaflet-tile-container";this._bgBuffer=o.DomUtil.create("div",
					e,
					this._container),
					this._tileContainer=o.DomUtil.create("div",
					e,
					this._container)
				}elsethis._tileContainer=this._container;t.appendChild(this._container),
				this.options.opacity<1&&this._updateOpacity()
			}
		},
		_reset: function(t){
			for(vareinthis._tiles)this.fire("tileunload",
			{
				tile: this._tiles[e]
			});this._tiles={
				
			},
			this._tilesToLoad=0,
			this.options.reuseTiles&&(this._unusedTiles=[]),
			this._tileContainer.innerHTML="",
			this._animated&&t&&t.hard&&this._clearBgBuffer(),
			this._initContainer()
		},
		_getTileSize: function(){
			vart=this._map,
			e=t.getZoom()+this.options.zoomOffset,
			i=this.options.maxNativeZoom,
			n=this.options.tileSize;returni&&e>i&&(n=Math.round(t.getZoomScale(e)/t.getZoomScale(i)*n)),
			n
		},
		_update: function(){
			if(this._map){
				vart=this._map,
				e=t.getPixelBounds(),
				i=t.getZoom(),
				n=this._getTileSize();if(!(i>this.options.maxZoom||i<this.options.minZoom)){
					vars=o.bounds(e.min.divideBy(n)._floor(),
					e.max.divideBy(n)._floor());this._addTilesFromCenterOut(s),
					(this.options.unloadInvisibleTiles||this.options.reuseTiles)&&this._removeOtherTiles(s)
				}
			}
		},
		_addTilesFromCenterOut: function(t){
			vari,
			n,
			s,
			a=[],
			r=t.getCenter();for(i=t.min.y;i<=t.max.y;i++)for(n=t.min.x;n<=t.max.x;n++)s=newo.Point(n,
			i),
			this._tileShouldBeLoaded(s)&&a.push(s);varh=a.length;if(0!==h){
				a.sort(function(t,
				e){
					returnt.distanceTo(r)-e.distanceTo(r)
				});varl=e.createDocumentFragment();for(this._tilesToLoad||this.fire("loading"),
				this._tilesToLoad+=h,
				n=0;h>n;n++)this._addTile(a[n],
				l);this._tileContainer.appendChild(l)
			}
		},
		_tileShouldBeLoaded: function(t){
			if(t.x+":"+t.yinthis._tiles)return!1;vare=this.options;if(!e.continuousWorld){
				vari=this._getWrapTileNum();if(e.noWrap&&(t.x<0||t.x>=i.x)||t.y<0||t.y>=i.y)return!1
			}if(e.bounds){
				varn=e.tileSize,
				o=t.multiplyBy(n),
				s=o.add([n,
				n]),
				a=this._map.unproject(o),
				r=this._map.unproject(s);if(e.continuousWorld||e.noWrap||(a=a.wrap(),
				r=r.wrap()),
				!e.bounds.intersects([a,
				r]))return!1
			}return!0
		},
		_removeOtherTiles: function(t){
			vare,
			i,
			n,
			o;for(ointhis._tiles)e=o.split(":"),
			i=parseInt(e[0],
			10),
			n=parseInt(e[1],
			10),
			(i<t.min.x||i>t.max.x||n<t.min.y||n>t.max.y)&&this._removeTile(o)
		},
		_removeTile: function(t){
			vare=this._tiles[t];this.fire("tileunload",
			{
				tile: e,
				url: e.src
			}),
			this.options.reuseTiles?(o.DomUtil.removeClass(e,
			"leaflet-tile-loaded"),
			this._unusedTiles.push(e)): e.parentNode===this._tileContainer&&this._tileContainer.removeChild(e),
			o.Browser.android||(e.onload=null,
			e.src=o.Util.emptyImageUrl),
			deletethis._tiles[t]
		},
		_addTile: function(t,
		e){
			vari=this._getTilePos(t),
			n=this._getTile();o.DomUtil.setPosition(n,
			i,
			o.Browser.chrome),
			this._tiles[t.x+":"+t.y]=n,
			this._loadTile(n,
			t),
			n.parentNode!==this._tileContainer&&e.appendChild(n)
		},
		_getZoomForUrl: function(){
			vart=this.options,
			e=this._map.getZoom();returnt.zoomReverse&&(e=t.maxZoom-e),
			e+=t.zoomOffset,
			t.maxNativeZoom?Math.min(e,
			t.maxNativeZoom): e
		},
		_getTilePos: function(t){
			vare=this._map.getPixelOrigin(),
			i=this._getTileSize();returnt.multiplyBy(i).subtract(e)
		},
		getTileUrl: function(t){
			returno.Util.template(this._url,
			o.extend({
				s: this._getSubdomain(t),
				z: t.z,
				x: t.x,
				y: t.y
			},
			this.options))
		},
		_getWrapTileNum: function(){
			vart=this._map.options.crs,
			e=t.getSize(this._map.getZoom());returne.divideBy(this._getTileSize())._floor()
		},
		_adjustTilePoint: function(t){
			vare=this._getWrapTileNum();this.options.continuousWorld||this.options.noWrap||(t.x=(t.x%e.x+e.x)%e.x),
			this.options.tms&&(t.y=e.y-t.y-1),
			t.z=this._getZoomForUrl()
		},
		_getSubdomain: function(t){
			vare=Math.abs(t.x+t.y)%this.options.subdomains.length;returnthis.options.subdomains[e]
		},
		_getTile: function(){
			if(this.options.reuseTiles&&this._unusedTiles.length>0){
				vart=this._unusedTiles.pop();returnthis._resetTile(t),
				t
			}returnthis._createTile()
		},
		_resetTile: function(){
			
		},
		_createTile: function(){
			vart=o.DomUtil.create("img",
			"leaflet-tile");returnt.style.width=t.style.height=this._getTileSize()+"px",
			t.galleryimg="no",
			t.onselectstart=t.onmousemove=o.Util.falseFn,
			o.Browser.ielt9&&this.options.opacity!==i&&o.DomUtil.setOpacity(t,
			this.options.opacity),
			o.Browser.mobileWebkit3d&&(t.style.WebkitBackfaceVisibility="hidden"),
			t
		},
		_loadTile: function(t,
		e){
			t._layer=this,
			t.onload=this._tileOnLoad,
			t.onerror=this._tileOnError,
			this._adjustTilePoint(e),
			t.src=this.getTileUrl(e),
			this.fire("tileloadstart",
			{
				tile: t,
				url: t.src
			})
		},
		_tileLoaded: function(){
			this._tilesToLoad--,
			this._animated&&o.DomUtil.addClass(this._tileContainer,
			"leaflet-zoom-animated"),
			this._tilesToLoad||(this.fire("load"),
			this._animated&&(clearTimeout(this._clearBgBufferTimer),
			this._clearBgBufferTimer=setTimeout(o.bind(this._clearBgBuffer,
			this),
			500)))
		},
		_tileOnLoad: function(){
			vart=this._layer;this.src!==o.Util.emptyImageUrl&&(o.DomUtil.addClass(this,
			"leaflet-tile-loaded"),
			t.fire("tileload",
			{
				tile: this,
				url: this.src
			})),
			t._tileLoaded()
		},
		_tileOnError: function(){
			vart=this._layer;t.fire("tileerror",
			{
				tile: this,
				url: this.src
			});vare=t.options.errorTileUrl;e&&(this.src=e),
			t._tileLoaded()
		}
	}),
	o.tileLayer=function(t,
	e){
		returnnewo.TileLayer(t,
		e)
	},
	o.TileLayer.WMS=o.TileLayer.extend({
		defaultWmsParams: {
			service: "WMS",
			request: "GetMap",
			version: "1.1.1",
			layers: "",
			styles: "",
			format: "image/jpeg",
			transparent: !1
		},
		initialize: function(t,
		e){
			this._url=t;vari=o.extend({
				
			},
			this.defaultWmsParams),
			n=e.tileSize||this.options.tileSize;i.width=i.height=e.detectRetina&&o.Browser.retina?2*n: n;for(varsine)this.options.hasOwnProperty(s)||"crs"===s||(i[s]=e[s]);this.wmsParams=i,
			o.setOptions(this,
			e)
		},
		onAdd: function(t){
			this._crs=this.options.crs||t.options.crs,
			this._wmsVersion=parseFloat(this.wmsParams.version);vare=this._wmsVersion>=1.3?"crs": "srs";this.wmsParams[e]=this._crs.code,
			o.TileLayer.prototype.onAdd.call(this,
			t)
		},
		getTileUrl: function(t){
			vare=this._map,
			i=this.options.tileSize,
			n=t.multiplyBy(i),
			s=n.add([i,
			i]),
			a=this._crs.project(e.unproject(n,
			t.z)),
			r=this._crs.project(e.unproject(s,
			t.z)),
			h=this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[r.y,
			a.x,
			a.y,
			r.x].join(","): [a.x,
			r.y,
			r.x,
			a.y].join(","),
			l=o.Util.template(this._url,
			{
				s: this._getSubdomain(t)
			});returnl+o.Util.getParamString(this.wmsParams,
			l,
			!0)+"&BBOX="+h
		},
		setParams: function(t,
		e){
			returno.extend(this.wmsParams,
			t),
			e||this.redraw(),
			this
		}
	}),
	o.tileLayer.wms=function(t,
	e){
		returnnewo.TileLayer.WMS(t,
		e)
	},
	o.TileLayer.Canvas=o.TileLayer.extend({
		options: {
			async: !1
		},
		initialize: function(t){
			o.setOptions(this,
			t)
		},
		redraw: function(){
			this._map&&(this._reset({
				hard: !0
			}),
			this._update());for(vartinthis._tiles)this._redrawTile(this._tiles[t]);returnthis
		},
		_redrawTile: function(t){
			this.drawTile(t,
			t._tilePoint,
			this._map._zoom)
		},
		_createTile: function(){
			vart=o.DomUtil.create("canvas",
			"leaflet-tile");returnt.width=t.height=this.options.tileSize,
			t.onselectstart=t.onmousemove=o.Util.falseFn,
			t
		},
		_loadTile: function(t,
		e){
			t._layer=this,
			t._tilePoint=e,
			this._redrawTile(t),
			this.options.async||this.tileDrawn(t)
		},
		drawTile: function(){
			
		},
		tileDrawn: function(t){
			this._tileOnLoad.call(t)
		}
	}),
	o.tileLayer.canvas=function(t){
		returnnewo.TileLayer.Canvas(t)
	},
	o.ImageOverlay=o.Class.extend({
		includes: o.Mixin.Events,
		options: {
			opacity: 1
		},
		initialize: function(t,
		e,
		i){
			this._url=t,
			this._bounds=o.latLngBounds(e),
			o.setOptions(this,
			i)
		},
		onAdd: function(t){
			this._map=t,
			this._image||this._initImage(),
			t._panes.overlayPane.appendChild(this._image),
			t.on("viewreset",
			this._reset,
			this),
			t.options.zoomAnimation&&o.Browser.any3d&&t.on("zoomanim",
			this._animateZoom,
			this),
			this._reset()
		},
		onRemove: function(t){
			t.getPanes().overlayPane.removeChild(this._image),
			t.off("viewreset",
			this._reset,
			this),
			t.options.zoomAnimation&&t.off("zoomanim",
			this._animateZoom,
			this)
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		setOpacity: function(t){
			returnthis.options.opacity=t,
			this._updateOpacity(),
			this
		},
		bringToFront: function(){
			returnthis._image&&this._map._panes.overlayPane.appendChild(this._image),
			this
		},
		bringToBack: function(){
			vart=this._map._panes.overlayPane;returnthis._image&&t.insertBefore(this._image,
			t.firstChild),
			this
		},
		setUrl: function(t){
			this._url=t,
			this._image.src=this._url
		},
		getAttribution: function(){
			returnthis.options.attribution
		},
		_initImage: function(){
			this._image=o.DomUtil.create("img",
			"leaflet-image-layer"),
			this._map.options.zoomAnimation&&o.Browser.any3d?o.DomUtil.addClass(this._image,
			"leaflet-zoom-animated"): o.DomUtil.addClass(this._image,
			"leaflet-zoom-hide"),
			this._updateOpacity(),
			o.extend(this._image,
			{
				galleryimg: "no",
				onselectstart: o.Util.falseFn,
				onmousemove: o.Util.falseFn,
				onload: o.bind(this._onImageLoad,
				this),
				src: this._url
			})
		},
		_animateZoom: function(t){
			vare=this._map,
			i=this._image,
			n=e.getZoomScale(t.zoom),
			s=this._bounds.getNorthWest(),
			a=this._bounds.getSouthEast(),
			r=e._latLngToNewLayerPoint(s,
			t.zoom,
			t.center),
			h=e._latLngToNewLayerPoint(a,
			t.zoom,
			t.center)._subtract(r),
			l=r._add(h._multiplyBy(.5*(1-1/n)));i.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(l)+" scale("+n+") "
		},
		_reset: function(){
			vart=this._image,
			e=this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			i=this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);o.DomUtil.setPosition(t,
			e),
			t.style.width=i.x+"px",
			t.style.height=i.y+"px"
		},
		_onImageLoad: function(){
			this.fire("load")
		},
		_updateOpacity: function(){
			o.DomUtil.setOpacity(this._image,
			this.options.opacity)
		}
	}),
	o.imageOverlay=function(t,
	e,
	i){
		returnnewo.ImageOverlay(t,
		e,
		i)
	},
	o.Icon=o.Class.extend({
		options: {
			className: ""
		},
		initialize: function(t){
			o.setOptions(this,
			t)
		},
		createIcon: function(t){
			returnthis._createIcon("icon",
			t)
		},
		createShadow: function(t){
			returnthis._createIcon("shadow",
			t)
		},
		_createIcon: function(t,
		e){
			vari=this._getIconUrl(t);if(!i){
				if("icon"===t)thrownewError("iconUrl not set in Icon options (see the docs).");returnnull
			}varn;returnn=e&&"IMG"===e.tagName?this._createImg(i,
			e): this._createImg(i),
			this._setIconStyles(n,
			t),
			n
		},
		_setIconStyles: function(t,
		e){
			vari,
			n=this.options,
			s=o.point(n[e+"Size"]);i=o.point("shadow"===e?n.shadowAnchor||n.iconAnchor: n.iconAnchor),
			!i&&s&&(i=s.divideBy(2,
			!0)),
			t.className="leaflet-marker-"+e+" "+n.className,
			i&&(t.style.marginLeft=-i.x+"px",
			t.style.marginTop=-i.y+"px"),
			s&&(t.style.width=s.x+"px",
			t.style.height=s.y+"px")
		},
		_createImg: function(t,
		i){
			returni=i||e.createElement("img"),
			i.src=t,
			i
		},
		_getIconUrl: function(t){
			returno.Browser.retina&&this.options[t+"RetinaUrl"]?this.options[t+"RetinaUrl"]: this.options[t+"Url"]
		}
	}),
	o.icon=function(t){
		returnnewo.Icon(t)
	},
	o.Icon.Default=o.Icon.extend({
		options: {
			iconSize: [25,
			41],
			iconAnchor: [12,
			41],
			popupAnchor: [1,
			-34],
			shadowSize: [41,
			41]
		},
		_getIconUrl: function(t){
			vare=t+"Url";if(this.options[e])returnthis.options[e];o.Browser.retina&&"icon"===t&&(t+="-2x");vari=o.Icon.Default.imagePath;if(!i)thrownewError("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");returni+"/marker-"+t+".png"
		}
	}),
	o.Icon.Default.imagePath=function(){
		vart,
		i,
		n,
		o,
		s,
		a=e.getElementsByTagName("script"),
		r=/[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;for(t=0,
		i=a.length;i>t;t++)if(n=a[t].src,
		o=n.match(r))returns=n.split(r)[0],
		(s?s+"/": "")+"images"
	}(),
	o.Marker=o.Class.extend({
		includes: o.Mixin.Events,
		options: {
			icon: newo.Icon.Default,
			title: "",
			alt: "",
			clickable: !0,
			draggable: !1,
			keyboard: !0,
			zIndexOffset: 0,
			opacity: 1,
			riseOnHover: !1,
			riseOffset: 250
		},
		initialize: function(t,
		e){
			o.setOptions(this,
			e),
			this._latlng=o.latLng(t)
		},
		onAdd: function(t){
			this._map=t,
			t.on("viewreset",
			this.update,
			this),
			this._initIcon(),
			this.update(),
			this.fire("add"),
			t.options.zoomAnimation&&t.options.markerZoomAnimation&&t.on("zoomanim",
			this._animateZoom,
			this)
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		onRemove: function(t){
			this.dragging&&this.dragging.disable(),
			this._removeIcon(),
			this._removeShadow(),
			this.fire("remove"),
			t.off({
				viewreset: this.update,
				zoomanim: this._animateZoom
			},
			this),
			this._map=null
		},
		getLatLng: function(){
			returnthis._latlng
		},
		setLatLng: function(t){
			returnthis._latlng=o.latLng(t),
			this.update(),
			this.fire("move",
			{
				latlng: this._latlng
			})
		},
		setZIndexOffset: function(t){
			returnthis.options.zIndexOffset=t,
			this.update(),
			this
		},
		setIcon: function(t){
			returnthis.options.icon=t,
			this._map&&(this._initIcon(),
			this.update()),
			this._popup&&this.bindPopup(this._popup),
			this
		},
		update: function(){
			if(this._icon){
				vart=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)
			}returnthis
		},
		_initIcon: function(){
			vart=this.options,
			e=this._map,
			i=e.options.zoomAnimation&&e.options.markerZoomAnimation,
			n=i?"leaflet-zoom-animated": "leaflet-zoom-hide",
			s=t.icon.createIcon(this._icon),
			a=!1;s!==this._icon&&(this._icon&&this._removeIcon(),
			a=!0,
			t.title&&(s.title=t.title),
			t.alt&&(s.alt=t.alt)),
			o.DomUtil.addClass(s,
			n),
			t.keyboard&&(s.tabIndex="0"),
			this._icon=s,
			this._initInteraction(),
			t.riseOnHover&&o.DomEvent.on(s,
			"mouseover",
			this._bringToFront,
			this).on(s,
			"mouseout",
			this._resetZIndex,
			this);varr=t.icon.createShadow(this._shadow),
			h=!1;r!==this._shadow&&(this._removeShadow(),
			h=!0),
			r&&o.DomUtil.addClass(r,
			n),
			this._shadow=r,
			t.opacity<1&&this._updateOpacity();varl=this._map._panes;a&&l.markerPane.appendChild(this._icon),
			r&&h&&l.shadowPane.appendChild(this._shadow)
		},
		_removeIcon: function(){
			this.options.riseOnHover&&o.DomEvent.off(this._icon,
			"mouseover",
			this._bringToFront).off(this._icon,
			"mouseout",
			this._resetZIndex),
			this._map._panes.markerPane.removeChild(this._icon),
			this._icon=null
		},
		_removeShadow: function(){
			this._shadow&&this._map._panes.shadowPane.removeChild(this._shadow),
			this._shadow=null
		},
		_setPos: function(t){
			o.DomUtil.setPosition(this._icon,
			t),
			this._shadow&&o.DomUtil.setPosition(this._shadow,
			t),
			this._zIndex=t.y+this.options.zIndexOffset,
			this._resetZIndex()
		},
		_updateZIndex: function(t){
			this._icon.style.zIndex=this._zIndex+t
		},
		_animateZoom: function(t){
			vare=this._map._latLngToNewLayerPoint(this._latlng,
			t.zoom,
			t.center).round();this._setPos(e)
		},
		_initInteraction: function(){
			if(this.options.clickable){
				vart=this._icon,
				e=["dblclick",
				"mousedown",
				"mouseover",
				"mouseout",
				"contextmenu"];o.DomUtil.addClass(t,
				"leaflet-clickable"),
				o.DomEvent.on(t,
				"click",
				this._onMouseClick,
				this),
				o.DomEvent.on(t,
				"keypress",
				this._onKeyPress,
				this);for(vari=0;i<e.length;i++)o.DomEvent.on(t,
				e[i],
				this._fireMouseEvent,
				this);o.Handler.MarkerDrag&&(this.dragging=newo.Handler.MarkerDrag(this),
				this.options.draggable&&this.dragging.enable())
			}
		},
		_onMouseClick: function(t){
			vare=this.dragging&&this.dragging.moved();(this.hasEventListeners(t.type)||e)&&o.DomEvent.stopPropagation(t),
			e||(this.dragging&&this.dragging._enabled||!this._map.dragging||!this._map.dragging.moved())&&this.fire(t.type,
			{
				originalEvent: t,
				latlng: this._latlng
			})
		},
		_onKeyPress: function(t){
			13===t.keyCode&&this.fire("click",
			{
				originalEvent: t,
				latlng: this._latlng
			})
		},
		_fireMouseEvent: function(t){
			this.fire(t.type,
			{
				originalEvent: t,
				latlng: this._latlng
			}),
			"contextmenu"===t.type&&this.hasEventListeners(t.type)&&o.DomEvent.preventDefault(t),
			"mousedown"!==t.type?o.DomEvent.stopPropagation(t): o.DomEvent.preventDefault(t)
		},
		setOpacity: function(t){
			returnthis.options.opacity=t,
			this._map&&this._updateOpacity(),
			this
		},
		_updateOpacity: function(){
			o.DomUtil.setOpacity(this._icon,
			this.options.opacity),
			this._shadow&&o.DomUtil.setOpacity(this._shadow,
			this.options.opacity)
		},
		_bringToFront: function(){
			this._updateZIndex(this.options.riseOffset)
		},
		_resetZIndex: function(){
			this._updateZIndex(0)
		}
	}),
	o.marker=function(t,
	e){
		returnnewo.Marker(t,
		e)
	},
	o.DivIcon=o.Icon.extend({
		options: {
			iconSize: [12,
			12],
			className: "leaflet-div-icon",
			html: !1
		},
		createIcon: function(t){
			vari=t&&"DIV"===t.tagName?t: e.createElement("div"),
			n=this.options;returni.innerHTML=n.html!==!1?n.html: "",
			n.bgPos&&(i.style.backgroundPosition=-n.bgPos.x+"px "+-n.bgPos.y+"px"),
			this._setIconStyles(i,
			"icon"),
			i
		},
		createShadow: function(){
			returnnull
		}
	}),
	o.divIcon=function(t){
		returnnewo.DivIcon(t)
	},
	o.Map.mergeOptions({
		closePopupOnClick: !0
	}),
	o.Popup=o.Class.extend({
		includes: o.Mixin.Events,
		options: {
			minWidth: 50,
			maxWidth: 300,
			autoPan: !0,
			closeButton: !0,
			offset: [0,
			7],
			autoPanPadding: [5,
			5],
			keepInView: !1,
			className: "",
			zoomAnimation: !0
		},
		initialize: function(t,
		e){
			o.setOptions(this,
			t),
			this._source=e,
			this._animated=o.Browser.any3d&&this.options.zoomAnimation,
			this._isOpen=!1
		},
		onAdd: function(t){
			this._map=t,
			this._container||this._initLayout();vare=t.options.fadeAnimation;e&&o.DomUtil.setOpacity(this._container,
			0),
			t._panes.popupPane.appendChild(this._container),
			t.on(this._getEvents(),
			this),
			this.update(),
			e&&o.DomUtil.setOpacity(this._container,
			1),
			this.fire("open"),
			t.fire("popupopen",
			{
				popup: this
			}),
			this._source&&this._source.fire("popupopen",
			{
				popup: this
			})
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		openOn: function(t){
			returnt.openPopup(this),
			this
		},
		onRemove: function(t){
			t._panes.popupPane.removeChild(this._container),
			o.Util.falseFn(this._container.offsetWidth),
			t.off(this._getEvents(),
			this),
			t.options.fadeAnimation&&o.DomUtil.setOpacity(this._container,
			0),
			this._map=null,
			this.fire("close"),
			t.fire("popupclose",
			{
				popup: this
			}),
			this._source&&this._source.fire("popupclose",
			{
				popup: this
			})
		},
		getLatLng: function(){
			returnthis._latlng
		},
		setLatLng: function(t){
			returnthis._latlng=o.latLng(t),
			this._map&&(this._updatePosition(),
			this._adjustPan()),
			this
		},
		getContent: function(){
			returnthis._content
		},
		setContent: function(t){
			returnthis._content=t,
			this.update(),
			this
		},
		update: function(){
			this._map&&(this._container.style.visibility="hidden",
			this._updateContent(),
			this._updateLayout(),
			this._updatePosition(),
			this._container.style.visibility="",
			this._adjustPan())
		},
		_getEvents: function(){
			vart={
				viewreset: this._updatePosition
			};returnthis._animated&&(t.zoomanim=this._zoomAnimation),
			("closeOnClick"inthis.options?this.options.closeOnClick: this._map.options.closePopupOnClick)&&(t.preclick=this._close),
			this.options.keepInView&&(t.moveend=this._adjustPan),
			t
		},
		_close: function(){
			this._map&&this._map.closePopup(this)
		},
		_initLayout: function(){
			vart,
			e="leaflet-popup",
			i=e+" "+this.options.className+" leaflet-zoom-"+(this._animated?"animated": "hide"),
			n=this._container=o.DomUtil.create("div",
			i);this.options.closeButton&&(t=this._closeButton=o.DomUtil.create("a",
			e+"-close-button",
			n),
			t.href="#close",
			t.innerHTML="&#215;",
			o.DomEvent.disableClickPropagation(t),
			o.DomEvent.on(t,
			"click",
			this._onCloseButtonClick,
			this));vars=this._wrapper=o.DomUtil.create("div",
			e+"-content-wrapper",
			n);o.DomEvent.disableClickPropagation(s),
			this._contentNode=o.DomUtil.create("div",
			e+"-content",
			s),
			o.DomEvent.disableScrollPropagation(this._contentNode),
			o.DomEvent.on(s,
			"contextmenu",
			o.DomEvent.stopPropagation),
			this._tipContainer=o.DomUtil.create("div",
			e+"-tip-container",
			n),
			this._tip=o.DomUtil.create("div",
			e+"-tip",
			this._tipContainer)
		},
		_updateContent: function(){
			if(this._content){
				if("string"==typeofthis._content)this._contentNode.innerHTML=this._content;else{
					for(;this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);this._contentNode.appendChild(this._content)
				}this.fire("contentupdate")
			}
		},
		_updateLayout: function(){
			vart=this._contentNode,
			e=t.style;e.width="",
			e.whiteSpace="nowrap";vari=t.offsetWidth;i=Math.min(i,
			this.options.maxWidth),
			i=Math.max(i,
			this.options.minWidth),
			e.width=i+1+"px",
			e.whiteSpace="",
			e.height="";varn=t.offsetHeight,
			s=this.options.maxHeight,
			a="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",
			o.DomUtil.addClass(t,
			a)): o.DomUtil.removeClass(t,
			a),
			this._containerWidth=this._container.offsetWidth
		},
		_updatePosition: function(){
			if(this._map){
				vart=this._map.latLngToLayerPoint(this._latlng),
				e=this._animated,
				i=o.point(this.options.offset);e&&o.DomUtil.setPosition(this._container,
				t),
				this._containerBottom=-i.y-(e?0: t.y),
				this._containerLeft=-Math.round(this._containerWidth/2)+i.x+(e?0: t.x),
				this._container.style.bottom=this._containerBottom+"px",
				this._container.style.left=this._containerLeft+"px"
			}
		},
		_zoomAnimation: function(t){
			vare=this._map._latLngToNewLayerPoint(this._latlng,
			t.zoom,
			t.center);o.DomUtil.setPosition(this._container,
			e)
		},
		_adjustPan: function(){
			if(this.options.autoPan){
				vart=this._map,
				e=this._container.offsetHeight,
				i=this._containerWidth,
				n=newo.Point(this._containerLeft,
				-e-this._containerBottom);this._animated&&n._add(o.DomUtil.getPosition(this._container));vars=t.layerPointToContainerPoint(n),
				a=o.point(this.options.autoPanPadding),
				r=o.point(this.options.autoPanPaddingTopLeft||a),
				h=o.point(this.options.autoPanPaddingBottomRight||a),
				l=t.getSize(),
				u=0,
				c=0;s.x+i+h.x>l.x&&(u=s.x+i-l.x+h.x),
				s.x-u-r.x<0&&(u=s.x-r.x),
				s.y+e+h.y>l.y&&(c=s.y+e-l.y+h.y),
				s.y-c-r.y<0&&(c=s.y-r.y),
				(u||c)&&t.fire("autopanstart").panBy([u,
				c])
			}
		},
		_onCloseButtonClick: function(t){
			this._close(),
			o.DomEvent.stop(t)
		}
	}),
	o.popup=function(t,
	e){
		returnnewo.Popup(t,
		e)
	},
	o.Map.include({
		openPopup: function(t,
		e,
		i){
			if(this.closePopup(),
			!(tinstanceofo.Popup)){
				varn=t;t=newo.Popup(i).setLatLng(e).setContent(n)
			}returnt._isOpen=!0,
			this._popup=t,
			this.addLayer(t)
		},
		closePopup: function(t){
			returnt&&t!==this._popup||(t=this._popup,
			this._popup=null),
			t&&(this.removeLayer(t),
			t._isOpen=!1),
			this
		}
	}),
	o.Marker.include({
		openPopup: function(){
			returnthis._popup&&this._map&&!this._map.hasLayer(this._popup)&&(this._popup.setLatLng(this._latlng),
			this._map.openPopup(this._popup)),
			this
		},
		closePopup: function(){
			returnthis._popup&&this._popup._close(),
			this
		},
		togglePopup: function(){
			returnthis._popup&&(this._popup._isOpen?this.closePopup(): this.openPopup()),
			this
		},
		bindPopup: function(t,
		e){
			vari=o.point(this.options.icon.options.popupAnchor||[0,
			0]);returni=i.add(o.Popup.prototype.options.offset),
			e&&e.offset&&(i=i.add(e.offset)),
			e=o.extend({
				offset: i
			},
			e),
			this._popupHandlersAdded||(this.on("click",
			this.togglePopup,
			this).on("remove",
			this.closePopup,
			this).on("move",
			this._movePopup,
			this),
			this._popupHandlersAdded=!0),
			tinstanceofo.Popup?(o.setOptions(t,
			e),
			this._popup=t): this._popup=newo.Popup(e,
			this).setContent(t),
			this
		},
		setPopupContent: function(t){
			returnthis._popup&&this._popup.setContent(t),
			this
		},
		unbindPopup: function(){
			returnthis._popup&&(this._popup=null,
			this.off("click",
			this.togglePopup,
			this).off("remove",
			this.closePopup,
			this).off("move",
			this._movePopup,
			this),
			this._popupHandlersAdded=!1),
			this
		},
		getPopup: function(){
			returnthis._popup
		},
		_movePopup: function(t){
			this._popup.setLatLng(t.latlng)
		}
	}),
	o.LayerGroup=o.Class.extend({
		initialize: function(t){
			this._layers={
				
			};vare,
			i;if(t)for(e=0,
			i=t.length;i>e;e++)this.addLayer(t[e])
		},
		addLayer: function(t){
			vare=this.getLayerId(t);returnthis._layers[e]=t,
			this._map&&this._map.addLayer(t),
			this
		},
		removeLayer: function(t){
			vare=tinthis._layers?t: this.getLayerId(t);returnthis._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),
			deletethis._layers[e],
			this
		},
		hasLayer: function(t){
			returnt?tinthis._layers||this.getLayerId(t)inthis._layers: !1
		},
		clearLayers: function(){
			returnthis.eachLayer(this.removeLayer,
			this),
			this
		},
		invoke: function(t){
			vare,
			i,
			n=Array.prototype.slice.call(arguments,
			1);for(einthis._layers)i=this._layers[e],
			i[t]&&i[t].apply(i,
			n);returnthis
		},
		onAdd: function(t){
			this._map=t,
			this.eachLayer(t.addLayer,
			t)
		},
		onRemove: function(t){
			this.eachLayer(t.removeLayer,
			t),
			this._map=null
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		eachLayer: function(t,
		e){
			for(variinthis._layers)t.call(e,
			this._layers[i]);returnthis
		},
		getLayer: function(t){
			returnthis._layers[t]
		},
		getLayers: function(){
			vart=[];for(vareinthis._layers)t.push(this._layers[e]);returnt
		},
		setZIndex: function(t){
			returnthis.invoke("setZIndex",
			t)
		},
		getLayerId: function(t){
			returno.stamp(t)
		}
	}),
	o.layerGroup=function(t){
		returnnewo.LayerGroup(t)
	},
	o.FeatureGroup=o.LayerGroup.extend({
		includes: o.Mixin.Events,
		statics: {
			EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
		},
		addLayer: function(t){
			returnthis.hasLayer(t)?this: ("on"int&&t.on(o.FeatureGroup.EVENTS,
			this._propagateEvent,
			this),
			o.LayerGroup.prototype.addLayer.call(this,
			t),
			this._popupContent&&t.bindPopup&&t.bindPopup(this._popupContent,
			this._popupOptions),
			this.fire("layeradd",
			{
				layer: t
			}))
		},
		removeLayer: function(t){
			returnthis.hasLayer(t)?(tinthis._layers&&(t=this._layers[t]),
			t.off(o.FeatureGroup.EVENTS,
			this._propagateEvent,
			this),
			o.LayerGroup.prototype.removeLayer.call(this,
			t),
			this._popupContent&&this.invoke("unbindPopup"),
			this.fire("layerremove",
			{
				layer: t
			})): this
		},
		bindPopup: function(t,
		e){
			returnthis._popupContent=t,
			this._popupOptions=e,
			this.invoke("bindPopup",
			t,
			e)
		},
		openPopup: function(t){
			for(vareinthis._layers){
				this._layers[e].openPopup(t);break
			}returnthis
		},
		setStyle: function(t){
			returnthis.invoke("setStyle",
			t)
		},
		bringToFront: function(){
			returnthis.invoke("bringToFront")
		},
		bringToBack: function(){
			returnthis.invoke("bringToBack")
		},
		getBounds: function(){
			vart=newo.LatLngBounds;returnthis.eachLayer(function(e){
				t.extend(einstanceofo.Marker?e.getLatLng(): e.getBounds())
			}),
			t
		},
		_propagateEvent: function(t){
			t=o.extend({
				layer: t.target,
				target: this
			},
			t),
			this.fire(t.type,
			t)
		}
	}),
	o.featureGroup=function(t){
		returnnewo.FeatureGroup(t)
	},
	o.Path=o.Class.extend({
		includes: [o.Mixin.Events],
		statics: {
			CLIP_PADDING: function(){
				vare=o.Browser.mobile?1280: 2e3,
				i=(e/Math.max(t.outerWidth,
				t.outerHeight)-1)/2;returnMath.max(0,
				Math.min(.5,
				i))
			}()
		},
		options: {
			stroke: !0,
			color: "#d44698",
			dashArray: null,
			lineCap: null,
			lineJoin: null,
			weight: 2,
			opacity: .5,
			fill: !1,
			fillColor: null,
			fillOpacity: .2,
			clickable: !0
		},
		initialize: function(t){
			o.setOptions(this,
			t)
		},
		onAdd: function(t){
			this._map=t,
			this._container||(this._initElements(),
			this._initEvents()),
			this.projectLatlngs(),
			this._updatePath(),
			this._container&&this._map._pathRoot.appendChild(this._container),
			this.fire("add"),
			t.on({
				viewreset: this.projectLatlngs,
				moveend: this._updatePath
			},
			this)
		},
		addTo: function(t){
			returnt.addLayer(this),
			this
		},
		onRemove: function(t){
			t._pathRoot.removeChild(this._container),
			this.fire("remove"),
			this._map=null,
			o.Browser.vml&&(this._container=null,
			this._stroke=null,
			this._fill=null),
			t.off({
				viewreset: this.projectLatlngs,
				moveend: this._updatePath
			},
			this)
		},
		projectLatlngs: function(){
			
		},
		setStyle: function(t){
			returno.setOptions(this,
			t),
			this._container&&this._updateStyle(),
			this
		},
		redraw: function(){
			returnthis._map&&(this.projectLatlngs(),
			this._updatePath()),
			this
		}
	}),
	o.Map.include({
		_updatePathViewport: function(){
			vart=o.Path.CLIP_PADDING,
			e=this.getSize(),
			i=o.DomUtil.getPosition(this._mapPane),
			n=i.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
			s=n.add(e.multiplyBy(1+2*t)._round());this._pathViewport=newo.Bounds(n,
			s)
		}
	}),
	o.Path.SVG_NS="http://www.w3.org/2000/svg",
	o.Browser.svg=!(!e.createElementNS||!e.createElementNS(o.Path.SVG_NS,
	"svg").createSVGRect),
	o.Path=o.Path.extend({
		statics: {
			SVG: o.Browser.svg
		},
		bringToFront: function(){
			vart=this._map._pathRoot,
			e=this._container;returne&&t.lastChild!==e&&t.appendChild(e),
			this
		},
		bringToBack: function(){
			vart=this._map._pathRoot,
			e=this._container,
			i=t.firstChild;returne&&i!==e&&t.insertBefore(e,
			i),
			this
		},
		getPathString: function(){
			
		},
		_createElement: function(t){
			returne.createElementNS(o.Path.SVG_NS,
			t)
		},
		_initElements: function(){
			this._map._initPathRoot(),
			this._initPath(),
			this._initStyle()
		},
		_initPath: function(){
			this._container=this._createElement("g"),
			this._path=this._createElement("path"),
			this.options.className&&o.DomUtil.addClass(this._path,
			this.options.className),
			this._container.appendChild(this._path)
		},
		_initStyle: function(){
			this.options.stroke&&(this._path.setAttribute("stroke-linejoin",
			"round"),
			this._path.setAttribute("stroke-linecap",
			"round")),
			this.options.fill&&this._path.setAttribute("fill-rule",
			"evenodd"),
			this.options.pointerEvents&&this._path.setAttribute("pointer-events",
			this.options.pointerEvents),
			this.options.clickable||this.options.pointerEvents||this._path.setAttribute("pointer-events",
			"none"),
			this._updateStyle()
		},
		_updateStyle: function(){
			this.options.stroke?(this._path.setAttribute("stroke",
			this.options.color),
			this._path.setAttribute("stroke-opacity",
			this.options.opacity),
			this._path.setAttribute("stroke-width",
			this.options.weight),
			this.options.dashArray?this._path.setAttribute("stroke-dasharray",
			this.options.dashArray): this._path.removeAttribute("stroke-dasharray"),
			this.options.lineCap&&this._path.setAttribute("stroke-linecap",
			this.options.lineCap),
			this.options.lineJoin&&this._path.setAttribute("stroke-linejoin",
			this.options.lineJoin)): this._path.setAttribute("stroke",
			"none"),
			this.options.fill?(this._path.setAttribute("fill",
			this.options.fillColor||this.options.color),
			this._path.setAttribute("fill-opacity",
			this.options.fillOpacity)): this._path.setAttribute("fill",
			"none")
		},
		_updatePath: function(){
			vart=this.getPathString();t||(t="M0 0"),
			this._path.setAttribute("d",
			t)
		},
		_initEvents: function(){
			if(this.options.clickable){
				(o.Browser.svg||!o.Browser.vml)&&o.DomUtil.addClass(this._path,
				"leaflet-clickable"),
				o.DomEvent.on(this._container,
				"click",
				this._onMouseClick,
				this);for(vart=["dblclick",
				"mousedown",
				"mouseover",
				"mouseout",
				"mousemove",
				"contextmenu"],
				e=0;e<t.length;e++)o.DomEvent.on(this._container,
				t[e],
				this._fireMouseEvent,
				this)
			}
		},
		_onMouseClick: function(t){
			this._map.dragging&&this._map.dragging.moved()||this._fireMouseEvent(t)
		},
		_fireMouseEvent: function(t){
			if(this.hasEventListeners(t.type)){
				vare=this._map,
				i=e.mouseEventToContainerPoint(t),
				n=e.containerPointToLayerPoint(i),
				s=e.layerPointToLatLng(n);this.fire(t.type,
				{
					latlng: s,
					layerPoint: n,
					containerPoint: i,
					originalEvent: t
				}),
				"contextmenu"===t.type&&o.DomEvent.preventDefault(t),
				"mousemove"!==t.type&&o.DomEvent.stopPropagation(t)
			}
		}
	}),
	o.Map.include({
		_initPathRoot: function(){
			this._pathRoot||(this._pathRoot=o.Path.prototype._createElement("svg"),
			this._panes.overlayPane.appendChild(this._pathRoot),
			this.options.zoomAnimation&&o.Browser.any3d?(o.DomUtil.addClass(this._pathRoot,
			"leaflet-zoom-animated"),
			this.on({
				zoomanim: this._animatePathZoom,
				zoomend: this._endPathZoom
			})): o.DomUtil.addClass(this._pathRoot,
			"leaflet-zoom-hide"),
			this.on("moveend",
			this._updateSvgViewport),
			this._updateSvgViewport())
		},
		_animatePathZoom: function(t){
			vare=this.getZoomScale(t.zoom),
			i=this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);this._pathRoot.style[o.DomUtil.TRANSFORM]=o.DomUtil.getTranslateString(i)+" scale("+e+") ",
			this._pathZooming=!0
		},
		_endPathZoom: function(){
			this._pathZooming=!1
		},
		_updateSvgViewport: function(){
			if(!this._pathZooming){
				this._updatePathViewport();vart=this._pathViewport,
				e=t.min,
				i=t.max,
				n=i.x-e.x,
				s=i.y-e.y,
				a=this._pathRoot,
				r=this._panes.overlayPane;o.Browser.mobileWebkit&&r.removeChild(a),
				o.DomUtil.setPosition(a,
				e),
				a.setAttribute("width",
				n),
				a.setAttribute("height",
				s),
				a.setAttribute("viewBox",
				[e.x,
				e.y,
				n,
				s].join(" ")),
				o.Browser.mobileWebkit&&r.appendChild(a)
			}
		}
	}),
	o.Path.include({
		bindPopup: function(t,
		e){
			returntinstanceofo.Popup?this._popup=t: ((!this._popup||e)&&(this._popup=newo.Popup(e,
			this)),
			this._popup.setContent(t)),
			this._popupHandlersAdded||(this.on("click",
			this._openPopup,
			this).on("remove",
			this.closePopup,
			this),
			this._popupHandlersAdded=!0),
			this
		},
		unbindPopup: function(){
			returnthis._popup&&(this._popup=null,
			this.off("click",
			this._openPopup).off("remove",
			this.closePopup),
			this._popupHandlersAdded=!1),
			this
		},
		openPopup: function(t){
			returnthis._popup&&(t=t||this._latlng||this._latlngs[Math.floor(this._latlngs.length/2)],
			this._openPopup({
				latlng: t
			})),
			this
		},
		closePopup: function(){
			returnthis._popup&&this._popup._close(),
			this
		},
		_openPopup: function(t){
			this._popup.setLatLng(t.latlng),
			this._map.openPopup(this._popup)
		}
	}),
	o.Browser.vml=!o.Browser.svg&&function(){
		try{
			vart=e.createElement("div");t.innerHTML='<v: shapeadj="1"/>';vari=t.firstChild;returni.style.behavior="url(#default#VML)",
			i&&"object"==typeofi.adj
		}catch(n){
			return!1
		}
	}(),
	o.Path=o.Browser.svg||!o.Browser.vml?o.Path: o.Path.extend({
		statics: {
			VML: !0,
			CLIP_PADDING: .02
		},
		_createElement: function(){
			try{
				returne.namespaces.add("lvml",
				"urn:schemas-microsoft-com:vml"),
				function(t){
					returne.createElement("<lvml:"+t+'class="lvml">')
				}
			}catch(t){
				returnfunction(t){
					returne.createElement("<"+t+'xmlns="urn:schemas-microsoft.com:vml"class="lvml">')
				}
			}
		}(),
		_initPath: function(){
			vart=this._container=this._createElement("shape");o.DomUtil.addClass(t,
			"leaflet-vml-shape"+(this.options.className?" "+this.options.className: "")),
			this.options.clickable&&o.DomUtil.addClass(t,
			"leaflet-clickable"),
			t.coordsize="1 1",
			this._path=this._createElement("path"),
			t.appendChild(this._path),
			this._map._pathRoot.appendChild(t)
		},
		_initStyle: function(){
			this._updateStyle()
		},
		_updateStyle: function(){
			vart=this._stroke,
			e=this._fill,
			i=this.options,
			n=this._container;n.stroked=i.stroke,
			n.filled=i.fill,
			i.stroke?(t||(t=this._stroke=this._createElement("stroke"),
			t.endcap="round",
			n.appendChild(t)),
			t.weight=i.weight+"px",
			t.color=i.color,
			t.opacity=i.opacity,
			t.dashStyle=i.dashArray?o.Util.isArray(i.dashArray)?i.dashArray.join(" "): i.dashArray.replace(/(*,
			*)/g,
			" "): "",
			i.lineCap&&(t.endcap=i.lineCap.replace("butt",
			"flat")),
			i.lineJoin&&(t.joinstyle=i.lineJoin)): t&&(n.removeChild(t),
			this._stroke=null),
			i.fill?(e||(e=this._fill=this._createElement("fill"),
			n.appendChild(e)),
			e.color=i.fillColor||i.color,
			e.opacity=i.fillOpacity): e&&(n.removeChild(e),
			this._fill=null)
		},
		_updatePath: function(){
			vart=this._container.style;t.display="none",
			this._path.v=this.getPathString()+" ",
			t.display=""
		}
	}),
	o.Map.include(o.Browser.svg||!o.Browser.vml?{
		
	}: {
		_initPathRoot: function(){
			if(!this._pathRoot){
				vart=this._pathRoot=e.createElement("div");t.className="leaflet-vml-container",
				this._panes.overlayPane.appendChild(t),
				this.on("moveend",
				this._updatePathViewport),
				this._updatePathViewport()
			}
		}
	}),
	o.Browser.canvas=function(){
		return!!e.createElement("canvas").getContext
	}(),
	o.Path=o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?o.Path: o.Path.extend({
		statics: {
			CANVAS: !0,
			SVG: !1
		},
		redraw: function(){
			returnthis._map&&(this.projectLatlngs(),
			this._requestUpdate()),
			this
		},
		setStyle: function(t){
			returno.setOptions(this,
			t),
			this._map&&(this._updateStyle(),
			this._requestUpdate()),
			this
		},
		onRemove: function(t){
			t.off("viewreset",
			this.projectLatlngs,
			this).off("moveend",
			this._updatePath,
			this),
			this.options.clickable&&(this._map.off("click",
			this._onClick,
			this),
			this._map.off("mousemove",
			this._onMouseMove,
			this)),
			this._requestUpdate(),
			this.fire("remove"),
			this._map=null
		},
		_requestUpdate: function(){
			this._map&&!o.Path._updateRequest&&(o.Path._updateRequest=o.Util.requestAnimFrame(this._fireMapMoveEnd,
			this._map))
		},
		_fireMapMoveEnd: function(){
			o.Path._updateRequest=null,
			this.fire("moveend")
		},
		_initElements: function(){
			this._map._initPathRoot(),
			this._ctx=this._map._canvasCtx
		},
		_updateStyle: function(){
			vart=this.options;t.stroke&&(this._ctx.lineWidth=t.weight,
			this._ctx.strokeStyle=t.color),
			t.fill&&(this._ctx.fillStyle=t.fillColor||t.color)
		},
		_drawPath: function(){
			vart,
			e,
			i,
			n,
			s,
			a;for(this._ctx.beginPath(),
			t=0,
			i=this._parts.length;i>t;t++){
				for(e=0,
				n=this._parts[t].length;n>e;e++)s=this._parts[t][e],
				a=(0===e?"move": "line")+"To",
				this._ctx[a](s.x,
				s.y);thisinstanceofo.Polygon&&this._ctx.closePath()
			}
		},
		_checkIfEmpty: function(){
			return!this._parts.length
		},
		_updatePath: function(){
			if(!this._checkIfEmpty()){
				vart=this._ctx,
				e=this.options;this._drawPath(),
				t.save(),
				this._updateStyle(),
				e.fill&&(t.globalAlpha=e.fillOpacity,
				t.fill()),
				e.stroke&&(t.globalAlpha=e.opacity,
				t.stroke()),
				t.restore()
			}
		},
		_initEvents: function(){
			this.options.clickable&&(this._map.on("mousemove",
			this._onMouseMove,
			this),
			this._map.on("click",
			this._onClick,
			this))
		},
		_onClick: function(t){
			this._containsPoint(t.layerPoint)&&this.fire("click",
			t)
		},
		_onMouseMove: function(t){
			this._map&&!this._map._animatingZoom&&(this._containsPoint(t.layerPoint)?(this._ctx.canvas.style.cursor="pointer",
			this._mouseInside=!0,
			this.fire("mouseover",
			t)): this._mouseInside&&(this._ctx.canvas.style.cursor="",
			this._mouseInside=!1,
			this.fire("mouseout",
			t)))
		}
	}),
	o.Map.include(o.Path.SVG&&!t.L_PREFER_CANVAS||!o.Browser.canvas?{
		
	}: {
		_initPathRoot: function(){
			vart,
			i=this._pathRoot;i||(i=this._pathRoot=e.createElement("canvas"),
			i.style.position="absolute",
			t=this._canvasCtx=i.getContext("2d"),
			t.lineCap="round",
			t.lineJoin="round",
			this._panes.overlayPane.appendChild(i),
			this.options.zoomAnimation&&(this._pathRoot.className="leaflet-zoom-animated",
			this.on("zoomanim",
			this._animatePathZoom),
			this.on("zoomend",
			this._endPathZoom)),
			this.on("moveend",
			this._updateCanvasViewport),
			this._updateCanvasViewport())
		},
		_updateCanvasViewport: function(){
			if(!this._pathZooming){
				this._updatePathViewport();vart=this._pathViewport,
				e=t.min,
				i=t.max.subtract(e),
				n=this._pathRoot;o.DomUtil.setPosition(n,
				e),
				n.width=i.x,
				n.height=i.y,
				n.getContext("2d").translate(-e.x,
				-e.y)
			}
		}
	}),
	o.LineUtil={
		simplify: function(t,
		e){
			if(!e||!t.length)returnt.slice();vari=e*e;returnt=this._reducePoints(t,
			i),
			t=this._simplifyDP(t,
			i)
		},
		pointToSegmentDistance: function(t,
		e,
		i){
			returnMath.sqrt(this._sqClosestPointOnSegment(t,
			e,
			i,
			!0))
		},
		closestPointOnSegment: function(t,
		e,
		i){
			returnthis._sqClosestPointOnSegment(t,
			e,
			i)
		},
		_simplifyDP: function(t,
		e){
			varn=t.length,
			o=typeofUint8Array!=i+""?Uint8Array: Array,
			s=newo(n);s[0]=s[n-1]=1,
			this._simplifyDPStep(t,
			s,
			e,
			0,
			n-1);vara,
			r=[];for(a=0;n>a;a++)s[a]&&r.push(t[a]);returnr
		},
		_simplifyDPStep: function(t,
		e,
		i,
		n,
		o){
			vars,
			a,
			r,
			h=0;for(a=n+1;o-1>=a;a++)r=this._sqClosestPointOnSegment(t[a],
			t[n],
			t[o],
			!0),
			r>h&&(s=a,
			h=r);h>i&&(e[s]=1,
			this._simplifyDPStep(t,
			e,
			i,
			n,
			s),
			this._simplifyDPStep(t,
			e,
			i,
			s,
			o))
		},
		_reducePoints: function(t,
		e){
			for(vari=[t[0]],
			n=1,
			o=0,
			s=t.length;s>n;n++)this._sqDist(t[n],
			t[o])>e&&(i.push(t[n]),
			o=n);returns-1>o&&i.push(t[s-1]),
			i
		},
		clipSegment: function(t,
		e,
		i,
		n){
			varo,
			s,
			a,
			r=n?this._lastCode: this._getBitCode(t,
			i),
			h=this._getBitCode(e,
			i);for(this._lastCode=h;;){
				if(!(r|h))return[t,
				e];if(r&h)return!1;o=r||h,
				s=this._getEdgeIntersection(t,
				e,
				o,
				i),
				a=this._getBitCode(s,
				i),
				o===r?(t=s,
				r=a): (e=s,
				h=a)
			}
		},
		_getEdgeIntersection: function(t,
		e,
		i,
		n){
			vars=e.x-t.x,
			a=e.y-t.y,
			r=n.min,
			h=n.max;return8&i?newo.Point(t.x+s*(h.y-t.y)/a,
			h.y): 4&i?newo.Point(t.x+s*(r.y-t.y)/a,
			r.y): 2&i?newo.Point(h.x,
			t.y+a*(h.x-t.x)/s): 1&i?newo.Point(r.x,
			t.y+a*(r.x-t.x)/s): void0
		},
		_getBitCode: function(t,
		e){
			vari=0;returnt.x<e.min.x?i|=1: t.x>e.max.x&&(i|=2),
			t.y<e.min.y?i|=4: t.y>e.max.y&&(i|=8),
			i
		},
		_sqDist: function(t,
		e){
			vari=e.x-t.x,
			n=e.y-t.y;returni*i+n*n
		},
		_sqClosestPointOnSegment: function(t,
		e,
		i,
		n){
			vars,
			a=e.x,
			r=e.y,
			h=i.x-a,
			l=i.y-r,
			u=h*h+l*l;returnu>0&&(s=((t.x-a)*h+(t.y-r)*l)/u,
			s>1?(a=i.x,
			r=i.y): s>0&&(a+=h*s,
			r+=l*s)),
			h=t.x-a,
			l=t.y-r,
			n?h*h+l*l: newo.Point(a,
			r)
		}
	},
	o.Polyline=o.Path.extend({
		initialize: function(t,
		e){
			o.Path.prototype.initialize.call(this,
			e),
			this._latlngs=this._convertLatLngs(t)
		},
		options: {
			smoothFactor: 1,
			noClip: !1
		},
		projectLatlngs: function(){
			this._originalPoints=[];for(vart=0,
			e=this._latlngs.length;e>t;t++)this._originalPoints[t]=this._map.latLngToLayerPoint(this._latlngs[t])
		},
		getPathString: function(){
			for(vart=0,
			e=this._parts.length,
			i="";e>t;t++)i+=this._getPathPartStr(this._parts[t]);returni
		},
		getLatLngs: function(){
			returnthis._latlngs
		},
		setLatLngs: function(t){
			returnthis._latlngs=this._convertLatLngs(t),
			this.redraw()
		},
		addLatLng: function(t){
			returnthis._latlngs.push(o.latLng(t)),
			this.redraw()
		},
		spliceLatLngs: function(){
			vart=[].splice.apply(this._latlngs,
			arguments);returnthis._convertLatLngs(this._latlngs,
			!0),
			this.redraw(),
			t
		},
		closestLayerPoint: function(t){
			for(vare,
			i,
			n=1/0,
			s=this._parts,
			a=null,
			r=0,
			h=s.length;h>r;r++)for(varl=s[r],
			u=1,
			c=l.length;c>u;u++){
				e=l[u-1],
				i=l[u];vard=o.LineUtil._sqClosestPointOnSegment(t,
				e,
				i,
				!0);n>d&&(n=d,
				a=o.LineUtil._sqClosestPointOnSegment(t,
				e,
				i))
			}returna&&(a.distance=Math.sqrt(n)),
			a
		},
		getBounds: function(){
			returnnewo.LatLngBounds(this.getLatLngs())
		},
		_convertLatLngs: function(t,
		e){
			vari,
			n,
			s=e?t: [];for(i=0,
			n=t.length;n>i;i++){
				if(o.Util.isArray(t[i])&&"number"!=typeoft[i][0])return;s[i]=o.latLng(t[i])
			}returns
		},
		_initEvents: function(){
			o.Path.prototype._initEvents.call(this)
		},
		_getPathPartStr: function(t){
			for(vare,
			i=o.Path.VML,
			n=0,
			s=t.length,
			a="";s>n;n++)e=t[n],
			i&&e._round(),
			a+=(n?"L": "M")+e.x+" "+e.y;returna
		},
		_clipPoints: function(){
			vart,
			e,
			i,
			n=this._originalPoints,
			s=n.length;if(this.options.noClip)returnvoid(this._parts=[n]);this._parts=[];vara=this._parts,
			r=this._map._pathViewport,
			h=o.LineUtil;for(t=0,
			e=0;s-1>t;t++)i=h.clipSegment(n[t],
			n[t+1],
			r,
			t),
			i&&(a[e]=a[e]||[],
			a[e].push(i[0]),
			(i[1]!==n[t+1]||t===s-2)&&(a[e].push(i[1]),
			e++))
		},
		_simplifyPoints: function(){
			for(vart=this._parts,
			e=o.LineUtil,
			i=0,
			n=t.length;n>i;i++)t[i]=e.simplify(t[i],
			this.options.smoothFactor)
		},
		_updatePath: function(){
			this._map&&(this._clipPoints(),
			this._simplifyPoints(),
			o.Path.prototype._updatePath.call(this))
		}
	}),
	o.polyline=function(t,
	e){
		returnnewo.Polyline(t,
		e)
	},
	o.PolyUtil={
		
	},
	o.PolyUtil.clipPolygon=function(t,
	e){
		vari,
		n,
		s,
		a,
		r,
		h,
		l,
		u,
		c,
		d=[1,
		4,
		2,
		8],
		p=o.LineUtil;for(n=0,
		l=t.length;l>n;n++)t[n]._code=p._getBitCode(t[n],
		e);for(a=0;4>a;a++){
			for(u=d[a],
			i=[],
			n=0,
			l=t.length,
			s=l-1;l>n;s=n++)r=t[n],
			h=t[s],
			r._code&u?h._code&u||(c=p._getEdgeIntersection(h,
			r,
			u,
			e),
			c._code=p._getBitCode(c,
			e),
			i.push(c)): (h._code&u&&(c=p._getEdgeIntersection(h,
			r,
			u,
			e),
			c._code=p._getBitCode(c,
			e),
			i.push(c)),
			i.push(r));t=i
		}returnt
	},
	o.Polygon=o.Polyline.extend({
		options: {
			fill: !0
		},
		initialize: function(t,
		e){
			o.Polyline.prototype.initialize.call(this,
			t,
			e),
			this._initWithHoles(t)
		},
		_initWithHoles: function(t){
			vare,
			i,
			n;if(t&&o.Util.isArray(t[0])&&"number"!=typeoft[0][0])for(this._latlngs=this._convertLatLngs(t[0]),
			this._holes=t.slice(1),
			e=0,
			i=this._holes.length;i>e;e++)n=this._holes[e]=this._convertLatLngs(this._holes[e]),
			n[0].equals(n[n.length-1])&&n.pop();t=this._latlngs,
			t.length>=2&&t[0].equals(t[t.length-1])&&t.pop()
		},
		projectLatlngs: function(){
			if(o.Polyline.prototype.projectLatlngs.call(this),
			this._holePoints=[],
			this._holes){
				vart,
				e,
				i,
				n;for(t=0,
				i=this._holes.length;i>t;t++)for(this._holePoints[t]=[],
				e=0,
				n=this._holes[t].length;n>e;e++)this._holePoints[t][e]=this._map.latLngToLayerPoint(this._holes[t][e])
			}
		},
		setLatLngs: function(t){
			returnt&&o.Util.isArray(t[0])&&"number"!=typeoft[0][0]?(this._initWithHoles(t),
			this.redraw()): o.Polyline.prototype.setLatLngs.call(this,
			t)
		},
		_clipPoints: function(){
			vart=this._originalPoints,
			e=[];if(this._parts=[t].concat(this._holePoints),
			!this.options.noClip){
				for(vari=0,
				n=this._parts.length;n>i;i++){
					vars=o.PolyUtil.clipPolygon(this._parts[i],
					this._map._pathViewport);s.length&&e.push(s)
				}this._parts=e
			}
		},
		_getPathPartStr: function(t){
			vare=o.Polyline.prototype._getPathPartStr.call(this,
			t);returne+(o.Browser.svg?"z": "x")
		}
	}),
	o.polygon=function(t,
	e){
		returnnewo.Polygon(t,
		e)
	},
	function(){
		functiont(t){
			returno.FeatureGroup.extend({
				initialize: function(t,
				e){
					this._layers={
						
					},
					this._options=e,
					this.setLatLngs(t)
				},
				setLatLngs: function(e){
					vari=0,
					n=e.length;for(this.eachLayer(function(t){
						n>i?t.setLatLngs(e[i++]): this.removeLayer(t)
					},
					this);n>i;)this.addLayer(newt(e[i++],
					this._options));returnthis
				},
				getLatLngs: function(){
					vart=[];returnthis.eachLayer(function(e){
						t.push(e.getLatLngs())
					}),
					t
				}
			})
		}o.MultiPolyline=t(o.Polyline),
		o.MultiPolygon=t(o.Polygon),
		o.multiPolyline=function(t,
		e){
			returnnewo.MultiPolyline(t,
			e)
		},
		o.multiPolygon=function(t,
		e){
			returnnewo.MultiPolygon(t,
			e)
		}
	}(),
	o.Rectangle=o.Polygon.extend({
		initialize: function(t,
		e){
			o.Polygon.prototype.initialize.call(this,
			this._boundsToLatLngs(t),
			e)
		},
		setBounds: function(t){
			this.setLatLngs(this._boundsToLatLngs(t))
		},
		_boundsToLatLngs: function(t){
			returnt=o.latLngBounds(t),
			[t.getSouthWest(),
			t.getNorthWest(),
			t.getNorthEast(),
			t.getSouthEast()]
		}
	}),
	o.rectangle=function(t,
	e){
		returnnewo.Rectangle(t,
		e)
	},
	o.Circle=o.Path.extend({
		initialize: function(t,
		e,
		i){
			o.Path.prototype.initialize.call(this,
			i),
			this._latlng=o.latLng(t),
			this._mRadius=e
		},
		options: {
			fill: !0
		},
		setLatLng: function(t){
			returnthis._latlng=o.latLng(t),
			this.redraw()
		},
		setRadius: function(t){
			returnthis._mRadius=t,
			this.redraw()
		},
		projectLatlngs: function(){
			vart=this._getLngRadius(),
			e=this._latlng,
			i=this._map.latLngToLayerPoint([e.lat,
			e.lng-t]);this._point=this._map.latLngToLayerPoint(e),
			this._radius=Math.max(this._point.x-i.x,
			1)
		},
		getBounds: function(){
			vart=this._getLngRadius(),
			e=this._mRadius/40075017*360,
			i=this._latlng;returnnewo.LatLngBounds([i.lat-e,
			i.lng-t],
			[i.lat+e,
			i.lng+t])
		},
		getLatLng: function(){
			returnthis._latlng
		},
		getPathString: function(){
			vart=this._point,
			e=this._radius;returnthis._checkIfEmpty()?"": o.Browser.svg?"M"+t.x+","+(t.y-e)+"A"+e+","+e+",0,1,1,"+(t.x-.1)+","+(t.y-e)+" z": (t._round(),
			e=Math.round(e),
			"AL "+t.x+","+t.y+" "+e+","+e+" 0,23592600")
		},
		getRadius: function(){
			returnthis._mRadius
		},
		_getLatRadius: function(){
			returnthis._mRadius/40075017*360
		},
		_getLngRadius: function(){
			returnthis._getLatRadius()/Math.cos(o.LatLng.DEG_TO_RAD*this._latlng.lat)
		},
		_checkIfEmpty: function(){
			if(!this._map)return!1;vart=this._map._pathViewport,
			e=this._radius,
			i=this._point;returni.x-e>t.max.x||i.y-e>t.max.y||i.x+e<t.min.x||i.y+e<t.min.y
		}
	}),
	o.circle=function(t,
	e,
	i){
		returnnewo.Circle(t,
		e,
		i)
	},
	o.CircleMarker=o.Circle.extend({
		options: {
			radius: 10,
			weight: 2
		},
		initialize: function(t,
		e){
			o.Circle.prototype.initialize.call(this,
			t,
			null,
			e),
			this._radius=this.options.radius
		},
		projectLatlngs: function(){
			this._point=this._map.latLngToLayerPoint(this._latlng)
		},
		_updateStyle: function(){
			o.Circle.prototype._updateStyle.call(this),
			this.setRadius(this.options.radius)
		},
		setLatLng: function(t){
			returno.Circle.prototype.setLatLng.call(this,
			t),
			this._popup&&this._popup._isOpen&&this._popup.setLatLng(t),
			this
		},
		setRadius: function(t){
			returnthis.options.radius=this._radius=t,
			this.redraw()
		},
		getRadius: function(){
			returnthis._radius
		}
	}),
	o.circleMarker=function(t,
	e){
		returnnewo.CircleMarker(t,
		e)
	},
	o.Polyline.include(o.Path.CANVAS?{
		_containsPoint: function(t,
		e){
			vari,
			n,
			s,
			a,
			r,
			h,
			l,
			u=this.options.weight/2;for(o.Browser.touch&&(u+=10),
			i=0,
			a=this._parts.length;a>i;i++)for(l=this._parts[i],
			n=0,
			r=l.length,
			s=r-1;r>n;s=n++)if((e||0!==n)&&(h=o.LineUtil.pointToSegmentDistance(t,
			l[s],
			l[n]),
			u>=h))return!0;return!1
		}
	}: {
		
	}),
	o.Polygon.include(o.Path.CANVAS?{
		_containsPoint: function(t){
			vare,
			i,
			n,
			s,
			a,
			r,
			h,
			l,
			u=!1;if(o.Polyline.prototype._containsPoint.call(this,
			t,
			!0))return!0;for(s=0,
			h=this._parts.length;h>s;s++)for(e=this._parts[s],
			a=0,
			l=e.length,
			r=l-1;l>a;r=a++)i=e[a],
			n=e[r],
			i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);returnu
		}
	}: {
		
	}),
	o.Circle.include(o.Path.CANVAS?{
		_drawPath: function(){
			vart=this._point;this._ctx.beginPath(),
			this._ctx.arc(t.x,
			t.y,
			this._radius,
			0,
			2*Math.PI,
			!1)
		},
		_containsPoint: function(t){
			vare=this._point,
			i=this.options.stroke?this.options.weight/2: 0;returnt.distanceTo(e)<=this._radius+i
		}
	}: {
		
	}),
	o.CircleMarker.include(o.Path.CANVAS?{
		_updateStyle: function(){
			o.Path.prototype._updateStyle.call(this)
		}
	}: {
		
	}),
	o.GeoJSON=o.FeatureGroup.extend({
		initialize: function(t,
		e){
			o.setOptions(this,
			e),
			this._layers={
				
			},
			t&&this.addData(t)
		},
		addData: function(t){
			vare,
			i,
			n,
			s=o.Util.isArray(t)?t: t.features;if(s){
				for(e=0,
				i=s.length;i>e;e++)n=s[e],
				(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(s[e]);returnthis
			}vara=this.options;if(!a.filter||a.filter(t)){
				varr=o.GeoJSON.geometryToLayer(t,
				a.pointToLayer,
				a.coordsToLatLng,
				a);returnr.feature=o.GeoJSON.asFeature(t),
				r.defaultOptions=r.options,
				this.resetStyle(r),
				a.onEachFeature&&a.onEachFeature(t,
				r),
				this.addLayer(r)
			}
		},
		resetStyle: function(t){
			vare=this.options.style;e&&(o.Util.extend(t.options,
			t.defaultOptions),
			this._setLayerStyle(t,
			e))
		},
		setStyle: function(t){
			this.eachLayer(function(e){
				this._setLayerStyle(e,
				t)
			},
			this)
		},
		_setLayerStyle: function(t,
		e){
			"function"==typeofe&&(e=e(t.feature)),
			t.setStyle&&t.setStyle(e)
		}
	}),
	o.extend(o.GeoJSON,
	{
		geometryToLayer: function(t,
		e,
		i,
		n){
			vars,
			a,
			r,
			h,
			l="Feature"===t.type?t.geometry: t,
			u=l.coordinates,
			c=[];switch(i=i||this.coordsToLatLng,
			l.type){
				case"Point": returns=i(u),
				e?e(t,
				s): newo.Marker(s);case"MultiPoint": for(r=0,
				h=u.length;h>r;r++)s=i(u[r]),
				c.push(e?e(t,
				s): newo.Marker(s));returnnewo.FeatureGroup(c);case"LineString": returna=this.coordsToLatLngs(u,
				0,
				i),
				newo.Polyline(a,
				n);case"Polygon": if(2===u.length&&!u[1].length)thrownewError("Invalid GeoJSON object.");returna=this.coordsToLatLngs(u,
				1,
				i),
				newo.Polygon(a,
				n);case"MultiLineString": returna=this.coordsToLatLngs(u,
				1,
				i),
				newo.MultiPolyline(a,
				n);case"MultiPolygon": returna=this.coordsToLatLngs(u,
				2,
				i),
				newo.MultiPolygon(a,
				n);case"GeometryCollection": for(r=0,
				h=l.geometries.length;h>r;r++)c.push(this.geometryToLayer({
					geometry: l.geometries[r],
					type: "Feature",
					properties: t.properties
				},
				e,
				i,
				n));returnnewo.FeatureGroup(c);default: thrownewError("Invalid GeoJSON object.")
			}
		},
		coordsToLatLng: function(t){
			returnnewo.LatLng(t[1],
			t[0],
			t[2])
		},
		coordsToLatLngs: function(t,
		e,
		i){
			varn,
			o,
			s,
			a=[];for(o=0,
			s=t.length;s>o;o++)n=e?this.coordsToLatLngs(t[o],
			e-1,
			i): (i||this.coordsToLatLng)(t[o]),
			a.push(n);returna
		},
		latLngToCoords: function(t){
			vare=[t.lng,
			t.lat];returnt.alt!==i&&e.push(t.alt),
			e
		},
		latLngsToCoords: function(t){
			for(vare=[],
			i=0,
			n=t.length;n>i;i++)e.push(o.GeoJSON.latLngToCoords(t[i]));returne
		},
		getFeature: function(t,
		e){
			returnt.feature?o.extend({
				
			},
			t.feature,
			{
				geometry: e
			}): o.GeoJSON.asFeature(e)
		},
		asFeature: function(t){
			return"Feature"===t.type?t: {
				type: "Feature",
				properties: {
					
				},
				geometry: t
			}
		}
	});vara={
		toGeoJSON: function(){
			returno.GeoJSON.getFeature(this,
			{
				type: "Point",
				coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
			})
		}
	};o.Marker.include(a),
	o.Circle.include(a),
	o.CircleMarker.include(a),
	o.Polyline.include({
		toGeoJSON: function(){
			returno.GeoJSON.getFeature(this,
			{
				type: "LineString",
				coordinates: o.GeoJSON.latLngsToCoords(this.getLatLngs())
			})
		}
	}),
	o.Polygon.include({
		toGeoJSON: function(){
			vart,
			e,
			i,
			n=[o.GeoJSON.latLngsToCoords(this.getLatLngs())];if(n[0].push(n[0][0]),
			this._holes)for(t=0,
			e=this._holes.length;e>t;t++)i=o.GeoJSON.latLngsToCoords(this._holes[t]),
			i.push(i[0]),
			n.push(i);returno.GeoJSON.getFeature(this,
			{
				type: "Polygon",
				coordinates: n
			})
		}
	}),
	function(){
		functiont(t){
			returnfunction(){
				vare=[];returnthis.eachLayer(function(t){
					e.push(t.toGeoJSON().geometry.coordinates)
				}),
				o.GeoJSON.getFeature(this,
				{
					type: t,
					coordinates: e
				})
			}
		}o.MultiPolyline.include({
			toGeoJSON: t("MultiLineString")
		}),
		o.MultiPolygon.include({
			toGeoJSON: t("MultiPolygon")
		}),
		o.LayerGroup.include({
			toGeoJSON: function(){
				vare,
				i=this.feature&&this.feature.geometry,
				n=[];if(i&&"MultiPoint"===i.type)returnt("MultiPoint").call(this);vars=i&&"GeometryCollection"===i.type;returnthis.eachLayer(function(t){
					t.toGeoJSON&&(e=t.toGeoJSON(),
					n.push(s?e.geometry: o.GeoJSON.asFeature(e)))
				}),
				s?o.GeoJSON.getFeature(this,
				{
					geometries: n,
					type: "GeometryCollection"
				}): {
					type: "FeatureCollection",
					features: n
				}
			}
		})
	}(),
	o.geoJson=function(t,
	e){
		returnnewo.GeoJSON(t,
		e)
	},
	o.DomEvent={
		addListener: function(t,
		e,
		i,
		n){
			vars,
			a,
			r,
			h=o.stamp(i),
			l="_leaflet_"+e+h;returnt[l]?this: (s=function(e){
				returni.call(n||t,
				e||o.DomEvent._getEvent())
			},
			o.Browser.pointer&&0===e.indexOf("touch")?this.addPointerListener(t,
			e,
			s,
			h): (o.Browser.touch&&"dblclick"===e&&this.addDoubleTapListener&&this.addDoubleTapListener(t,
			s,
			h),
			"addEventListener"int?"mousewheel"===e?(t.addEventListener("DOMMouseScroll",
			s,
			!1),
			t.addEventListener(e,
			s,
			!1)): "mouseenter"===e||"mouseleave"===e?(a=s,
			r="mouseenter"===e?"mouseover": "mouseout",
			s=function(e){
				returno.DomEvent._checkMouse(t,
				e)?a(e): void0
			},
			t.addEventListener(r,
			s,
			!1)): "click"===e&&o.Browser.android?(a=s,
			s=function(t){
				returno.DomEvent._filterClick(t,
				a)
			},
			t.addEventListener(e,
			s,
			!1)): t.addEventListener(e,
			s,
			!1): "attachEvent"int&&t.attachEvent("on"+e,
			s),
			t[l]=s,
			this))
		},
		removeListener: function(t,
		e,
		i){
			varn=o.stamp(i),
			s="_leaflet_"+e+n,
			a=t[s];returna?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,
			e,
			n): o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,
			n): "removeEventListener"int?"mousewheel"===e?(t.removeEventListener("DOMMouseScroll",
			a,
			!1),
			t.removeEventListener(e,
			a,
			!1)): "mouseenter"===e||"mouseleave"===e?t.removeEventListener("mouseenter"===e?"mouseover": "mouseout",
			a,
			!1): t.removeEventListener(e,
			a,
			!1): "detachEvent"int&&t.detachEvent("on"+e,
			a),
			t[s]=null,
			this): this
		},
		stopPropagation: function(t){
			returnt.stopPropagation?t.stopPropagation(): t.cancelBubble=!0,
			o.DomEvent._skipped(t),
			this
		},
		disableScrollPropagation: function(t){
			vare=o.DomEvent.stopPropagation;returno.DomEvent.on(t,
			"mousewheel",
			e).on(t,
			"MozMousePixelScroll",
			e)
		},
		disableClickPropagation: function(t){
			for(vare=o.DomEvent.stopPropagation,
			i=o.Draggable.START.length-1;i>=0;i--)o.DomEvent.on(t,
			o.Draggable.START[i],
			e);returno.DomEvent.on(t,
			"click",
			o.DomEvent._fakeStop).on(t,
			"dblclick",
			e)
		},
		preventDefault: function(t){
			returnt.preventDefault?t.preventDefault(): t.returnValue=!1,
			this
		},
		stop: function(t){
			returno.DomEvent.preventDefault(t).stopPropagation(t)
		},
		getMousePosition: function(t,
		e){
			if(!e)returnnewo.Point(t.clientX,
			t.clientY);vari=e.getBoundingClientRect();returnnewo.Point(t.clientX-i.left-e.clientLeft,
			t.clientY-i.top-e.clientTop)
		},
		getWheelDelta: function(t){
			vare=0;returnt.wheelDelta&&(e=t.wheelDelta/120),
			t.detail&&(e=-t.detail/3),
			e
		},
		_skipEvents: {
			
		},
		_fakeStop: function(t){
			o.DomEvent._skipEvents[t.type]=!0
		},
		_skipped: function(t){
			vare=this._skipEvents[t.type];returnthis._skipEvents[t.type]=!1,
			e
		},
		_checkMouse: function(t,
		e){
			vari=e.relatedTarget;if(!i)return!0;try{
				for(;i&&i!==t;)i=i.parentNode
			}catch(n){
				return!1
			}returni!==t
		},
		_getEvent: function(){
			vare=t.event;if(!e)for(vari=arguments.callee.caller;i&&(e=i.arguments[0],
			!e||t.Event!==e.constructor);)i=i.caller;returne
		},
		_filterClick: function(t,
		e){
			vari=t.timeStamp||t.originalEvent.timeStamp,
			n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;returnn&&n>100&&500>n||t.target._simulatedClick&&!t._simulated?voido.DomEvent.stop(t): (o.DomEvent._lastClick=i,
			e(t))
		}
	},
	o.DomEvent.on=o.DomEvent.addListener,
	o.DomEvent.off=o.DomEvent.removeListener,
	o.Draggable=o.Class.extend({
		includes: o.Mixin.Events,
		statics: {
			START: o.Browser.touch?["touchstart",
			"mousedown"]: ["mousedown"],
			END: {
				mousedown: "mouseup",
				touchstart: "touchend",
				pointerdown: "touchend",
				MSPointerDown: "touchend"
			},
			MOVE: {
				mousedown: "mousemove",
				touchstart: "touchmove",
				pointerdown: "touchmove",
				MSPointerDown: "touchmove"
			}
		},
		initialize: function(t,
		e){
			this._element=t,
			this._dragStartTarget=e||t
		},
		enable: function(){
			if(!this._enabled){
				for(vart=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.on(this._dragStartTarget,
				o.Draggable.START[t],
				this._onDown,
				this);this._enabled=!0
			}
		},
		disable: function(){
			if(this._enabled){
				for(vart=o.Draggable.START.length-1;t>=0;t--)o.DomEvent.off(this._dragStartTarget,
				o.Draggable.START[t],
				this._onDown,
				this);this._enabled=!1,
				this._moved=!1
			}
		},
		_onDown: function(t){
			if(this._moved=!1,
			!(t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(o.DomEvent.stopPropagation(t),
			o.Draggable._disabled||(o.DomUtil.disableImageDrag(),
			o.DomUtil.disableTextSelection(),
			this._moving)))){
				vari=t.touches?t.touches[0]: t;this._startPoint=newo.Point(i.clientX,
				i.clientY),
				this._startPos=this._newPos=o.DomUtil.getPosition(this._element),
				o.DomEvent.on(e,
				o.Draggable.MOVE[t.type],
				this._onMove,
				this).on(e,
				o.Draggable.END[t.type],
				this._onUp,
				this)
			}
		},
		_onMove: function(t){
			if(t.touches&&t.touches.length>1)returnvoid(this._moved=!0);vari=t.touches&&1===t.touches.length?t.touches[0]: t,
			n=newo.Point(i.clientX,
			i.clientY),
			s=n.subtract(this._startPoint);(s.x||s.y)&&(o.Browser.touch&&Math.abs(s.x)+Math.abs(s.y)<3||(o.DomEvent.preventDefault(t),
			this._moved||(this.fire("dragstart"),
			this._moved=!0,
			this._startPos=o.DomUtil.getPosition(this._element).subtract(s),
			o.DomUtil.addClass(e.body,
			"leaflet-dragging"),
			this._lastTarget=t.target||t.srcElement,
			o.DomUtil.addClass(this._lastTarget,
			"leaflet-drag-target")),
			this._newPos=this._startPos.add(s),
			this._moving=!0,
			o.Util.cancelAnimFrame(this._animRequest),
			this._animRequest=o.Util.requestAnimFrame(this._updatePosition,
			this,
			!0,
			this._dragStartTarget)))
		},
		_updatePosition: function(){
			this.fire("predrag"),
			o.DomUtil.setPosition(this._element,
			this._newPos),
			this.fire("drag")
		},
		_onUp: function(){
			o.DomUtil.removeClass(e.body,
			"leaflet-dragging"),
			this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,
			"leaflet-drag-target"),
			this._lastTarget=null);for(vartino.Draggable.MOVE)o.DomEvent.off(e,
			o.Draggable.MOVE[t],
			this._onMove).off(e,
			o.Draggable.END[t],
			this._onUp);o.DomUtil.enableImageDrag(),
			o.DomUtil.enableTextSelection(),
			this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),
			this.fire("dragend",
			{
				distance: this._newPos.distanceTo(this._startPos)
			})),
			this._moving=!1
		}
	}),
	o.Handler=o.Class.extend({
		initialize: function(t){
			this._map=t
		},
		enable: function(){
			this._enabled||(this._enabled=!0,
			this.addHooks())
		},
		disable: function(){
			this._enabled&&(this._enabled=!1,
			this.removeHooks())
		},
		enabled: function(){
			return!!this._enabled
		}
	}),
	o.Map.mergeOptions({
		dragging: !0,
		inertia: !o.Browser.android23,
		inertiaDeceleration: 3400,
		inertiaMaxSpeed: 1/0,
		inertiaThreshold: o.Browser.touch?32: 18,
		easeLinearity: .25,
		worldCopyJump: !1
	}),
	o.Map.Drag=o.Handler.extend({
		addHooks: function(){
			if(!this._draggable){
				vart=this._map;this._draggable=newo.Draggable(t._mapPane,
				t._container),
				this._draggable.on({
					dragstart: this._onDragStart,
					drag: this._onDrag,
					dragend: this._onDragEnd
				},
				this),
				t.options.worldCopyJump&&(this._draggable.on("predrag",
				this._onPreDrag,
				this),
				t.on("viewreset",
				this._onViewReset,
				this),
				t.whenReady(this._onViewReset,
				this))
			}this._draggable.enable()
		},
		removeHooks: function(){
			this._draggable.disable()
		},
		moved: function(){
			returnthis._draggable&&this._draggable._moved
		},
		_onDragStart: function(){
			vart=this._map;t._panAnim&&t._panAnim.stop(),
			t.fire("movestart").fire("dragstart"),
			t.options.inertia&&(this._positions=[],
			this._times=[])
		},
		_onDrag: function(){
			if(this._map.options.inertia){
				vart=this._lastTime=+newDate,
				e=this._lastPos=this._draggable._newPos;this._positions.push(e),
				this._times.push(t),
				t-this._times[0]>200&&(this._positions.shift(),
				this._times.shift())
			}this._map.fire("move").fire("drag")
		},
		_onViewReset: function(){
			vart=this._map.getSize()._divideBy(2),
			e=this._map.latLngToLayerPoint([0,
			0]);this._initialWorldOffset=e.subtract(t).x,
			this._worldWidth=this._map.project([0,
			180]).x
		},
		_onPreDrag: function(){
			vart=this._worldWidth,
			e=Math.round(t/2),
			i=this._initialWorldOffset,
			n=this._draggable._newPos.x,
			o=(n-e+i)%t+e-i,
			s=(n+e+i)%t-e-i,
			a=Math.abs(o+i)<Math.abs(s+i)?o: s;this._draggable._newPos.x=a
		},
		_onDragEnd: function(t){
			vare=this._map,
			i=e.options,
			n=+newDate-this._lastTime,
			s=!i.inertia||n>i.inertiaThreshold||!this._positions[0];if(e.fire("dragend",
			t),
			s)e.fire("moveend");else{
				vara=this._lastPos.subtract(this._positions[0]),
				r=(this._lastTime+n-this._times[0])/1e3,
				h=i.easeLinearity,
				l=a.multiplyBy(h/r),
				u=l.distanceTo([0,
				0]),
				c=Math.min(i.inertiaMaxSpeed,
				u),
				d=l.multiplyBy(c/u),
				p=c/(i.inertiaDeceleration*h),
				_=d.multiplyBy(-p/2).round();_.x&&_.y?(_=e._limitOffset(_,
				e.options.maxBounds),
				o.Util.requestAnimFrame(function(){
					e.panBy(_,
					{
						duration: p,
						easeLinearity: h,
						noMoveStart: !0
					})
				})): e.fire("moveend")
			}
		}
	}),
	o.Map.addInitHook("addHandler",
	"dragging",
	o.Map.Drag),
	o.Map.mergeOptions({
		doubleClickZoom: !0
	}),
	o.Map.DoubleClickZoom=o.Handler.extend({
		addHooks: function(){
			this._map.on("dblclick",
			this._onDoubleClick,
			this)
		},
		removeHooks: function(){
			this._map.off("dblclick",
			this._onDoubleClick,
			this)
		},
		_onDoubleClick: function(t){
			vare=this._map,
			i=e.getZoom()+(t.originalEvent.shiftKey?-1: 1);"center"===e.options.doubleClickZoom?e.setZoom(i): e.setZoomAround(t.containerPoint,
			i)
		}
	}),
	o.Map.addInitHook("addHandler",
	"doubleClickZoom",
	o.Map.DoubleClickZoom),
	o.Map.mergeOptions({
		scrollWheelZoom: !0
	}),
	o.Map.ScrollWheelZoom=o.Handler.extend({
		addHooks: function(){
			o.DomEvent.on(this._map._container,
			"mousewheel",
			this._onWheelScroll,
			this),
			o.DomEvent.on(this._map._container,
			"MozMousePixelScroll",
			o.DomEvent.preventDefault),
			this._delta=0
		},
		removeHooks: function(){
			o.DomEvent.off(this._map._container,
			"mousewheel",
			this._onWheelScroll),
			o.DomEvent.off(this._map._container,
			"MozMousePixelScroll",
			o.DomEvent.preventDefault)
		},
		_onWheelScroll: function(t){
			vare=o.DomEvent.getWheelDelta(t);this._delta+=e,
			this._lastMousePos=this._map.mouseEventToContainerPoint(t),
			this._startTime||(this._startTime=+newDate);vari=Math.max(40-(+newDate-this._startTime),
			0);clearTimeout(this._timer),
			this._timer=setTimeout(o.bind(this._performZoom,
			this),
			i),
			o.DomEvent.preventDefault(t),
			o.DomEvent.stopPropagation(t)
		},
		_performZoom: function(){
			vart=this._map,
			e=this._delta,
			i=t.getZoom();e=e>0?Math.ceil(e): Math.floor(e),
			e=Math.max(Math.min(e,
			4),
			-4),
			e=t._limitZoom(i+e)-i,
			this._delta=0,
			this._startTime=null,
			e&&("center"===t.options.scrollWheelZoom?t.setZoom(i+e): t.setZoomAround(this._lastMousePos,
			i+e))
		}
	}),
	o.Map.addInitHook("addHandler",
	"scrollWheelZoom",
	o.Map.ScrollWheelZoom),
	o.extend(o.DomEvent,
	{
		_touchstart: o.Browser.msPointer?"MSPointerDown": o.Browser.pointer?"pointerdown": "touchstart",
		_touchend: o.Browser.msPointer?"MSPointerUp": o.Browser.pointer?"pointerup": "touchend",
		addDoubleTapListener: function(t,
		i,
		n){
			functions(t){
				vare;if(o.Browser.pointer?(_.push(t.pointerId),
				e=_.length): e=t.touches.length,
				!(e>1)){
					vari=Date.now(),
					n=i-(r||i);h=t.touches?t.touches[0]: t,
					l=n>0&&u>=n,
					r=i
				}
			}functiona(t){
				if(o.Browser.pointer){
					vare=_.indexOf(t.pointerId);if(-1===e)return;_.splice(e,
					1)
				}if(l){
					if(o.Browser.pointer){
						varn,
						s={
							
						};for(varainh)n=h[a],
						s[a]="function"==typeofn?n.bind(h): n;h=s
					}h.type="dblclick",
					i(h),
					r=null
				}
			}varr,
			h,
			l=!1,
			u=250,
			c="_leaflet_",
			d=this._touchstart,
			p=this._touchend,
			_=[];t[c+d+n]=s,
			t[c+p+n]=a;varm=o.Browser.pointer?e.documentElement: t;returnt.addEventListener(d,
			s,
			!1),
			m.addEventListener(p,
			a,
			!1),
			o.Browser.pointer&&m.addEventListener(o.DomEvent.POINTER_CANCEL,
			a,
			!1),
			this
		},
		removeDoubleTapListener: function(t,
		i){
			varn="_leaflet_";returnt.removeEventListener(this._touchstart,
			t[n+this._touchstart+i],
			!1),
			(o.Browser.pointer?e.documentElement: t).removeEventListener(this._touchend,
			t[n+this._touchend+i],
			!1),
			o.Browser.pointer&&e.documentElement.removeEventListener(o.DomEvent.POINTER_CANCEL,
			t[n+this._touchend+i],
			!1),
			this
		}
	}),
	o.extend(o.DomEvent,
	{
		POINTER_DOWN: o.Browser.msPointer?"MSPointerDown": "pointerdown",
		POINTER_MOVE: o.Browser.msPointer?"MSPointerMove": "pointermove",
		POINTER_UP: o.Browser.msPointer?"MSPointerUp": "pointerup",
		POINTER_CANCEL: o.Browser.msPointer?"MSPointerCancel": "pointercancel",
		_pointers: [],
		_pointerDocumentListener: !1,
		addPointerListener: function(t,
		e,
		i,
		n){
			switch(e){
				case"touchstart": returnthis.addPointerListenerStart(t,
				e,
				i,
				n);case"touchend": returnthis.addPointerListenerEnd(t,
				e,
				i,
				n);case"touchmove": returnthis.addPointerListenerMove(t,
				e,
				i,
				n);default: throw"Unknown touch event type"
			}
		},
		addPointerListenerStart: function(t,
		i,
		n,
		s){
			vara="_leaflet_",
			r=this._pointers,
			h=function(t){
				o.DomEvent.preventDefault(t);for(vare=!1,
				i=0;i<r.length;i++)if(r[i].pointerId===t.pointerId){
					e=!0;break
				}e||r.push(t),
				t.touches=r.slice(),
				t.changedTouches=[t],
				n(t)
			};if(t[a+"touchstart"+s]=h,
			t.addEventListener(this.POINTER_DOWN,
			h,
			!1),
			!this._pointerDocumentListener){
				varl=function(t){
					for(vare=0;e<r.length;e++)if(r[e].pointerId===t.pointerId){
						r.splice(e,
						1);break
					}
				};e.documentElement.addEventListener(this.POINTER_UP,
				l,
				!1),
				e.documentElement.addEventListener(this.POINTER_CANCEL,
				l,
				!1),
				this._pointerDocumentListener=!0
			}returnthis
		},
		addPointerListenerMove: function(t,
		e,
		i,
		n){
			functiono(t){
				if(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons){
					for(vare=0;e<a.length;e++)if(a[e].pointerId===t.pointerId){
						a[e]=t;break
					}t.touches=a.slice(),
					t.changedTouches=[t],
					i(t)
				}
			}vars="_leaflet_",
			a=this._pointers;returnt[s+"touchmove"+n]=o,
			t.addEventListener(this.POINTER_MOVE,
			o,
			!1),
			this
		},
		addPointerListenerEnd: function(t,
		e,
		i,
		n){
			varo="_leaflet_",
			s=this._pointers,
			a=function(t){
				for(vare=0;e<s.length;e++)if(s[e].pointerId===t.pointerId){
					s.splice(e,
					1);break
				}t.touches=s.slice(),
				t.changedTouches=[t],
				i(t)
			};returnt[o+"touchend"+n]=a,
			t.addEventListener(this.POINTER_UP,
			a,
			!1),
			t.addEventListener(this.POINTER_CANCEL,
			a,
			!1),
			this
		},
		removePointerListener: function(t,
		e,
		i){
			varn="_leaflet_",
			o=t[n+e+i];switch(e){
				case"touchstart": t.removeEventListener(this.POINTER_DOWN,
				o,
				!1);break;case"touchmove": t.removeEventListener(this.POINTER_MOVE,
				o,
				!1);break;case"touchend": t.removeEventListener(this.POINTER_UP,
				o,
				!1),
				t.removeEventListener(this.POINTER_CANCEL,
				o,
				!1)
			}returnthis
		}
	}),
	o.Map.mergeOptions({
		touchZoom: o.Browser.touch&&!o.Browser.android23,
		bounceAtZoomLimits: !0
	}),
	o.Map.TouchZoom=o.Handler.extend({
		addHooks: function(){
			o.DomEvent.on(this._map._container,
			"touchstart",
			this._onTouchStart,
			this)
		},
		removeHooks: function(){
			o.DomEvent.off(this._map._container,
			"touchstart",
			this._onTouchStart,
			this)
		},
		_onTouchStart: function(t){
			vari=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){
				varn=i.mouseEventToLayerPoint(t.touches[0]),
				s=i.mouseEventToLayerPoint(t.touches[1]),
				a=i._getCenterLayerPoint();this._startCenter=n.add(s)._divideBy(2),
				this._startDist=n.distanceTo(s),
				this._moved=!1,
				this._zooming=!0,
				this._centerOffset=a.subtract(this._startCenter),
				i._panAnim&&i._panAnim.stop(),
				o.DomEvent.on(e,
				"touchmove",
				this._onTouchMove,
				this).on(e,
				"touchend",
				this._onTouchEnd,
				this),
				o.DomEvent.preventDefault(t)
			}
		},
		_onTouchMove: function(t){
			vare=this._map;if(t.touches&&2===t.touches.length&&this._zooming){
				vari=e.mouseEventToLayerPoint(t.touches[0]),
				n=e.mouseEventToLayerPoint(t.touches[1]);this._scale=i.distanceTo(n)/this._startDist,
				this._delta=i._add(n)._divideBy(2)._subtract(this._startCenter),
				1!==this._scale&&(e.options.bounceAtZoomLimits||!(e.getZoom()===e.getMinZoom()&&this._scale<1||e.getZoom()===e.getMaxZoom()&&this._scale>1))&&(this._moved||(o.DomUtil.addClass(e._mapPane,
				"leaflet-touching"),
				e.fire("movestart").fire("zoomstart"),
				this._moved=!0),
				o.Util.cancelAnimFrame(this._animRequest),
				this._animRequest=o.Util.requestAnimFrame(this._updateOnMove,
				this,
				!0,
				this._map._container),
				o.DomEvent.preventDefault(t))
			}
		},
		_updateOnMove: function(){
			vart=this._map,
			e=this._getScaleOrigin(),
			i=t.layerPointToLatLng(e),
			n=t.getScaleZoom(this._scale);t._animateZoom(i,
			n,
			this._startCenter,
			this._scale,
			this._delta,
			!1,
			!0)
		},
		_onTouchEnd: function(){
			if(!this._moved||!this._zooming)returnvoid(this._zooming=!1);vart=this._map;this._zooming=!1,
			o.DomUtil.removeClass(t._mapPane,
			"leaflet-touching"),
			o.Util.cancelAnimFrame(this._animRequest),
			o.DomEvent.off(e,
			"touchmove",
			this._onTouchMove).off(e,
			"touchend",
			this._onTouchEnd);vari=this._getScaleOrigin(),
			n=t.layerPointToLatLng(i),
			s=t.getZoom(),
			a=t.getScaleZoom(this._scale)-s,
			r=a>0?Math.ceil(a): Math.floor(a),
			h=t._limitZoom(s+r),
			l=t.getZoomScale(h)/this._scale;t._animateZoom(n,
			h,
			i,
			l)
		},
		_getScaleOrigin: function(){
			vart=this._centerOffset.subtract(this._delta).divideBy(this._scale);returnthis._startCenter.add(t)
		}
	}),
	o.Map.addInitHook("addHandler",
	"touchZoom",
	o.Map.TouchZoom),
	o.Map.mergeOptions({
		tap: !0,
		tapTolerance: 15
	}),
	o.Map.Tap=o.Handler.extend({
		addHooks: function(){
			o.DomEvent.on(this._map._container,
			"touchstart",
			this._onDown,
			this)
		},
		removeHooks: function(){
			o.DomEvent.off(this._map._container,
			"touchstart",
			this._onDown,
			this)
		},
		_onDown: function(t){
			if(t.touches){
				if(o.DomEvent.preventDefault(t),
				this._fireClick=!0,
				t.touches.length>1)returnthis._fireClick=!1,
				voidclearTimeout(this._holdTimeout);vari=t.touches[0],
				n=i.target;this._startPos=this._newPos=newo.Point(i.clientX,
				i.clientY),
				n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,
				"leaflet-active"),
				this._holdTimeout=setTimeout(o.bind(function(){
					this._isTapValid()&&(this._fireClick=!1,
					this._onUp(),
					this._simulateEvent("contextmenu",
					i))
				},
				this),
				1e3),
				o.DomEvent.on(e,
				"touchmove",
				this._onMove,
				this).on(e,
				"touchend",
				this._onUp,
				this)
			}
		},
		_onUp: function(t){
			if(clearTimeout(this._holdTimeout),
			o.DomEvent.off(e,
			"touchmove",
			this._onMove,
			this).off(e,
			"touchend",
			this._onUp,
			this),
			this._fireClick&&t&&t.changedTouches){
				vari=t.changedTouches[0],
				n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,
				"leaflet-active"),
				this._isTapValid()&&this._simulateEvent("click",
				i)
			}
		},
		_isTapValid: function(){
			returnthis._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance
		},
		_onMove: function(t){
			vare=t.touches[0];this._newPos=newo.Point(e.clientX,
			e.clientY)
		},
		_simulateEvent: function(i,
		n){
			varo=e.createEvent("MouseEvents");o._simulated=!0,
			n.target._simulatedClick=!0,
			o.initMouseEvent(i,
			!0,
			!0,
			t,
			1,
			n.screenX,
			n.screenY,
			n.clientX,
			n.clientY,
			!1,
			!1,
			!1,
			!1,
			0,
			null),
			n.target.dispatchEvent(o)
		}
	}),
	o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler",
	"tap",
	o.Map.Tap),
	o.Map.mergeOptions({
		boxZoom: !0
	}),
	o.Map.BoxZoom=o.Handler.extend({
		initialize: function(t){
			this._map=t,
			this._container=t._container,
			this._pane=t._panes.overlayPane,
			this._moved=!1
		},
		addHooks: function(){
			o.DomEvent.on(this._container,
			"mousedown",
			this._onMouseDown,
			this)
		},
		removeHooks: function(){
			o.DomEvent.off(this._container,
			"mousedown",
			this._onMouseDown),
			this._moved=!1
		},
		moved: function(){
			returnthis._moved
		},
		_onMouseDown: function(t){
			returnthis._moved=!1,
			!t.shiftKey||1!==t.which&&1!==t.button?!1: (o.DomUtil.disableTextSelection(),
			o.DomUtil.disableImageDrag(),
			this._startLayerPoint=this._map.mouseEventToLayerPoint(t),
			voido.DomEvent.on(e,
			"mousemove",
			this._onMouseMove,
			this).on(e,
			"mouseup",
			this._onMouseUp,
			this).on(e,
			"keydown",
			this._onKeyDown,
			this))
		},
		_onMouseMove: function(t){
			this._moved||(this._box=o.DomUtil.create("div",
			"leaflet-zoom-box",
			this._pane),
			o.DomUtil.setPosition(this._box,
			this._startLayerPoint),
			this._container.style.cursor="crosshair",
			this._map.fire("boxzoomstart"));vare=this._startLayerPoint,
			i=this._box,
			n=this._map.mouseEventToLayerPoint(t),
			s=n.subtract(e),
			a=newo.Point(Math.min(n.x,
			e.x),
			Math.min(n.y,
			e.y));o.DomUtil.setPosition(i,
			a),
			this._moved=!0,
			i.style.width=Math.max(0,
			Math.abs(s.x)-4)+"px",
			i.style.height=Math.max(0,
			Math.abs(s.y)-4)+"px"
		},
		_finish: function(){
			this._moved&&(this._pane.removeChild(this._box),
			this._container.style.cursor=""),
			o.DomUtil.enableTextSelection(),
			o.DomUtil.enableImageDrag(),
			o.DomEvent.off(e,
			"mousemove",
			this._onMouseMove).off(e,
			"mouseup",
			this._onMouseUp).off(e,
			"keydown",
			this._onKeyDown)
		},
		_onMouseUp: function(t){
			this._finish();vare=this._map,
			i=e.mouseEventToLayerPoint(t);if(!this._startLayerPoint.equals(i)){
				varn=newo.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint),
				e.layerPointToLatLng(i));e.fitBounds(n),
				e.fire("boxzoomend",
				{
					boxZoomBounds: n
				})
			}
		},
		_onKeyDown: function(t){
			27===t.keyCode&&this._finish()
		}
	}),
	o.Map.addInitHook("addHandler",
	"boxZoom",
	o.Map.BoxZoom),
	o.Map.mergeOptions({
		keyboard: !0,
		keyboardPanOffset: 80,
		keyboardZoomOffset: 1
	}),
	o.Map.Keyboard=o.Handler.extend({
		keyCodes: {
			left: [37],
			right: [39],
			down: [40],
			up: [38],
			zoomIn: [187,
			107,
			61,
			171],
			zoomOut: [189,
			109,
			173]
		},
		initialize: function(t){
			this._map=t,
			this._setPanOffset(t.options.keyboardPanOffset),
			this._setZoomOffset(t.options.keyboardZoomOffset)
		},
		addHooks: function(){
			vart=this._map._container;-1===t.tabIndex&&(t.tabIndex="0"),
			o.DomEvent.on(t,
			"focus",
			this._onFocus,
			this).on(t,
			"blur",
			this._onBlur,
			this).on(t,
			"mousedown",
			this._onMouseDown,
			this),
			this._map.on("focus",
			this._addHooks,
			this).on("blur",
			this._removeHooks,
			this)
		},
		removeHooks: function(){
			this._removeHooks();vart=this._map._container;o.DomEvent.off(t,
			"focus",
			this._onFocus,
			this).off(t,
			"blur",
			this._onBlur,
			this).off(t,
			"mousedown",
			this._onMouseDown,
			this),
			this._map.off("focus",
			this._addHooks,
			this).off("blur",
			this._removeHooks,
			this)
		},
		_onMouseDown: function(){
			if(!this._focused){
				vari=e.body,
				n=e.documentElement,
				o=i.scrollTop||n.scrollTop,
				s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),
				t.scrollTo(s,
				o)
			}
		},
		_onFocus: function(){
			this._focused=!0,
			this._map.fire("focus")
		},
		_onBlur: function(){
			this._focused=!1,
			this._map.fire("blur")
		},
		_setPanOffset: function(t){
			vare,
			i,
			n=this._panKeys={
				
			},
			o=this.keyCodes;for(e=0,
			i=o.left.length;i>e;e++)n[o.left[e]]=[-1*t,
			0];for(e=0,
			i=o.right.length;i>e;e++)n[o.right[e]]=[t,
			0];for(e=0,
			i=o.down.length;i>e;e++)n[o.down[e]]=[0,
			t];for(e=0,
			i=o.up.length;i>e;e++)n[o.up[e]]=[0,
			-1*t]
		},
		_setZoomOffset: function(t){
			vare,
			i,
			n=this._zoomKeys={
				
			},
			o=this.keyCodes;for(e=0,
			i=o.zoomIn.length;i>e;e++)n[o.zoomIn[e]]=t;for(e=0,
			i=o.zoomOut.length;i>e;e++)n[o.zoomOut[e]]=-t
		},
		_addHooks: function(){
			o.DomEvent.on(e,
			"keydown",
			this._onKeyDown,
			this)
		},
		_removeHooks: function(){
			o.DomEvent.off(e,
			"keydown",
			this._onKeyDown,
			this)
		},
		_onKeyDown: function(t){
			vare=t.keyCode,
			i=this._map;if(einthis._panKeys){
				if(i._panAnim&&i._panAnim._inProgress)return;i.panBy(this._panKeys[e]),
				i.options.maxBounds&&i.panInsideBounds(i.options.maxBounds)
			}else{
				if(!(einthis._zoomKeys))return;i.setZoom(i.getZoom()+this._zoomKeys[e])
			}o.DomEvent.stop(t)
		}
	}),
	o.Map.addInitHook("addHandler",
	"keyboard",
	o.Map.Keyboard),
	o.Handler.MarkerDrag=o.Handler.extend({
		initialize: function(t){
			this._marker=t
		},
		addHooks: function(){
			vart=this._marker._icon;this._draggable||(this._draggable=newo.Draggable(t,
			t)),
			this._draggable.on("dragstart",
			this._onDragStart,
			this).on("drag",
			this._onDrag,
			this).on("dragend",
			this._onDragEnd,
			this),
			this._draggable.enable(),
			o.DomUtil.addClass(this._marker._icon,
			"leaflet-marker-draggable")
		},
		removeHooks: function(){
			this._draggable.off("dragstart",
			this._onDragStart,
			this).off("drag",
			this._onDrag,
			this).off("dragend",
			this._onDragEnd,
			this),
			this._draggable.disable(),
			o.DomUtil.removeClass(this._marker._icon,
			"leaflet-marker-draggable")
		},
		moved: function(){
			returnthis._draggable&&this._draggable._moved
		},
		_onDragStart: function(){
			this._marker.closePopup().fire("movestart").fire("dragstart")
		},
		_onDrag: function(){
			vart=this._marker,
			e=t._shadow,
			i=o.DomUtil.getPosition(t._icon),
			n=t._map.layerPointToLatLng(i);e&&o.DomUtil.setPosition(e,
			i),
			t._latlng=n,
			t.fire("move",
			{
				latlng: n
			}).fire("drag")
		},
		_onDragEnd: function(t){
			this._marker.fire("moveend").fire("dragend",
			t)
		}
	}),
	o.Control=o.Class.extend({
		options: {
			position: "topright"
		},
		initialize: function(t){
			o.setOptions(this,
			t)
		},
		getPosition: function(){
			returnthis.options.position
		},
		setPosition: function(t){
			vare=this._map;returne&&e.removeControl(this),
			this.options.position=t,
			e&&e.addControl(this),
			this
		},
		getContainer: function(){
			returnthis._container
		},
		addTo: function(t){
			this._map=t;vare=this._container=this.onAdd(t),
			i=this.getPosition(),
			n=t._controlCorners[i];returno.DomUtil.addClass(e,
			"leaflet-control"),
			-1!==i.indexOf("bottom")?n.insertBefore(e,
			n.firstChild): n.appendChild(e),
			this
		},
		removeFrom: function(t){
			vare=this.getPosition(),
			i=t._controlCorners[e];returni.removeChild(this._container),
			this._map=null,
			this.onRemove&&this.onRemove(t),
			this
		},
		_refocusOnMap: function(){
			this._map&&this._map.getContainer().focus()
		}
	}),
	o.control=function(t){
		returnnewo.Control(t)
	},
	o.Map.include({
		addControl: function(t){
			returnt.addTo(this),
			this
		},
		removeControl: function(t){
			returnt.removeFrom(this),
			this
		},
		_initControlPos: function(){
			functiont(t,
			s){
				vara=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",
				a,
				n)
			}vare=this._controlCorners={
				
			},
			i="leaflet-",
			n=this._controlContainer=o.DomUtil.create("div",
			i+"control-container",
			this._container);t("top",
			"left"),
			t("top",
			"right"),
			t("bottom",
			"left"),
			t("bottom",
			"right")
		},
		_clearControlPos: function(){
			this._container.removeChild(this._controlContainer)
		}
	}),
	o.Control.Zoom=o.Control.extend({
		options: {
			position: "topleft",
			zoomInText: "+",
			zoomInTitle: "Zoom in",
			zoomOutText: "-",
			zoomOutTitle: "Zoom out"
		},
		onAdd: function(t){
			vare="leaflet-control-zoom",
			i=o.DomUtil.create("div",
			e+" leaflet-bar");returnthis._map=t,
			this._zoomInButton=this._createButton(this.options.zoomInText,
			this.options.zoomInTitle,
			e+"-in",
			i,
			this._zoomIn,
			this),
			this._zoomOutButton=this._createButton(this.options.zoomOutText,
			this.options.zoomOutTitle,
			e+"-out",
			i,
			this._zoomOut,
			this),
			this._updateDisabled(),
			t.on("zoomend zoomlevelschange",
			this._updateDisabled,
			this),
			i
		},
		onRemove: function(t){
			t.off("zoomend zoomlevelschange",
			this._updateDisabled,
			this)
		},
		_zoomIn: function(t){
			this._map.zoomIn(t.shiftKey?3: 1)
		},
		_zoomOut: function(t){
			this._map.zoomOut(t.shiftKey?3: 1)
		},
		_createButton: function(t,
		e,
		i,
		n,
		s,
		a){
			varr=o.DomUtil.create("a",
			i,
			n);r.innerHTML=t,
			r.href="#",
			r.title=e;varh=o.DomEvent.stopPropagation;returno.DomEvent.on(r,
			"click",
			h).on(r,
			"mousedown",
			h).on(r,
			"dblclick",
			h).on(r,
			"click",
			o.DomEvent.preventDefault).on(r,
			"click",
			s,
			a).on(r,
			"click",
			this._refocusOnMap,
			a),
			r
		},
		_updateDisabled: function(){
			vart=this._map,
			e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,
			e),
			o.DomUtil.removeClass(this._zoomOutButton,
			e),
			t._zoom===t.getMinZoom()&&o.DomUtil.addClass(this._zoomOutButton,
			e),
			t._zoom===t.getMaxZoom()&&o.DomUtil.addClass(this._zoomInButton,
			e)
		}
	}),
	o.Map.mergeOptions({
		zoomControl: !0
	}),
	o.Map.addInitHook(function(){
		this.options.zoomControl&&(this.zoomControl=newo.Control.Zoom,
		this.addControl(this.zoomControl))
	}),
	o.control.zoom=function(t){
		returnnewo.Control.Zoom(t)
	},
	o.Control.Attribution=o.Control.extend({
		options: {
			position: "bottomright",
			prefix: '<ahref="http://leafletjs.com"title="A JS library for interactive maps">Leaflet</a>'
		},
		initialize: function(t){
			o.setOptions(this,
			t),
			this._attributions={
				
			}
		},
		onAdd: function(t){
			this._container=o.DomUtil.create("div",
			"leaflet-control-attribution"),
			o.DomEvent.disableClickPropagation(this._container);for(vareint._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());returnt.on("layeradd",
			this._onLayerAdd,
			this).on("layerremove",
			this._onLayerRemove,
			this),
			this._update(),
			this._container
		},
		onRemove: function(t){
			t.off("layeradd",
			this._onLayerAdd).off("layerremove",
			this._onLayerRemove)
		},
		setPrefix: function(t){
			returnthis.options.prefix=t,
			this._update(),
			this
		},
		addAttribution: function(t){
			returnt?(this._attributions[t]||(this._attributions[t]=0),
			this._attributions[t]++,
			this._update(),
			this): void0
		},
		removeAttribution: function(t){
			returnt?(this._attributions[t]&&(this._attributions[t]--,
			this._update()),
			this): void0
		},
		_update: function(){
			if(this._map){
				vart=[];for(vareinthis._attributions)this._attributions[e]&&t.push(e);vari=[];this.options.prefix&&i.push(this.options.prefix),
				t.length&&i.push(t.join(", ")),
				this._container.innerHTML=i.join(" | ")
			}
		},
		_onLayerAdd: function(t){
			t.layer.getAttribution&&this.addAttribution(t.layer.getAttribution())
		},
		_onLayerRemove: function(t){
			t.layer.getAttribution&&this.removeAttribution(t.layer.getAttribution())
		}
	}),
	o.Map.mergeOptions({
		attributionControl: !0
	}),
	o.Map.addInitHook(function(){
		this.options.attributionControl&&(this.attributionControl=(newo.Control.Attribution).addTo(this))
	}),
	o.control.attribution=function(t){
		returnnewo.Control.Attribution(t)
	},
	o.Control.Scale=o.Control.extend({
		options: {
			position: "bottomleft",
			maxWidth: 100,
			metric: !0,
			imperial: !0,
			updateWhenIdle: !1
		},
		onAdd: function(t){
			this._map=t;vare="leaflet-control-scale",
			i=o.DomUtil.create("div",
			e),
			n=this.options;returnthis._addScales(n,
			e,
			i),
			t.on(n.updateWhenIdle?"moveend": "move",
			this._update,
			this),
			t.whenReady(this._update,
			this),
			i
		},
		onRemove: function(t){
			t.off(this.options.updateWhenIdle?"moveend": "move",
			this._update,
			this)
		},
		_addScales: function(t,
		e,
		i){
			t.metric&&(this._mScale=o.DomUtil.create("div",
			e+"-line",
			i)),
			t.imperial&&(this._iScale=o.DomUtil.create("div",
			e+"-line",
			i))
		},
		_update: function(){
			vart=this._map.getBounds(),
			e=t.getCenter().lat,
			i=6378137*Math.PI*Math.cos(e*Math.PI/180),
			n=i*(t.getNorthEast().lng-t.getSouthWest().lng)/180,
			o=this._map.getSize(),
			s=this.options,
			a=0;o.x>0&&(a=n*(s.maxWidth/o.x)),
			this._updateScales(s,
			a)
		},
		_updateScales: function(t,
		e){
			t.metric&&e&&this._updateMetric(e),
			t.imperial&&e&&this._updateImperial(e)
		},
		_updateMetric: function(t){
			vare=this._getRoundNum(t);this._mScale.style.width=this._getScaleWidth(e/t)+"px",
			this._mScale.innerHTML=1e3>e?e+" m": e/1e3+" km"
		},
		_updateImperial: function(t){
			vare,
			i,
			n,
			o=3.2808399*t,
			s=this._iScale;o>5280?(e=o/5280,
			i=this._getRoundNum(e),
			s.style.width=this._getScaleWidth(i/e)+"px",
			s.innerHTML=i+" mi"): (n=this._getRoundNum(o),
			s.style.width=this._getScaleWidth(n/o)+"px",
			s.innerHTML=n+" ft")
		},
		_getScaleWidth: function(t){
			returnMath.round(this.options.maxWidth*t)-10
		},
		_getRoundNum: function(t){
			vare=Math.pow(10,
			(Math.floor(t)+"").length-1),
			i=t/e;returni=i>=10?10: i>=5?5: i>=3?3: i>=2?2: 1,
			e*i
		}
	}),
	o.control.scale=function(t){
		returnnewo.Control.Scale(t)
	},
	o.Control.Layers=o.Control.extend({
		options: {
			collapsed: !0,
			position: "topright",
			autoZIndex: !0
		},
		initialize: function(t,
		e,
		i){
			o.setOptions(this,
			i),
			this._layers={
				
			},
			this._lastZIndex=0,
			this._handlingClick=!1;for(varnint)this._addLayer(t[n],
			n);for(nine)this._addLayer(e[n],
			n,
			!0)
		},
		onAdd: function(t){
			returnthis._initLayout(),
			this._update(),
			t.on("layeradd",
			this._onLayerChange,
			this).on("layerremove",
			this._onLayerChange,
			this),
			this._container
		},
		onRemove: function(t){
			t.off("layeradd",
			this._onLayerChange,
			this).off("layerremove",
			this._onLayerChange,
			this)
		},
		addBaseLayer: function(t,
		e){
			returnthis._addLayer(t,
			e),
			this._update(),
			this
		},
		addOverlay: function(t,
		e){
			returnthis._addLayer(t,
			e,
			!0),
			this._update(),
			this
		},
		removeLayer: function(t){
			vare=o.stamp(t);returndeletethis._layers[e],
			this._update(),
			this
		},
		_initLayout: function(){
			vart="leaflet-control-layers",
			e=this._container=o.DomUtil.create("div",
			t);e.setAttribute("aria-haspopup",
			!0),
			o.Browser.touch?o.DomEvent.on(e,
			"click",
			o.DomEvent.stopPropagation): o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);vari=this._form=o.DomUtil.create("form",
			t+"-list");if(this.options.collapsed){
				o.Browser.android||o.DomEvent.on(e,
				"mouseover",
				this._expand,
				this).on(e,
				"mouseout",
				this._collapse,
				this);varn=this._layersLink=o.DomUtil.create("a",
				t+"-toggle",
				e);n.href="#",
				n.title="Layers",
				o.Browser.touch?o.DomEvent.on(n,
				"click",
				o.DomEvent.stop).on(n,
				"click",
				this._expand,
				this): o.DomEvent.on(n,
				"focus",
				this._expand,
				this),
				o.DomEvent.on(i,
				"click",
				function(){
					setTimeout(o.bind(this._onInputClick,
					this),
					0)
				},
				this),
				this._map.on("click",
				this._collapse,
				this)
			}elsethis._expand();this._baseLayersList=o.DomUtil.create("div",
			t+"-base",
			i),
			this._separator=o.DomUtil.create("div",
			t+"-separator",
			i),
			this._overlaysList=o.DomUtil.create("div",
			t+"-overlays",
			i),
			e.appendChild(i)
		},
		_addLayer: function(t,
		e,
		i){
			varn=o.stamp(t);this._layers[n]={
				layer: t,
				name: e,
				overlay: i
			},
			this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,
			t.setZIndex(this._lastZIndex))
		},
		_update: function(){
			if(this._container){
				this._baseLayersList.innerHTML="",
				this._overlaysList.innerHTML="";vart,
				e,
				i=!1,
				n=!1;for(tinthis._layers)e=this._layers[t],
				this._addItem(e),
				n=n||e.overlay,
				i=i||!e.overlay;this._separator.style.display=n&&i?"": "none"
			}
		},
		_onLayerChange: function(t){
			vare=this._layers[o.stamp(t.layer)];if(e){
				this._handlingClick||this._update();vari=e.overlay?"layeradd"===t.type?"overlayadd": "overlayremove": "layeradd"===t.type?"baselayerchange": null;i&&this._map.fire(i,
				e)
			}
		},
		_createRadioElement: function(t,
		i){
			varn='<inputtype="radio"class="leaflet-control-layers-selector"name="'+t+'"';i&&(n+='checked="checked"'),
			n+="/>";varo=e.createElement("div");returno.innerHTML=n,
			o.firstChild
		},
		_addItem: function(t){
			vari,
			n=e.createElement("label"),
			s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),
			i.type="checkbox",
			i.className="leaflet-control-layers-selector",
			i.defaultChecked=s): i=this._createRadioElement("leaflet-base-layers",
			s),
			i.layerId=o.stamp(t.layer),
			o.DomEvent.on(i,
			"click",
			this._onInputClick,
			this);vara=e.createElement("span");a.innerHTML=" "+t.name,
			n.appendChild(i),
			n.appendChild(a);varr=t.overlay?this._overlaysList: this._baseLayersList;returnr.appendChild(n),
			n
		},
		_onInputClick: function(){
			vart,
			e,
			i,
			n=this._form.getElementsByTagName("input"),
			o=n.length;for(this._handlingClick=!0,
			t=0;o>t;t++)e=n[t],
			i=this._layers[e.layerId],
			e.checked&&!this._map.hasLayer(i.layer)?this._map.addLayer(i.layer): !e.checked&&this._map.hasLayer(i.layer)&&this._map.removeLayer(i.layer);this._handlingClick=!1,
			this._refocusOnMap()
		},
		_expand: function(){
			o.DomUtil.addClass(this._container,
			"leaflet-control-layers-expanded")
		},
		_collapse: function(){
			this._container.className=this._container.className.replace(" leaflet-control-layers-expanded",
			"")
		}
	}),
	o.control.layers=function(t,
	e,
	i){
		returnnewo.Control.Layers(t,
		e,
		i)
	},
	o.PosAnimation=o.Class.extend({
		includes: o.Mixin.Events,
		run: function(t,
		e,
		i,
		n){
			this.stop(),
			this._el=t,
			this._inProgress=!0,
			this._newPos=e,
			this.fire("start"),
			t.style[o.DomUtil.TRANSITION]="all "+(i||.25)+"s cubic-bezier(0,0,"+(n||.5)+",1)",
			o.DomEvent.on(t,
			o.DomUtil.TRANSITION_END,
			this._onTransitionEnd,
			this),
			o.DomUtil.setPosition(t,
			e),
			o.Util.falseFn(t.offsetWidth),
			this._stepTimer=setInterval(o.bind(this._onStep,
			this),
			50)
		},
		stop: function(){
			this._inProgress&&(o.DomUtil.setPosition(this._el,
			this._getPos()),
			this._onTransitionEnd(),
			o.Util.falseFn(this._el.offsetWidth))
		},
		_onStep: function(){
			vart=this._getPos();returnt?(this._el._leaflet_pos=t,
			voidthis.fire("step")): voidthis._onTransitionEnd()
		},
		_transformRe: /([-+]?(?: \d*\.)?\d+)\D*,
		([-+]?(?: \d*\.)?\d+)\D*\)/,
		_getPos: function(){
			vare,
			i,
			n,
			s=this._el,
			a=t.getComputedStyle(s);if(o.Browser.any3d){
				if(n=a[o.DomUtil.TRANSFORM].match(this._transformRe),
				!n)return;e=parseFloat(n[1]),
				i=parseFloat(n[2])
			}elsee=parseFloat(a.left),
			i=parseFloat(a.top);returnnewo.Point(e,
			i,
			!0)
		},
		_onTransitionEnd: function(){
			o.DomEvent.off(this._el,
			o.DomUtil.TRANSITION_END,
			this._onTransitionEnd,
			this),
			this._inProgress&&(this._inProgress=!1,
			this._el.style[o.DomUtil.TRANSITION]="",
			this._el._leaflet_pos=this._newPos,
			clearInterval(this._stepTimer),
			this.fire("step").fire("end"))
		}
	}),
	o.Map.include({
		setView: function(t,
		e,
		n){
			if(e=e===i?this._zoom: this._limitZoom(e),
			t=this._limitCenter(o.latLng(t),
			e,
			this.options.maxBounds),
			n=n||{
				
			},
			this._panAnim&&this._panAnim.stop(),
			this._loaded&&!n.reset&&n!==!0){
				n.animate!==i&&(n.zoom=o.extend({
					animate: n.animate
				},
				n.zoom),
				n.pan=o.extend({
					animate: n.animate
				},
				n.pan));vars=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,
				e,
				n.zoom): this._tryAnimatedPan(t,
				n.pan);if(s)returnclearTimeout(this._sizeTimer),
				this
			}returnthis._resetView(t,
			e),
			this
		},
		panBy: function(t,
		e){
			if(t=o.point(t).round(),
			e=e||{
				
			},
			!t.x&&!t.y)returnthis;if(this._panAnim||(this._panAnim=newo.PosAnimation,
			this._panAnim.on({
				step: this._onPanTransitionStep,
				end: this._onPanTransitionEnd
			},
			this)),
			e.noMoveStart||this.fire("movestart"),
			e.animate!==!1){
				o.DomUtil.addClass(this._mapPane,
				"leaflet-pan-anim");vari=this._getMapPanePos().subtract(t);this._panAnim.run(this._mapPane,
				i,
				e.duration||.25,
				e.easeLinearity)
			}elsethis._rawPanBy(t),
			this.fire("move").fire("moveend");returnthis
		},
		_onPanTransitionStep: function(){
			this.fire("move")
		},
		_onPanTransitionEnd: function(){
			o.DomUtil.removeClass(this._mapPane,
			"leaflet-pan-anim"),
			this.fire("moveend")
		},
		_tryAnimatedPan: function(t,
		e){
			vari=this._getCenterOffset(t)._floor();return(e&&e.animate)===!0||this.getSize().contains(i)?(this.panBy(i,
			e),
			!0): !1
		}
	}),
	o.PosAnimation=o.DomUtil.TRANSITION?o.PosAnimation: o.PosAnimation.extend({
		run: function(t,
		e,
		i,
		n){
			this.stop(),
			this._el=t,
			this._inProgress=!0,
			this._duration=i||.25,
			this._easeOutPower=1/Math.max(n||.5,
			.2),
			this._startPos=o.DomUtil.getPosition(t),
			this._offset=e.subtract(this._startPos),
			this._startTime=+newDate,
			this.fire("start"),
			this._animate()
		},
		stop: function(){
			this._inProgress&&(this._step(),
			this._complete())
		},
		_animate: function(){
			this._animId=o.Util.requestAnimFrame(this._animate,
			this),
			this._step()
		},
		_step: function(){
			vart=+newDate-this._startTime,
			e=1e3*this._duration;e>t?this._runFrame(this._easeOut(t/e)): (this._runFrame(1),
			this._complete())
		},
		_runFrame: function(t){
			vare=this._startPos.add(this._offset.multiplyBy(t));o.DomUtil.setPosition(this._el,
			e),
			this.fire("step")
		},
		_complete: function(){
			o.Util.cancelAnimFrame(this._animId),
			this._inProgress=!1,
			this.fire("end")
		},
		_easeOut: function(t){
			return1-Math.pow(1-t,
			this._easeOutPower)
		}
	}),
	o.Map.mergeOptions({
		zoomAnimation: !0,
		zoomAnimationThreshold: 4
	}),
	o.DomUtil.TRANSITION&&o.Map.addInitHook(function(){
		this._zoomAnimated=this.options.zoomAnimation&&o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.android23&&!o.Browser.mobileOpera,
		this._zoomAnimated&&o.DomEvent.on(this._mapPane,
		o.DomUtil.TRANSITION_END,
		this._catchTransitionEnd,
		this)
	}),
	o.Map.include(o.DomUtil.TRANSITION?{
		_catchTransitionEnd: function(t){
			this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()
		},
		_nothingToAnimate: function(){
			return!this._container.getElementsByClassName("leaflet-zoom-animated").length
		},
		_tryAnimatedZoom: function(t,
		e,
		i){
			if(this._animatingZoom)return!0;if(i=i||{
				
			},
			!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;varn=this.getZoomScale(e),
			o=this._getCenterOffset(t)._divideBy(1-1/n),
			s=this._getCenterLayerPoint()._add(o);returni.animate===!0||this.getSize().contains(o)?(this.fire("movestart").fire("zoomstart"),
			this._animateZoom(t,
			e,
			s,
			n,
			null,
			!0),
			!0): !1
		},
		_animateZoom: function(t,
		e,
		i,
		n,
		s,
		a,
		r){
			r||(this._animatingZoom=!0),
			o.DomUtil.addClass(this._mapPane,
			"leaflet-zoom-anim"),
			this._animateToCenter=t,
			this._animateToZoom=e,
			o.Draggable&&(o.Draggable._disabled=!0),
			o.Util.requestAnimFrame(function(){
				this.fire("zoomanim",
				{
					center: t,
					zoom: e,
					origin: i,
					scale: n,
					delta: s,
					backwards: a
				})
			},
			this)
		},
		_onZoomTransitionEnd: function(){
			this._animatingZoom=!1,
			o.DomUtil.removeClass(this._mapPane,
			"leaflet-zoom-anim"),
			this._resetView(this._animateToCenter,
			this._animateToZoom,
			!0,
			!0),
			o.Draggable&&(o.Draggable._disabled=!1)
		}
	}: {
		
	}),
	o.TileLayer.include({
		_animateZoom: function(t){
			this._animating||(this._animating=!0,
			this._prepareBgBuffer());vare=this._bgBuffer,
			i=o.DomUtil.TRANSFORM,
			n=t.delta?o.DomUtil.getTranslateString(t.delta): e.style[i],
			s=o.DomUtil.getScaleString(t.scale,
			t.origin);e.style[i]=t.backwards?s+" "+n: n+" "+s
		},
		_endZoomAnim: function(){
			vart=this._tileContainer,
			e=this._bgBuffer;t.style.visibility="",
			t.parentNode.appendChild(t),
			o.Util.falseFn(e.offsetWidth),
			this._animating=!1
		},
		_clearBgBuffer: function(){
			vart=this._map;!t||t._animatingZoom||t.touchZoom._zooming||(this._bgBuffer.innerHTML="",
			this._bgBuffer.style[o.DomUtil.TRANSFORM]="")
		},
		_prepareBgBuffer: function(){
			vart=this._tileContainer,
			e=this._bgBuffer,
			i=this._getLoadedTilesPercentage(e),
			n=this._getLoadedTilesPercentage(t);returne&&i>.5&&.5>n?(t.style.visibility="hidden",
			voidthis._stopLoadingImages(t)): (e.style.visibility="hidden",
			e.style[o.DomUtil.TRANSFORM]="",
			this._tileContainer=e,
			e=this._bgBuffer=t,
			this._stopLoadingImages(e),
			voidclearTimeout(this._clearBgBufferTimer))
		},
		_getLoadedTilesPercentage: function(t){
			vare,
			i,
			n=t.getElementsByTagName("img"),
			o=0;for(e=0,
			i=n.length;i>e;e++)n[e].complete&&o++;returno/i
		},
		_stopLoadingImages: function(t){
			vare,
			i,
			n,
			s=Array.prototype.slice.call(t.getElementsByTagName("img"));for(e=0,
			i=s.length;i>e;e++)n=s[e],
			n.complete||(n.onload=o.Util.falseFn,
			n.onerror=o.Util.falseFn,
			n.src=o.Util.emptyImageUrl,
			n.parentNode.removeChild(n))
		}
	}),
	o.Map.include({
		_defaultLocateOptions: {
			watch: !1,
			setView: !1,
			maxZoom: 1/0,
			timeout: 1e4,
			maximumAge: 0,
			enableHighAccuracy: !1
		},
		locate: function(t){
			if(t=this._locateOptions=o.extend(this._defaultLocateOptions,
			t),
			!navigator.geolocation)returnthis._handleGeolocationError({
				code: 0,
				message: "Geolocation not supported."
			}),
			this;vare=o.bind(this._handleGeolocationResponse,
			this),
			i=o.bind(this._handleGeolocationError,
			this);returnt.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,
			i,
			t): navigator.geolocation.getCurrentPosition(e,
			i,
			t),
			this
		},
		stopLocate: function(){
			returnnavigator.geolocation&&navigator.geolocation.clearWatch(this._locationWatchId),
			this._locateOptions&&(this._locateOptions.setView=!1),
			this
		},
		_handleGeolocationError: function(t){
			vare=t.code,
			i=t.message||(1===e?"permission denied": 2===e?"position unavailable": "timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),
			this.fire("locationerror",
			{
				code: e,
				message: "Geolocation error: "+i+"."
			})
		},
		_handleGeolocationResponse: function(t){
			vare=t.coords.latitude,
			i=t.coords.longitude,
			n=newo.LatLng(e,
			i),
			s=180*t.coords.accuracy/40075017,
			a=s/Math.cos(o.LatLng.DEG_TO_RAD*e),
			r=o.latLngBounds([e-s,
			i-a],
			[e+s,
			i+a]),
			h=this._locateOptions;if(h.setView){
				varl=Math.min(this.getBoundsZoom(r),
				h.maxZoom);this.setView(n,
				l)
			}varu={
				latlng: n,
				bounds: r,
				timestamp: t.timestamp
			};for(varcint.coords)"number"==typeoft.coords[c]&&(u[c]=t.coords[c]);this.fire("locationfound",
			u)
		}
	})
}(window,
document);