/* ************************************************************************

   Copyright: 2019 

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * This is the main application class of "sqvdiagram"
 *
 * @asset(sqvdiagram/*)
 * 
 * https://www.beyondjava.net/how-to-connect-html-elements-with-an-arrow-using-svg
 */
qx.Class.define("sqvdiagram.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      var windowManager = new qx.ui.window.Manager();

      var desktop = new qx.ui.window.Desktop(windowManager);

      var connobj = new sqvdiagram.SimpleConnect();

      // Document is the application root
      var doc = this.getRoot();

      doc.add(desktop, {edge:0});

      var diagramdata = 
      {
        "swimlanes" : [
          {
            "id" : 1,
            "title" : "Swimlane 01",
            "width" : 1000,
            "height" : 450,
            "left" : 50,
            "top" : 50
          }
        ],
        "shapes" : [
          {
            "id" : 2,
            "title" : "Start",
            "shape" : "circle",
            "width" : 50,
            "height" : 50,
            "left" : 60,
            "top" : 150
          },
          {
            "id" : 3,
            "title" : "Window 1",
            "shape" : "window",
            "width" : 120,
            "height" : 100,
            "left" : 200,
            "top" : 150
          },
          {
            "id" : 4,
            "title" : "Window 2",
            "shape" : "window",
            "width" : 120,
            "height" : 100,
            "left" : 640,
            "top" : 170
          },
          {
            "id" : 5,
            "title" : "  Window 3",
            "shape" : "window",
            "width" : 120,
            "height" : 100,
            "left" : 430,
            "top" : 75
          },
          {
            "id" : 6,
            "title" : "End",
            "shape" : "circle",
            "width" : 50,
            "height" : 50,
            "left" : 670,
            "top" : 350
          }
        ],
        "connections" : [
          {
            "elementA" : 2,
            "elementB" : 3,
            "options" : {color : "gray"}
          },
          {
            "elementA" : 3,
            "elementB" : 4,
            "options" : {color : "gray"}
          },
          {
            "elementA" : 3,
            "elementB" : 5,
            "options" : {color : "gray"}
          },
          {
            "elementA" : 5,
            "elementB" : 6,
            "options" : {color : "gray"}
          },
          {
            "elementA" : 4,
            "elementB" : 6,
            "options" : {color : "gray"}
          }
        ]
      }
     
      //Swimlanes
      if (diagramdata.swimlanes != undefined) {
        for (var i=0; i<diagramdata.swimlanes.length; i++)
        {
          var def = diagramdata.swimlanes[i];
          var win = new qx.ui.window.Window(def.title).set({
            width: def.width,
            height: def.height,
            showMaximize : false,
            showMinimize : false,
            anonymous: true
          });
          win.moveTo(def.left, def.top);
          desktop.add(win);
          win.open();
        }
      }

      //Shapes
      if (diagramdata.shapes != undefined) {
        for (var j=0; j<diagramdata.shapes.length; j++)
        {
          var defsh = diagramdata.shapes[j];
          var winsh = new qx.ui.window.Window(defsh.title).set({
            width: defsh.width,
            height: defsh.height,
            showMaximize : false,
            showMinimize : false,
            decorator: defsh.shape, 
            useMoveFrame: true
          });
          winsh.setLayout(new qx.ui.layout.Canvas());
          winsh.setUserData("shapeid", defsh.id);
          winsh.moveTo(defsh.left, defsh.top);

          // get all windows for window listners to leverage
          var allwins = desktop.getWindows();

          // add move listner to each shape
          winsh.addListener("move", function(e) {
            var arrwins = [];
            allwins.forEach(function(winobj) {
              if (winobj.getUserData("shapetype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            connobj.repositionConnections(arrwins);
          });

          // add resize listner to each shape.
          winsh.addListener("resize", function(e) {
            var arrwins = [];
            allwins.forEach(function(winobj) {
              if (winobj.getUserData("shapetype")=="connectline") 
              {
                if (winobj.getVisibility() == "visible" && (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode()))
                {
                  arrwins.push(winobj);
                }
              }
            }, this);
            connobj.repositionConnections(arrwins);
          });

          // add close listner to each shape. This will also close the shape's related connections
          /*winsh.addListener("close", function(e) {
            allwins.forEach(function(winobj) {
              if (winobj.getUserData("shapetype")=="connectline") 
              {
                if (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode())
                {
                  // close connection
                  winobj.close();
                }
              }
            }, this);
          });*/

          desktop.add(winsh);
          winsh.open();
        }
      }

      // draw connectors on appear of the diagram viewer
      desktop.addListener("appear", function(e) {
        
        var alldsktpwins = desktop.getWindows();

        //Connections
        if (diagramdata.connections != undefined) {
          for (var k=0; k<diagramdata.connections.length; k++)
          {
            var defc = diagramdata.connections[k];
            var eleA = alldsktpwins.find(function(elA) { 
              return elA.getUserData("shapeid") == defc.elementA;
            });
            var eleB = alldsktpwins.find(function(elB) {
              return elB.getUserData("shapeid") == defc.elementB;
            });
            connobj.connect(eleA, eleB, defc.options, desktop);
          }
        }
      });

    }
  }
});