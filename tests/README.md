tests
=====

Only "state controllers" are testable via JS unit testing frameworks

Render() function takes reference to state object created by state controllers and injects values and styles into the DOM
so Sauce Labs or headless browser is needed for tests (jsdom should be possible)