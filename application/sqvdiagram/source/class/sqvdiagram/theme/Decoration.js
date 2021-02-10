/* ************************************************************************

   Copyright: 2019 

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

qx.Theme.define("sqvdiagram.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {
    "shape" :
    {
      style :
      {
        width : 0,
        color : "transparent",
        shadowLength : 0,
        shadowBlurRadius : 0,
        shadowColor : "transparent",
        backgroundColor : "background",
        radius: 0
      }
    },

    "shape-active" :
    {
      style :
      {
        width : 1,
        color : "window-border",
        backgroundColor : "background",
        radius: 3
      }
    },

    "shape-caption" : {
      style :
      {
        radius: 0,
        color: "transparent",
        widthBottom: 0
      }
    },

    "shape-caption-active" : {
      style :
      {
        radius: [3, 3, 0, 0],
        color: "window-border",
        widthBottom: 1
      }
    },
    
    "circle-pill" :
    {
      style :
      {
        color : "black",
        width: 2,
        radius: 1550
      }
    },

    "square-rectangle-sharp" :
    { 
      style :
      {
        color : "black",
        width: 2,
        radius: 0
      }
    },

    "square-rectangle-rounded" :
    { 
      style :
      {
        color : "black",
        width: 2,
        radius: 12
      }
    },

    "diamond" :
    { 
      style :
      {
        color : "black",
        width: 2,
        radius: 0
      }
    },

    "arrow-right" :
    {      
      style :
      {
        color : ["transparent",null,"transparent","gray"],
        style : ["solid",null,"solid","solid"],
        width : [8.5,0,8.5,8]
      }
    }
  }
});