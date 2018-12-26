/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "wax"
 *
 * @asset(wax/*)
 */
qx.Class.define("wax.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _northBox : null,
    
    _westBox : null,
    
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
        Below is your actual application code...
      -------------------------------------------------------------------------
      */


      // ==================================
      // ========  SCAFFOLDING   ==========
      // ==================================
      
      // Center Scroll area to fit all content
      var scroll = new qx.ui.container.Scroll();
      scroll.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      
      // West Scroll area to fit all menu items
      var scrollwest = new qx.ui.container.Scroll();
      scrollwest.set({width: 160, padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      
      // approot is the application root
      var approot = this.getRoot();
      //approot.getContentElement().setStyle("touch-action", "none");
      //document.body.style.TouchAction = "none";
      // App's Dock 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "transparent"});
      // Dock's north canvas
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});
      // Dock east's VBox
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({spacing: 6})).set({backgroundColor: "white", padding: [10,10,10,10], decorator : "leftside"});

      // ========================  THE STACK  ======================================================
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: [10,26]});

      // First page or form that is added to === THE STACK ===
      var mainpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var label1 = new qx.ui.basic.Label("GroupBox1").set({font: "control-header", decorator : "border-me"});
      var label2 = new qx.ui.basic.Label("GroupBox2").set({font: "control-header", decorator : "border-me"});
      var label3 = new qx.ui.basic.Label("GroupBox3").set({font: "control-header", decorator : "border-me"});
      var label4 = new qx.ui.basic.Label("Table to List").set({font: "control-header", decorator : "border-me"});
      mainpage.add(label1);
      mainpage.add(label2);
      mainpage.add(label3);
      mainpage.add(label4);

      // Second page or form that is added to === THE STACK ===
      var secpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var label5 = new qx.ui.basic.Label("Part of Second Page").set({font: "control-header", decorator : "border-me"});
      secpage.add(label5);

      // Third page or form that is added to === THE STACK ===
      var terpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var label6 = new qx.ui.basic.Label("Part of Third Page").set({font: "control-header", decorator : "border-me"});
      terpage.add(label6);
      
      var menutogglebutton = new qx.ui.form.ToggleButton("Menu", "wax/test.png").set({padding: [2,4], allowGrowX: false, focusable: false, value: true});
      
      var menuimage = new qx.ui.basic.Image("wax/round-menu-24px.svg");
      menuimage.setWidth(36);
      menuimage.setHeight(36);
      menuimage.setScale(true);
      menuimage.setPadding(4);
      var accountimage = new qx.ui.basic.Image("wax/round-account_circle-24px.svg");
      accountimage.setWidth(36);
      accountimage.setHeight(36);
      accountimage.setScale(true);
      accountimage.setPadding(4);
      accountimage.setAlignX("right");

      if (qx.core.Environment.get("device.type") == "mobile"){
      	menutogglebutton.setValue(false);
      	scrollwest.setVisibility("excluded");
      }
      	
     /* menutogglebutton.addListener("changeValue", function(e) {
        //this.debug("Checked: " + e.getData());
        if (e.getData())
        	scrollwest.setVisibility("visible");     	
        else
        	scrollwest.setVisibility("excluded");
      }, this);*/

      northhbox.add(menuimage, {left:0, top:0});
      //northhbox.add(new qx.ui.basic.Label("wax app - its time"));
      northhbox.add(accountimage, {right:0, top:0});
           
      appcompdock.add(northhbox, {edge:"north"});
      
      // Add pages to === THE STACK ===
      centerbox.add(mainpage);
      centerbox.add(secpage);
      centerbox.add(terpage);
      centerbox.setSelection([mainpage]);

      // Add centerbox to center scroll area
      scroll.add(centerbox);


      // Populate westBox with content
      var lblleftnavheader = new qx.ui.basic.Label("<b>Header</b>").set({anonymous: true, focusable: false, selectable: false, rich: true, backgroundColor: "yellow", textColor: "black"});
      westbox.add(lblleftnavheader);
      var lblleftnav1 = new qx.ui.basic.Label("Stack Main Page");
      lblleftnav1.addListener("click", function(e) {
        centerbox.setSelection([mainpage]);
      }, this);
      westbox.add(lblleftnav1);
      var lblleftnav2 = new qx.ui.basic.Label("Stack Second Page");
      lblleftnav2.addListener("click", function(e) {
        centerbox.setSelection([secpage]);
      }, this);
      westbox.add(lblleftnav2);
      var lblleftnav3 = new qx.ui.basic.Label("Stack Third Page");
      lblleftnav3.addListener("click", function(e) {
        centerbox.setSelection([terpage]);
      }, this);
      westbox.add(lblleftnav3);
     

      scrollwest.add(westbox);

      appcompdock.add(scrollwest, {edge:"west"});
      
      appcompdock.add(scroll, {edge:"center"});
      
      approot.add(appcompdock, {edge: 0});

      // ====================================
      // =======  MediaQuery code  ========== 
      // ====================================

      var fadeinleft = {duration: 500, timing: "ease", origin: "left top", keyFrames : {
        0: {opacity: 0, left: "-160px", width : "0%"},
        100: {opacity: 1, left: "0px", width : "100%"}
        }};

     var mq1 = new qx.bom.MediaQuery("screen and (min-width: 480px)");

     mq1.on("change", function(e){
       if(mq1.isMatching()){
         //headertext.setValue("<h1>IsMatching</h1>");
         scrollwest.setVisibility("visible"); 
        // menutogglebutton.setValue(true);
       }
       else {
         //headertext.setValue("<h1>NotMatching</h1>");
         scrollwest.setVisibility("excluded");
         //menutogglebutton.setValue(false); 
       }
     });
     if (mq1.isMatching())
       //headertext.setValue("<h1>IsMatching</h1>");
       scrollwest.setVisibility("visible"); 
       //menutogglebutton.setValue(true);
     else
       //headertext.setValue("<h1>NotMatching</h1>");
       scrollwest.setVisibility("excluded"); 
       //menutogglebutton.setValue(false);

      /*scrollwest.addListener("appear", function(e) {
        var domtable = scrollwest.getContentElement().getDomElement();
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      }, this);*/

      /*scrollwest.addListener("disappear", function(e) {
        var domtable = scrollwest.getContentElement().getDomElement();
        qx.bom.element.Animation.animateReverse(domtable, fadeinleft);
      }, this);*/
    }
  }
});
