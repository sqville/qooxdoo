/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("${Namespace}.theme.Appearance",
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
          font: "area-header",
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
       var padding = [12, 6, 12, 19];
       //var textcolor = "#606060";
       var textcolor = "black";
       var opacity = .75;

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           decorator = "mainmenubutton-box-hovered";
           padding = [12,6,12,14];
           textcolor = "black";
           opacity = 1;
         } /*else if (states.hovered && (states.pressed || states.checked)) {
           decorator = "mainmenubutton-box-pressed-hovered";
         }*/ else if (states.pressed || states.checked) {
           decorator = "mainmenubutton-box-pressed";
           padding = [12,6,12,14];
           textcolor = "black";
           opacity = 1;
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         minWidth: 5,
         minHeight: 5,
         textColor: textcolor,
         font : "mainmenubutton",
         opacity : opacity
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
         minWidth : 220,
         gap : 14
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

    "mainmenuindicator" : {
      style : function() {
        return {
          backgroundColor : "gray",
          textColor : "white",
          height : 24,
          padding: [2,6,2,6],
          decorator : "mainmenuindicator",
          font : "mainmenuindicator"
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
    },

    /*
    ---------------------------------------------------------------------------
      wax.MENUBUTTON - "hym" = hybrid moble (i.e. phonegap or cordova)
    ---------------------------------------------------------------------------
    */

   "mainmenubutton-frame-hym" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = "mainmenubutton-box";
       var padding = [4,2,4,2];
       var textcolor = "black";
       var opacity = .55;

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           //decorator = "mainmenubutton-box-hovered";
           //padding = [12,6,12,14];
           textcolor = "black";
           opacity = 1;
         } /*else if (states.hovered && (states.pressed || states.checked)) {
           decorator = "mainmenubutton-box-pressed-hovered";
         }*/ else if (states.pressed || states.checked) {
           //decorator = "mainmenubutton-box-pressed";
           //padding = [12,6,12,14];
           textcolor = "blue";
           opacity = 1;
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         minWidth: 5,
         minHeight: 5,
         textColor: textcolor,
         font : "mainmenubutton-hym",
         opacity : opacity
       };
     }
   },

   "mainmenubutton-frame-hym/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "mainmenubutton-hym" :
   {
     alias : "mainmenubutton-frame-hym",
     include : "mainmenubutton-frame-hym",

     style : function(states)
     {
       return {
         center : true,
         gap : 2
       };
     }
   },

   "hym-page-button" :
   {
    style : function(states)
    {
      return {
        center : false,
        gap : 12,
        padding : [8,20,8,20],
        decorator : "page-button-right"
      };
    }
   },


    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "wax-window" : {
      alias : "window",

      include: "window",

      style : function(states)
      {
        return {
         showMaximize : false,
         showMinimize : false
        };
      }
    },
    
    "wax-window/title" : {
      alias : "window/title",

      style : function(states)
      {
        return {
         textColor : "black",
         font : "control-header"
        };
      }
     },

     "wax-window/captionbar" : {
      include : "window/captionbar",
      
      style : function(states)
      {
        return {
         decorator : "window-captionbar-default"
        };
      }
     },

     "wax-window/close-button" :
    {
      alias : "button",

      style : function(states)
      {
        return {
          marginLeft : 2,
          icon : states.hovered ? "${NamespacePath}/close-red-24px.svg" : "${NamespacePath}/close-24px.svg",
          padding : [ 1, 2 ],
          cursor : states.disabled ? undefined : "pointer"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
    PROGRESSBAR
    ---------------------------------------------------------------------------
    */

   "progressbar":
    {
      style: function(states) {
        return {
          decorator: "progressbar",
          padding: 0,
          backgroundColor: "progressbar-base",
          width : 200,
          height : 20
        };
      }
    },
    
    "progressbar-trans":
    {
      include: "progressbar",
      style: function(states) {
        return {
          decorator: "progressbar-trans",
          backgroundColor: "transparent"
        };
      }
    },

    "progressbar/progress":
    {
      style: function(states) {
        return {
          backgroundColor: "progressbar-gray"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      wax.UPLOAD
    ---------------------------------------------------------------------------
    */
   
   "upload" : {
    style : function(states)
     {
       return {
         decorator : "upload-area"
       };
     }
  },
  
  "upload/progressbar" : "progressbar-trans",
  
  "upload/progressbar/progress":
   {
     style: function(states) {
       return {
         backgroundColor: "progressbar-gray"
       };
     }
   },

   "upload/message/icon" : {
    style : function(states)
     {
       return {
         scale : true,
         width : 88,
         height : 88,
         opacity : .35
       };
     }
    }

  }
});