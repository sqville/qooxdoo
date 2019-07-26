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
            "width" : 1200,
            "height" : 500,
            "left" : 0,
            "top" : 0
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
            "shape" : "rectangle-rounded",
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
            "options" : {color : "green"}
          },
          {
            "elementA" : 3,
            "elementB" : 5,
            "options" : {color : "blue"}
          },
          {
            "elementA" : 5,
            "elementB" : 6,
            "options" : {color : "orange"}
          },
          {
            "elementA" : 4,
            "elementB" : 6,
            "options" : {color : "yellow"}
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

          // TEST Add popups
          /*var arrowdowndec = new qx.ui.decoration.Decorator().set({
            color : ["gray","transparent",null,"transparent"],
            style : ["solid", "solid",null,"solid"],
            width : [8,8.5,0,8.5]
          });

          var arrowrightdec = new qx.ui.decoration.Decorator().set({
            color : ["transparent",null,"transparent", "gray"],
            style : ["solid",null,"solid","solid"],
            width : [8.5,0,8.5,8]
          });

          var parrow = new qx.ui.popup.Popup().set({backgroundColor: "white", anonymous: true, width: 10, height: 10, decorator: arrowrightdec, placementModeX: "direct", placementModeY: "direct"});
          parrow.setUserData("shapetype", "connection-point");
          parrow.setPosition("left-middle");
          parrow.setOffset([0,0,0,0]);
          parrow.setAutoHide(false);
          parrow.placeToWidget(winsh, true);
          winsh.setUserData("connpoint", parrow);
          parrow.show();*/

          /*var parrow4 = parrow.clone();
          parrow4.setOffset([0,4,0,0]);
          parrow4.setPosition("right-middle");
          parrow4.setAutoHide(false);
          parrow4.placeToWidget(winsh, true);
          //parrow4.show();
 
          var parrow7 = parrow.clone();
          parrow7.setOffset([0,0,4,0]);
          parrow7.setPosition("bottom-center");
          parrow7.setAutoHide(false);
          parrow7.placeToWidget(winsh, true);
          //parrow7.show();

          // note
          winsh.addListener("activate", function(e) {
            parrow.show();
            parrow4.show();
            parrow7.show();
          });
          winsh.addListener("deactivate", function(e) {
            parrow.hide();
            parrow4.hide();
            parrow7.hide();
          })*/

          var connpointdec = new qx.ui.decoration.Decorator().set({
            color : "gray",
            style : "solid",
            width : 2,
            radius : 50
          });

          desktop.add(winsh);
          winsh.open();
        }
      }

      /*
      -------------------------------------------------------------------------
        Below is your sqv diagram code...
      -------------------------------------------------------------------------
      */

      // draw connectors on appear of the app
      desktop.addListener("appear", function(e) {
        // Add move listeners to the windows
        
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

        /*
        connobj.connect(winstart, win1, {color : "gray"}, desktop);
        connobj.connect(win1, win2, {color : "gray"}, desktop);
        connobj.connect(win1, win3, {color : "gray"}, desktop);
        connobj.connect(win3, winend, {color : "gray"}, desktop);
        connobj.connect(win2, winend, {color : "gray"}, desktop);
        */
      });

    }
  }
});