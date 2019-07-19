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
qx.Class.define("sqvdiagram.Connect2",
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
        if(elementA == null || elementB == null) {
          return null;
        }

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
        this._connections[connection.id] = connection;

        // Create HTML elements.
        var div = '<div id="divUniqueIdentifier" class="jqSimpleConnect '+connection.id+'" ' + 
                'style="width:'+connection.radius+'px; ' +
                      'height:'+connection.radius+'px; ' +
                      'background-color:'+connection.color+'; ' +
                      (connection.roundedCorners? 'border-radius:'+parseInt(connection.radius/2,10)+'px; -webkit-border-radius:'+parseInt(connection.radius/2,10)+'px; -moz-border-radius:'+parseInt(connection.radius/2,10)+'px; ' : '') + 
                      'position:absolute;"></div>';
        
        // Create line Widgets and add them to the Root
        var wline1 = this._wline1 = new qx.ui.window.Window().set({backgroundColor: "yellow"});
        var wline2 = this._wline2 = new qx.ui.window.Window().set({backgroundColor: "yellow"});
        var wline3 = this._wline3 = new qx.ui.window.Window().set({backgroundColor: "yellow"});

        appobj.add(wline1);
        appobj.add(wline2);
        appobj.add(wline3);

        // Position connection.
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
  var posA = connection.elementA.getBounds();
  //posA.left = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  var pAleft = parseInt(posA.left, 10) + parseInt(posA.width/2, 10);
  //posA.top = parseInt(posA.top, 10) + parseInt(posA.height/2, 10);
  var pAtop = parseInt(posA.top, 10) + parseInt(posA.height/2, 10);

  var posB = connection.elementB.getBounds();
  //posB.left = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
  var pBleft = parseInt(posB.left, 10) + parseInt(posB.width/2, 10);
  //posB.top = parseInt(posB.top, 10) + parseInt(posB.height/2, 10);
  var pBtop = parseInt(posB.top, 10) + parseInt(posB.height/2, 10);

  var posBb = connection.elementB.getBounds();
  var posAa = connection.elementA.getBounds();

  // Verify if the elements are aligned in a horizontal or vertical line.
  //if(posA.left == posB.left || posA.top == posB.top) {
    if(pAleft == pBleft || pAtop == pBtop) {
      // Uses only one line (hide the other two).
      this._wline1.setVisibility("visible");
      this._wline2.setVisibility("hidden");
      this._wline3.setVisibility("hidden");

      // Verify if the line must be vertical or horizonal.
      if(posA.left == posB.left) {
          // Vertical line.
          this._positionVerticalLine(this._wline1, posA, posB, connection.radius, connection.roundedCorners);
      } else {
          // Horizontal line.
          this._positionHorizontalLine(this._wline1, posA, posB, connection.radius, connection.roundedCorners);
      }
  } else {
      // Verify if must use two lines or three.
      if(connection.anchorA != connection.anchorB) {
          // Use two lines (hide the third).
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
              this._positionVerticalLine(this._wline1, posA, corner, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, posB, corner, connection.radius, connection.roundedCorners);
          } else {
              // Find the corner's position.
              corner.left = posB.left;
              corner.top = posA.top;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, posB, corner, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, posA, corner, connection.radius, connection.roundedCorners);
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
              corner1.top = parseInt((posA.top + posB.top)/2, 10);
              corner2.top = corner1.top;
              corner1.left = posA.left;
              corner2.left = posB.left;
              
              // Draw lines.
              this._positionVerticalLine(this._wline1, posA, corner1, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline2, posB, corner2, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline3, corner1, corner2, connection.radius, connection.roundedCorners);
          } else {
              // Middle's line must be vertical.
              corner1.left = parseInt((posA.left + posB.left)/2, 10);
              corner2.left = corner1.left;
              corner1.top = posA.top;
              corner2.top = posB.top;
              
              // Draw lines.
              this._positionHorizontalLine(this._wline1, posA, corner1, connection.radius, connection.roundedCorners);
              this._positionHorizontalLine(this._wline2, posB, corner2, connection.radius, connection.roundedCorners);
              this._positionVerticalLine(this._wline3, corner1, corner2, connection.radius, connection.roundedCorners);
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
    }
  }
});