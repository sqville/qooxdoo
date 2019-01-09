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

    "groupbox/open" :
    {
      include : "image",
      style : function(states)
      {
        return {
          source : states.opened ? "wax/baseline-expand_less-24px.svg" : "wax/baseline-expand_more-24px.svg"
          //source : "",
          //decorator : states.opened ? "groupbox-open" : "groupbox-closed"
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