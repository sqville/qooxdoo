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
qx.Class.define("sqvdiagram.ComplexConnect",
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

  properties : {},


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _connections : [],

    _idgenerator : 0,

    _wline1 : null,

    _wline2 : null,

    _wline3 : null,

    _wline4 : null,

    _wline5 : null,

    _wline6 : null,

    _wstartconnpoint : null,

    _wendconnpoint : null,

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
        var wline4 = this._wline4 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline4.setUserData("shapetype", "connectline");
        wline4.setUserData("connectid", connection.id);
        wline4.setUserData("segmentid", 4);
        wline4.setUserData("elementAhashcode", elementA.toHashCode());
        wline4.setUserData("elementBhashcode", elementB.toHashCode());
        wline4.setUserData("elementA", elementA);
        wline4.setUserData("elementB", elementB);
        var wline5 = this._wline5 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline5.setUserData("shapetype", "connectline");
        wline5.setUserData("connectid", connection.id);
        wline5.setUserData("segmentid", 5);
        wline5.setUserData("elementAhashcode", elementA.toHashCode());
        wline5.setUserData("elementBhashcode", elementB.toHashCode());
        wline5.setUserData("elementA", elementA);
        wline5.setUserData("elementB", elementB);
        var wline6 = this._wline6 = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        wline6.setUserData("shapetype", "connectline");
        wline6.setUserData("connectid", connection.id);
        wline6.setUserData("segmentid", 6);
        wline6.setUserData("elementAhashcode", elementA.toHashCode());
        wline6.setUserData("elementBhashcode", elementB.toHashCode());
        wline6.setUserData("elementA", elementA);
        wline6.setUserData("elementB", elementB);

        appobj.add(wline1);
        appobj.add(wline2);
        appobj.add(wline3);
        appobj.add(wline4);
        appobj.add(wline5);
        appobj.add(wline6);

        /*
        var arrowrightdec = new qx.ui.decoration.Decorator().set({
          color : ["transparent",null,"transparent", options.color],
          style : ["solid",null,"solid","solid"],
          width : [8.5,0,8.5,8]
        });

        // Create line arrows and add them to the diagram
        //var wendarrow = this._wendarrow = new qx.ui.window.Window().set({backgroundColor: options.color, anonymous: true});
        var wendarrow = this._wendarrow = new qx.ui.popup.Popup(new qx.ui.layout.Grow).set({backgroundColor: options.color, anonymous: true, width: 8, height: 8, decorator: arrowrightdec, placementModeX: "direct", placementModeY: "direct", offsetTop: 1, offsetLeft: 2});
        wendarrow.setUserData("shapetype", "connectline-endarrow");
        wendarrow.setUserData("connectid", connection.id);
        wendarrow.setUserData("segmentid", 1);
        wendarrow.setUserData("elementAhashcode", elementA.toHashCode());
        wendarrow.setUserData("elementBhashcode", elementB.toHashCode());
        wendarrow.setUserData("elementA", elementA);
        wendarrow.setUserData("elementB", elementB);
        wendarrow.setPosition("left-middle");
        wendarrow.setAutoHide(false);
        wendarrow.placeToWidget(elementB, true);
        wendarrow.show();
        */

        // Position connection.
        this._positionConnection(connection);

        //elementA.setAlwaysOnTop(true);
        //elementB.setAlwaysOnTop(true);
        wline1.setAlwaysOnTop(true);
        wline2.setAlwaysOnTop(true);
        wline3.setAlwaysOnTop(true);
        wline4.setAlwaysOnTop(true);
        wline5.setAlwaysOnTop(true);
        wline6.setAlwaysOnTop(true);

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
  var posA = connection.elementA.getBounds();
  var pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  var pAtop = parseInt(posA.top, 10) + parseInt(posA.height/2, 10);

  var posB = connection.elementB.getBounds();
  var pBleft = parseInt(posB.left, 10) - 6; // + parseInt(posB.width/2, 10);
  var pBtop = parseInt(posB.top, 10) + parseInt(posB.height/2, 10);


  // Verify if the elements are aligned in a horizontal or vertical line.
    if(pAleft == pBleft || pAtop == pBtop) {
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