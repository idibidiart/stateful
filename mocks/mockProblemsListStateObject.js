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

