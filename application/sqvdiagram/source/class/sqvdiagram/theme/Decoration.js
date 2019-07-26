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
    "circle" :
    {
      
      include : "window",

      style :
      {
        width: 1,
        radius: 50
      }
    },

    "rectangle-rounded" :
    {
      include : "window",
      
      style :
      {
        width: 1,
        radius: 25
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