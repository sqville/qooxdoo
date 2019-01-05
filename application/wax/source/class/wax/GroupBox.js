/* ************************************************************************


Copyright:


License:


Authors:
* 

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
*
*
*/

qx.Class.define("wax.GroupBox", 
{
  extend : qx.ui.groupbox.GroupBox,

  construct : function(legend, icon, collapsable)
  {
    //this.setCollapsable(collapsable);
    this.base(arguments);
    // Processing parameters
    if (legend != null) {
      this.setLegend(legend);
    }

    if (icon != null) {
      this.setIcon(icon);
    }

    // Processing parameters
    if (collapsable) {
      this.setCollapsable(true);
      var control = new qx.ui.tree.core.FolderOpenButton().set({
        alignY: "middle",
        width: 18,
        height: 18,
        backgroundColor: "gray",
        open : true
      });
      control.addListener("changeOpen", this._onChangeOpen, this);
      this._add(control, {top: 8, right: 10});
    }
  },
  /*
  *****************************************************************************
  PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The name of the diagram */
    collapsable :
    {
      nullable : true,
      check : "Boolean",
      init : false
    },

    collaps :
    {
      nullable : true,
      check : "Boolean",
      init : false
    },
    /**
    * Whether the groupbox is opened.
    */
    open :
    {
      check : "Boolean",
      init : false,
      event : "changeOpen",
      apply : "_applyOpen"
    }
  },
  /*
  *****************************************************************************
  MEMBERS
  *****************************************************************************
  */

  members :
  {
      
  /**
  * Event handler, which listens to open state changes of the open button
  *
  * @param e {qx.event.type.Data} The event object
  */
    _onChangeOpen : function(e)
    {
      this.setOpen(e.getData());
    },

    // property apply
    _applyOpen : function(value, old)
    {
      if (this.hasChildren()) {
        this.getChildrenContainer().setVisibility(value ? "visible" : "excluded");
      }

      this.base(arguments, value, old);
    }
  }
});

