
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
