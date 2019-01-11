/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("wax.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {

    "tablelist-list" :
    {
      style :
      {
        width : 1,
        color : "gray"
      }
    },
    
    "groupbox-open" :
    {
      style :
      {
        backgroundImage: "wax/baseline-expand_less-24px.svg",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },

    "groupbox-closed" :
    {
      style :
      {
        backgroundImage: "wax/baseline-expand_more-24px.svg",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },
    
    "border-me" :
    {
      style :
      {
        width : 1,
        color : "black",
        style : "solid"
      }
    },

    "topheader" :
    {
      style :
      {
        width : [0,0,1,0],
        color : "gray",
        style : "solid"
      }
    },

    "leftside" :
    {
      style :
      {
        width : [0,1,0,0],
        color : "gray",
        style : "solid"
      }
    },

    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
   "mainmenubutton-box" :
   {
     style :
     {
       radius : 0,
       width : 0,
       backgroundColor : "white"
     }
   },

   "mainmenubutton-box-pressed" :
   {
     include : "mainmenubutton-box",

     style :
     {
      width : [0,0,0,3],
      radius : [1,0,0,1],
      color : ["button-box-bright-pressed","button-box-bright-pressed","button-box-bright-pressed","blue"], 
      backgroundColor : "#E5E7E9"
     }
   },

   "mainmenubutton-box-pressed-hovered" : 
   {
     include : "mainmenubutton-box-pressed",

     style :
     {
       color : "button-border-hovered"
     }
   },

   "mainmenubutton-box-hovered" :
   {
     include : "mainmenubutton-box-pressed",

     style :
     {
      color : ["button-box-bright-pressed","button-box-bright-pressed","button-box-bright-pressed","#E5E7E9"],
       backgroundColor : "#F2F3F4"
     }
   }
  }
});