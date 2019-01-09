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

    "groupbox-open" :
    {
      style :
      {
        widthRight : 14,
        widthTop : 10,
        borderImageMode: "horizontal",
        borderImage : "wax/baseline-expand_less-24px.svg",
        repeatX: "stretch",
        backgroundPositionX: 50
      }
    },

    "groupbox-closed" :
    {
      style :
      {
        widthRight : 14,
        borderImageMode: "horizontal",
        borderImage : "wax/baseline-expand_more-24px.svg",
        repeatX: "stretch",
        backgroundPositionX: 50
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
    }
  }
});