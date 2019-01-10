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
    "header-atom" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          iconPosition: "top", 
          center: true
        }
      }
    },

    "header-atom/icon" :
    {
      include : "image",

      style : function(states)
      {
        return {
          scale: true,
          width: 56,
          height: 56
        }
      }
    },
    
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
          height: 30,
          decorator : states.opened ? "groupbox-open" : "groupbox-closed"
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