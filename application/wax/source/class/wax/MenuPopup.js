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

    this.__blocker = new qx.ui.core.Blocker(root);
    this.__blocker.getBlockerElement().activate();

    var fadeinb = {duration: 300, timing: "ease", keyFrames : {
      0: {opacity: 0},
      100: {opacity: .08}
      }};

    this.setBlockerAnimation(fadeinb);

    this.__blocker.addListener("blocked", function(e) {
      if (domtable = this.__blocker.getBlockerElement().getDomElement()) {
        qx.bom.element.Animation.animate(domtable, this.getBlockerAnimation());
      }
    }, this);

    this.setAllowGrowY(true);

  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /** Blocks the background if value is <code>true<code> */
    blockBackground :
    {
      check : "Boolean",
      themeable : true,
      init : true
    },

    blockerAnimation :
    {
      check : "Map",
      themeable : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
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
