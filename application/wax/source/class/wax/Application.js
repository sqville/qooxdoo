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

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", "wax/round-menu-24px.svg").set({show: "icon"});

      // Top-Right MenuButton - TODO: Change to toolbar button
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", "wax/round-account_circle-24px.svg").set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowGrowY: true, padding: 10});
      mainmenupopup.setLayout(new qx.ui.layout.VBox(0));

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
      var detailpage = new qx.ui.container.Composite(new qx.ui.layout.Flow());
      var tablelistpage = new qx.ui.container.Composite().set({padding: 20});
      
      //more structure
      dashboardpage.setLayout(new qx.ui.layout.VBox(6).set({alignX: "left"}));
      var dashboardsubpage1 = new qx.ui.container.Composite();
      var dashboardflow = new qx.ui.layout.Flow(16,20,"left");
      dashboardsubpage1.setLayout(dashboardflow);


      // Controls
      // First page marker 
      var label1 = new qx.ui.basic.Label("Dashboard Page Header").set({font: "control-header"});
      // GroubBox
      var groupbox1 = new wax.GroupBox("First GroupBox for Wax", "wax/baseline-directions_subway-24px.svg", true, true);
      groupbox1.setLayout(new qx.ui.layout.VBox());
      var piechartimage = new qx.ui.basic.Image("wax/pie_chart-24px.svg").set({scale: true, width: 272, height: 272});

      var groupbox2 = new wax.GroupBox("Second GroupBox for Wax", "wax/local_airport-24px.svg", true, true);
      groupbox2.setLayout(new qx.ui.layout.VBox());

      var groupbox3 = new wax.GroupBox("Third GroupBox for Wax - with linebreak", "wax/commute-24px.svg", true, true);
      groupbox3.setLayout(new qx.ui.layout.VBox());

      var groupbox4 = new wax.GroupBox("Forth GroupBox for Wax - Flow within a Flow", "wax/local_dining-24px.svg", true, true);
      var groupbox4flow = new qx.ui.layout.Flow(6,6,"center");
      groupbox4.setLayout(groupbox4flow);
      groupbox4.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      groupbox4.add(new qx.ui.basic.Image("wax/bar_chart-24px.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Image("wax/bar_chart-24px.1.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Image("wax/bar_chart-24px.2.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Atom("Year over year growth shows how the market favored the bold","wax/bolt-24px.svg").set({rich: true, width: 200, height: 142}));

      var barchartimage = new qx.ui.basic.Image("wax/view_compact-24px.svg").set({scale: true, width: 312, height: 312});
      var bubblechartimage = new qx.ui.basic.Image("wax/bubble_chart-24px.svg").set({scale: true, width: 312, height: 312});
      
      groupbox1.add(piechartimage);
      groupbox1.add(new qx.ui.basic.Label("<b>Results:</b> Half of the pie is divided").set({rich: true}));
      var labelenv = new qx.ui.basic.Label("device.name=" + qx.core.Environment.get("device.name") + "<br>device.type=" + qx.core.Environment.get("device.type") + "<br>browser.name=" + qx.core.Environment.get("browser.name") + "<br>browser.version=" + qx.core.Environment.get("browser.version") + "<br>os.name=" + qx.core.Environment.get("os.name") + "<br>engine.name=" + qx.core.Environment.get("engine.name") + "<br>os.version=" + qx.core.Environment.get("os.version") + "<br>phonegap=" + qx.core.Environment.get("phonegap")).set({rich: true});
      groupbox2.add(labelenv);
      //groupbox2.add(barchartimage);
      //groupbox2.add(new qx.ui.basic.Label("<b>Overview:</b> Room will be configured in this manner").set({rich: true}));
      groupbox3.add(bubblechartimage);
      groupbox3.add(new qx.ui.basic.Label("<b>Insight:</b> Indicators suggest we go with <span style='color:red;'><b>Red</b></span>").set({rich: true}));

      
      // Assemble
      dashboardpage.add(label1);
      dashboardsubpage1.add(groupbox1);
      dashboardsubpage1.add(groupbox2);
      dashboardsubpage1.add(groupbox3, {lineBreak: true});
      dashboardsubpage1.add(groupbox4, {lineBreak: true, stretch: true});
      
      dashboardpage.add(dashboardsubpage1);


      // Second page marker  
      var label5 = new qx.ui.basic.Label("Overview Page Header").set({font: "control-header"});
      var secmidsection = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      
      overviewpage.add(label5);
      //overviewpage.add(labelenv);
      var secpagegroupbox1 = new wax.GroupBox("Do This","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox1.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox1.setLayout(new qx.ui.layout.VBox());
      
      var secpagegroupbox1contentbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle"});
      secpagegroupbox1contentbox.add(new qx.ui.basic.Label("If you would like to do this. Adding more so text will wrap as screen shrinks").set({alignY: "middle", textAlign: "left", rich: true, wrap: true}), {flex: 1});
      secpagegroupbox1contentbox.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      secpagegroupbox1contentbox.add(new qx.ui.form.Button("Do This").set({width: 165, height: 40, maxHeight: 40, alignX: "right", alignY: "middle"}));
      secpagegroupbox1.add(secpagegroupbox1contentbox);

      //secpagegroupbox1.add(labelenv.clone());
      //overviewpage.add(secpagegroupbox1);
      var secpagegroupbox2 = new wax.GroupBox("Do That","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox2.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox2.setLayout(new qx.ui.layout.VBox());
      secpagegroupbox2.add(labelenv.clone());
      
      secmidsection.add(secpagegroupbox1, {width: "50%", flex: 1});
      secmidsection.add(secpagegroupbox2, {width: "50%", flex: 1});

      var secpagegroupbox3 = new wax.GroupBox("All That You Did","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox3.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox3.setLayout(new qx.ui.layout.VBox());
      secpagegroupbox3.add(labelenv.clone());
      
      overviewpage.add(secmidsection);
      overviewpage.add(secpagegroupbox3);

      // Third page marker
      var label6 = new qx.ui.basic.Label("Table to List Page Header").set({font: "control-header"});
      //var tablelistflow = new qx.ui.layout.Flow().set({alignY: "bottom", alignX: "left"});
      var tablelistvbox = new qx.ui.layout.VBox();
      //tablelistpage.set({backgroundColor: "yellow"});
      //tablelistpage.setLayout(tablelistflow);
      tablelistpage.setLayout(tablelistvbox);
      tablelistpage.add(label6);
      var tableliststack = new qx.ui.container.Stack().set({ paddingTop: 10, allowGrowY: true});
      var tablelisttable = this.__createTable();
      var tablelistlist = this.__createList();
      tableliststack.add(tablelisttable);
      tableliststack.add(tablelistlist);
      tablelistpage.add(tableliststack, {flex: 1});
      
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
      var atmleftnavheader = new qx.ui.basic.Atom("Header Atom", "wax/round-account_circle-24px.svg").set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      westbox.add(atmleftnavheader);
      var tbtndashboardpage = new wax.MenuButton("Dashboard", "wax/test.png");
      westbox.add(tbtndashboardpage);

      var tbtnSecondPage = new wax.MenuButton("Overview", "wax/test.png");
      var btnSubSecondpage = new qx.ui.form.Button("Do This").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,47,], visibility: "excluded"});
      var btnSubSecondpage2 = new qx.ui.form.Button("Do That").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,47,], visibility: "excluded"});
      westbox.add(tbtnSecondPage);
      westbox.add(btnSubSecondpage);
      westbox.add(btnSubSecondpage2);

      var tbtnThirdPage = new wax.MenuButton("List of Items", "wax/test.png");
      westbox.add(tbtnThirdPage);

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtndashboardpage, tbtnSecondPage, tbtnThirdPage);
      
      // CLONE the above controls
      var lblmenuleftnavheader = atmleftnavheader.clone();
      var tbtnmenudashboardpage = tbtndashboardpage.clone();
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      var btnsubmenusubsecondpage = btnSubSecondpage.clone();
      var btnsubmenusubsecondpage2 = btnSubSecondpage2.clone();
      btnsubmenusubsecondpage.set({visibility: "visible", decorator: "mainmenubutton-box"});
      btnsubmenusubsecondpage2.set({visibility: "visible", decorator: "mainmenubutton-box"});
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      // Add the clones to the Main Menu Popup
      mainmenupopup.add(lblmenuleftnavheader);
      mainmenupopup.add(tbtnmenudashboardpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(btnsubmenusubsecondpage);
      mainmenupopup.add(btnsubmenusubsecondpage2);
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
        if(mq2.isMatching()){
          tableliststack.setSelection([tablelisttable]);
          secmidsection.setLayout(new qx.ui.layout.HBox(20));
        }
        else {
          tableliststack.setSelection([tablelistlist]);
          secmidsection.setLayout(new qx.ui.layout.VBox(20));
        }
      });
      if (mq2.isMatching()) {
        tableliststack.setSelection([tablelisttable]);
        secmidsection.setLayout(new qx.ui.layout.HBox(20));
      }
      else {
        tableliststack.setSelection([tablelistlist]);
        secmidsection.setLayout(new qx.ui.layout.VBox(20));
      }

  
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

        // Fix approot's position
        //approot.getContentElement().setStyle("position", "fixed");
        
        // Prevent pull down refresh on Chrome iOS
       /* qx.event.Registration.addListener(window, "touchmove", function(e){
          var lastY = 0;
          var pageY = e.changedTouches[0];
          var scrollY = window.pageYOffset || window.scrollTop || 0;
          if (pageY > lastY && scrollY === 0) {
            e.preventDefault();
          }
          lastY = pageY;
        }, this);*/
      }

    },

    __createTable : function()
    { 
      var rowData = this.__createrowData();

      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "", "Status", "Item ID", "Project", "Date Submitted" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, false);
      tableModel.setColumnEditable(2, false);
      tableModel.setColumnSortable(0, false);
      tableModel.setColumnSortable(5, false);

      var table = new qx.ui.table.Table(tableModel);

      table.set({
        allowStretchY: true,
        allowStretchX: true,
        rowHeight: 30,
        showCellFocusIndicator: false,
        focusCellOnPointerMove : true,
        forceLineHeight: true
      });

      var imgrenderer = new qx.ui.table.cellrenderer.Image(24,24);
      table.getTableColumnModel().setDataCellRenderer(0, imgrenderer);

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();
      tcm.setColumnWidth(0,40);
      tcm.setColumnWidth(1,95);
      tcm.setColumnWidth(2,100);
      tcm.setColumnWidth(3,215);
      tcm.setColumnWidth(4,130);

      //tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
      //tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Html());
      //tcm.setColumnWidth(4,350);
      //tcm.setHeaderCellRenderer(4, new qx.ui.table.headerrenderer.Icon("icon/18/image/filter-frames.png", "A date"));

      return table;
    },

    __createList : function()
    { 
      var rowData = this.__createrowData();

      var listvbox = new qx.ui.layout.VBox(4, null, "separator-vertical");
      var listctrl = new qx.ui.container.Composite(listvbox);

      for (var i in rowData) {
        var groupbox1 = new wax.GroupBox(rowData[i][3], rowData[i][0], true, false);
        groupbox1.setLayout(new qx.ui.layout.VBox(4));
        groupbox1.add(new qx.ui.basic.Label("<b>Status:</b> " + rowData[i][1]).set({rich: true}));
        groupbox1.add(new qx.ui.basic.Label("<b>Item ID:</b> " + rowData[i][2]).set({rich: true}));
        groupbox1.add(new qx.ui.basic.Label("<b>Date Submitted:</b> " + rowData[i][4]).set({rich: true}));

        listctrl.add(groupbox1);
      }
    
      return listctrl;
    },

    __createrowData : function()
    {
      var rowData = [];
      var now = new Date().getTime();
      var date;
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-check_circle_outline-24px.svg", "Completed", "001007222", "Anthem WGS", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-check_circle_outline-24px.svg", "Completed", "002009333", "Anthem Modernization", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-check_circle_outline-24px.svg", "Completed", "003002777", "HCSC", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-check_circle_outline-24px.svg", "Completed", "004074555", "State of New Mexico", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-sync-24px.svg", "In Progress", "005111888", "eLicensing Modernization", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "wax/round-sync-24px.svg", "In Progress", "006003662", "Guadalupe Mountains", date ]);

      return rowData;
    }
  }
});
