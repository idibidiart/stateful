ui
==

Building:

cd build; ./build

Running:

OS X:

In main folder, start local web server, e.g.:

python -m SimpleHTTPServer 8080 (or node or whatever)

then browse to http://localhost:8080

ONLY TESTED ON CHROME :D (shamelessly)

Youtube:

<< WATCH ME FIRST >>

https://www.youtube.com/watch?v=UacbvV4GpYk


What the video demonstrates:

1. Single Page App (SPA) framework based that supports stateful UI components with independenlty developed HTML/CSS/JS, D3/SVG, Canvas or WebGL widgets (the code has a D3 widget example used in a stateful component) It stores all UI state as well as all derived data (e.g. data that has been transformed and made consuable by some widget) which can be accessed by value (immutable) or by reference (mutable) It remembers the entire state of each page, thus allowing for things such as state transfer (between users at the component or page scope) as well as recording and replay of user interaction.

2. Parallel fetching data and storing in state model prior to rendering the entire page all at once upon page transition, so new and old pages appear instantly. Usually, SPAs transition to the page then render it in piecemeal fashion after the page has already been transitioned to, leading to an ugly experience. The key is that everything appears instantly in both forward and back directions (new pages and previous pages are rendered from optimized state object data structure that has already been populated with data)

What the video doesn't show but is already implemented and can be seen in the code:

1. You may choose HTML, SVG, Canvas, WebGL or any technology available from the Javascript environment with Stateful.JS and get the benefits of stateful rendering for free. In other words, using Stateful.JS you only work with the app's state via an optimized state object, and not directly embedding state into the DOM (HTML or SVG), or individual data structures in case of Canvas and WebGL. The UI components, which can include independently developed widgets (in any technology, e.g. SVG or WebGL) are rendered onto the DOM from the state object (the root HTML elements in case of Canvas, SVG and WebGL), so the main architectural advantage here is not only the separation of state from the DOM but also the separation of state from the rendering technology. This is achieved at the developer level by specifying Rendering Scheme that may use whatever technology to draw on the screen and handle UI events while having the state of the app in one data structure outside of the view and independent of the rendering technology. Stateful.JS was designed for real world scenarios where UI components built in a completely different technology, not just different component model, may be utilized, with the benefit of retaining state outside of the view (the view will still have its own state in the HTML or SVG DOM, Canvas, or WebGL, but it flows in one direction from the state object to the DOM and widgets attached to the view's DOM tree. Stateful.JS does not have "data models" like in Backbone, but an optimized data structure for storing state and derived data. The raw data received from the server would be stored in a caching layer like IndexedDB with user developed NoSQL query API [I have something in the works, too])

2. StatefulJS llows Designers to work with HTML or SVG DOM tree prototypes which are then expanded into the actual rendered structures. The renderer is blazing fast and does not use string concatenation.

Use pre-existing framework-independent HTML/SVG/Canvas/WebGL widgets in Stateful.JS components:

See the D3-powered chartWidget.js and the ListView Stateful.JS component in components.js for an example of using pre-existing, framework-indepedent D3 widget inside of Stateful.JS components. Similarly, framework-independent HTML, Canvas and WebGL components (developed with any library) maybe used inside of Stateful.JS components. 

What is next:

Implementing the current persistent chart widget example with Canvas and WebGL (click more in search results to see current example using a D3 widget) 



