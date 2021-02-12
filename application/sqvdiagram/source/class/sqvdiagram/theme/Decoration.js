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
        width : 1,
        color : "transparent",
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
        color: "window-border"
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
    },

    "dark-arrow-right" :
    {
      style :
      {
        color : ["transparent",null,"transparent", "black"],
        style : ["solid",null,"solid","solid"],
        width : [10.5,0,10.5,24]
      }
    },

    "dark-arrow-up" :
    {
      style :
      {
        color : [null,"transparent","black","transparent"],
        style : [null,"solid","solid","solid"],
        width : [0,10.5,24,10.5]
      }
    },

    "dark-arrow-down" :
    {
      style :
      {
        color : ["black","transparent",null,"transparent"],
        style : ["solid", "solid",null,"solid"],
        width : [24,10.5,0,10.5]
      }
    },

    "dark-arrow-left" :
    {
      style :
      {
        color : ["transparent","black","transparent",null],
        style : ["solid","solid","solid",null],
        width : [10.5,24,10.5,0]
      }
    }
    
  }
});