/*!
* window.Stateful.js v0.01
* SPA Micro-Framework
* Apache 2.0 License (C) 2014 Marc Fawzi
* Derived in part from OrganicJS, Apache 2.0 License (C) 2013 Marc Fawzi
*/

// Please consider contributing back any useful enhancements

;(function(Backbone){

    "use strict"

    // global var for immutable state object

    window.uiState = {}

    // namespace
    window.Stateful = {};

    // Compose Component
    //
    window.Stateful.compose = function compose(obj, fn)  {
        // TODO:
        // _.extend() component with supplied extensions (POJOs with .getters, gettersSetters and methods)

        obj.getters = {}
        obj.gettersSetters = {}
        obj.getters.setup = null
        obj.gettersSetters.sid = null;

        if (typeof fn === 'function') {
            fn.bind(obj)()
        }

        obj._el = null

        obj.elem = function Elem(elem) {

            if (elem) {
                var el = elem[0] ? elem[0] : elem

                if (!window.Stateful.isElement(el)) {
                    throw new Error("argument must be an element").stack
                }

                if (($(el).attr('cloneable') === undefined || $(el).attr('cloneable') === false) && 
                    ($(el).attr('cloned') === undefined || $(el).attr('cloned') === false))
                        throw new Error("element must be cloned or cloneable")

                obj._el = el

                if ($(el).attr('cloned') !== undefined && $(el).attr('cloned') !== false) {
                   obj._el.__component__ = obj
                }

                return obj
            } else {
                return obj._el
            }

        }

        obj._id = null
        
        // clone the cloneable and give it a unique id
        obj.clone = function Clone(id) {

            if (id && obj._id)
                throw new Error("cannot clone with same id more than once")

            if (!obj.sid())
                throw new Error(".sid() must be defined before defining clone")

            if (!$(obj.elem()).length)
                throw new Error(".elem() must be defined before defining")

            if ($(obj.elem()).attr('cloneable') === undefined)
                throw new Error("cloneAs may only be applied to cloneable element")

            if (id) {
                if (/^\w+$/.test(id)) {
                    obj._id = $(obj.elem()).attr('name') + "_" + id

                    obj.elem($(obj.elem()).clone(true))

                    $(obj.elem()).attr("name", obj._id)
                    $(obj.elem()).removeAttr("cloneable")
                    $(obj.elem()).attr("cloned", "")

                } else {
                    throw new Error("argument must be composed of word letters")
                }
            } else {
               throw new Error("missing argument")
            }

        }

        // inserts HTML/SVG cloneable into specified element via appendChild or insertBefore
        //
        // first define obj.elem as the cloneable element then invoke .clone to clone it into a board
        //
        obj.adopt = function Adopt(intoElem, insertBeforeSelector) {

            var el = $(obj.elem())[0]

            if (!window.Stateful.isElement(el)) {
                throw new Error(".elem() must be defined befgore clonening")
            }

            if ($(el).attr('cloned') === undefined)
                throw new Error(".elem() must be a clonnable in cloned state")

            if (el.parentNode) {
                throw new Error(".elem() was already adopted")
            }

            if ($(el).parents('[cloneable]')[0] || $(el).parents('[cloned]')[0]) {       
                    throw new Error("can't adopt clone into an another clone or cloneable")
            }

            var  intoEl = intoElem[0] ? intoElem[0] : intoElem

            if (!window.Stateful.isElement(intoEl)) {
                throw new Error("first argument must be a DOM element (where to adopt)")
            }

            var     refEl = $(insertBeforeSelector)[0] ?
                        $(intoEl).find('> ' + insertBeforeSelector)[0] ?
                            $(intoEl).find('> ' + insertBeforeSelector)[0]  : null : null
                ,   nodeRef;

            if (refEl) {
                nodeRef = intoEl.insertBefore(el, refEl)
            } else {
                nodeRef = intoEl.appendChild(el)
            }

            obj.elem(nodeRef)

            return obj.elem();
        }

        // Clones HTML/SVG repeatable and inserts into its parent via appendChild or insertBefore
        //
        obj.repeat = function Repeat(elem, insertBeforeSelector) {

            var el = elem[0] ? elem[0] : elem

            if (!window.Stateful.isElement(el)) {
                throw new Error("No element or invalid element was passed to repeat()").stack
            }

            if (!$(el).attr('name') || $(el).attr('repeatable') === undefined || $(el).attr('repeatable') === false) {
                throw new Error("repeat() method may only be applied to named 'repeatable' elements").stack
            }

            if (!$(el).parent('x')[0]){
                $(el).wrap("<x __wrapper></x>")
            }

            var     intoEl = el.parentNode
                ,   refEl = $(insertBeforeSelector)[0] ? $(intoEl).find('> ' + insertBeforeSelector)[0] : null
                ,   node = el.cloneNode(true)
                ,   nodeRef;

            if (refEl) {
                nodeRef = intoEl.insertBefore(node, refEl)
            } else {
                nodeRef = intoEl.appendChild(node)
            }

            $(node).removeAttr("repeatable")
            $(node).attr("repeated", "")

            return nodeRef;
        }

        // render 
        obj.render = function Render(elem) {

            var el = elem[0] ? elem[0] : elem.nodeType === 1 ? elem : null

            if (!window.Stateful.isElement(el)) {
                throw new Error("No element or invalid element was passed to .elem()").stack
            }

            if (($(el).attr('cloneable') !== undefined && $(el).attr('cloneable') !== false) ||
                ($(el).attr('repeatable') !== undefined && $(el).attr('repeatable') !== false) ||
                ($(el).attr('cloned') !== undefined && $(el).attr('cloned') !== false) ||
                ($(el).attr('repeated') !== undefined && $(el).attr('repeated') !== false) ||
                !$(el).attr('name')) {
                throw new Error("this method may only be applied to named descendants of cloned/repeated elements").stack
            }

            var sid = obj.sid()

            var arrayAccessor

            var parents = $(el).parents('[repeated]')

            if (parents.length) {
                arrayAccessor = parents
                        .toArray()
                        .reverse()
                        .map(function(e){
                            var v = $(e).index() - 1
                            return "[" + v + "]"
                        })
                        .join("")
            } 

            obj.__invokeRenderingScheme__(el, sid, arrayAccessor)

            return obj;
        }

        obj.__mapCSSProperties__ = function MapCSSProperties(el, json) {

            for (var prop in json) {
                $(el).filter(function() {
                    return $(el).css(prop) !== undefined;
                }).css(prop, json[prop]);
            }
        }

        obj.__invokeRenderingScheme__ = function InvokeRenederingScheme(el, sid, arrayAccessor) {

            var renderingRoute =  $(el).parents('[repeated]')[0] ? $($(el).parents('[repeated]')[0]).attr('name') : 'children'

            if (!renderingRoute)
                throw new Error("can't select rendering route; element name attribute is not set")
            if (!obj.renderingSchemes[renderingRoute])
            {
                throw new Error("can find this rendering route in component definition: " + renderingRoute)
            }

            // invoke rendering scheme for given element
            obj.renderingSchemes[renderingRoute](el, sid, arrayAccessor)
        }

        obj.__DOM__RenderingScheme = function DOMRenderingScheme(el, sid, arrayAccessor) {

            var state = obj.__childState__(uiState, sid, el, arrayAccessor)

            for (var prop in state) {
                if (prop == "style" && typeof state.style === "object") {
                    var v = state.style
                    obj.__mapCSSProperties__(el, v)
                }
                if (prop == "attr" && typeof state.attr === "object") {
                    var v = state.attr
                    for (var o in v) {
                        if (v[o] !== null) {
                            $(el).attr(o, v[o])
                        }
                        else if (v[o] === null) {
                            $(el).removeAttr(o)
                        }
                    }
                }
                if (prop == "value") {
                    
                    var v = state.value

                    if (typeof $(el).prop("value") === "string") {

                        $(el).val(v)

                    } else if (v !== undefined && v !== null) {
                        var x = $(el).children('[__value]')
                        if (x) {
                            x.remove()
                        }
                        $(el).prepend("<x __value>" + v + "</x>")
                    } 
                }
            }
        }

        obj.__cloneState__ = function CloneState(hash, sid, el) {

            var key

            if ($(el).attr('cloned') !== undefined && $(el).attr('cloned') !== false) {
                if (hash[sid][$(el).attr('name')] === undefined)
                    hash[sid][$(el).attr('name')] = {}
                key = hash[sid][$(el).attr('name')]
            } 

            if (key === undefined)
                throw new Error("state object missing key for clone: " + $(el)[0].outerHTML)

            return key;
        }

        obj.__childState__ = function ChildState(hash, sid, el, arrayAccessor) {

            var key;

            if (arrayAccessor) {
         
                if ($(el).attr('repeated') !== undefined && $(el).attr('repeated') !== false) {
                    key = new Function("hash, sid, el",
                        "return hash[sid]\
                            [$(el).closest('[cloned]').attr('name')]\
                            [$(el).closest('[repeated]').attr('name')]" + arrayAccessor)(hash, sid, el)

                } else {    
             
                    key = new Function("hash, sid, el",
                        "return hash[sid]\
                            [$(el).closest('[cloned]').attr('name')]\
                            [$(el).closest('[repeated]').attr('name')]" + arrayAccessor + "[$(el).attr('name')]")(hash, sid, el)
                }
            } else {
                key = hash[sid]
                    [$(el).closest('[cloned]').attr('name')]
                    [$(el).attr('name')]
            }

            if (key === undefined) {
                console.log(arrayAccessor)
                throw new Error("state object missing key for: " + $(el)[0].outerHTML)
            }

            return key;
        }

        obj.__createRepeatableArray__ = function CreateRepeatableArray(name, indices) {

            var repeatable = $(obj.elem()).find('[repeatable][name="' + name + '"]')

            if (!repeatable[0]) {
                throw new Error("no such repetable in this component").stack
            }

            return Stateful.utils.createArray.apply(null, indices)
        }

        for (var o in obj.getters) {
            if (obj.getters.hasOwnProperty(o))
                obj[o] =  new Function("return typeof this.getters['" + o +
                    "'] === 'function' ? this.getters['" + o + "'].call(this) : this.getters['" + o + "']")
        }

        for (var m in obj.gettersSetters) {
            if (obj.gettersSetters.hasOwnProperty(m))
                obj[m] =  new Function("value", "if (!arguments.length) return typeof this.gettersSetters['" + m +
                    "'] === 'function' ? this.gettersSetters['" + m + "'].call(this) : this.gettersSetters['" + m + "'];" +
                    "this.gettersSetters['" + m + "'] = value; return this")
        }
    }

    window.Stateful.newState = function NewState(sid) {
        window.uiState[sid] = {}
    }

    window.Stateful.exists = function Exists(sid) {
        return uiState[sid] ? true : false
    }

    window.Stateful.getComponent = function Component(elem) {
        var el = elem[0] ? elem[0] : elem

        if (!window.Stateful.isElement(el)) {
            throw new Error("No element or invalid element was passed").stack
        }

        var _el = $(el).closest('[cloned]')[0]

        if (_el === undefined) {
            throw new Error("element must have cloned element as parent").stack
        }

        var cmp = _el.__component__

        if (!cmp) {
            throw new Error("cloned element is not associated with any component").stack
        }

        return cmp
    }

    window.Stateful.getRepeatedInstance = function Repeated(elem) {
        var el = elem[0] ? elem[0] : elem

        if (!window.Stateful.isElement(el)) {
            throw new Error("No element or invalid element was passed to repeated()").stack
        }

        var repeated = $(el).closest('[repeated]')[0]

        if (!repeated) {
            throw new Error("element is not part of a repeated instance").stack
        }

        return repeated
    }

    window.Stateful.getUUID =
        (typeof(crypto) !== 'undefined' &&
            typeof(crypto.getRandomValues) !== 'undefined')
        ?
            function UUID() {
                // If we have a cryptographically strong PRNG
                var buf = new Uint16Array(8);
                crypto.getRandomValues(buf);
                var S4 = function(num) {
                    var ret = num.toString(16);
                    while (ret.length < 4){
                        ret = "0" + ret;
                    }
                    return ret;
                };
                return (S4(buf[0])+S4(buf[1])+S4(buf[2])+S4(buf[3])+S4(buf[4])+
                        S4(buf[5])+S4(buf[6])+S4(buf[7]));
            }
        :
            function UUID() {
                var now = new Date();
                var ms = now.getTime() + (now.getTimezoneOffset() * 60000)

                var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
                    var r = (ms + Math.random()*16)%16 | 0;
                    ms = Math.floor(ms/16);
                    return (r).toString(16);
                });
                return uuid;
            };

    window.Stateful.isElement = function IsElement(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement :
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        )
    }

    window.Stateful.parallel = function Parallel(d, cb) {
        return function() {
                    --d
                    if (!d) {
                        cb()
                    }
                }
    }

    // utils 

    window.Stateful.utils = {}

    window.Stateful.utils.getMatchingObjects = function GetMatchingObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(window.Stateful.utils.getMatchingObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    }

    window.Stateful.utils.createArray = function CreateArray() {
            var arr, len, i;
            if(arguments.length > 0) {
                len = [].slice.call(arguments, 0, 1)[0];
                arr = new Array(len);
                for(i = 0; i < len; i++) {
                    arr[i] = window.Stateful.utils.createArray.apply(null, [].slice.call(arguments, 1));
                }
            } else {
                return undefined;
            }
            return arr;
    }

    window.Stateful.utils.toFixed = function ToFixed(num, digits) {
        var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
            m = num.toString().match(re);
        return m ? parseFloat(m[1]) : num.valueOf();
    }

    window.Stateful.utils.timeAgo = function TimeAgo(date) {

        var seconds = Math.floor((new Date() - date) / 1000), interval = Math.floor(seconds / 31536000)

        if (interval > 1) {return interval + " years ago"}
        interval = Math.floor(seconds / 2592000) ; if (interval > 1) return interval + " months ago"
        interval = Math.floor(seconds / 86400) ; if (interval > 1) return interval + " days ago"
        interval = Math.floor(seconds / 3600) ; if (interval > 1) return interval + " hours ago"
        interval = Math.floor(seconds / 60) ; if (interval > 1) return interval + " minutes ago"

        return Math.floor(seconds) + " seconds ago"
    }


})(Backbone)