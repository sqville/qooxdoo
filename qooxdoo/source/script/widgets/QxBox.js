function QxBox(vOrientation, vBlockAlign, vChildrenAlign) 
{
  QxWidget.call(this);
  
  this.setWidth("auto");
  this.setHeight("auto");

  if (isValid(vOrientation)) {
    this.setOrientation(vOrientation);
  };

  if (isValid(vBlockAlign)) {
    this.getOrientation() == "horizontal" ? this.setHorizontalBlockAlign(vBlockAlign) : this.setVerticalChildrenAlign(vChildrenAlign);
  };

  if (isValid(vChildrenAlign)) {
    this.getOrientation() == "horizontal" ? this.setHorizontalChildrenAlign(vChildrenAlign) : this.setVerticalChildrenAlign(vChildrenAlign);
  };
};

QxBox.extend(QxWidget, "QxBox");

/*
  Horizontal alignment of box content block (if orientation==horizontal)
  
  Possible values: left, center, right
*/
QxBox.addProperty({ name : "horizontalBlockAlign", type : String, defaultValue : "left" });

/*
  Vertical alignment of box content block (if orientation==vertical)
  
  Possible values: top, middle, bottom
*/
QxBox.addProperty({ name : "verticalBlockAlign", type : String, defaultValue : "top" });

/*!
  Orientation of box
  
  Possible values: horizontal or vertical
*/
QxBox.addProperty({ name : "orientation", type : String, defaultValue : "horizontal" });


/*!
  Horizontal alignment of each child in the block
  
  Possible values: left, center, right
*/
QxBox.addProperty({ name : "horizontalChildrenAlign", type : String, defaultValue : "center" });

/*!
  Vertical alignment of each child in the block
  
  Possible values: top, middle, bottom
*/
QxBox.addProperty({ name : "verticalChildrenAlign", type : String, defaultValue : "middle" });

/*!
  Spacing between widgets (like cellspacing in HTML tables)
  
  Possible values: any positive integer value
*/
QxBox.addProperty({ name : "spacing", type : Number, defaultValue : 0 });


/*
------------------------------------------------------------------------------------
  BASICS

  Extend this core functions of QxWidget.
------------------------------------------------------------------------------------
*/

proto._onnewchild = function(otherObject)
{
  this.getWidth() == "auto" ? this._setChildrenDependWidth(otherObject, "append-child") : this._layoutInternalWidgetsHorizontal("append-child");
  this.getHeight() == "auto" ? this._setChildrenDependHeight(otherObject, "append-child") : this._layoutInternalWidgetsVertical("append-child");
};

proto._onremovechild = function(otherObject)
{
  this.getWidth() == "auto" ? this._setChildrenDependWidth(otherObject, "remove-child") : this._layoutInternalWidgetsHorizontal("remove-child");
  this.getHeight() == "auto" ? this._setChildrenDependHeight(otherObject, "remove-child") : this._layoutInternalWidgetsVertical("remove-child");
};





/*
------------------------------------------------------------------------------------
  RENDERER: INNER DIMENSION SIGNAL

  should be called always when the inner dimension have been modified
------------------------------------------------------------------------------------
*/

proto._innerWidthChanged = function()
{
  // Invalidate internal cache
  this._invalidateInnerWidth();
  
  // Update placement of children
  this._layoutInternalWidgetsHorizontal("inner-width")
};


proto._innerHeightChanged = function()
{
  // Invalidate internal cache
  this._invalidateInnerHeight();

  // Update placement of children
  this._layoutInternalWidgetsVertical("inner-height")
};






/*
------------------------------------------------------------------------------------
  RENDERER: OUTER DIMENSION SIGNAL

  should be called always when the outer dimensions have been modified
------------------------------------------------------------------------------------
*/

proto._childOuterWidthChanged = function(vModifiedChild, vHint)
{
  if (!this._wasVisible) {
    return;
  };
  
  this._layoutInternalWidgetsVertical(vHint);
  
  switch(vHint)
  {
    case "position-and-size":
    case "position":
      break;

    default:
      if (this.getWidth() == "auto")
      {
        return this._setChildrenDependWidth(vModifiedChild, vHint);
      }
      else
      {
        this._layoutInternalWidgetsHorizontal(vHint);
      };
  };

  // new, inherit from widget
  QxWidget.prototype._childOuterWidthChanged.call(this, vModifiedChild, vHint);
};

proto._childOuterHeightChanged = function(vModifiedChild, vHint)
{
  if (!this._wasVisible) {
    return;
  };
  
  switch(vHint)
  {
    case "position-and-size":
    case "position":
      break;

    default:
      if (this.getHeight() == "auto")
      {
        return this._setChildrenDependHeight(vModifiedChild, vHint);
      }
      else
      {
        this._layoutInternalWidgetsVertical(vHint);
      };
  };

  // new, inherit from widget
  QxWidget.prototype._childOuterHeightChanged.call(this, vModifiedChild, vHint);
};













/*
------------------------------------------------------------------------------------
  RENDERER: PLACEMENT OF CHILDREN
------------------------------------------------------------------------------------
*/

proto._layoutInternalWidgetsHorizontal = function()
{
  switch(this.getOrientation())
  {
    case "horizontal":
      var inner = this.getInnerWidth();
      
      var sum = 0;
      
      var ch = this.getChildren();
      var chl = ch.length;
      var chc;
      var w;
      var spacing = this.getSpacing();
      var p = [];
      
      for (var i=0; i<chl; i++)
      {
        // add current value to array        
        p.push(sum);

        // calculate new value for next child
        chc = ch[i];
        sum += chc.getMarginLeft() + chc.getAnyWidth() + chc.getMarginRight() + spacing;   
      };

      // substract last spacing
      sum -= spacing;
        
      var startpos = this.getPaddingLeft();
      
      // handle block alignment
      switch(this.getHorizontalBlockAlign())
      {
        case "center":
          startpos += (inner - sum) / 2;
          break;
          
        case "right":
          startpos += inner - sum;
          break;
      };
    
      // apply new positions
      for (var i=0; i<chl; i++) {
        ch[i]._applyPositionHorizontal(startpos + p[i]);    
      };     
      
      break;      
      
      
      
    case "vertical":
      var inner = this.getInnerWidth();
      
      var ch = this.getChildren();
      var chl = ch.length;
      var chc;
      
      var glob = this.getHorizontalChildrenAlign();
      var cust, pos;
      
      for (var i=0; i<chl; i++)
      {
        chc = ch[i];  
        cust = chc.getHorizontalAlign();
        pos = this.getPaddingLeft();
        
        switch(isValidString(cust) ? cust : glob)
        {
          case "right":
            pos += inner-chc.getAnyWidth();
            break;
            
          case "center":
            pos += Math.floor((inner-chc.getAnyWidth())/2);
            break;
        };
        
        // we need full control for correct position handling
        // so we need the remove the configured margin from the
        // calculated position value
        chc._applyPositionHorizontal(pos - chc.getMarginLeft());
      };
      
      break; 
  };
  
  return true;
};



proto._layoutInternalWidgetsVertical = function()
{
  switch(this.getOrientation())
  {
    case "horizontal":
      var inner = this.getInnerHeight();
      
      var ch = this.getChildren();
      var chl = ch.length;
      var chc;
      
      var glob = this.getVerticalChildrenAlign();
      var cust, pos;
      
      for (var i=0; i<chl; i++)
      {
        chc = ch[i];  
        cust = chc.getVerticalAlign();
        pos = this.getPaddingTop();
        
        switch(isValidString(cust) ? cust : glob)
        {
          case "bottom":
            pos += inner-chc.getAnyHeight();
            break;
            
          case "middle":
            pos += Math.floor((inner-chc.getAnyHeight())/2);
            break;
        };

        // we need full control for correct position handling
        // so we need the remove the configured margin from the
        // calculated position value
        chc._applyPositionVertical(pos - chc.getMarginTop());
      };
      
      break;



    case "vertical":
      var inner = this.getInnerHeight();
      
      var sum = 0;
      
      var ch = this.getChildren();
      var chl = ch.length;
      var chc;
      var h;
      var spacing = this.getSpacing();
      var p = [];
      
      for (var i=0; i<chl; i++)
      {
        // add current value to array        
        p.push(sum);

        // calculate new value for next child
        chc = ch[i];
        sum += chc.getMarginTop() + chc.getAnyHeight() + chc.getMarginBottom() + spacing;   
      };

      // substract last spacing
      sum -= spacing;
        
      var startpos = this.getPaddingTop();
      
      // handle block alignment
      switch(this.getVerticalBlockAlign())
      {
        case "middle":
          startpos += (inner - sum) / 2;
          break;
          
        case "bottom":
          startpos += inner - sum;
          break;
      };
    
      // apply new positions
      for (var i=0; i<chl; i++) {
        ch[i]._applyPositionVertical(startpos + p[i]);    
      };    
      
      break;    
  };
  
  return true; 
};







/*
------------------------------------------------------------------------------------
  MODIFIER
------------------------------------------------------------------------------------
*/

proto._modifyOrientation = function(propValue, propOldValue, propName, uniqModIds)
{
  if (this._wasVisible)
  {
    this.getWidth() == "auto" ? this._setChildrenDependWidth(this, "orientation") : this._layoutInternalWidgetsHorizontal("orientation");
    this.getHeight() == "auto" ? this._setChildrenDependHeight(this, "orientation") : this._layoutInternalWidgetsVertical("orientation");
  };
  
  return true;
};

proto._modifySpacing = function(propValue, propOldValue, propName, uniqModIds) 
{
  if (this._wasVisible)
  {
    if (this.getOrientation() == "horizontal")
    {
      this.getWidth() == "auto" ? this._setChildrenDependWidth(null, "spacing") : this._layoutInternalWidgetsHorizontal("spacing");
    }
    else
    {
      this.getHeight() == "auto" ? this._setChildrenDependHeight(null, "spacing") : this._layoutInternalWidgetsVertical("spacing");
    };   
  };
  
  return true;
};

proto._modifyHorizontalBlockAlign = function(propValue, propOldValue, propName, uniqModIds) {
  return this._wasVisible ? this._layoutInternalWidgetsHorizontal("block-align") : true;
};

proto._modifyVerticalBlockAlign = function(propValue, propOldValue, propName, uniqModIds) {
  return this._wasVisible ? this._layoutInternalWidgetsVertical("block-align") : true;
};

proto._modifyHorizontalChildrenAlign = function(propValue, propOldValue, propName, uniqModIds) {
  return this._wasVisible ? this._layoutInternalWidgetsHorizontal("children-align") : true;
};

proto._modifyVerticalChildrenAlign = function(propValue, propOldValue, propName, uniqModIds) {
  return this._wasVisible ? this._layoutInternalWidgetsVertical("children-align") : true;
};








/*
------------------------------------------------------------------------------------
  RENDERER: CHILDREN DEPEND DIMENSIONS: MAIN
------------------------------------------------------------------------------------
*/

proto._calculateChildrenDependWidth = function(vModifiedWidget, vHint) 
{
  if (this.getOrientation() == "vertical") {
    return QxWidget.prototype._calculateChildrenDependWidth.call(this, vModifiedWidget, vHint);
  };
  
  var w = 0;
  var spacing = this.getSpacing();
  
  var ch = this.getChildren();
  var chl = ch.length;
  var chc;
  
  for (var i=0; i<chl; i++)
  {
    chc = ch[i];
    w += chc.getMarginLeft() + chc.getAnyWidth() + chc.getMarginRight() + spacing;
  };
  
  // substract last spacing
  return w - spacing;
};

proto._calculateChildrenDependHeight = function(vModifiedWidget, vHint) 
{
  if (this.getOrientation() == "horizontal") {
    return QxWidget.prototype._calculateChildrenDependHeight.call(this, vModifiedWidget, vHint);
  };  
  
  var h = 0;
  var spacing = this.getSpacing();
  
  var ch = this.getChildren();
  var chl = ch.length;
  var chc;
  
  for (var i=0; i<chl; i++)
  {
    chc = ch[i];
    h += chc.getMarginTop() + chc.getAnyHeight() + chc.getMarginBottom() + spacing;
  };

  // substract last spacing
  return h - spacing;
};

proto._setChildrenDependWidth = function(vModifiedWidget, vHint)
{
  var newWidth = this._calculateChildrenDependWidth(vModifiedWidget, vHint);

  // If the width did not change the setter below will not re-layout the children.
  // We will force this here if the icon or text was appended, to ensure a perfect layout.
  if (this._widthMode == "inner" && this._widthModeValue == newWidth)
  {
    if (vHint == "size") {
      return this._layoutInternalWidgetsHorizontal(vHint);
    };
  }
  else
  {
    this.setInnerWidth(newWidth, null, true);
  };

  return true;
};

proto._setChildrenDependHeight = function(vModifiedWidget, vHint)
{
  var newHeight = this._calculateChildrenDependHeight(vModifiedWidget, vHint);

  // If the height did not change the setter below will not re-layout the children.
  // We will force this here if the icon or text was appended, to ensure a perfect layout.
  if (this._heightMode == "inner" && this._heightModeValue == newHeight)
  {
    if (vHint == "size") {
      return this._layoutInternalWidgetsVertical(vHint);
    };
  }
  else
  {
    this.setInnerHeight(newHeight, null, true);
  };

  return true;
};
