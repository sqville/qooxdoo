qx.Class.define("sqvdiagram.DiagramData",
{
  extend : qx.core.Object,

  statics :
  {
    DIAGRAMS : {
        SuperSimple : {
            "labels" : [
              {
                id : 1,
                left : 160,
                top : 70,
                properties : {
                  label : "<b>I am a Label Object</b>",
                  icon : "sqvdiagram/horizontal-horizontal.png",
                  rich : true,
                  width : 180,
                  height : 40
                }
              }
            ],
            "swimlanes" : [],
            "shapes" : [
              {
                id : 1,
                left : 360,
                top : 50,
                properties : {
                  width : 80,
                  height : 80,
                  decorator : "circle"
                },
                options : {
                  content : "The Electorate"
                }
              },            
              {
                id : 2,
                left : 360,
                top : 300,
                properties : {
                  width : 120,
                  height : 100
                },
                options : {
                  content : "Governor"
                }
              },
              {
                id : 3,
                left : 159,
                top : 300,
                properties : {
                  width : 120,
                  height : 100
                },
                options : {
                  content : "Attorney General"
                }
              },
              {
                id : 4,
                left : 600,
                top : 300,
                properties : {
                  width : 120,
                  height : 100
                },
                options : {
                  content : "Lieutenant Governor"
                }
              },
              {
                id : 5,
                left : 550,
                top : 500,
                properties : {
                  width : 120,
                  height : 100
                },
                options : {
                  content : "Sec of State"
                }
              }
            ],
            "connections" : [
                {
                    elementA : 1,
                    elementB : 2,
                    properties : {backgroundColor : "gray"},
                    options : {
                        anchorA: "horizontal", 
                        anchorB : "vertical"
                    }
                },
                {
                  elementA : 1,
                  elementB : 3,
                  properties : {backgroundColor : "gray"},
                  options : {
                      anchorA: "vertical", 
                      anchorB : "vertical"
                  }
                },
                {
                  elementA : 1,
                  elementB : 4,
                  properties : {backgroundColor : "gray"},
                  options : {
                      anchorA: "horizontal", 
                      anchorB : "horizontal"
                  }
                },
                {
                  elementA : 1,
                  elementB : 5,
                  properties : {backgroundColor : "gray"},
                  options : {
                      anchorA: "vertical", 
                      anchorB : "vertical"
                  }
                }
            ]
        },
        
        
        diagramdata_old : {
            "swimlanes" : [],
            "shapes" : [
              {
                id : 2,
                left : 60,
                top : 150,
                properties : {
                  caption : "Start",
                  width : 50,
                  height : 50,
                  decorator : "circle"
                }
              },
              {
                id : 3,
                left : 200,
                top : 150,
                properties : {
                  caption : "Window 1",
                  decorator : "window",
                  width : 120,
                  height : 100
                }
              },
              {
                id : 4,
                left : 640,
                top : 170,
                properties : {
                  caption : "Window 2",
                  decorator : "window",
                  width : 120,
                  height : 100
                }
              },
              {
                id : 5,
                left : 430,
                top : 75,
                properties : {
                  caption : "Window 3",
                  decorator : "window",
                  width : 120,
                  height : 100
                }
              },
              {
                id : 6,
                left : 670,
                top : 350,
                properties : {
                  caption : "End",
                  decorator : "circle",
                  width : 50,
                  height : 50
                }
              }
            ],
            "connections" : [
              {
                elementA : 2,
                elementB : 3,
                properties : {backgroundColor : "gray"}
              },
              {
                elementA : 3,
                elementB : 4,
                properties : {backgroundColor : "gray"}
              },
              {
                elementA : 3,
                elementB : 5,
                properties : {backgroundColor : "gray"}
              },
              {
                elementA : 5,
                elementB : 6,
                properties : {backgroundColor : "gray"}
              },
              {
                elementA : 4,
                elementB : 6,
                properties : {backgroundColor : "gray"}
              }
            ]
        }
    }
  }
});