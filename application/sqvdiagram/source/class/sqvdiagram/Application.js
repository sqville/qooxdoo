/* ************************************************************************

   Copyright: 2020

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

      //var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["diagramdata_old"];
      //var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["GovernmentStructureOfTexas"];
      var diagramdata = sqvdiagram.DiagramData.DIAGRAMS["NetworkDiagram"];

     
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
          var winsh = new qx.ui.window.Window();
          winsh.set({
            showMaximize : false,
            showMinimize : false,
            showClose : false,
            useMoveFrame : true,
            contentPadding : 0,
            padding: 0,
            margin: 0
          });
          winsh.setLayout(new qx.ui.layout.Grow());
          var winshcb = winsh.getChildControl("captionbar");
          winshcb.set({cursor:"move", minHeight: 30});
          //winshcb.setVisibility("hidden");
          winsh.setAppearance("shape");
          //TODO: make the window's pane movable
          //var winpane = winsh.getChildControl("pane");
          //winpane.set({cursor:"move"});
          //winsh._activateMoveHandle(winpane);

          winsh.addListener("activate", function(){
            winshcb.setVisibility("visible");
          });
          winsh.addListener("deactivate", function(){
            winshcb.setVisibility("hidden");
          });


          //test - add pure css icon - good test
          var iconlabel = new qx.ui.basic.Label('<i class="icss-diamonds-o" style="font-size:10em; color:black;"></i>').set({rich : true, allowGrowX:true, allowGrowY:true});
         // winsh.add(iconlabel);

          //test #2  - image object
          /*var iconimg = new qx.ui.basic.Image();
          var elem = iconimg.getContentElement();
          elem.setAttribute("html", '<i class="icss-diamonds-o" style="font-size:10em; color:red;"></i>');
          elem.useMarkup("<i></i>");
          elem.setAttribute("class", "icss-diamonds-o");
          elem.setAttribute("style", "font-size:4em; color:red;");
          */
         

          var svgtest = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1920 128v1792H128V128h1792zm-128 128H256v1536h1536V256z"></path></svg>';
          //iconlabel.setValue(svgtest);
          //var txtarea = new qx.ui.form.TextArea(defsh.options.content).set({textAlign:"center", backgroundColor: "transparent", allowStretchX:[true,true], allowStretchY:[true,true]});
         //GROW:: var txtlabel = new qx.ui.basic.Label(defsh.options.content).set({backgroundColor: "yellow", rich:true, textAlign:"center", padding:4, alignX:"center", alignY:"middle",allowGrowX:true, allowGrowY: true});
         
         //CANVAS:: var txtlabel = new qx.ui.basic.Label(defsh.options.content).set({backgroundColor: "yellow", padding:4, rich:true, textAlign:"center"});
          //var txtnew = new qx.ui.basic.Label(defsh.options.content);
          if (defsh.options.image){
            var lblatom = new qx.ui.basic.Atom(defsh.options.content, defsh.options.image).set({iconPosition: "top"});
          }
          else {
            var lblatom = new qx.ui.basic.Atom(defsh.options.content);  
          }
          lblatom.set({anonymous: true, backgroundColor: "transparent", rich:true, center:true, padding:4, allowGrowX:true, allowGrowY:true});
          lblatom.getChildControl('label').set({textAlign:"center"});

          if (defsh.options.shape) {
            var shape = new qx.ui.core.Widget().set({
              backgroundColor: "transparent",
              decorator: defsh.options.shape
            });
            /*var shape = new qx.ui.container.Resizer(new qx.ui.layout.Grow()).set({
              backgroundColor: "transparent",
              decorator: defsh.options.shape
            })*/
            if (defsh.options.shape == "diamond"){
              //winsh.add(iconlabel);
              shape.getContentElement().setStyles({"transform" : "rotate(45deg)"});
              shape.setMargin(30);
              winsh.add(shape);
            } else {
              //GROW:: 
              winsh.add(shape);
              //CANVAS:: winsh.add(shape, {top: 0, left: 0, bottom: 0, right: 0});
            }
              
          }

          //create Vbox container for the label
          //var lblcontainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "green", allowGrowX:true, allowGrowY: true});
          //lblcontainer.add(txtlabel);
          //winsh.add(lblcontainer);

          winsh.add(lblatom);
          //winsh.add(txtarea);
          //winsh.add(txtlabel);


          //winsh.add(iconlabel);
          
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

          winsh.getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
          winsh.getChildControl("pane").getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
          lblatom.getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});
          //txtlabel.getContentElement().setStyles({"overflowX": "visible", "overflowY": "visible"});

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

        //straight line test
        var svgtext = '<svg overflow="visible"><line stroke-width="3px" stroke="blue" x1="300" y1="600" x2="500" y2="100" id="mySVG"/></svg>';      
        var labelline = new qx.ui.basic.Label(svgtext).set({rich: true});
        var lblelem = labelline.getContentElement();
        lblelem.setAttribute("overflow", "visible");
        lblelem.setStyle("overflow", "visible");
        //desktop.add(labelline);
      });

      //var rmtest = qx.util.ResourceManager.getInstance();
      //console.log(rmtest.getIds());

    }
  }
});