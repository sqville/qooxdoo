/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("wax.theme.Font",
{
  extend : qx.theme.indigo.Font,

  fonts :
  {
    "default" :
    {
      size : 14,
      family : ["Lato", "Helvetica Neue", "arial", "Helvetica", "sans-serif"],
      color : "text",
      lineHeight: 1.5
    },

    "control-header" :
    {
    	include : "default",
    	size : 24,
    	bold : true
    }
  }
});