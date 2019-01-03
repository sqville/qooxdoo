/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("wax.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
    "westmainmenubutton" : "button",
    
    "westmainmenubutton/label" : {
      include : "label",

      style : function() {
        return {
          alignX: "left"
        };
      }
    },

    "westmainmenubutton/icon" : {
      include : "icon",

      style : function() {
        return {
          alignX: "left",
          marginLeft: -20
        };
      }
    }
  }
});