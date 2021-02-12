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
     style : function(states)
     {
      //console.log(states); 
      return {
         backgroundColor: "transparent",
         contentPadding: 0,
         decorator : states.active && states.focused ? "shape-active" : "shape",
         icon : states.active && states.focused ? "sqvdiagram/mouse_drag.svg" : undefined
       };
     }
   },

   "shape/icon" :
   {
     style : function(states)
     {
       return {
         padding: [5,0,0,5] 
       };
     }
   },

   "shape/captionbar" :
   {
     style : function(states)
     {
      //console.log(states); 
      var active = states.active && states.focused && !states.disabled;
       return {
        backgroundColor: active ? "background" : "transparent",
        decorator: active ? "shape-caption-active" : "shape-caption"
       };
     }
   },

   "shape/pane" :
   {
    style : function(states)
    {
      return {
        backgroundColor: "background",
        padding: 0
      };
    }
   }

  }
});