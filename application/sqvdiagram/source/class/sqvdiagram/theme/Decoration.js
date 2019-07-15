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

    "diamond" :
    {
      include : "window",
      
      style :
      {
        width: 1,
        radius: 0
      }
    }
  }
});