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

      var connobj = new sqvdiagram.Connect();

      // Document is the application root
      var doc = this.getRoot();

      doc.add(desktop, {edge : 0});

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
            "width" : 130,
            "height" : 80,
            "left" : 200,
            "top" : 150
          },
          {
            "id" : 4,
            "title" : "Window 2",
            "shape" : "window",
            "width" : 130,
            "height" : 80,
            "left" : 620,
            "top" : 170
          },
          {
            "id" : 5,
            "title" : "Diamond",
            "shape" : "window",
            "width" : 50,
            "height" : 53,
            "left" : 480,
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

      //Shapes
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
        winsh.setUserData("shapeid", defsh.id);
        winsh.moveTo(defsh.left, defsh.top);

        // add move listner
        winsh.addListener("move", function(e) {
          var allwins = desktop.getWindows();
          var arrwins = [];
          allwins.forEach(function(winobj) {
            if (winobj.getUserData("shapetype")=="connectline") 
            {
              if (winobj.getUserData("elementAhashcode") == this.toHashCode() || winobj.getUserData("elementBhashcode") == this.toHashCode())
              {
                arrwins.push(winobj);
              }
            }
          }, this);
          connobj.repositionConnections(arrwins);
        });

        desktop.add(winsh);
        winsh.open();
      }

      /*
      -------------------------------------------------------------------------
        Below is your sqv diagram code...
      -------------------------------------------------------------------------
      */
     /*
      // Swimlanes
      var swimlane01 = new qx.ui.window.Window("Swimlane 01");
      swimlane01.set({ width: 1200, height: 500, showMaximize: false, showMinimize: false, anonymous: true });

      // Shapes/Objects
      var winstart = new qx.ui.window.Window("Start");
      winstart.set({ width: 50, height: 50, showMaximize: false, showMinimize: false, decorator: "circle", useMoveFrame: true });
      
      var win1 = new qx.ui.window.Window("Window 1");
      win1.set({ width: 130, height: 80, showMaximize: false, showMinimize: false, useMoveFrame: true });

      var win2 = new qx.ui.window.Window("Window 2");
      win2.set({ width: 130, height: 80, showMaximize: false, showMinimize: false, useMoveFrame: true });

      var win3 = new qx.ui.window.Window("Diamond");
      win3.set({ width: 50, height: 53, showMaximize: false, showMinimize: false, decorator: "diamond", useMoveFrame: true });

      var winend = new qx.ui.window.Window("End");
      winend.set({ width: 50, height: 50, showMaximize: false, showMinimize: false, decorator: "circle", useMoveFrame: true });

      // Add windows to document at fixed coordinates
      desktop.add(swimlane01, {left: 0, top: 0});
      desktop.add(winstart, {left: 50, top: 160});
      desktop.add(win1, {left: 200, top: 150});
      desktop.add(win2, {left: 620, top: 170});
      desktop.add(win3, {left: 480, top: 75});
      desktop.add(winend, {left: 670, top: 350});

      // show everything
      swimlane01.open();
      winstart.open();
      win1.open();
      win2.open();
      win3.open();
      winend.open();  
      */

      // draw connectors on appear of the app
      desktop.addListener("appear", function(e) {
        // Add move listeners to the windows
        /*
        var allshapes = desktop.getWindows();
        allshapes.forEach(function(shape) {
          shape.addListener("move", function(e) {
            var allwins = desktop.getWindows();
            var arrwins = [];
            allwins.forEach(function(win) {
              if (win.getUserData("shapetype")=="connectline") 
              {
                if (win.getUserData("elementAhashcode") == this.toHashCode() || win.getUserData("elementBhashcode") == this.toHashCode())
                {
                  arrwins.push(win);
                }
              }
            }, this);
            connobj.repositionConnections(arrwins);
          });
        });
        */
        
        var alldsktpwins = desktop.getWindows();

        //Connections
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