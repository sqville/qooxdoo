/* ************************************************************************

   Copyright: 2020 

   License: MIT license

   Authors: Chris Eskew(sqville) chris.eskew@sqville.com

************************************************************************ */

qx.Theme.define("ville.embed.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
    /*"button/icon" :
    {
    	include : "image",
    	
    	style : function()
    	{
    		return {
          cssClass : "icss-cube-o",
          iconColor : "green",
          emTextsize : 2
    		};
    	}
    }*/
    "testbutton" :
    {
      include : "button",

      style : function(states)
      {
        return {
          padding : 16,
          gap : 16,
          iconProps : states.hovered ? {animation:"grow"} : {animation:"shrink"}
        }
      }
    },

    "label-button" : "button-frame"
  }
});