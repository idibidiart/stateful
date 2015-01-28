;(function(Route, Backbone) {

    "use strict"

    // the line below is the marker for automated insertion by the shell script
    // @insertSettings
var settings = {}

settings.query = {}
settings.query.beginTime = function() {return new Date() - 3600000 * 24 * 3}
settings.query.endTime = function() {return new Date() - 0}

settings.chart = {}
settings.chart.brushOffset = 11 * 3600000 * 3
    // the line below is the marker for automated insertion by the shell script
    // @insertSelectors
    // TODO:
    //
    // Generate all selectors automatically during build based on named HTML structures
    //
    var selectors = {
        homePage: '[page="home"]',
        searchPage: '[page="search"]',
        listViewContainer: '[listview-clone]',
        searchContainer: '[search-clone]',
        buttonContainer: '[button-clone]',
        problemsListContainer: '[problems-clone]',
        problemsListCloneable: '[cloneable][name="problemsList"]',
        searchBoxCloneable: '[cloneable][name="searchBox"]',
        searchButtonCloneable: '[cloneable][name="searchButton"]',
        searchBox:  '[name="outerBox"]',
        searchTitle: '[name="title"]',
        searchButton: '[name="search"]',
        inputBox: '[name="inputBox"]',
        suggestions: '[name="suggestions"]',
        suggestionItems: '[name="suggestions"] div',
        listViewCloneable: '[cloneable][name="listView"]',
        listViewListItemRepeatable: '[repeatable][name="listItem"]',
        listViewNumResults: '[name="numResults"]',
        ProblemsListItemRepeatable: '[repeatable][name="listItem"]',
        ProblemsListText: '[name="text"]',
        ProblemsListTimestamp: '[name="timestamp"]',
        ProblemsListGauge: '[name="gauge"]',
        ProblemsListBars: '[name="bars"]',
        MoreOrLessInfo: '[name="moreOrLessInfo"]',
        ListItemOverflow: '[name="listItemOverflow"]',
        ItemName: '[name="itemName"]',
        metricDate: '[name="metricDate"]',
        listViewExtendedInfoRepeatable: '[repeatable][name="extendedInfo"]',
        Item1: '[name="i1"]',
        Item1Value: '[name="i1_value"]',
        Item2: '[name="i2"]',
        Item2Value: '[name="i2_value"]',
        Item3: '[name="i3"]',
        Item3Value: '[name="i3_value"]',
        Item3Trend: '[name="i3_trend"]',
        Item4: '[name="i4"]',
        Item4Value: '[name="i4_value"]',
        Item4Trend: '[name="i4_trend"]',
        listViewChartRepeatable: '[repeatable][name="chart"]',
        chartWidgetContainer: '[name="chartWidgetContainer"]',
        listViewSubchartRepeatable: '[repeatable][name="subchart"]',
        chartThing: '[name="chartThing"]'
    }
    // the line below is the marker for automated insertion by the shell script
    // @insertEvents
    // Define board-level event handlers as wrappers around common and special handlers
    // All handlers are defined (or inserted) in the route's lexical scope
    //
    $(selectors.searchPage).on("click", selectors.MoreOrLessInfo, function(e){e.stopPropagation();Route.expandListItem(e)})
    $(selectors.searchPage).on("click", selectors.searchButton, function(e) {e.stopPropagation();Route.search(e)})
    $(selectors.searchPage).on("keyup", selectors.inputBox, function(e) {e.stopPropagation();Route.searchKeyEvents(e)})
    $(selectors.searchPage).on("mouseover", selectors.suggestionItems, function(e) {e.stopPropagation();Route.overAutoCompleteItem(e)})
    $(selectors.searchPage).on("keydown", selectors.inputBox, function(e) {e.stopPropagation();Route.selectAutoCompleteItem(e)})
    $(selectors.searchPage).on("click", selectors.inputBox, function(e) {e.stopPropagation();Route.autoCompleteOnFocus(e)})
    $(selectors.searchPage).on("click", selectors.suggestionItems, function(e) {e.stopPropagation();Route.selectAutoCompleteItem(e)})

    $(selectors.homePage).on("click", selectors.searchButton, function(e) {e.stopPropagation();Route.search(e)})
    $(selectors.homePage).on("keyup", selectors.inputBox, function(e) {e.stopPropagation();Route.searchKeyEvents(e)})
    $(selectors.homePage).on("mouseover", selectors.suggestionItems, function(e) {e.stopPropagation();Route.overAutoCompleteItem(e)})
    $(selectors.homePage).on("keydown", selectors.inputBox, function(e) {e.stopPropagation();Route.selectAutoCompleteItem(e)})
    $(selectors.homePage).on("click", selectors.inputBox, function(e) {e.stopPropagation();Route.autoCompleteOnFocus(e)})
    $(selectors.homePage).on("click", selectors.suggestionItems, function(e) {e.stopPropagation();Route.selectAutoCompleteItem(e)})

    $(window).on("click", function(e) {Route.autoCompleteOnBlur(e)})
    $(window).on("resize", function(e) {console.log(window.innerWidth)})

    
    // the line below is the marker for automated insertion by the shell script
    // @insertComponents
    
function Button() {
    var obj = {};

    // common extensions for the above component are defined in a separate file 
    // @insertCommonComponentExtensions
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






    // build the component
    Stateful.compose(obj);

    //stateful rendering routes
    obj.renderingSchemes = {
        //
        // use $(el).attr("name") in case statement if you wish to render specific named elements within
        // a repeatable on special basis

        children: function(el, sid) {
            obj.__DOM__RenderingScheme(el, sid)
        }
    }

    obj.buttonState = function() {

        if (!Stateful.utils.getMatchingObjects(obj.searchBox.defaultSuggestions(),
                "name", $(obj.searchBox.elem()).find(selectors.inputBox).val().trim()).length) {

            obj.state($(obj.elem()).find(selectors.searchButton)).byReference().attr.disabled = "disabled"
            obj.render($(obj.elem()).find(selectors.searchButton))
        }
        else {
            
            obj.state($(obj.elem()).find(selectors.searchButton)).byReference().attr.disabled = null
            obj.render($(obj.elem()).find(selectors.searchButton))
        }
        return obj;
    }

    return obj;
}

function ProblemsList() {
    var obj = {};

    // common extensions for the above component are defined in a separate file 
    // @insertCommonComponentExtensions
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






    // build the component
    Stateful.compose(obj);

    //stateful rendering routes
    obj.renderingSchemes = {
        //
        // use $(el).attr("name") in case statement if you wish to render specific named elements within
        // a repeatable on special basis

        children: function(el, sid) {
            obj.__DOM__RenderingScheme(el, sid)
        },

        listItem: function(el, sid, arrayAccessor) {
            obj.__DOM__RenderingScheme(el, sid, arrayAccessor)
        }
    }

    return obj;
}


function SearchBox() {
    var obj = {};

    // common extensions for the above component are defined in a separate file 
    // @insertCommonComponentExtensions
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






    // build the component
    Stateful.compose(obj, function() {
        this.gettersSetters.placeholder = null;
        this.getters.defaultSuggestions = function () {
            try {
            return obj.stateObject().byValue().suggestions.data
            } catch (e) {
                console.log(e.stack)
            }
        }
    });

    //stateful rendering routes
    obj.renderingSchemes = {
        //
        // use $(el).attr("name") in case statement if you wish to render specific named elements within
        // a repeatable on special basis

        children: function(el, sid) {
            obj.__DOM__RenderingScheme(el, sid)
        }
    }


    // chain-able methods
    //
    obj.showAutoComplete = function() {
        $('[name="suggestions"]', obj.elem()).show()
        return obj
    }
    obj.hideAutoComplete = function() {
        $('[name="suggestions"]', obj.elem()).hide()
        return obj
    }
    obj.loadAutoCompleteResults = function(o) {
        $(obj.elem()).find('[name="suggestions"]').empty()
        if (o.length) {
            o.forEach(function(v, i) {
                $(obj.elem()).find('[name="suggestions"]').append("<div>" + v.name + "</div>")
            })
        }
        return obj;
    }

    return obj;
}

//
function ListView() {
    var obj = {};

    // common extensions for the above component are defined in a separate file 
    // @insertCommonComponentExtensions
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






    // build the component
    Stateful.compose(obj);

    //stateful rendering routes
    obj.renderingSchemes = {
        //
        // use $(el).attr("name") in case statement if you wish to render specific named elements within
        // a fragment usig something other than the default HTML renderer

        children: function(el, sid) {
            obj.__DOM__RenderingScheme(el, sid)
        },

        listItem: function(el, sid, arrayAccessor) {
            obj.__DOM__RenderingScheme(el, sid, arrayAccessor)

        },

        chart: function(el, sid, arrayAccessor) {

            obj.__DOM__RenderingScheme(el, sid, arrayAccessor)

            if ($(el).attr('name') === 'chartWidgetContainer') {

                var from = Number(obj.state(el).byValue().from) + Number(settings.chart.brushOffset)
                var to = Number(obj.state(el).byValue().to)
                var chart = chartWidget(obj.state(el).byValue().extent || [from, to]);
             
                d3.select($(el)[0])
                    .datum(obj.state(el).byValue().data)
                    .call(chart)
            }
        }
        // ,
        // subchart: function(el, sid, arrayAccessor) {
        //     obj.__DOM__RenderingScheme(el, sid, arrayAccessor)

        // },
    }

    return obj;
}

    function getCounters(cb) {

        //todo: use node/express server for data

        // the line below is the marker for automated insertion by the shell script
        // @insertMockCounterData

    var mockCounterData = 
        {
            Counters:
                [
                    {
                        "CounterId": "837983728397932333",
                        "Category": "Account",
                        "CounterName": "Get Details"
                    },
                    {
                        "CounterId": "623876872832878987",
                        "Category": "NCDA",
                        "CounterName": "Account Error"
                    },
                    {
                        "CounterId": "287987978797987987",
                        "Category": "NCDA",
                        "CounterName": "Chunck Size"
                    },
                    {
                        "CounterId": "433686287987987987",
                        "Category": "NCDA",
                        "CounterName": "Failure Event"
                    },
                    {
                        "CounterId": "78739879873478787878",
                        "Category": "Users",
                        "CounterName": "REST API Load"
                    },
                    {
                        "CounterId": "90980980980809809808",
                        "Category": "APCD",
                        "CounterName": "APCD Messages"
                    },
                    {
                        "CounterId": "30208798798798798795",
                        "Category": "APCD",
                        "CounterName": "Total"
                    },
                    {
                        "CounterId": "42879879798798798798",
                        "Category": "APCD",
                        "CounterName": "Timing"
                    },
                    {
                        "CounterId": "38798790798738383833",
                        "Category": "apiRequestTimer",
                        "CounterName": "Latency"
                    },
                    {
                        "CounterId": "498098093037398933",
                        "Category": "WebSocketService",
                        "CounterName": "Latency"
                    },
                    {
                        "CounterId": "1398515776477704395",
                        "Category": "WebSocketService",
                        "CounterName": "Push Counter"
                    }
                ]
        }

        
        // mock ajax
        setTimeout(function() {

            if (cb) cb(mockCounterData)
        }, 500)
    }

    function getSearchResults(counterId, from, to, cb) {
        //todo: use node/express server for data

        // the line below is the marker for automated insertion by the shell script
        // @insertMockSearchData
function mockSearchData(from, to) { 
	var mockSearchData =
		{
			Counter:
				{
					Instances: []
				},	
		}

	var random65 = function() {
	    var buf = new Uint16Array(1);
	    return [].slice.call(window.crypto.getRandomValues(buf), 0).join("") / 1000
	}

	for (var n =0, r = Math.random() * 20; n < r; n++) {
		mockSearchData.Counter.Instances.push({Name: "API ID " + Math.round(Math.random() * 11118374287), Data: []})

		var period = to - from
		var sample = period / 100
		
		for (var m =0; m < 100; m++) {
			mockSearchData.Counter.Instances[n].Data.push([to - ((100 - m) * sample), random65()])
		}	
	}
	return mockSearchData
}



        // mock ajax
        setTimeout(function() {

            if (cb) cb(mockSearchData(from, to))
        }, 500)
    }

    // called after component instantiation -- (see createXyz methods)
    function populateSearchResults(sid, data, from, to) {

        /*
          *     Create State Object Data Structure -- Please have a look at the HTML for listView clone
          *
          *     1. clones are the first level objects
          *
          *     2. Each named element that is not inside a repeatable is a second level object. e.g. numResults
          *
          *     3. Each repeatable (regardless of how deeply nested, including in other repeatables) is a second level object. Each repeatable
          *     must contain all named elements within it as first level objects, disregarding the HTML
          *     hierarchy depth of their nesting, except for repeatables within them which must be moved outside as second level objects within the
          *     state object.
          *
          *     4. Each repeatable is an array of n dimensions where n is the level of repeatable-in-repeatable nesting (n=1 is no nesting)
          *
          *     TODO: semi-automated state object creation/population
          *
         */

        var     numInstances = data.Counter.Instances.length
            ,   numChartsPerInstance = 2
            ,   numSubchartsPerChart = 3

        Route.listView.stateObject().byReference({
            listOverflow: {style: {}},
            expandShrinkList: {style: {}},
            numResults: {
                value: numInstances, 
                style: {}
            },
        })


        var listItemRepeatables =  [
            {
                repeatable: "listItem", 
                indices: [numInstances]
            },
            {
                repeatable: "chart", 
                indices: [numInstances, numChartsPerInstance]
            }
            //,
            // {
            //     repeatable: "subchart", 
            //     indices: [numInstances, numChartsPerInstance, numSubchartsPerChart]
            // }
        ]

        // create n-dimensional arrays where array dimension reprrsents the level of nesting of the repetable
        Route.listView.createRepeatables(listItemRepeatables)


        // populate repeatable structure including any nested repeatables)
        for (var n = 0; n < numInstances; n++) {    
            Route.listView.stateObject().byReference().listItem[n] = {
                itemName: {value: data.Counter.Instances[n].Name, style: {}},
                listItemOverflow: {style: {}, expanded: false},
                moreOrLessInfo: {value: "more", style: {}},
                metricDate: {value: "Data was retrieved at " + new Date(), style: {}},
                i1: {value: "Max value: ", style: {}},
                i1_value: {value: (Math.floor(Math.random() * 65000)) + "ms", style: {}},
                i2: {value: "Standard Deviation: ", style: {} },
                i2_value: {value: Math.round(Math.random() * 200), style: {}},
                i3: {value: "Count/sec: ", style: {}},
                i3_value: {value: Stateful.utils.toFixed(Math.random(),3) + "/sec", style: {}},
                i3_trend: {value: "<img src='assets/img/trend.jpg'/>", style: {}},
                i4: {value: "Average: ", style: {}},
                i4_value: {value: Math.floor(Math.random() * 45000) + "ms", style: {}},
                i4_trend: {value: "<img src='assets/img/trend.jpg'/>", style: {}}
            }
        }

        // chart is a repeatable nested within the parent repeatable and has one instances per each 
        for (var n = 0; n < numInstances; n++) {
            for (var m = 0; m < numChartsPerInstance; m++) {
                Route.listView.stateObject().byReference().chart[n][m] =  {
                    chartWidgetContainer: {data: data.Counter.Instances[n].Data, style: {}, extent: null, from: from, to: to}
                }
            }
        }

        //subchart is a repeatable nested within the parent repeatable and has two instances per each
        // for (var n = 0; n < numInstances; n++) {
        //     for (var m = 0; m < numChartsPerInstance; m++) {
        //         for (var k = 0; k < numSubchartsPerChart; k++) {
        //                 Route.listView.stateObject().byReference().subchart[n][m][k] =  {
        //                     chartThing: {data: data.Counter.Instances[n].Data, style: {}}
        //                 }   
        //         }
        //     }
        // }
    }


    // called after component instantiation -- (see createXyz methods)
    function populateCounters(sid, data, from, to) {

        /*
          *     Create State Object Data Structure -- Please have a look at the HTML for searchBox clone
          *
          *     1. clones are the first level objects
          *
          *     2. Each named element that is not inside a repeatable is a second level object
          *
          *     3. Each repeatable (regardless of how deeply nested, including in other repeatables) is a second level object. Each repeatable
          *     must contain all named elements within it as first level objects, disregarding the HTML
          *     hierarchy depth of their nesting, except for repeatables within them which must be moved outside as second level objects within the
          *     state object.
          *
          *     4. Each repeatable is an array of n dimensions where n is the level of repeatable-in-repeatable nesting (n=1 is no nesting)
          *
          *     TODO: automated state object creation/population
          *
         */

        Route.searchBox.stateObject().byReference({
                                title: {value: "Counters", style: {}},
                                outerBox: {style: {}},
                                inputBox: {style: {}},
                                suggestions: {data: [], style: {display: "none"}}
                            })

        data.Counters.forEach(function(v, i) {
            //if (!v.Category.match(/^~/)) {
                var name = v.Category + "/" + v.CounterName
                var id = v.CounterId

                // TODO: enable automated state object creation/population at the clone-level by
                // aligning HTML named structures with the data structures
                Route.searchBox.stateObject().byReference().suggestions.data.push({name: name, id: id})
            //}
        })

        Route.searchButton.stateObject().byReference({
                search: {style: {}, attr: {}}
        })
    }

    function createProblemList(sid, id) {
        Route.problemsList = ProblemsList()

        Route.problemsList
            .elem($(selectors.problemsListCloneable))
            .sid(sid)
            .clone(id)
    }

    function createSearchBox(sid, id) {
        Route.searchBox = SearchBox()

        Route.searchBox
            .elem($(selectors.searchBoxCloneable))
            .sid(sid)
            .clone(id)

        return Route.searchBox
    }

    function createSearchButton(sid, id) {
        Route.searchButton = Button()
        
        Route.searchButton
            .elem($(selectors.searchButtonCloneable))
            .sid(sid)
            .clone(id)

        return Route.searchButton
    }

    function createListView(sid, id) {
        Route.listView = ListView()

        Route.listView
            .elem($(selectors.listViewCloneable))
            .sid(sid)
            .clone(id)

        return Route.listView
    }

    function createHomeRoute(sid) {
        createProblemList(sid, "HomeAlerts")

        var searchBox = createSearchBox(sid, "Counter")
        var searchButton = createSearchButton(sid, "Query")
        // link related components
        searchBox.searchButton = searchButton
        searchButton.searchBox = searchBox
    }

    function createSearchRoute(sid) {
        var searchBox = createSearchBox(sid, "Counter")
        var searchButton = createSearchButton(sid, "Query")
        // link related components
        searchBox.searchButton = searchButton
        searchButton.searchBox = searchBox

        createListView(sid, "CounterInstances") 
    }

    // called after state object creation (see populateXyz() methods)
    function renderHome(sid) {

        resetPage(sid)

        var problemsListContainer =  Route.problemsList.adopt($(Route.pageContainer).find(selectors.problemsListContainer))

        for (var n=0; n < Route.problemsList.stateObject().byValue().listItem.length; n++) {
            var listItemInstance = Route.problemsList.repeat($(problemsListContainer).find(selectors.ProblemsListItemRepeatable))
            Route.problemsList
                .render($(listItemInstance).find(selectors.ProblemsListText))
                .render($(listItemInstance).find(selectors.ProblemsListTimestamp))
                .render($(listItemInstance).find(selectors.ProblemsListGauge))
                .render($(listItemInstance).find(selectors.ProblemsListBars))
        }

        var searchBoxContainer = Route.searchBox.adopt($(Route.pageContainer).find(selectors.searchContainer))

        Route.searchBox
            .render($(searchBoxContainer).find(selectors.searchTitle))
            .render($(searchBoxContainer).find(selectors.searchBox))
            .render($(searchBoxContainer).find(selectors.inputBox))
            .render($(searchBoxContainer).find(selectors.suggestions))


        var searchButtonContainer = Route.searchButton.adopt($(Route.pageContainer).find(selectors.buttonContainer))

        Route.searchButton
            .render($(searchButtonContainer).find(selectors.searchButton))

        Route.searchButton.buttonState()

        // todo:
        // periodically call home screen APIs, update the home state model and render new items in the
        // problems list clone
        // cancel update interval upon query submission
        // implement refresh/pause behaviors

        // show the page
        $(Route.pageContainer).show()

    }

    // called after state object creation (see populateXyz() methods)
    function renderSearch(sid) {

        resetPage(sid)

        var searchBoxContainer = Route.searchBox.adopt($(Route.pageContainer).find(selectors.searchContainer))

        Route.searchBox
            .render($(searchBoxContainer).find(selectors.searchTitle))
            .render($(searchBoxContainer).find(selectors.searchBox))

        Route.searchBox
            .render($(searchBoxContainer).find(selectors.inputBox))
            .render($(searchBoxContainer).find(selectors.suggestions))

        var searchButtonContainer = Route.searchButton.adopt($(Route.pageContainer).find(selectors.buttonContainer))

        Route.searchButton
            .render($(searchButtonContainer).find(selectors.searchButton))

        Route.searchButton.buttonState()

        var listViewContainer = Route.listView
                            .adopt($(Route.pageContainer).find(selectors.listViewContainer))

        Route.listView.render($(listViewContainer).find(selectors.listViewNumResults))

        for (var n=0; n < Route.listView.stateObject().byValue().listItem.length; n++) {
            var listItemInstance = Route.listView.repeat($(listViewContainer).find(selectors.listViewListItemRepeatable))
            Route.listView
                .render($(listItemInstance).find(selectors.ItemName))
                .render($(listItemInstance).find(selectors.MoreOrLessInfo))
                .render($(listItemInstance).find(selectors.ListItemOverflow))
                .render($(listItemInstance).find(selectors.metricDate))
                .render($(listItemInstance).find(selectors.Item1))
                .render($(listItemInstance).find(selectors.Item1Value))
                .render($(listItemInstance).find(selectors.Item2))
                .render($(listItemInstance).find(selectors.Item2Value))
                .render($(listItemInstance).find(selectors.Item3))
                .render($(listItemInstance).find(selectors.Item3Value))
                .render($(listItemInstance).find(selectors.Item3Trend))
                .render($(listItemInstance).find(selectors.Item4))
                .render($(listItemInstance).find(selectors.Item4Value))
                .render($(listItemInstance).find(selectors.Item4Trend))

            for (var m=0; m < Route.listView.stateObject().byValue().chart[n].length;m++) {
                var chartInstance = Route.listView.repeat($(listItemInstance).find(selectors.listViewChartRepeatable))
                    Route.listView
                        .render($(chartInstance).find(selectors.chartWidgetContainer))

                // for (var k=0; k < Route.listView.stateObject().byValue().subchart[n][m].length;k++) {
                //     var subchartInstance = Route.listView.repeat($(chartInstance).find(selectors.listViewSubchartRepeatable))
                    
                //     Route.listView
                //         .render($(subchartInstance).find(selectors.chartThing))
                // }    
            }
        }

        // show the page
        $(Route.pageContainer).show()

        // event handlers unique to this route
        Route.expandListItem = function(e) {
            var instance = Stateful.getRepeatedInstance(e.target)
            var comp = Stateful.getComponent(e.target)

            if (!comp.state($(instance).find(selectors.ListItemOverflow)).byValue().expanded)
            {
                comp.state($(instance).find(selectors.ListItemOverflow)).byReference({style: {height: "25rem"}, expanded: true})
                comp.state($(instance).find(selectors.MoreOrLessInfo)).byReference().value = "less"
                comp.render($(instance).find(selectors.MoreOrLessInfo))
                comp.render($(instance).find(selectors.ListItemOverflow))
            } else {
                comp.state($(instance).find(selectors.ListItemOverflow)).byReference({style: {height: "6.875rem"}, expanded: false})
                comp.state($(instance).find(selectors.MoreOrLessInfo)).byReference().value = "less"
                comp.render($(instance).find(selectors.MoreOrLessInfo))
                comp.render($(instance).find(selectors.ListItemOverflow))
            }
        }
    }

    function resetPage(sid) {
         // reset page
        if (window["__" + $(Route.pageContainer).attr('page') + "_page"] && window["__" + $(Route.pageContainer).attr('page') + "_page"].initialHTML) {
            $(Route.pageContainer).html("")
            $(Route.pageContainer).html(window["__" + $(Route.pageContainer).attr('page') + "_page"].initialHTML)

            Route.pageContainer.createPageElements(sid)

        } else {
            window["__" + $(Route.pageContainer).attr('page') + "_page"] = {}
            window["__" + $(Route.pageContainer).attr('page') + "_page"].initialHTML = $(Route.pageContainer).html()
        }
    }

    //
    // Routing
    // todo: move logic into rendering controllers
    //
    var Router = Backbone.Router.extend({
        routes: {
            "":     "index",    // login page
            "home/sid/:sid(/)":      "home",      // /#home
            "search/counter/:counterId/sid/:sid/from/:from/to/:to(/)":    "search",    // /#results
            "*notFound(/)":     "default"       // /#anything that doesn't match a route
        },

        // Backbone's History API is as you'd expect it:
        // if the app is transitioning state then the app can invoke
        // router with the route URL and {trigger: true} so that the corresponding route function below gets invoked
        // If the user enters the URL directly then the router invokes the corresponding route
        // function and executes the setup for that Route.
        //

        index: function() {

            // todo:
            // if user is not authenticated
            //      reset uiState {}
            //      show login page
            //      on login submit
            //          check if user authenticates
            //          if yes, then do as below
            //          else display error under login
            // for now, we assume user is authenticated

            // generate new uuid for state model
            var newSid = Stateful.getUUID()

            Stateful.newState(newSid)

            createHomeRoute(newSid)

            function runAtEnd() {
                Stateful.router.navigate('home/sid/' + newSid, {trigger: true})
            }

            // the line below is the marker for automated insertion by the shell script
            // @insertMockProblemsListStateObject
// this is a shortcut for bypassing state object creation from mock data
// can make for faster prototyping

/*
  *     Create State Object Data Structure -- Please have a look at the HTML for searchBox clone
  *
  *     1. clones are the first level objects
  *
  *     2. Each named element that is not inside a repeatable is a second level object
  *
  *     3. Each repeatable (regardless of how deeply nested, including in other repeatables) is a second level object. Each repeatable
  *     must contain all named elements within it as first level objects, disregarding the HTML
  *     hierarchy depth of their nesting, except for repeatables within them which must be moved outside as second level objects within the
  *     state object.
  *
  *     4. Each repeatable is an array of n dimensions where n is the level of repeatable-in-repeatable nesting (n=1 is no nesting)
  *
  *     TODO: automated state object creation/population
  *
 */

 var __val = "Name of Metric Counter Instance and percentage above threshold"
 var __val2 = "Name of Event Counter and above-threshold value"

 var mockProblemsList =
      {
          problemsList_HomeAlerts: {
              listItem:
                  [
                      {
                          bars: {style: {"background-color": "red"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {"background-color": "red"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "red"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {"background-color": "orange"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "orange"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "#edd132"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "#edd132"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      }
                  ]
          }
      }



            // todo: replace with real API
            // merge mock api response with the state object
            _.merge(uiState[newSid], mockProblemsList)

            var done = Stateful.parallel(2, runAtEnd)
            // todo
            // get list the problems and update ui state
            // then call done
            done()

            // todo: let user chage begin and end time from slider next to search button
            // todo: update begin and end time whem user does so
            var from = settings.query.beginTime()
            var to = settings.query.endTime()

            // get counters and update ui state
            getCounters(function(data) {
                populateCounters(newSid, data)
                done()
            })
        },

        home: function(sid) {

            // todo:
            // redirect to index if user is not authenticated

            Route.pageContainer = $(selectors.homePage)

            Route.pageContainer.createPageElements = createHomeRoute

            // hide the page
            $(Route.pageContainer).hide()

            // hide all other pages
            $(selectors.searchPage).hide()

            if (!Stateful.exists(sid)) {

                var newSid = Stateful.getUUID()

                Stateful.newState(newSid)

                createHomeRoute(newSid)

                var runAtEnd = function() {
                    renderHome(newSid)
                }

                // todo: remove mock data insertion and merge once next todo is done

                // the line below is the marker for automated insertion by the shell script
                // @insertMockProblemsListStateObject
// this is a shortcut for bypassing state object creation from mock data
// can make for faster prototyping

/*
  *     Create State Object Data Structure -- Please have a look at the HTML for searchBox clone
  *
  *     1. clones are the first level objects
  *
  *     2. Each named element that is not inside a repeatable is a second level object
  *
  *     3. Each repeatable (regardless of how deeply nested, including in other repeatables) is a second level object. Each repeatable
  *     must contain all named elements within it as first level objects, disregarding the HTML
  *     hierarchy depth of their nesting, except for repeatables within them which must be moved outside as second level objects within the
  *     state object.
  *
  *     4. Each repeatable is an array of n dimensions where n is the level of repeatable-in-repeatable nesting (n=1 is no nesting)
  *
  *     TODO: automated state object creation/population
  *
 */

 var __val = "Name of Metric Counter Instance and percentage above threshold"
 var __val2 = "Name of Event Counter and above-threshold value"

 var mockProblemsList =
      {
          problemsList_HomeAlerts: {
              listItem:
                  [
                      {
                          bars: {style: {"background-color": "red"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {"background-color": "red"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "red"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {"background-color": "orange"}},
                          gauge: {style: {display:"none"}},
                          text: {value: __val, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "orange"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "#edd132"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      },
                      {
                          bars: {style: {display:"none"}},
                          gauge: {value: "", style: {"background-color": "#edd132"}},
                          text: {value: __val2, style: {}},
                          timestamp: {value: Stateful.utils.timeAgo(new Date(+new Date() - Math.round(Math.random() * 300000))), style: {}}
                      }
                  ]
          }
      }



                _.merge(uiState[newSid], mockProblemsList)

                var done = Stateful.parallel(2, runAtEnd)
                // todo: get problems list and updare ui state
                // and invoke done in the problem list populate callback
                done()

                // todo: let user change begin and end time from slider next to search button
                // todo: update begin and end time whem user does so
                var from = settings.query.beginTime()
                var to = settings.query.endTime()

                // get counters and update ui state
                getCounters(function(data) {
                    populateCounters(newSid, data)
                    done()
                })

                Stateful.router.navigate('home/sid/' + newSid, {trigger: false})
            } else {

                renderHome(sid)
            }

            // shared event handlers for the above component are defined in a separate file 
            // @insertCommonEventHandlers

Route.autoCompleteOnFocus = function(e) {
    var comp = Stateful.getComponent(e.target)

    var val = $(e.target).val().trim()

    if (val) {}

    comp.loadAutoCompleteResults(comp.defaultSuggestions())
    comp.showAutoComplete()
}

Route.autoCompleteOnBlur = function(e) {
    Route.searchBox.hideAutoComplete()
}

Route.searchKeyEvents = function(e) {

    var comp = Stateful.getComponent(e.target)

    comp.searchButton.buttonState()

    var val = $(e.target).val().trim()
    var o = []

    comp.defaultSuggestions().forEach(function(v, i) {

        if (!val) {
            o = []
        } else {
            if (v.name.match(new RegExp("^" + val.replace(/[\-\[\]{}()*+?\.,\\\^$|#\s]/g, "\\$&")))) {
                o[i] = v
            }
        }
    })

    comp.loadAutoCompleteResults(o)
    comp.showAutoComplete()
}

Route.overAutoCompleteItem = function(e) {

    var comp = Stateful.getComponent(e.target)

    $(comp.elem()).find(selectors.suggestionItems).css({background: "transparent"})
    $(e.target).css({background:"lightgray"})
    divSelected = $(e.target)
}

Route.search = function(e) {

    var newSid = Stateful.getUUID()

    var searchData
    var countersData

    var runAtEnd = function() {

        // create new route
        Stateful.newState(newSid)

        createSearchRoute(newSid)

        populateCounters(newSid, countersData)

        populateSearchResults(newSid, searchData, from, to)

        // preload input box value into searchBox state object for new route
        Route.searchBox.stateObject().byReference().inputBox.value = $(comp.searchBox.elem()).find('input').val().trim()

        // go to the new
        Stateful.router.navigate('search/counter/' + encodeURIComponent(cid) +
        "/sid/" + newSid + "/from/" + from + "/to/" + to, {trigger: true})
    }

    // get component object from element
    var comp = Stateful.getComponent(e.target)

    // get state of the searchBox dependency
    var data = comp.searchBox.stateObject().byValue().suggestions.data

    var cid = Stateful.utils.getMatchingObjects(data, "name", $(comp.searchBox.elem()).find('input').val().trim())[0].id

    var done = Stateful.parallel(2, runAtEnd)

    // todo: let user chage begin and end time from slider next to search button
    // todo: update begin and end time whem user does so
    var from = settings.query.beginTime()
    var to = settings.query.endTime()

    // get counters and update ui state
    getCounters(function(data) {
        countersData = data
        done()
    })

    //get search results and update ui state
    getSearchResults(cid, from, to, function(data) {
        searchData = data
        done()
    })
}

var divSelected;
var overflow = false;

Route.selectAutoCompleteItem = function(e) {
    if (e.type == "click") {

        // get component object from element
        var comp = Stateful.getComponent(e.target)

        $(comp.elem()).find(selectors.inputBox).val($(e.target).text())
        $(comp.elem()).find(selectors.inputBox).focus()
        
        Route.searchBox.hideAutoComplete()
        Route.searchButton.buttonState()

        return
    }
}

        },

        search: function(counterId, sid, from, to) {

            // todo:
            // redirect to index if user is not authenticated

            // hide all other pages
            $(selectors.homePage).hide()

            Route.pageContainer = $(selectors.searchPage)

            Route.pageContainer.createPageElements = createSearchRoute

            // hide the page
            $(Route.pageContainer).hide()

            // hide all pages
            $(selectors.homePage).hide()

            // if query has not been executed
            if (!Stateful.exists(sid)) {

                var newSid = Stateful.getUUID()

                Stateful.newState(newSid)

                createSearchRoute(newSid)

                var runAtEnd = function() {
                    var data = Route.searchBox.stateObject().byValue().suggestions.data

                    Route.searchBox.stateObject().byReference().inputBox.value = Stateful.utils.getMatchingObjects(data, "id", counterId)[0].name

                    renderSearch(newSid)
                }

                var done = Stateful.parallel(2, runAtEnd)

                // get counters and update ui state
                getCounters(function(data) {
                    populateCounters(newSid, data)
                    done()
                })

                // get search results and update ui state
                getSearchResults(counterId, from, to, function(data) {
                    populateSearchResults(newSid, data, from, to)
                    done()
                })

                Stateful.router.navigate('search/counter/' + counterId + "/sid/" + newSid + "/from/" + from + "/to/" + to, {trigger: false})
            } else {

                renderSearch(sid)
            }

            // shared event handlers for the above component are defined in a separate file 
            // @insertCommonEventHandlers

Route.autoCompleteOnFocus = function(e) {
    var comp = Stateful.getComponent(e.target)

    var val = $(e.target).val().trim()

    if (val) {}

    comp.loadAutoCompleteResults(comp.defaultSuggestions())
    comp.showAutoComplete()
}

Route.autoCompleteOnBlur = function(e) {
    Route.searchBox.hideAutoComplete()
}

Route.searchKeyEvents = function(e) {

    var comp = Stateful.getComponent(e.target)

    comp.searchButton.buttonState()

    var val = $(e.target).val().trim()
    var o = []

    comp.defaultSuggestions().forEach(function(v, i) {

        if (!val) {
            o = []
        } else {
            if (v.name.match(new RegExp("^" + val.replace(/[\-\[\]{}()*+?\.,\\\^$|#\s]/g, "\\$&")))) {
                o[i] = v
            }
        }
    })

    comp.loadAutoCompleteResults(o)
    comp.showAutoComplete()
}

Route.overAutoCompleteItem = function(e) {

    var comp = Stateful.getComponent(e.target)

    $(comp.elem()).find(selectors.suggestionItems).css({background: "transparent"})
    $(e.target).css({background:"lightgray"})
    divSelected = $(e.target)
}

Route.search = function(e) {

    var newSid = Stateful.getUUID()

    var searchData
    var countersData

    var runAtEnd = function() {

        // create new route
        Stateful.newState(newSid)

        createSearchRoute(newSid)

        populateCounters(newSid, countersData)

        populateSearchResults(newSid, searchData, from, to)

        // preload input box value into searchBox state object for new route
        Route.searchBox.stateObject().byReference().inputBox.value = $(comp.searchBox.elem()).find('input').val().trim()

        // go to the new
        Stateful.router.navigate('search/counter/' + encodeURIComponent(cid) +
        "/sid/" + newSid + "/from/" + from + "/to/" + to, {trigger: true})
    }

    // get component object from element
    var comp = Stateful.getComponent(e.target)

    // get state of the searchBox dependency
    var data = comp.searchBox.stateObject().byValue().suggestions.data

    var cid = Stateful.utils.getMatchingObjects(data, "name", $(comp.searchBox.elem()).find('input').val().trim())[0].id

    var done = Stateful.parallel(2, runAtEnd)

    // todo: let user chage begin and end time from slider next to search button
    // todo: update begin and end time whem user does so
    var from = settings.query.beginTime()
    var to = settings.query.endTime()

    // get counters and update ui state
    getCounters(function(data) {
        countersData = data
        done()
    })

    //get search results and update ui state
    getSearchResults(cid, from, to, function(data) {
        searchData = data
        done()
    })
}

var divSelected;
var overflow = false;

Route.selectAutoCompleteItem = function(e) {
    if (e.type == "click") {

        // get component object from element
        var comp = Stateful.getComponent(e.target)

        $(comp.elem()).find(selectors.inputBox).val($(e.target).text())
        $(comp.elem()).find(selectors.inputBox).focus()
        
        Route.searchBox.hideAutoComplete()
        Route.searchButton.buttonState()

        return
    }
}

        },

        default: function() {
            // TODO:
            // display 404 error
        }
    });

    Stateful.router = new Router;

    Backbone.history.start();

})({}, Backbone);

