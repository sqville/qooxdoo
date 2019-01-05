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
    "groupbox/legend" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          paddingRight : 35,
          margin : 4
        };
      }
    },
    
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