/* ************************************************************************

   Copyright: 2020

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

/**
 * This is the main application class of "sqvdiagram"
 *
 * @asset(resource/sqvdiagram/*)
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

      //var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["diagramdata_old"];
      //var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["GovernmentStructureOfTexas"];
      var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["SuperSimple"];

     
      //Swimlanes
      if (diagramdata.swimlanes != undefined) {
        for (var i=0; i<diagramdata.swimlanes.length; i++)
        {
          var def = diagramdata.swimlanes[i];
          var win = new qx.ui.window.Window().set(def.properties);
          win.set({
            showMaximize : false,
            showMinimize : false,
            anonymous: true
          });
          win.moveTo(def.left, def.top);
          desktop.add(win);
          win.open();
        }
      }

      //Labels
      /*if (diagramdata.labels != undefined) {
        for (var i=0; i<diagramdata.labels.length; i++)
        {
          var def = diagramdata.labels[i];
          var label = new sqvdiagram.Label().set(def.properties);
          var winsh = new qx.ui.window.Window();
          winsh.set({
            showMaximize : false,
            showMinimize : false,
            useMoveFrame: true
          });
          winsh.setLayout(new qx.ui.layout.Canvas());
          winsh.add(label);
          //winsh.setUserData("shapeid", def.id);
          winsh.moveTo(def.left, def.top);
          desktop.add(winsh);
          winsh.open();
        }
      }*/

      //Shapes
      if (diagramdata.shapes != undefined) {
        for (var j=0; j<diagramdata.shapes.length; j++)
        {
          var defsh = diagramdata.shapes[j];
          var winsh = new qx.ui.window.Window().set(defsh.properties);
          winsh.set({
            showMaximize : false,
            showMinimize : false,
            useMoveFrame: true
          });
          winsh.setLayout(new qx.ui.layout.Canvas());
          //add text area to the window for shape content
          var txtarea = new qx.ui.form.TextArea();
          winsh.add(txtarea);
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
            connobj.connect(eleA, eleB, defc.properties, defc.options, desktop);
          }
        }
      });

    }
  }
});