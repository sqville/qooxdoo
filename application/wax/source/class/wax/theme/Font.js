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

    "default-bold" :
    {
      include : "default",
      bold : true
    },

    "mainmenubutton" :
    {
      include : "default",
      size : 16
    },

    "headeratom" :
    {
      include : "default-bold",
      size : 16
    },

    "control-header" :
    {
    	include : "default",
    	size : 32
    },

    "area-header" :
    {
      include : "default",
      size : 21
    }
  }
});