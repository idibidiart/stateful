    
function Button() {
    var obj = {};

    // common extensions for the above component are defined in a separate file 
    // @insertCommonComponentExtensions


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
