/* ************************************************************************

   Copyright: 2020 

   License: MIT license

   Authors: Chris Eskew(sqville) chris.eskew@sqville.com

************************************************************************ */

/**
 * This is the main application class of "ville.Embed"
 *
 * @asset(ville/embed/*)
 */
qx.Class.define("ville.embed.demo.Application",
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

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Prep the Image widget to have font and SVG handling abilities
	   // qx.Class.patch(qx.ui.basic.Image, ville.embed.MImage);
	  
	    // Prep Atoms to have image property handling abilities
	    qx.Class.patch(qx.ui.basic.Atom, ville.embed.MAtom);

      //test - add pure css icon - good test
      var teststr = '<div class="icss-airplane" style="font-size:6em; color:inherit;"></div>';
      var iconlabel = new qx.ui.basic.Label("Label - Open spot").set({rich : true});
      // winsh.add(iconlabel);

      
     // var iconcode = 'data:image/png;utf8,' + encodeURI('<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>');
       var iconcode = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      //var iconcode = "data:text/icon;icss-diamonds-o";

      var testsvg = "";//'<svg><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill=currentColor /></svg>';
      var testmapstr = 'data:text/map;{"value":"<div class=\'icss-airplane\' style=\'font-size:6em; color:inherit;\'></div>"}';
      var testmap = {value : testsvg};
      //console.log(testmapstr);

      var loneembedImage = new ville.embed.Image();

      testsvg = loneembedImage.render("svgcircle", "svgblackcircle", true);
      //console.log(testsvg);

      // Create a button
      //var button1 = new qx.ui.form.Button('<b>Click Me</b>',"data:text/svg+xml;" + testsvg).set({rich: true, appearance: "testbutton"});
      //var button1 = new qx.ui.form.Button("Click me","ville/embed/test.png");
      var button1 = new qx.ui.form.Button('<b>Click Me</b>',"data:text/html;" + teststr).set({rich: true, appearance: "testbutton"});


      

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});
      doc.add(iconlabel, {left: 100, top: 200});
      doc.add(loneembedImage, {left: 330, top: 200});


      //test #2  - image object
      //var iconimg = new qx.ui.basic.Image().set({width: 130, height: 130});
     // var iconimg = button1.getChildControl("icon");
     // var elem = iconimg.getContentElement();
      //elem.setAttribute("html", '<i class="icss-diamonds-o" style="font-size:10em; color:red;"></i>');
      //elem.useMarkup("<i></i>"); *** replacing element tag wont work at runtime ***
     // elem.setAttribute("class", "icss-diamonds-o");
    //  elem.setAttribute("style", "font-size:8em; color:red;");
      //winsh.add(iconimg);

      


      // Add an event listener
      button1.addListener("execute", function() {
        /* eslint no-alert: "off" */
        //alert("Hello World!");
      });
    }
  }
});