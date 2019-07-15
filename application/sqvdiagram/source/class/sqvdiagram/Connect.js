/* ************************************************************************
   sqv
   
   http://sqville.com
   Copyright: 
   License:
     MIT
   Authors:
     * Chris Eskew
************************************************************************ */

/**
 * 
 *
 *
 */
qx.Class.define("sqvdiagram.Connect",
{
  extend : qx.core.Object,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * 
   */
  construct : function(connfile)
  {

    this.base(arguments);
    
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    
    /**
     * This is an associative array which contains all the document's connections.
     */
    connections :
    {
      nullable : true,
      check : "Array"
    },
    

    /**
     * 
     */
    idgenerator :
    {
      check : "Integer",
      nullable : false,
      event : "changeIdgenerator",
      apply : "_applyIdgenerator",
      themeable : false,
      init : 0
    },


    /**
     * Configure the visibility of the sub elements/widgets.
     * Possible values: both, label, icon
     
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      themeable : true,
      inheritable : true,
      apply : "_applyShow",
      event : "changeShow"
    },
    
    icon :
    {
      check : "String",
      apply : "_applyIcon",
      nullable : true,
      themeable : true,
      event : "changeIcon"
    }
    */

    /**
     * The position of the icon in relation to the text.
     * Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
     
    iconPosition :
    {
      init   : "left",
      check : ["top", "right", "bottom", "left", "top-left", "bottom-left" , "top-right", "bottom-right"],
      themeable : true,
      apply : "_applyIconPosition"
    },*/

  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*__progressanimation : {timing: "ease", repeat: "infinite", 
      keyFrames : {
        0 : {"opacity": .3, "width": "0"},
        100 : {"opacity": 0, "width": "100%"}
      }
    },*/

    _connections : [],

     /**
     * Draws a connection between two elements.
     *
     * @param {object} elementA A CSS selector or a jQuery's object for select the first element.
     * @param {object} elementB A CSS selector or a jQuery's object for select the second element.
     * @param {object} options An associative array with the properties 'color' (which defines the color of the connection), 'radius' (the width of the
     * connection), 'roundedCorners' (a boolean indicating if the corners must be round), 'anchorA' (the anchor type of the first element, which can be 
     * 'horizontal' or 'vertical') and 'anchorB' (the anchor type of second element).
     * @returns {string} The connection identifier or 'null' if the connection could not be draw.
     */
    connect: function (elementA, elementB, options) {
        // Verify if the element's selector are ok.
        if(elementA == null || jQuery(elementA).size() == 0 || elementB == null || jQuery(elementB).size() == 0) {
          return null;
        }

        elementA = jQuery(elementA);
        if(elementA.size() > 1) elementA = elementA.first();
        elementB = jQuery(elementB);
        if(elementB.size() > 1) elementB = elementB.first();

        // Create connection object.
        var connection = new Object();
        connection.id = 'jqSimpleConnect_' + jqSimpleConnect._idGenerator++;
        connection.elementA = elementA;
        connection.elementB = elementB;
        connection.color = (options != null && options.color != null)? options.color + '' : '#808080';
        connection.radius = (options != null && options.radius != null && !isNaN(options.radius))? parseInt(options.radius, 10) : 5;
        connection.anchorA = (options != null && options.anchorA != null && (options.anchorA == 'vertical' || options.anchorA == 'horizontal'))? options.anchorA : 'horizontal';
        connection.anchorB = (options != null && options.anchorB != null && (options.anchorB == 'vertical' || options.anchorB == 'horizontal'))? options.anchorB : 'horizontal';
        connection.roundedCorners = options != null && options.roundedCorners != null && (options.roundedCorners == true || options.roundedCorners == 'true');

        // Add connection to the connection's list.
        //OLD jqSimpleConnect._connections[connection.id] = connection;
        this._connections[connection.id] = connection;

        // Create HTML elements.
        var div = '<div id="divUniqueIdentifier" class="jqSimpleConnect '+connection.id+'" ' + 
                'style="width:'+connection.radius+'px; ' +
                      'height:'+connection.radius+'px; ' +
                      'background-color:'+connection.color+'; ' +
                      (connection.roundedCorners? 'border-radius:'+parseInt(connection.radius/2,10)+'px; -webkit-border-radius:'+parseInt(connection.radius/2,10)+'px; -moz-border-radius:'+parseInt(connection.radius/2,10)+'px; ' : '') + 
                      'position:absolute;"></div>';
        jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_1'));
        jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_2'));
        jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_3'));

        // Position connection.
        jqSimpleConnect._positionConnection(connection);

        // Return result.
        return connection.id;
    },
    
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "message":
          control = new qx.ui.basic.Atom(this.getMessage()).set({alignX: "center", allowGrowX: false, gap: 0});
          control.setAnonymous(true);   
          control.setRich(this.getRich());
          this._add(control);
          break;

        case "button":
          control = new qx.ui.form.Button("blank", "sqv/test.png").set({allowGrowX: false});
          var inputctrl = new qx.html.Input("file", {display: "none"} , {id: "sqvinputupload1727", name:"uploadfiles", multiple: true});
          inputctrl.addListener("change", function(e) {
           	var filesizemax = 10;
			var filesizetotalmax = 10;
            var value = "";
            var filesize = 0;
			var filesizerunningsum = 0;
			var triggerupload = true;
            var targetobj = e.getTarget();
            var files = targetobj.files;
            for (var k = 0; k < files.length; k++) {
            	//value = value + files[k].name + ";;;";
				filesize = ((files[k].size/1024)/1024).toFixed(4); // MB
				if (filesize >= filesizemax){
				    //end loop and send error message to user
				    triggerupload = false;			    
				    break;
				}
				else {
				    filesizerunningsum += filesize; 
				    // add file to json string
				    value += qx.lang.Json.stringify([files[k]]);
				}
				if (filesizerunningsum >= filesizetotalmax) {
				    //end loop and send error message to user
				    triggerupload = false;
				    break;
				}
			}
			if (triggerupload){                
			    //value = qx.lang.Json.stringify([files]);
			    //this.setFileName(value);
			    //this.fireDataEvent('changeFileName', value);
			    var progressbar = this.getChildControl("progressbar", true);
			    progressbar.setBackgroundColor("progressbar-base");
			    
			    if (this.getDemo())
			    	progressbar.setValue(20);  
 
			}
          }, this);
          control.getContentElement().add(inputctrl);
          control.addListener("click", function(e) {
	        var browse = document.getElementById("sqvinputupload1727");
	        browse.click();
	      }, this);
          this._add(control);
          break;
          
        case "progressbar":
          control = new qx.ui.indicator.ProgressBar(0,100);
          control.setVisibility("hidden");
          control.getContentElement().setAttribute("id","sqvuploadpb1727");
          var animalayer = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", opacity: 0});
          var percent = new qx.ui.basic.Label("0%").set({textColor:"white", alignX: "right", allowGrowX: true});
          var progress = control.getChildControl("progress");
          control.addListener("change", function(e) {
	     	if (control.getValue() > 0) {
	     		percent.setValue(control.getValue() + "%");
	     		control.setVisibility("visible");
	     		animalayer.set({visibility: "visible"});
	     		progress.set({backgroundColor: "gray"});
	     	}
	     	else {
	     		control.setVisibility("hidden");
	     	}
	      }, this);
	      control.addListener("complete", function(e) {
			percent.setValue(control.getValue() + "%");
			animalayer.set({visibility: "hidden"});
			progress.set({backgroundColor: "green"});
		  }, this);
          progress._add(percent, {right: 2});
          progress._add(animalayer, {height: "100%", width: "100%"});
          animalayer.addListener("appear", function(e) {
	     	var domtable = animalayer.getContentElement().getDomElement();
	     	qx.bom.element.Animation.animate(domtable, this.__progressanimation, 2000);
	      }, this);
          
          this._add(control);
          
          break;
      }

      return control || this.base(arguments, id);
    },

    
     /**
     * Add CSS to support dragenter event change
     */
    __addCssdragenterClass: function (dragovermsg) {
    	var dsktopstylsheet = qx.ui.style.Stylesheet.getInstance();
    	if (!dsktopstylsheet.hasRule()) {
    		//add the rule to qx.desktop's stylesheet
    		var rulename = ".sqvdocumentdndenter1727";
    		//var css = "opacity: .7;" +
    			//"background-color: #F0F8FF;";
    		var css = "opacity: .7; border: 1px solid orange !important;";
    		
    		dsktopstylsheet.addRule(rulename, css);
    		
    		/*var rulenameafter = rulename + ":after";
    		var cssafter = "color: white;" +
    			"font-size: 14px;" +
    			"font-style: bold;" +
    			"z-index: 3000;" +
    			"width: 100%" +
    			"height: 100%;" +
    			"padding: 2px;" +
    			"top: 0;" +
    			"left: 5;" +
    			"position: absolute;" +
    			"opacity: 1;" +
    			"background-color: blue;" +
    			"text-align: center;" +
    			"content: '" + dragovermsg +"';";*/
    		
    		//dsktopstylsheet.addRule(rulenameafter, cssafter);
    		//dsktopstylsheet.addRule(rulenamebefore, cssbefore);
    	}
    },


    /**
     * Updates the visibility of the icon
     
    _handleIcon : function()
    {
      if (this.getIcon() == null || this.getShow() === "label") {
        this._excludeChildControl("icon");
      } else {
        this._showChildControl("icon");
      }
    },
   
   // property apply
    _applyMessage : function(value, old)
    {
      var message = this.getChildControl("message", true);
      if (message) {
        message.setLabel(value);
      }
    },


    // property apply
    _applyLabel : function(value, old)
    {
      var button = this.getChildControl("button", true);
      if (button) {
        button.setLabel(value);
      }
    },
    
    // property apply
    _applyIcon : function(value, old)
    {
      var button = this.getChildControl("button", true);
      if (button) {
        button.setIcon(value);
      }
    },


    // property apply
    _applyRich : function(value, old)
    {
      var button = this.getChildControl("button", true);
      var message = this.getChildControl("message", true);
      if (message) {
        message.getLabel().setRich(value);
        var label = button.getChildControl("label", true);
        if (label) {
        	label.setRich(value);
      	}
      }
    },

    // property apply
    _applySpacing : function(value, old) {
      this._getLayout().setSpacing(value);
    },

    // property apply
    _applyCenter : function(value, old) {
      this._getLayout().setAlignX("center");
      this._getLayout().setAlignY("bottom");
    }
    */
  }
});