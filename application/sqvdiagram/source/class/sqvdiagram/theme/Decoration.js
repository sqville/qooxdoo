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