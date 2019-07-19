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
    _docroot : null,

    _lbldetails : null,
    
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

      // Document is the application root
      var doc = this._docroot = this.getRoot();

      doc.add(desktop, {edge : 0});

      var diagramdata = 
      {
        "swimlanes" : [
          {
            "title" : "Swimlane 01",
            "width" : 1200,
            "height" : 500,
            "order" : 0
          }
        ],
        "shapes" : [
          {
            "title" : "Start",
            "shape" : "circle",
            "width" : 50,
            "height" : 50,
            "left" : 60,
            "top" : 150
          },
          {
            "title" : "Window 1",
            "shape" : "default",
            "width" : 130,
            "height" : 80,
            "left" : 200,
            "top" : 150
          },
          {
            "title" : "Window 2",
            "shape" : "default",
            "width" : 130,
            "height" : 80,
            "left" : 620,
            "top" : 170
          },
          {
            "title" : "Diamond",
            "shape" : "default",
            "width" : 50,
            "height" : 53,
            "left" : 480,
            "top" : 75
          },
          {
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
            "elementA" : "",
            "elementB" : "",
            "options" : {}
          },
          {
            "elementA" : "",
            "elementB" : "",
            "options" : {}
          },
          {
            "elementA" : "",
            "elementB" : "",
            "options" : {}
          },
          {
            "elementA" : "",
            "elementB" : "",
            "options" : {}
          }
        ]
      }

      var winDefs = [
        [300, 200, 30, 50],
        [250, 250, 150, 70],
        [400, 300, 300, 60]
      ];

      for (var i=0; i<winDefs.length; i++)
      {
        var def = winDefs[i];
        var win = new qx.ui.window.Window("Window #" + (i+1)).set({
          width: def[0],
          height: def[1],
          showClose : false,
          showMinimize : false
        });
        win.moveTo(def[2], def[3]);

        //desktop.add(win);
        //win.open();
      }

      /*
      -------------------------------------------------------------------------
        Below is your sqv diagram code...
      -------------------------------------------------------------------------
      */
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

      // draw connectors on appear of the app
      desktop.addListener("appear", function(e) {
        // Add move listeners to the windows
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
        var connobj = new sqvdiagram.Connect();
        connobj.connect(winstart, win1, {color : "gray"}, desktop);
        connobj.connect(win1, win2, {color : "gray"}, desktop);
        connobj.connect(win1, win3, {color : "gray"}, desktop);
        connobj.connect(win3, winend, {color : "gray"}, desktop);
        connobj.connect(win2, winend, {color : "gray"}, desktop);
      });

    }
  }
});