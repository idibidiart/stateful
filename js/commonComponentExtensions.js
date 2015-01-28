/*!
* Stateful.js v0.01
* SPA Micro-Framework
* MIT and Apache 2.0 Dual Licensed (C) 2014 Marc Fawzi
* Derived in part from OrganicJS, Apache 2.0 Licensed (C) 2013 Marc Fawzi
*/

// Please consider contributing back any useful enhancements

obj.state = function (elem) {

    if (elem) {

        var el = elem[0] ? elem[0] : elem

        if (!Stateful.isElement(el)) {
            throw new Error("No element or invalid element").stack
        }

        if (!$(el).closest('[cloned]')[0] || $(el).closest('[cloned]')[0] !== obj.elem()) {
            throw new Error("specified element does not belong to this component").stack
        }

        if ($(obj.elem()).attr("cloned") === undefined || $(obj.elem()).attr("cloned") === false) {
            throw new Error("this method may only be applied to components with cloned parent element").stack
        }

        if (!$(el).attr('name')) {
            throw new Error("this method may only be applied to named elements").stack
        }

        if ($(el).attr('cloned') === undefined || $(el).attr('cloned') === false) {

            var arrayAccessor = ""
 
            if ($(el).parents('[repeated]')[0]) {
                arrayAccessor = $(el)
                    .parents('[repeated]')
                    .toArray()
                    .reverse()
                    .map(function(e){
                        var v = $(e).index() - 1
                        return "[" + v + "]"
                    })
                    .join("")
            }
            if ($(el).attr('repeated') !== undefined && $(el).attr('repeated') !== false) {
                arrayAccessor += "[" + $(el).index() - 1 + "]"
            }

            return {
                    byValue: function(o) {
                        var sid = obj.sid()
                        var state = JSON.parse(JSON.stringify(obj.__childState__(uiState, sid, el, arrayAccessor)))
                        _.merge(state, o)
                        return state
                    },
                    byReference: function (o) {
                        var sid = obj.sid()
                        var state = obj.__childState__(uiState, sid, el, arrayAccessor)
                        _.merge(state, o)
                        return state
                    }
                }

        } else {

            return  {
                    byValue: function(o) {
                        var sid = obj.sid()
                        var state = JSON.parse(JSON.stringify(obj.__cloneState__(uiState, sid, el)))
                        _.merge(state, o)
                        return state
                    },
                    byReference: function (o) {
                        var sid = obj.sid()
                        var state = obj.__cloneState__(uiState, sid, el)
                        _.merge(state, o)
                        return state
                    }
                }
        }

    } else {
        throw new Error("must specify element").stack
    }
}

obj.stateObject =  function() {       

    var el = obj.elem() && obj.elem()[0] ? obj.elem()[0] : obj.elem()

    if (!Stateful.isElement(el)) {
        throw new Error("No element or invalid element in component's .elem()").stack
    }

    if ($(obj.elem()).attr('cloned') === undefined || $(obj.elem()).attr('cloned') === false) {
        throw new Error("this method may only be applied to cloned elements").stack
    }

    return  {
            byValue: function(o) {
                var sid = obj.sid()
                var state = JSON.parse(JSON.stringify(obj.__cloneState__(uiState, sid, el)))
                _.merge(state, o)
                return state
            },
            byReference: function (o) {
                var sid = obj.sid()
                var state = obj.__cloneState__(uiState, sid, el)
                _.merge(state, o)
                return state
            }
        }
}


obj.createRepeatables = function (args) {

    args.forEach(function(o,i, arr) {

        obj.stateObject().byReference()[o.repeatable] = obj.__createRepeatableArray__(o.repeatable, o.indices)
        
    })
}




