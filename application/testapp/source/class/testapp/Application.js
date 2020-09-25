/* ************************************************************************

   Copyright: 2020 

   License: MIT license

   Authors: 

************************************************************************ */

/**
 * This is the main application class of "testapp"
 *
 * @asset(testapp/*)
 */
qx.Class.define("testapp.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __inspectorModel : null,

    __strwidgetHier : "",

    __widgetHierarchy : {},

    __excludeChildren : ["qx.ui.form.Button", "qx.ui.form.ComboBox", "qx.ui.form.DateField"],

    __widgetPropSwap : {
      "qx.ui.form.Button" : {"label" : "title"}
    },

    __widgetSwap : {
      "qx.ui.container.Composite" : "View",
      "qx.ui.form.Button" : "Button"
    },

    __strimports : "",

    __arrImports : ["import React from 'react'"],

    __importsJson : {},

    __widgetProps : {},

    __strwidgetProps : "",

    __widgetObj : {},

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

      var view1 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      var view2 = new qx.ui.container.Composite(new qx.ui.layout.VBox()); 
      var view3 = new qx.ui.container.Composite(new qx.ui.layout.VBox());

      // Create a button
      var button1 = new qx.ui.form.Button("Click me", "testapp/test.png");
      var button2 = new qx.ui.form.Button("Second Button");
      var button3 = new qx.ui.form.Button("Third Button");
      var button4 = new qx.ui.form.Button("4 Button");

      view1.add(button1);
      //view1.add(button2);
      //view1.add(button3);
      //view1.add(button4);


      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      //doc.add(view3, {left: 100, top: 350});
      doc.add(view1, {left: 100, top: 50});
      //doc.add(view2, {left: 300, top: 50});

      //doc.add(button1, {left: 100, top: 50});

      // Add an event listener
      button1.addListener("execute", this.listobjects, this);

      //console.log(doc.classname);
    },

    listobjects : function() {
      this.__inspectorModel = new testapp.InspectorModel();
      this.__inspectorModel.setWindow(window);
      var allobjs = this.__inspectorModel.getObjects();
      var appRoot = this.__inspectorModel.getApplication().getRoot();
      console.log(allobjs);

      this._fillTree(appRoot, 0, 1);
      this.__cleanupStrWidgetHier();

      var mapObj = this.__widgetSwap;
      var arrimports = [];
      var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
      var newstr = this.__strwidgetHier.replace(re, function(matched){
        arrimports.push("import { " + mapObj[matched] + " } from 'react-native'");
        return mapObj[matched];
      });
      var uniqueimp = this.__arrImports.concat([...new Set(arrimports)]); 
      console.log(uniqueimp.join(";"));
      console.log(newstr);
      //console.log(this.__widgetProps);
      //console.log(this.__widgetObj);
    },

    _fillTree: function(parentWidget, position, outofnum)  {

      //var kids = this._structureToggle.isValue() ? "_getChildren" : "getChildren";
      var kids = "getChildren";

      // ignore all objects without children (spacer e.g.)
      if (parentWidget[kids] == undefined) {
        if (kids === "getChildren") {
          kids = "_getChildren";

          if (parentWidget[kids] == undefined) {
            return;
          }
        } else {
          return;
        }
      }

      var kidslength;

      if (this.__excludeChildren.includes(parentWidget.classname))
        kidslength = 0;
      else  
        kidslength = parentWidget[kids]().length;

      if (parentWidget.classname != "qx.ui.root.Application") {
        
        // add this widget to the imports string array
        //this.__widgetProps = this._getDataInherited(parentWidget);
        
        // add to the widget hierarchy string
        this.__strwidgetHier += "React.createElement(" + parentWidget.classname +", {" + this._getDataInherited(parentWidget) + "}";

        if (kidslength == 0)
          this.__strwidgetHier += ")";

        if (kidslength > 0 || (outofnum > 0 && position < outofnum -1))
          this.__strwidgetHier += ", ";        

      }

      // visit all children
      for (var k = 0; k < kidslength; k++) {

        // get the current child
        var childWidget = parentWidget[kids]()[k];

        var lastchar = this.__strwidgetHier.charAt(this.__strwidgetHier.length-1);

        if (lastchar == ")" || lastchar == "]")
          this.__strwidgetHier += ", ";

        if (k == 0)
          this.__strwidgetHier += "[";

          // visit the children of the current child
        this._fillTree(childWidget, k, kidslength);

        if (k == parentWidget[kids]().length - 1)
          this.__strwidgetHier += "])";
      }
    },

    __cleanupStrWidgetHier : function () {
      this.__strwidgetHier = this.__strwidgetHier.slice(1, -2);
    },

    _getDataInherited: function(qxObject) {
      // the first superclass is the class of the selected widget
      var superclass = qxObject;

      var iFrameWindow = this.__inspectorModel.getWindow();

      // create new properties array to store the property of a class
      var properties = [];

      var propsclubbed = [];

      // go threw the inheritance of the selected widget
      for (var i = 1; ; i++) {
        // store the properties and classnames in separate array
        properties[i] = iFrameWindow.qx.Class.getByName(superclass.classname).$$properties;

        for (var key in properties[i]) {
          var getterName = "get" + qx.lang.String.firstUp(key);

          var value = "undefined";

          // ignore all objects without children (spacer e.g.)
          if (qxObject[getterName] != undefined) {
            value = qxObject[getterName]();
            if (value == null)
              continue;
          } else {
            continue;
          }

          //var fullprop = qxObject.classname + ".";
          var fullprop = "";
          var ptype = properties[i][key].check;

          // check to see if the qx widget property is mapped to an rn property
          for (var qxprop in this.__widgetPropSwap[qxObject.classname]) {
            // swap rn prop for qx prop
            if (qxprop == key)
             key = this.__widgetPropSwap[qxObject.classname][qxprop];
          }

          if (ptype == "String" || 
              ptype == "Decorator" || 
              ptype == "Color" ||
              ptype == "Font" || 
              ptype instanceof Array) {
            fullprop = key + ' : "' + value + '"';
          } else {
            fullprop = key + ' : ' + value;
          }

          propsclubbed.push(fullprop);
        }

        // go threw all classes to the qx.core.Object class
        if(iFrameWindow.qx.Class.getByName("qx.core.Object") == superclass) {
          break;
        }

        // set the new class
        superclass = iFrameWindow.qx.Class.getByName(superclass.classname).superclass;
      }
      //console.log(qxObject);
      // return the data as a string
      return propsclubbed.join(",")
    }
  }
});