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
    _blocker : null,
    
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
      
      // >>> START of Base Scaffolding >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>> Base Scaffolding are objects common to all Wax - Franklin based apps  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      // App's Root
      var approot = this.getRoot();
      //approot.getContentElement().setStyle("touch-action", "none");
      //document.body.style.TouchAction = "none";

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "transparent"});
      
      // Dock's North section (Canvas)
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});
      
      // Dock's West section (VBox)
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({spacing: 6})).set({backgroundColor: "white", padding: [10,10,10,10], decorator : "leftside"});

      // Dock's Center section (Stack) === THE STACK ===
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: [10,26]});

      // West Scroll area to fit all menu items
      var scrollwest = new qx.ui.container.Scroll();
      scrollwest.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // Center Scroll area to fit all content
      var scroll = new qx.ui.container.Scroll();
      scroll.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar();
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", "wax/round-menu-24px.svg").set({show: "icon"});

      // Top-Right MenuButton - TODO: Change to toolbar button
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", "wax/round-account_circle-24px.svg").set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowGrowY: true, padding: 10});
      mainmenupopup.setLayout(new qx.ui.layout.VBox(6));

      // Profile Menu
      var profilemenu = new qx.ui.menu.Menu();
      var profilemenubutton1 = new qx.ui.menu.Button("Stack Profile Page Button", "wax/test.png");
      
      // Add Main Menu Popup Listeners
      mainmenubtnbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenubtnbutton.getZIndex());
        }
        mainmenupopup.show();
      }, this);
      mainmenupopup.addListener("disappear", function(e)
      {
        this._blocker.unblock();
      }, this);

      // Assemble all base pieces  
      scrollwest.add(westbox);
      scroll.add(centerbox);
      appcompdock.add(northhbox, {edge:"north"});
      appcompdock.add(scrollwest, {edge:"west"});
      appcompdock.add(scroll, {edge:"center"});
      approot.add(appcompdock, {edge: 0});
      mainmenupart.add(mainmenubtnbutton);
      profilemenu.add(profilemenubutton1);
      profilemenubutton.setMenu(profilemenu);
      profilepart.add(profilemenubutton);
      northtoolbar.add(mainmenupart);
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);
      northhbox.add(northtoolbar, {left: 0, right: 0});
      // Scaffolding has been created and assembled

      // <<< END of Base Scaffolding <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {duration: 300, timing: "ease", keyFrames : {
        0: {opacity: 0},
        100: {opacity: .08}
        }};

      this._blocker.addListener("blocked", function(e) {
        if (domtable = this._blocker.getBlockerElement().getDomElement()) {
          qx.bom.element.Animation.animate(domtable, fadeinb);
        }
      }, this);

      // >>> Populate THE STACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Four page stack EXAMPLE
       // Dashboard Page with Flow layout
       // Overview Page with links to a Detail Page
       // Table to List Page - shows how the Table Widget converts to a List Widget for smaller screens
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var dashboardpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var overviewpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var detailpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var tablelistpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      
      // First page marker 
      var label1 = new qx.ui.basic.Label("Dashboard Page Marker").set({font: "control-header", decorator : "border-me"});
      dashboardpage.add(label1);

      // Second page marker  
      var label5 = new qx.ui.basic.Label("Overview Page Marker").set({font: "control-header", decorator : "border-me"});
      overviewpage.add(label5);

      // Third page marker
      var label6 = new qx.ui.basic.Label("Table to List Page Marker").set({font: "control-header", decorator : "border-me"});
      tablelistpage.add(label6);
      
      // Assemble - THE STACK 
      centerbox.add(dashboardpage);
      centerbox.add(overviewpage);
      centerbox.add(detailpage);
      centerbox.add(tablelistpage);

      // Show the default page
      centerbox.setSelection([dashboardpage]);

      // <<< END of THE STACK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      
      // >>> Populate the Main Menu and Popup Main Menu with content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate westBox with content
      var lblleftnavheader = new qx.ui.basic.Label("<b>Header</b>").set({anonymous: true, focusable: false, selectable: false, rich: true, textColor: "black"});
      westbox.add(lblleftnavheader);
      var tbtndashboardpage = new wax.MenuButton("Dashboard with Flow", "wax/test.png").set({center: false});
      westbox.add(tbtndashboardpage);

      var tbtnSecondPage = new wax.MenuButton("Overview Page to Detail Pages", "wax/test.png").set({center: false});
      var lblsubsecondpage = new qx.ui.basic.Label("Direct Link to a Detail Page").set({visibility: "excluded"});
      westbox.add(tbtnSecondPage);
      westbox.add(lblsubsecondpage);

      var tbtnThirdPage = new wax.MenuButton("Table List Conversion", "wax/test.png").set({center: false});
      westbox.add(tbtnThirdPage);

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtndashboardpage, tbtnSecondPage, tbtnThirdPage);
      
      // CLONE the above controls
      var lblmenuleftnavheader = lblleftnavheader.clone();
      var tbtnmenudashboardpage = tbtndashboardpage.clone();
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      var lblmenusubsecondpage = lblsubsecondpage.clone();
      lblmenusubsecondpage.setVisibility("visible");
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      // Add the clones to the Main Menu Popup
      mainmenupopup.add(lblmenuleftnavheader);
      mainmenupopup.add(tbtnmenudashboardpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(lblmenusubsecondpage);
      mainmenupopup.add(tbtnmenuThirdPage);
      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenudashboardpage, tbtnmenuSecondPage, tbtnmenuThirdPage);
      
      //***  CODE for applying popup fading in and out  ***//
      var fadeinleft = {duration: 300, timing: "ease-out", origin: "left top", keyFrames : {
        0: {opacity: 0, left: "-300px"},
        100: {opacity: 1, left: "0px"}
        }};

      mainmenupopup.addListener("appear", function(e) {
        var domtable = mainmenupopup.getContentElement().getDomElement();
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      }, this);

      // <<< END of Main Menu and Main Menu Popup <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    

      // >>> Wire all the Main Menu Buttons to THE STACK Pages (via Listeners) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Turn on all wax.MenuButton listeners
      tbtndashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          mainmenubuttongroup.setSelection([tbtnmenudashboardpage]);
        }
      }, this);

      tbtnSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          lblsubsecondpage.setVisibility("visible");
          centerbox.setSelection([overviewpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
        } else {
          lblsubsecondpage.setVisibility("excluded");
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
        }
      }, this);

      tbtnmenudashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          westboxbuttongroup.setSelection([tbtndashboardpage]);
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          westboxbuttongroup.setSelection([tbtnSecondPage]);
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          westboxbuttongroup.setSelection([tbtnThirdPage]);
          mainmenupopup.hide();
        }
      }, this);

      // <<< END of Wiring <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      
      // ====================================
      // =======  MediaQuery code  ========== 
      // ====================================

      var mq1 = new qx.bom.MediaQuery("screen and (min-width: 1024px)");

      mq1.on("change", function(e){
        if(mq1.isMatching()){
          scrollwest.setVisibility("visible"); 
          mainmenupart.setVisibility("excluded");
        }
        else {
          scrollwest.addListener("appear", function(e) {
            var domtable = scrollwest.getContentElement().getDomElement();
            qx.bom.element.Animation.animate(domtable, fadeinleft);
          }, this); 
          scrollwest.setVisibility("excluded");
          mainmenupart.setVisibility("visible");
        }
      });
      if (mq1.isMatching()) {
        scrollwest.setVisibility("visible"); 
        mainmenupart.setVisibility("excluded");
      }
      else {
        scrollwest.addListener("appear", function(e) {
          var domtable = scrollwest.getContentElement().getDomElement();
          qx.bom.element.Animation.animate(domtable, fadeinleft);
        }, this); 
        scrollwest.setVisibility("excluded"); 
        mainmenupart.setVisibility("visible");
      }

  
      // ====================================
      // =====  Device Targetted code  ======
      // ====================================

      // mobile
      if (qx.core.Environment.get("device.type") == "mobile"){
      	scrollwest.setVisibility("excluded");
      }

    }
  }
});
