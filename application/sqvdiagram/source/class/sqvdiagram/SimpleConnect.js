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
qx.Class.define("sqvdiagram.SimpleConnect",
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
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _connections : [],

    _idgenerator : 0,

    _posA : null,

    _posB : null,

    _wline1 : null,

    _wline2 : null,

    _wline3 : null,

    _wendarrow : null,

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
        if(elementA == null || elementB == null || appobj == null) {
          return null;
        }

        var connection = this._createConnectionObject(elementA, elementB, options);

        // Add connection to the connection's list.
        this._connections[connection.id] = connection;
        
        // Create line Widgets and add them to the Root
        var wline1 = this._wline1 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline1.setUserData("shapetype", "connectline");
        wline1.setUserData("connectid", connection.id);
        wline1.setUserData("segmentid", 1);
        wline1.setUserData("elementAhashcode", elementA.toHashCode());
        wline1.setUserData("elementBhashcode", elementB.toHashCode());
        wline1.setUserData("elementA", elementA);
        wline1.setUserData("elementB", elementB);
        var wline2 = this._wline2 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline2.setUserData("shapetype", "connectline");
        wline2.setUserData("connectid", connection.id);
        wline2.setUserData("segmentid", 2);
        wline2.setUserData("elementAhashcode", elementA.toHashCode());
        wline2.setUserData("elementBhashcode", elementB.toHashCode());
        wline2.setUserData("elementA", elementA);
        wline2.setUserData("elementB", elementB);
        var wline3 = this._wline3 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline3.setUserData("shapetype", "connectline");
        wline3.setUserData("connectid", connection.id);
        wline3.setUserData("segmentid", 3);
        wline3.setUserData("elementAhashcode", elementA.toHashCode());
        wline3.setUserData("elementBhashcode", elementB.toHashCode());
        wline3.setUserData("elementA", elementA);
        wline3.setUserData("elementB", elementB);

        appobj.add(wline1);
        appobj.add(wline2);
        appobj.add(wline3);

        // Create line arrows and add them to the diagram
        //var wendarrow = this._wendarrow = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        var wendarrow = this._wendarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow).set({backgroundColor: options.color, anonymous: true, width: 8, height: 8, placementModeX: "direct", placementModeY: "direct"});
        wendarrow.setUserData("shapetype", "connectline-endarrow");
        wendarrow.setUserData("connectid", connection.id);
        //wendarrow.setUserData("segmentid", 1);
        //wendarrow.setUserData("elementAhashcode", elementA.toHashCode());
        //wendarrow.setUserData("elementBhashcode", elementB.toHashCode());
        //wendarrow.setUserData("elementA", elementA);
        wendarrow.setUserData("elementB", elementB);
        wendarrow.setAutoHide(false);
        wendarrow.placeToWidget(elementB, true);
        wendarrow.show();

        // Position connection.
        this._positionConnection(connection);

        // Position end point
        this._positionEndPoint();

        elementA.setAlwaysOnTop(true);
        elementB.setAlwaysOnTop(true);
        //wline1.setAlwaysOnTop(true);
        //wline2.setAlwaysOnTop(true);
        //wline3.setAlwaysOnTop(true);

        //this.info(connection);

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
  var posA = this._posA = connection.elementA.getBounds();
  var pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  var pAtop = parseInt(posA.top, 10) + parseInt(posA.height/2, 10);

  var posB = this._posB = connection.elementB.getBounds();
  var pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
  var pBtop = parseInt(posB.top, 10) + parseInt(posB.height/2, 10);


  // Verify if the elements are aligned in a horizontal or vertical line.
  //if(posA.left == posB.left || posA.top == posB.top) {
    if(pAleft == pBleft || pAtop == pBtop) {
      // Uses only one line (hide the other two).
      this._wline1.setVisibility("visible");
      //this._wline2.setVisibility("hidden");
      //this._wline3.setVisibility("hidden");
      this._wline2.setVisibility("visible");
      this._wline3.setVisibility("visible");

      // Verify if the line must be vertical or horizonal.
      if(pAleft == pBleft) {
          // Vertical line.
          this._positionVerticalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);
      } else {
          // Horizontal line.
          this._positionHorizontalLine(this._wline1, pAleft, pAtop, pBleft, pBtop, connection.radius, connection.roundedCorners);
      }
  } else {
      // Verify if must use two lines or three.
      if(connection.anchorA != connection.anchorB) {
          // Use two lines (hide the third).
          this._wline1.setVisibility("visible");
          this._wline2.setVisibility("visible");
          //this._wline3.setVisibility("hidden");
          this._wline3.setVisibility("visible");

          // Check the anchors of the elements.
          var corner = new Object();
          if(connection.anchorA == 'vertical') {
              // Find the corner's position.
              corner.left = pAleft;
              corner.top = pBtop;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
          } else {
              // Find the corner's position.
              corner.left = pBleft;
              corner.top = pAtop;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, pBleft, pBtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, pAleft, pAtop, corner.left, corner.top, connection.radius, connection.roundedCorners);
          }
      } else {
          // Use three lines.
          this._wline1.setVisibility("visible");
          this._wline2.setVisibility("visible");
          this._wline3.setVisibility("visible");
          
          // Declare connection points.
          var corner1 = new Object();
          var corner2 = new Object();
          
          // Find if the middle's line must be vertical o horizontal.
          if(connection.anchorA == 'vertical') {
              // Middle's line must be horizontal.
              corner1.top = parseInt((pAtop + pBtop)/2, 10);
              corner2.top = corner1.top;
              corner1.left = pAleft;
              corner2.left = pBleft;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, pAleft, pAtop, corner1.left, corner1.top, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline2, pBleft, pBtop, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline3, corner1.left, corner1.top, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
          } else {
              // Middle's line must be vertical.
              corner1.left = parseInt((pAleft + pBleft)/2, 10);
              corner2.left = corner1.left;
              corner1.top = pAtop;
              corner2.top = pBtop;
              
              // Draw lines.
              this._positionHorizontalLine(this._wline1, pAleft, pAtop, corner1.left, corner1.top, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, pBleft, pBtop, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline3, corner1.left, corner1.top, corner2.left, corner2.top, connection.radius, connection.roundedCorners);
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
    _positionVerticalLine : function(jqElement, point1left, point1top, point2left, point2top, radius, roundedCorners)
    {
      var halfRadius = parseInt(radius/2, 10);
      jqElement.setUserBounds(point1left - halfRadius, ((point1top > point2top)? (point2top - halfRadius) : (point1top - halfRadius) ), radius, ((point1top > point2top)? (point1top - point2top + radius) : (point2top - point1top + radius) ));
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
    _positionHorizontalLine : function(jqElement, point1left, point1top, point2left, point2top, radius, roundedCorners) 
    {
      var halfRadius = parseInt(radius/2, 10);
      jqElement.setUserBounds(((point1left > point2left)? (point2left - halfRadius) : (point1left - halfRadius) ), point1top - halfRadius, ((point1left > point2left)? (point1left - point2left + radius) : (point2left - point1left + radius) ), radius);
    },

    _positionEndPoint : function()
    {
      var postion = "left-middle";
      var a_left = this._posA.left;
      var a_top = this._posA.top;
      var a_width = this._posA.width;
      var a_height = this._posA.height;
      var b_left = this._posB.left;
      var b_top = this._posB.top;
      var b_width = this._posB.width;
      var b_height = this._posB.height;

      var arrowupdec = new qx.ui.decoration.Decorator().set({
        color : [null,"transparent",this._wendarrow.getBackgroundColor(),"transparent"],
        style : [null,"solid","solid","solid"],
        width : [0,8.5,8,8.5]
      });
      
      var arrowrightdec = new qx.ui.decoration.Decorator().set({
        color : ["transparent",null,"transparent", this._wendarrow.getBackgroundColor()],
        style : ["solid",null,"solid","solid"],
        width : [8.5,0,8.5,8]
      });

      var arrowdowndec = new qx.ui.decoration.Decorator().set({
        color : [this._wendarrow.getBackgroundColor(),"transparent",null,"transparent"],
        style : ["solid", "solid",null,"solid"],
        width : [8,8.5,0,8.5]
      });

      var arrowleftdec = new qx.ui.decoration.Decorator().set({
        color : ["transparent",this._wendarrow.getBackgroundColor(),"transparent",null],
        style : ["solid","solid","solid",null],
        width : [8.5,8,8.5,0]
      });
      
      
      this._wendarrow.resetOffset();
      if (b_left >= a_left + a_width)
      {
        postion = "left-middle";
        this._wendarrow.setDecorator(arrowrightdec);
        //this._wendarrow.setOffset([0,0,0,0]);
      }
      else if((b_left < a_left + a_width) && (b_left + b_width > a_left) && (b_top > a_top + a_height))
      {
        postion = "top-center";
        this._wendarrow.setDecorator(arrowdowndec);
        // adjust offset
        var blp = b_left + Math.round(b_width/2);
        var alp = a_left + Math.round(a_width/2);
        this._wendarrow.setOffsetLeft(Math.round((alp-blp)/2));
      }
      else if((b_left < a_left + a_width) && (b_left + b_width > a_left) && (b_top < a_top + a_height))
      {
        postion = "bottom-center";
        this._wendarrow.setDecorator(arrowupdec);
        // adjust offset
        var blp = b_left + Math.round(b_width/2);
        var alp = a_left + Math.round(a_width/2);
        this._wendarrow.setOffsetLeft(Math.round((alp-blp)/2));
      }
      else
      {
        postion = "right-middle";
        this._wendarrow.setDecorator(arrowleftdec);
      }
      this._wendarrow.setPosition(postion);
      this._wline3.setUserData("endarrow", this._wendarrow);
    },

    /**
     * Repostion existing connections.
     *
     * @param {array} array of line segment objects (Windows).
     * @returns {boolean} 'true' if the operation was done, 'false' if the connection no exists.
     */
    repositionConnections : function(arrlines) 
    {
      //Group and order lines by connect id and segment id
      arrlines.sort();
      var i;
      for (i = 0; i < arrlines.length; i++) { 
        //set up lines
        this._wline1 = arrlines[i]; i++;
        this._wline2 = arrlines[i]; i++;
        this._wline3 = arrlines[i];

        //set up connection
        var conn = this._createConnectionObject(arrlines[i].getUserData("elementA"), arrlines[i].getUserData("elementB"), null);

        // Position connection.
        this._positionConnection(conn);
        this._wendarrow = this._wline3.getUserData("endarrow");
        this._positionEndPoint();
      }
    },

    _createConnectionObject : function(elementA, elementB, options)
    {
      // Create connection object.
      var connection = new Object();
      //connection.id = 'sqvConnect_' + this._idgenerator++;
      connection.id = this._idgenerator++;
      connection.elementA = elementA;
      connection.elementB = elementB;
      connection.color = (options != null && options.color != null)? options.color + '' : '#808080';
      connection.radius = (options != null && options.radius != null && !isNaN(options.radius))? parseInt(options.radius, 10) : 4;
      connection.anchorA = (options != null && options.anchorA != null && (options.anchorA == 'vertical' || options.anchorA == 'horizontal'))? options.anchorA : 'horizontal';
      connection.anchorB = (options != null && options.anchorB != null && (options.anchorB == 'vertical' || options.anchorB == 'horizontal'))? options.anchorB : 'horizontal';
      connection.roundedCorners = options != null && options.roundedCorners != null && (options.roundedCorners == true || options.roundedCorners == 'true');
      return connection;
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
    }
  }
});