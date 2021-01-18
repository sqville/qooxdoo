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
      //qx.Class.include(qx.ui.basic.Atom, ville.embed.MAtom);
      
      // Prep the Image widget to have font and SVG handling abilities
	   //qx.Class.include(qx.ui.basic.Image, ville.embed.MImage);
	  
	    // Enables adding CSS to tag and psudo classes (after and before) to the Decorator class
      //qx.Class.include(qx.ui.decoration.Decorator, ville.embed.MFreestyleCss);

      qx.Class.patch(qx.ui.basic.Atom, ville.embed.MAtomPatch);

      //test - add pure css icon - good test
      var teststr = '<div class="icss-cube-o" style="font-size:4em; color:inherit;"></div>';

      var testsvg = '<svg width=100 height=100><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill=currentColor /></svg>';
      var testmapstr = 'data:text/json;{"value":"<div class=\'icss-airplane\' style=\'font-size:4em; color:inherit;\'></div>"}';
      var testmap = {value : testsvg, fill : "red"};
      //console.log(testmapstr);

     // var loneembedImage = new ville.embed.Image({name:"icss-cube-o", size:4, color:"blue", animation : "tada"});
     //var loneembedImage = new ville.embed.Image({name:"fui-accesslogoicon", color:"blue", width:130, height:130, animation : "tada"});
     // var loneembedImage = new ville.embed.Image(testmap);

     // var loneembedImage = new ville.embed.Image("data:text/html;" + teststr);

      //testsvg = loneembedImage.render("icss-cube-o", {name:"icss-cube-o",textSize:"4em",iconColor:"blue"}, true);

      var funtime = '<label for="fname">First name:</label><input type="text" id="fname" name="fname"></input>';

      // Create a button - Examples
     //var button1 = new qx.ui.form.Button('<b>Click Me</b>',"data:text/svg+xml;" + testsvg).set({rich: true, appearance: "testbutton"});
    //  var button1 = new qx.ui.form.Button("Click me").set({appearance: "testbutton"});
     // var button1 = new qx.ui.form.Button('<b>Click Me</b>',"data:text/html;" + funtime).set({rich: true, appearance: "testbutton"});
      var button1 = new qx.ui.form.Button('Click Me','data:text/json;{"name":"cube-o","size":3,"color":"green","animation":"tada"}').set({appearance: "testbutton"});
    //  var button1 = new qx.ui.form.Button('Click Me',testmapstr).set({appearance: "testbutton"});

    // var button1 = new qx.ui.form.Button('Click Me for a song',"data:text/html;&#9835;");

    var MSAccess = new ville.embed.Image({name:"fui-access", color:"#AB2325", width:60, height:60});
    var MSWord = new ville.embed.Image({name:"fui-word", color:"#1748A4", width:60, height:60});
    var MSExcel = new ville.embed.Image({name:"fui-excel", color:"#12743B", width:60, height:60, animation : "tada"});
    var MSPowerPoint = new ville.embed.Image({name:"fui-ppt", color:"#EE3111", width:60, height:60});
    var MSPublisher = new ville.embed.Image({name:"fui-pub", color:"#007462", width:60, height:60, animation : "tada"}); 
    var MSOnenote= new ville.embed.Image({name:"fui-onenote", color:"#420F6F", width:60, height:60}); 

    var logocontainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(40));

    logocontainer.add(MSAccess);
    logocontainer.add(MSWord);
    logocontainer.add(MSExcel);
    logocontainer.add(MSPowerPoint);
    logocontainer.add(MSPublisher);
    logocontainer.add(MSOnenote);
      

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});
      //doc.add(loneembedImage, {left: 330, top: 200});
      doc.add(logocontainer, {left: 100, top: 250});

      // Make dancing app icons



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
        var dsktpstylesheet = qx.ui.style.Stylesheet.getInstance();
        //console.log(dsktpstylesheet.__rules);
        var onesheet = document.styleSheets[1];
        //var allrules = document.styleSheets[1].cssRules;
        var firstrule = onesheet.cssRules[0].selectorText;
        var len = onesheet.cssRules.length;
        for (var i=len-1; i>=0; i--) {
          console.log(onesheet.cssRules[i].cssText)
        }
      });
    }
  }
});