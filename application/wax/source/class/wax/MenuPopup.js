/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Jonathan Weiß (jonathan_rass)


************************************************************************ */

/**
 * A popup which contains
 */
qx.Class.define("wax.MenuPopup",
{
  extend : qx.ui.popup.Popup,

  include : qx.ui.core.MBlocker,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Automatically add to application's root
    var root = this.getApplicationRoot();
    //root.add(this);

    this.__blocker = new qx.ui.core.Blocker(root);
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /** The hex value of the selected color. */
    value :
    {
      nullable : true,
      apply : "_applyValue",
      event : "changeValue"
    },

    /** Blocks the background if value is <code>true<code> */
    blockBackground :
    {
      check : "Boolean",
      themeable : true,
      init : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // Property apply
    _applyValue : function(value, old)
    {
      if (value === null)
      {}
      else
      {}
    },

    // overridden
    _applyVisibility : function(value, old)
    {
      this.base(arguments, value, old);
      this.__updateBlockerVisibility();
    },


    /**
     * Updates the blocker's visibility
     */
    __updateBlockerVisibility : function()
    {
      if (this.isVisible())
      {
        if (this.getBlockBackground()) {
          var zIndex = this.getZIndex();
          this.blockContent(zIndex - 1);
        }
      }
      else
      {
        if (this.isBlocked()) {
          this.unblock();
        }
      }
    }
  }
});
