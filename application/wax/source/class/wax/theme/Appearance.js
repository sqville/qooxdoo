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
          center: true,
          padding: [10, 6, 20, 6],
          font : "headeratom"
        }
      }
    },

    "header-atom/icon" :
    {
      include : "image",

      style : function(states)
      {
        return {
          width: 56,
          height: 56
        }
      }
    },

    "groupbox/legend/icon" :
    {
      style : function() {
        return {
          width: 32,
          height: 32
        };
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

    "groupbox-connected" : {
      alias : "groupbox",
      style : function(states)
      {
        return {
          decorator  : "white-box",
          contentPadding: 10
        };
      }
    },

    "groupbox-connected/legend" : {
      include : "groupbox/legend",
      style : function(states)
      {
        return {
          font: "control-header",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 12
        }
      }
    },

    "groupbox-connected/frame" :
    {
      include : "groupbox/frame",
      
      style : function(states)
      {
        return {
          marginTop : 30,
          decorator  : "connected-top-box"
        };
      }
    },

    "groupbox-connected/open" :
    {
      include : "groupbox/open",
      
      style : function(states)
      {
        return {
          height: 60
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      wax.MENUBUTTON
    ---------------------------------------------------------------------------
    */
   "mainmenubutton-frame" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = "mainmenubutton-box";
       var padding = [12, 6, 12, 15];
       var textcolor = "#606060";

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           decorator = "mainmenubutton-box-hovered";
           padding = [12,6,12,10];
           textcolor = "black";
         } /*else if (states.hovered && (states.pressed || states.checked)) {
           decorator = "mainmenubutton-box-pressed-hovered";
         }*/ else if (states.pressed || states.checked) {
           decorator = "mainmenubutton-box-pressed";
           padding = [12,6,12,10];
           textcolor = "black";
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         minWidth: 5,
         minHeight: 5,
         textColor: textcolor,
         font : "mainmenubutton"
       };
     }
   },

   "mainmenubutton-frame/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "mainmenubutton" :
   {
     alias : "mainmenubutton-frame",
     include : "mainmenubutton-frame",

     style : function(states)
     {
       return {
         center : false,
         minWidth : 220
       };
     }
   },

   "mainmenubutton/icon" : {

    style : function() {
        return {
          scale: true,
          width: 32,
          height: 32
        };
      }
    },

    "submenubutton" : {
     style : function(states)
     {
       return {
        cursor: states.disabled ? undefined : "pointer",
        textColor : states.hovered ? "black" : "#505050",
        font : "mainmenubutton",
        decorator: "mainmenubutton-box-pressed"
       };
     }
    }
  }
});