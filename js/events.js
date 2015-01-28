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

    