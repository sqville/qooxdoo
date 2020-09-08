/* ************************************************************************

   Copyright: 2019 

   License: MIT license

   Authors: Chris Eskew (sqville)

************************************************************************ */

qx.Theme.define("sqvdiagram.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
    /*
    ---------------------------------------------------------------------------
      SHAPE
    ---------------------------------------------------------------------------
    */

   "shape" :
   {
    alias : "window", 
    
    style : function(states)
     {
       return {
         contentPadding : [ 10, 10, 10, 10 ],
         backgroundColor : "background",
         decorator : states.maximized ? undefined : states.active ? "window-active" : "window"
       };
     }
   }
  }
});