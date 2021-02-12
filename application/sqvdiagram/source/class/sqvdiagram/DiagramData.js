qx.Class.define("sqvdiagram.DiagramData",
{
  extend : qx.core.Object,

  statics :
  {
    DIAGRAMS : {
      BasicFlowchart : {
        "shapes" : [
          {
            id : 1,
            left : 400,
            top : 100,
            properties : {},
            options : {
              content : 'Start',
              shape : "circle-pill"
            }
          },
          {
            id : 2,
            left : 400,
            top : 250,
            properties : {},
            options : {
              content : 'Step 1',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 3,
            left : 400,
            top : 420,
            properties : {},
            options : {
              content : 'Decision',
              shape : "diamond"
            }
          },
          {
            id : 4,
            left : 600,
            top : 420,
            properties : {},
            options : {
              content : 'Step 2',
              shape : "square-rectangle-sharp"
            }
          },
          {
            id : 5,
            left : 400,
            top : 600,
            properties : {},
            options : {
              content : 'End',
              shape : "circle-pill"
            }
          },
          {
            id : 6,
            left : 800,
            top : 500,
            properties : {visibility: "hidden"},
            options : {
              content : 'label'
            }
          }
        ],
        "connections" : [
          {
            elementA : 1,
            elementB : 2,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical",
              direction : "AtoB"
            }
          },
          {
            elementA : 2,
            elementB : 3,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical",
              direction : "AtoB"
            }
          },
          {
            elementA : 3,
            elementB : 4,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "horizontal", 
              anchorB : "horizontal",
              direction : "AtoB"
            }
          },
          {
            elementA : 4,
            elementB : 2,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "horizontal",
              direction : "AtoB"
            }
          },
          {
            elementA : 3,
            elementB : 5,
            properties : {backgroundColor : "gray"},
            options : {
              anchorA: "vertical", 
              anchorB : "vertical",
              direction : "AtoB"
            }
          }
        ]
      },
      NetworkDiagram : {
            "shapes" : [
              {
                id : 1,
                left : 70,
                top : 100,
                properties : {},
                options : {
                  content : 'Server',
                  image : "sqvdiagram/server_01.png"
                }
              },            
              {
                id : 2,
                left : 200,
                top : 300,
                properties : {},
                options : {
                  content : "6 Port Switch",
                  image : "sqvdiagram/switch_01.png"
                }
              },
              {
                id : 3,
                left : 400,
                top : 100,
                properties : {},
                options : {
                  content : "Router",
                  image : "sqvdiagram/router_01.png"
                }
              },
              {
                id : 4,
                left : 690,
                top : 130,
                properties : {},
                options : {
                  content : "ISP",
                  image : "sqvdiagram/isp_01.png"
                }
              },
              {
                id : 5,
                left : 950,
                top : 100,
                properties : {},
                options : {
                  content : "Cloud",
                  image : "sqvdiagram/cloud_01.png"
                }
              },
              {
                id : 6,
                left : 70,
                top : 530,
                properties : {},
                options : {
                  content : "Printer",
                  image : "sqvdiagram/printer_01.png"
                }
              },
              {
                id : 7,
                left : 320,
                top : 530,
                properties : {},
                options : {
                  content : "Workstation",
                  image : "sqvdiagram/computer_01.png"
                }
              },
              {
                id : 8,
                left : 570,
                top : 530,
                properties : {},
                options : {
                  content : "Workstation",
                  image : "sqvdiagram/computer_01.png"
                }
              },
              {
                id : 9,
                left : 700,
                top : 400,
                properties : {},
                options : {
                  content : "<b>A simple network diagram</b>"
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
                  elementA : 3,
                  elementB : 2,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 3,
                  elementB : 4,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "horizontal"
                  }
                },
                {
                  elementA : 4,
                  elementB : 5,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "horizontal", 
                    anchorB : "horizontal"
                  }
                },
                {
                  elementA : 2,
                  elementB : 6,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 2,
                  elementB : 7,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                },
                {
                  elementA : 2,
                  elementB : 8,
                  properties : {backgroundColor : "gray"},
                  options : {
                    anchorA: "vertical", 
                    anchorB : "vertical"
                  }
                }
            ]
        }
    }
  }
});