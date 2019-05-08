/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "wax"
 *
 * @asset(wax/*)
 * @ignore(process.*)
 * @ignore(screen.*)
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

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "transparent"});
      
      // Dock's North section (Canvas)
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});

      // Dock's West section (VBox)
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({backgroundColor: "white", padding: [10,0,10,0], decorator : "leftside"});

      // Dock's Center section (Stack) === THE STACK ===
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: 0});

      // phone/phonegap
      //if (qx.core.Environment.get("phonegap")) {
      var southbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle", padding: [0,4,0,4], decorator: "bottombar"});
      //}

      // West Scroll area to fit all menu items
      var scrollwest = new qx.ui.container.Scroll();
      scrollwest.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // Center Scroll area to fit all content
      var scroll = new qx.ui.container.Scroll();
      scroll.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar().set({backgroundColor: "white"});
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Icon Images
      var menuimage = "wax/round-menu-24px.svg";
      var roundacct = "wax/round-account_circle-24px.svg";
      var testimage = "wax/test-image.svg";

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", menuimage).set({show: "icon"});

      // Top-Right MenuButton
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", roundacct).set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowGrowY: true, padding: 10});
      mainmenupopup.setLayout(new qx.ui.layout.VBox(0));

      // Profile and Settings Menu and Menu Buttons
      var profilemenu = new qx.ui.menu.Menu().set({spacingX: 12});
      var profilemenubutton1 = new qx.ui.menu.Button("Menu button 01", testimage).set({padding: 10});
      var settingsmenubutton = new qx.ui.menu.Button("Menu button 02", testimage).set({padding: 10});
      var logoutmenubutton = new qx.ui.menu.Button("Menu button 01", testimage).set({padding: 10});

      // Search Button (hybrid mobile)
      var btnsearchbutton = new qx.ui.toolbar.Button("Search", "wax/baseline-search-24px.svg").set({show: "icon"});

      // Back Button (hybrid mobile)
      var btnbackbutton = new qx.ui.toolbar.Button("Back", "wax/baseline-chevron_left-24px.svg").set({show: "icon"});
      
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
      profilemenu.add(profilemenubutton1);
      profilemenu.add(settingsmenubutton);
      profilemenu.add(logoutmenubutton);
      profilemenubutton.setMenu(profilemenu);
      northtoolbar.add(mainmenupart);
      if (qx.core.Environment.get("phonegap")) {
        var atmlogocurrentpage = new qx.ui.basic.Atom("Wax","wax/wax_logo-24px.svg").set({font: "hym-app-header", gap: 6, paddingLeft: 35});
        northtoolbar.addSpacer();
        northtoolbar.add(atmlogocurrentpage);
        //mainmenupart.add(btnbackbutton);    
        profilepart.add(btnsearchbutton);
      } else {
        mainmenupart.add(mainmenubtnbutton);
        profilepart.add(profilemenubutton);
      }
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);
      northhbox.add(northtoolbar, {left: 0, right: 0});
      // Scaffolding has been created and assembled

      // phonegap
      if (qx.core.Environment.get("phonegap")) {
        appcompdock.add(southbox, {edge: "south"});
      }

      // <<< END of Base Scaffolding <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {duration: 300, timing: "ease", keyFrames : {
        0: {opacity: 0},
        100: {opacity: .08}
        }};

      this._blocker.addListener("blocked", function(e) {
        var domtable;
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
      var dashboardpage = new qx.ui.container.Composite().set({padding: 20});
      var overviewpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20)).set({padding: 20});
      var gallerypage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20)).set({padding: 20});
      var tablelistpage = new qx.ui.container.Composite().set({padding: 20});
      
      //more structure
      dashboardpage.setLayout(new qx.ui.layout.VBox(6).set({alignX: "left"}));

      // Controls
      // First page marker 
      var label1 = new qx.ui.basic.Label("Main Page 01").set({font: "control-header"});

      // Assemble
      dashboardpage.add(label1);


      // Second page marker  
      var label5 = new qx.ui.basic.Label("Main Page 02").set({font: "control-header"});
      overviewpage.add(label5);
      
      var winDoThis = this.__createDetailWindow();
      winDoThis.set({width: 660, contentPadding: 20});

      var btnClosewin = new qx.ui.form.Button("Close");
      winDoThis.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      var buttonHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      buttonHBox.add(btnClosewin, {flex: 1});
      winDoThis.add(buttonHBox);
      btnClosewin.addListener("execute", function(e) {
        winDoThis.close();
      });

      winDoThis.addListener("appear", function(e) {
        this._blocker.block();
      }, this);
      winDoThis.addListener("disappear", function(e) {
        this._blocker.unblock();
      }, this);

      approot.addListener("resize", function(e){
        winDoThis.center();
      }, this);
      

      // Third page marker
      var label6 = new qx.ui.basic.Label("Main Page 03").set({font: "control-header"});
      var tablelistvbox = new qx.ui.layout.VBox();
      tablelistpage.setLayout(tablelistvbox);
      tablelistpage.add(label6);

      // Menu Page for phonegap only
      //if (qx.core.Environment.get("phonegap")) {
        var menupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10, null, "separator-vertical")).set({padding: [60, 0, 0, 0]});
        var btnProfile = new qx.ui.form.Button("Profile", "wax/edit-24px.svg").set({appearance : "hym-page-button"});
        var btnSettings = new qx.ui.form.Button("Settings", "wax/outline-settings-24px.svg").set({appearance : "hym-page-button"});
        var btnLogout = new qx.ui.form.Button("Logout", "wax/exit_to_app-24px.svg").set({appearance : "hym-page-button"});
        menupage.add(btnProfile);
        menupage.add(btnSettings);
        menupage.add(btnLogout);
        centerbox.add(menupage);
      //}

      
      // Assemble - THE STACK 
      centerbox.add(dashboardpage);
      centerbox.add(overviewpage);
      centerbox.add(tablelistpage);

      // Show the default page
      centerbox.setSelection([dashboardpage]);

      // <<< END of THE STACK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      
      // >>> Populate the Main Menu and Popup Main Menu with content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate westBox with content
      var atmleftnavheader = new qx.ui.basic.Atom("Username", roundacct).set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      atmleftnavheader.getChildControl("icon").set({ scale : true });
      westbox.add(atmleftnavheader);
      var tbtndashboardpage = new wax.MenuButton("Menu item 01", testimage, true );
      westbox.add(tbtndashboardpage);

      var tbtnSecondPage = new wax.MenuButton("Menu item 02", testimage, true);
      var btnSubSecondpage = new qx.ui.form.Button("Subitem 01").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,60], visibility: "excluded"});
      var btnSubSecondpage2 = new qx.ui.form.Button("Subitem 02").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,60], visibility: "excluded"});
      westbox.add(tbtnSecondPage);
      westbox.add(btnSubSecondpage);
      westbox.add(btnSubSecondpage2);

      btnSubSecondpage.addListener("execute", function(e) {
        winDoThis.restore();
        //if (qx.core.Environment.get("phonegap")) {
          //winDoThis.maximize();
        //}
        winDoThis.center();
        winDoThis.setStatus("From Subitem 01");
        winDoThis.show();
      });

      var tbtnThirdPage = new wax.MenuButton("Menu item 03", testimage, true);
      westbox.add(tbtnThirdPage);

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtndashboardpage, tbtnSecondPage, tbtnThirdPage);
      
      // CLONE the above controls
      var atmmenuleftnavheader = atmleftnavheader.clone();
      atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      var tbtnmenudashboardpage = tbtndashboardpage.clone();
      tbtnmenudashboardpage.getChildControl("icon").set({ scale : true });
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      tbtnmenuSecondPage.getChildControl("icon").set({ scale : true });
      var btnsubmenusubsecondpage = btnSubSecondpage.clone();
      btnsubmenusubsecondpage.getChildControl("icon").set({ scale : true });
      var btnsubmenusubsecondpage2 = btnSubSecondpage2.clone();
      btnsubmenusubsecondpage.set({visibility: "visible", decorator: "mainmenubutton-box"});
      btnsubmenusubsecondpage2.set({visibility: "visible", decorator: "mainmenubutton-box"});
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      tbtnmenuThirdPage.getChildControl("icon").set({ scale : true });

      // Add the clones to the Main Menu Popup
      mainmenupopup.add(atmmenuleftnavheader);
      mainmenupopup.add(tbtnmenudashboardpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(btnsubmenusubsecondpage);
      mainmenupopup.add(btnsubmenusubsecondpage2);
      mainmenupopup.add(tbtnmenuThirdPage);

      btnsubmenusubsecondpage.addListener("execute", function(e) {
        mainmenupopup.hide();
        winDoThis.maximize();
        winDoThis.center();
        winDoThis.show();
      });

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
    
      // >>> Populate the Hybrid Mobile (hym) Main Menu  content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate southbox with content
      var tbtndashboardpagehym = new wax.MenuButton("Menu item 01", testimage, true ).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnoverviewpagehym = new wax.MenuButton("Menu item 02", testimage, true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnlistofitemspagehym = new wax.MenuButton("List of Items", testimage, true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnmenuhym = new wax.MenuButton("Menu", menuimage, true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      southbox.add(tbtndashboardpagehym, {flex: 1});
      southbox.add(tbtnoverviewpagehym, {flex: 1});
      southbox.add(tbtnlistofitemspagehym, {flex: 1});
      southbox.add(tbtnmenuhym, {flex: 1});

      // Assign all the clones their own RadioGroup
      var mainmenubuttongrouphym = new qx.ui.form.RadioGroup();
      mainmenubuttongrouphym.add(tbtndashboardpagehym, tbtnoverviewpagehym, tbtnlistofitemspagehym, tbtnmenuhym);

      // <<< END of Hybrid Mobil (hym) Main Menu and Main Menu Popup <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


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
          btnSubSecondpage.setVisibility("visible");
          btnSubSecondpage2.setVisibility("visible");
          centerbox.setSelection([overviewpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box-pressed"});
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box-pressed"});
        } else {
          btnSubSecondpage.setVisibility("excluded");
          btnSubSecondpage2.setVisibility("excluded");
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
        }
      }, this);

      // Popup menu buttons
      tbtnmenudashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          westboxbuttongroup.setSelection([tbtndashboardpage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box" });
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          westboxbuttongroup.setSelection([tbtnSecondPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box-pressed" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box-pressed" });

          dashboardpage.setVisibility("excluded");

          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          westboxbuttongroup.setSelection([tbtnThirdPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box" });

          dashboardpage.setVisibility("excluded");

          mainmenupopup.hide();
        }
      }, this);

      // if Hybrid Mobile
      tbtndashboardpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          atmlogocurrentpage.set({show: "both", label:"Wax"});
        }
      }, this);

      tbtnoverviewpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          atmlogocurrentpage.set({show: "label", label:"Actions"});
        }
      }, this);

      tbtnlistofitemspagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          atmlogocurrentpage.set({show: "label", label:"Table List"});
        }
      }, this);

      tbtnmenuhym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([menupage]);
          atmlogocurrentpage.set({show: "label", label:"Menu"});
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

      var mq2 = new qx.bom.MediaQuery("screen and (min-width: 767px)");

      mq2.on("change", function(e){
        if(mq2.isMatching()){}
        else {}
      });

      if (mq2.isMatching()) {}
      else {}

  
      // ====================================
      // =====  Device Targetted code  ======
      // ====================================
     

      // mobile
      if (qx.core.Environment.get("device.type") == "mobile"){
        
        // No need for the west scroll area (main menu) in mobile
        scrollwest.setVisibility("excluded");

        // This addresses the scroll bouncing in: 
        //  - Chrome for Android
        var dsktopstylsheet = qx.ui.style.Stylesheet.getInstance();
        dsktopstylsheet.addRule("html", "overscroll-behavior : none none;");
        dsktopstylsheet.addRule("body", "overscroll-behavior : none none;");


        // Set the body tag's position to prevent scroll bouncing (and pull down refresh) in:
        //  - Safari for iOS
        //      - Edge for iOS (same as above browser now)
        //  - FireFox for iOS
        document.body.style.position = "fixed";

        // TODO *Need solution to address scroll bouncing in:
        //   - Chrome for iOS

        // App still bounces in Landscape; Locking screen to portrait where API is available
        // https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation
        screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
        screen.lockOrientationUniversal("portrait");        
      }

      // phonegap
      if (qx.core.Environment.get("phonegap")) {}

      // electron
      if (this.__isElectron()) {}
    },

    __createDetailWindow : function()
    {
      // Create the Window
      var win = new qx.ui.window.Window("Detail Window").set({ appearance: "wax-window", allowMaximize : true, allowMinimize : false, modal: true, movable: true });
      win.setLayout(new qx.ui.layout.VBox(4));
      win.setShowStatusbar(true);
      win.setStatus("Generic Message"); 
      win.getChildControl("title").set({padding: [10,0,0,10]});

      return win;
    },

    /**
     * Electron JS detection
     * https://github.com/cheton/is-electron
     */
    
    __isElectron : function() 
    {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
          return true;
      }
  
      // Main process
      if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
          return true;
      }
  
      // Detect the user agent when the `nodeIntegration` option is set to true
      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
          return true;
      }
  
      return false;
    }
  }
});
