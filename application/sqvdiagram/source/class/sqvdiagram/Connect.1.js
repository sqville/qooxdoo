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
qx.Class.define("sqvdiagram.Connect1",
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
    }
    

    /**
     * 
     
    idgenerator :
    {
      check : "Integer",
      nullable : false,
      event : "changeIdgenerator",
      apply : "_applyIdgenerator",
      themeable : false,
      init : 0
    },*/


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

    _idgenerator : 0,

    _wline1 : null,

    _wline2 : null,

    _wline3 : null,

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
    connect: function (elementA, elementB, options, appobj) {
        // Verify if the element's selector are ok.
        /*if(elementA == null || jQuery(elementA).size() == 0 || elementB == null || jQuery(elementB).size() == 0) {
          return null;
        }*/
        if(elementA == null || elementB == null) {
          return null;
        }

        
        /*
        elementA = jQuery(elementA);
        if(elementA.size() > 1) elementA = elementA.first();
        elementB = jQuery(elementB);
        if(elementB.size() > 1) elementB = elementB.first();
        */

        // Create connection object.
        var connection = new Object();
        connection.id = 'jqSimpleConnect_' + this._idgenerator++;
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
        
        /*jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_1'));
        jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_2'));
        jQuery('body').prepend(div.replace('divUniqueIdentifier', connection.id + '_3'));*/

        /*var bodyele = qx.dom.Node.getBodyElement(window);
        bodyele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_1'));
        bodyele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_2'));
        bodyele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_3'));*/

        // mixin overflow properties so the lines can extend out from the small Window
        //qx.Class.include(connobj, qx.ui.core.MNativeOverflow);

        //insert into Root app

        /* Works but disappears
        var doc = appobj.getRoot();
        var docele = doc.getContentElement().getDomElement();
        docele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_1'));
        docele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_2'));
        docele.insertAdjacentHTML('afterbegin', div.replace('divUniqueIdentifier', connection.id + '_3'));
        */

        //var wline1 = this._wline1 = new qx.ui.core.Widget().set({backgroundColor: "yellow"});
        var wline1 = this._wline1 = new qx.ui.window.Window().set({backgroundColor: "yellow"});
        //var wline2 = this._wline2 = new qx.ui.core.Widget();
        var wline2 = this._wline2 = new qx.ui.window.Window().set({backgroundColor: "yellow"});
        //var wline3 = this._wline3 = new qx.ui.core.Widget();
        var wline3 = this._wline3 = new qx.ui.window.Window().set({backgroundColor: "yellow"});

        appobj.add(wline1);
        appobj.add(wline2);
        appobj.add(wline3);


        // Position connection.
        //OLD jqSimpleConnect._positionConnection(connection);
        this._positionConnection(connection);

        // Return result.
        return connection.id;
    },

    /**
 * Positions a connection, acording to the position of the elements which connects.
 * 
 * @param {object} connection A connection object.
 */
_positionConnection : function(connection) 
{
  // Calculate the positions of the element's center.
  //var posA = connection.elementA.offset();
  var posA = connection.elementA.getBounds();
  //posA.left = parseInt(posA.left, 10) + parseInt(connection.elementA.outerWidth()/2, 10);
  posA.left = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  //posA.top = parseInt(posA.top, 10) + parseInt(connection.elementA.outerHeight()/2, 10);
  posA.top = parseInt(posA.top, 10) + parseInt(posA.height/2, 10);

  //var posB = connection.elementB.offset();
  var posB = connection.elementB.getBounds();
  //posB.left = parseInt(posB.left, 10) + parseInt(connection.elementB.outerWidth()/2, 10);
  posB.left = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
  //posB.top = parseInt(posB.top, 10) + parseInt(connection.elementB.outerHeight()/2, 10);
  posB.top = parseInt(posB.top, 10) + parseInt(posB.height/2, 10);

  /*
  // Get the line's elements.
  //var line1 = jQuery('#' + connection.id + '_1');
  var line1 = q('#' + connection.id + '_1');
  //var line2 = jQuery('#' + connection.id + '_2');
  var line2 = q('#' + connection.id + '_2');
  //var line3 = jQuery('#' + connection.id + '_3');
  var line3 = q('#' + connection.id + '_3');
  */

  // Verify if the elements are aligned in a horizontal or vertical line.
  if(posA.left == posB.left || posA.top == posB.top) {
      // Uses only one line (hide the other two).
      //line1.show();
      //line2.hide();
      //line3.hide();
      this._wline1.setVisibility("visible");
      this._wline2.setVisibility("hidden");
      this._wline3.setVisibility("hidden");

      // Verify if the line must be vertical or horizonal.
      if(posA.left == posB.left) {
          // Vertical line.
          //this._positionVerticalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
          this._newpositionVerticalLine(this._wline1, posA, posB, connection.radius, connection.roundedCorners);
      } else {
          // Horizontal line.
          //this._positionHorizontalLine(line1, posA, posB, connection.radius, connection.roundedCorners);
          this._newpositionHorizontalLine(this._wline1, posA, posB, connection.radius, connection.roundedCorners);
      }
  } else {
      // Verify if must use two lines or three.
      if(connection.anchorA != connection.anchorB) {
          // Use two lines (hide the third).
          //line1.show();
          //line2.show();
          //line3.hide();
          this._wline1.setVisibility("visible");
          this._wline2.setVisibility("visible");
          this._wline3.setVisibility("hidden");

          // Check the anchors of the elements.
          var corner = new Object();
          if(connection.anchorA == 'vertical') {
              // Find the corner's position.
              corner.left = posA.left;
              corner.top = posB.top;
              
              // Draw lines.
              //this._positionVerticalLine(line1, posA, corner, connection.radius, connection.roundedCorners);
              this._newpositionVerticalLine(this._wline1, posA, corner, connection.radius, connection.roundedCorners);
              //this._positionHorizontalLine(line2, posB, corner, connection.radius, connection.roundedCorners);
              this._newpositionHorizontalLine(this._wline2, posB, corner, connection.radius, connection.roundedCorners);
          } else {
              // Find the corner's position.
              corner.left = posB.left;
              corner.top = posA.top;
              
              // Draw lines.
              //this._positionVerticalLine(line1, posB, corner, connection.radius, connection.roundedCorners);
              this._newpositionVerticalLine(this._wline1, posB, corner, connection.radius, connection.roundedCorners);
              //this._positionHorizontalLine(line2, posA, corner, connection.radius, connection.roundedCorners);
              this._newpositionHorizontalLine(this._wline2, posA, corner, connection.radius, connection.roundedCorners);
          }
      } else {
          // Use three lines.
          //line1.show();
          //line2.show();
          //line3.show();
          this._wline1.setVisibility("visible");
          this._wline2.setVisibility("visible");
          this._wline3.setVisibility("visible");
          
          // Declare connection points.
          var corner1 = new Object();
          var corner2 = new Object();
          
          // Find if the middle's line must be vertical o horizontal.
          if(connection.anchorA == 'vertical') {
              // Middle's line must be horizontal.
              corner1.top = parseInt((posA.top + posB.top)/2, 10);
              corner2.top = corner1.top;
              corner1.left = posA.left;
              corner2.left = posB.left;
              
              // Draw lines.
              //this._positionVerticalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
              this._newpositionVerticalLine(this._wline1, posA, corner1, connection.radius, connection.roundedCorners);
              //this._positionVerticalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
              this._newpositionVerticalLine(this._wline2, posB, corner2, connection.radius, connection.roundedCorners);
              //this._positionHorizontalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
              this._newpositionHorizontalLine(this._wline3, corner1, corner2, connection.radius, connection.roundedCorners);
          } else {
              // Middle's line must be vertical.
              corner1.left = parseInt((posA.left + posB.left)/2, 10);
              corner2.left = corner1.left;
              corner1.top = posA.top;
              corner2.top = posB.top;
              
              // Draw lines.
              //this._positionHorizontalLine(line1, posA, corner1, connection.radius, connection.roundedCorners);
              this._newpositionHorizontalLine(this._wline1, posA, corner1, connection.radius, connection.roundedCorners);
              //this._positionHorizontalLine(line2, posB, corner2, connection.radius, connection.roundedCorners);
              this._newpositionHorizontalLine(this._wline2, posB, corner2, connection.radius, connection.roundedCorners);
              //this._positionVerticalLine(line3, corner1, corner2, connection.radius, connection.roundedCorners);
              this._newpositionVerticalLine(this._wline3, corner1, corner2, connection.radius, connection.roundedCorners);
          }
      }
  }
},

/**
 * Draws a vertical line, between the two points, by changing the properties of a HTML element.
 *
 *@param {object} jqElement A jQuery object of the HTML element used for represent the line.
 *@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
 *@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
 *@param {integer} radius The line's radius.
 *@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
 */
_positionVerticalLine : function(jqElement, point1, point2, radius, roundedCorners) 
{
  var halfRadius = parseInt(radius/2, 10);
  //jqElement.css('left', point1.left - halfRadius);
  jqElement.setStyle("left", point1.left - halfRadius  + 'px');
  //jqElement.css('top', ((point1.top > point2.top)? (point2.top - halfRadius) : (point1.top - halfRadius)));
  jqElement.setStyle("top", ((point1.top > point2.top)? (point2.top - halfRadius) : (point1.top - halfRadius) ) + 'px');
  //jqElement.css('width', radius + 'px');
  jqElement.setStyle("width", radius + 'px');
  //jqElement.css('height', ((point1.top > point2.top)? (point1.top - point2.top + radius) : (point2.top - point1.top + radius) ) + 'px');
  jqElement.setStyle("height", ((point1.top > point2.top)? (point1.top - point2.top + radius) : (point2.top - point1.top + radius) ) + 'px');
},

_newpositionVerticalLine : function(jqElement, point1, point2, radius, roundedCorners)
{
  var halfRadius = parseInt(radius/2, 10);
  jqElement.setUserBounds(point1.left - halfRadius, ((point1.top > point2.top)? (point2.top - halfRadius) : (point1.top - halfRadius) ), radius, ((point1.top > point2.top)? (point1.top - point2.top + radius) : (point2.top - point1.top + radius) ));
},

/**
* Draws a horizontal line, between the two points, by changing the properties of a HTML element.
*
*@param {object} jqElement A jQuery object of the HTML element used for represent the line.
*@param {object} point1 An object with the properties 'left' and 'top' representing the position of the first point.
*@param {object} point2 An object with the properties 'left' and 'top' representing the position of the second point.
*@param {integer} radius The line's radius.
*@param {boolean} roundedCorners A boolean indicating if the corners are going to be round.
*/
_positionHorizontalLine : function(jqElement, point1, point2, radius, roundedCorners) 
{
  var halfRadius = parseInt(radius/2, 10);
  //jqElement.css('top', point1.top - halfRadius);
  jqElement.setStyle("top", point1.top - halfRadius + 'px');
  //jqElement.css('left', ((point1.left > point2.left)? (point2.left - halfRadius) : (point1.left - halfRadius)));
  jqElement.setStyle("left", ((point1.left > point2.left)? (point2.left - halfRadius) : (point1.left - halfRadius) ) + 'px');
  //jqElement.css('height', radius + 'px');
  jqElement.setStyle("height", radius + 'px');
  //jqElement.css('width', ((point1.left > point2.left)? (point1.left - point2.left + radius) : (point2.left - point1.left + radius) ) + 'px');
  jqElement.setStyle("width", ((point1.left > point2.left)? (point1.left - point2.left + radius) : (point2.left - point1.left + radius) ) + 'px');
},

_newpositionHorizontalLine : function(jqElement, point1, point2, radius, roundedCorners) 
{
  var halfRadius = parseInt(radius/2, 10);
  jqElement.setUserBounds(((point1.left > point2.left)? (point2.left - halfRadius) : (point1.left - halfRadius) ), point1.top - halfRadius, ((point1.left > point2.left)? (point1.left - point2.left + radius) : (point2.left - point1.left + radius) ), radius);
},

/**
 * Repaints a connection.
 *
 * @param {string} connectionId The connection identifier.
 * @returns {boolean} 'true' if the operation was done, 'false' if the connection no exists.
 */
_repaintConnection : function(connectionId) 
{
  var connection = this._connections[connectionId];
  if(connection != null) {
      this._positionConnection(connection);
      return true;
  }
  return false;
},
    
    /*
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
*/
    
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
    }


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