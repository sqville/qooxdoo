/* ************************************************************************

   http://sqville.com

   Copyright:
     

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * 

************************************************************************ */

/**
 *
 */
qx.Class.define("wax.MenuButton",
{
  extend : qx.ui.form.RadioButton,
  implement : qx.ui.form.IRadioItem,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, icon)
  {
    this.base(arguments, label);

    if (icon !== undefined) {
      this.setIcon(icon);
    }
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    // overridden
    appearance :
    {
      refine : true,
      init : "mainmenubutton"
    },

    // overridden
    allowGrowX :
    {
      refine : true,
      init : true
    }

  }
});
