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

      /*
      -------------------------------------------------------------------------
        Below is your sqv diagram code...
      -------------------------------------------------------------------------
      */
      // Swimlanes
      var swimlane01 = new qx.ui.window.Window("Swimlane 01");
      swimlane01.setLayout(new qx.ui.layout.Canvas());
      var lbldetails = this._lbldetails = new qx.ui.basic.Label("start");
      swimlane01.add(lbldetails, {left: 0, top: 0});
      swimlane01.set({ width: 800, height: 400, showMaximize: false, showMinimize: false, anonymous: true });

      // Objects
      var winstart = new qx.ui.window.Window("Start");
      winstart.set({ width: 50, height: 50, showMaximize: false, showMinimize: false, decorator: "circle" });
      
      var win1 = new qx.ui.window.Window("Window 1");
      win1.setLayout(new qx.ui.layout.VBox(10));
      win1.set({ width: 130, height: 80, showMaximize: false, showMinimize: false });
      win1.setUserData("connarray",[1,2,3]);

      var win2 = new qx.ui.window.Window("Window 2");
      win2.setLayout(new qx.ui.layout.VBox(10));
      win2.set({ width: 130, height: 80, showMaximize: false, showMinimize: false });

      var win3 = new qx.ui.window.Window("Diamond");
      win3.set({ width: 50, height: 53, showMaximize: false, showMinimize: false, decorator: "diamond" });

      var winend = new qx.ui.window.Window("End");
      winend.set({ width: 50, height: 50, showMaximize: false, showMinimize: false, decorator: "circle" });

      // Connectors
      var conn01 = new qx.ui.window.Window("Conn 01");
      conn01.setLayout(new qx.ui.layout.Canvas());
      conn01.set({ width: 200, height: 200, showMaximize: false, showMinimize: false }); 

      var conn02 = new qx.ui.window.Window("Conn 02");
      conn02.set({ width: 100, height: 80, showMaximize: false, showMinimize: false });

      // Document is the application root
      var doc = this._docroot = this.getRoot();

      // Add windows to document at fixed coordinates
      doc.add(swimlane01, {left: 0, top: 0});
      doc.add(winstart, {left: 50, top: 160});
      doc.add(win1, {left: 200, top: 150});
      doc.add(win2, {left: 620, top: 150});
      doc.add(win3, {left: 480, top: 155});
      doc.add(winend, {left: 670, top: 350});
      doc.add(conn01, {left: 100, top: 300});
      doc.add(conn02, {left: 420, top: 400});

      // show everything
      swimlane01.open();
      winstart.open();
      win1.open();
      win2.open();
      win3.open();
      winend.open();
      conn01.open();
      conn02.open();

      win1.addListener("move", this.moveshape);
      win2.addListener("move", this.moveshape);
      win3.addListener("move", this.moveshape);

    },

    moveshape : function(e)
    {
      var edata = e.getData();
      // Get all conns to move
      // conn1.moveTo(edata.left + edata.width, edata.top);
      if (this.getBounds()) {
        var winbounds = this.getBounds();	     
        //_lbldetails.setValue(this._docroot._getChildren());
        // Set all the conn's width and heights
        /* conn1.set({
          width: winbounds.left - edata.left - edata.width, 
          height: winbounds.top + winbounds.height - edata.top
        });*/
      }
    }
  }
});