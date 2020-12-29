/* ************************************************************************

   Ville Software

   http://sqville.com

   Copyright:
     None

   License:
     MIT

   Authors:
     * Chris Eskew (chris.eskew@sqville.com)

************************************************************************ */


/**
 * A mixin that enables the font property, and thus, font handling abilities to the Image object
 * This mixin is needed to enable font icons to show up using the Font object
 */
qx.Mixin.define("ville.embed.MAtom",
{
  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties :
  {
  	/** Control the text alignment */
    iconProps :
    {
      check : "Map",
      nullable : true,
      themeable : true,
      apply : "_applyIconProps"
    }
  	
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  	
  	// property apply
    _applyIconProps : function(value, old) {
      this.getChildControl("icon").set(value);
    },

     // overridden
     _createChildControlImpl : function(id, hash)
     {
       var control;
 
       switch(id)
       {
         case "label":
           control = new qx.ui.basic.Label(this.getLabel());
           control.setAnonymous(true);
           control.setRich(this.getRich());
           control.setSelectable(this.getSelectable());
           this._add(control);
           if (this.getLabel() == null || this.getShow() === "icon") {
             control.exclude();
           }
           break;
 
         case "icon":
          var source = this.getIcon();          
          if (qx.lang.String.startsWith(source, "data:text/html;") || qx.lang.String.startsWith(source, "data:text/svg+xml;") || qx.lang.String.startsWith(source, "data:text/map;")) {
            control = new ville.embed.Image(source);
 
          /* if (qx.lang.String.startsWith(source, "data:text/")) {
            var embeddedsrc = qx.util.StringSplit.split(source,";",1);
            //var estype = qx.util.StringSplit.split(embeddedsrc[0],"/",2);
            //console.log(embeddedsrc[1]);
            switch(embeddedsrc[0])
            {
              case "data:text/html":
                var markup = 
                control = new ville.embed.Image(embeddedsrc[1]); //Need valid html checking???
                control.setRich(true);
                break;

              case "data:text/svg+xml":
                control = new ville.embed.Image(embeddedsrc[1]); //Need valid svg checking???
                control.setRich(true);
                // control.setScale(true);
                break;

              case "data:text/map":
                var mapsrc = qx.lang.Json.parse(embeddedsrc[1]);
                control = new ville.embed.Image().set(mapsrc);
                control.setRich(true);
                break;

              default:
                control = new qx.ui.basic.Label("format not supported");
                break;

            }
           } else {
            control = new qx.ui.basic.Image(this.getIcon());
           }*/
          } else {
            control = new qx.ui.basic.Image(this.getIcon());
           }
           control.setAnonymous(true);
           this._addAt(control, 0);
           if (this.getIcon() == null || this.getShow() === "label") {
             control.exclude();
           }
           break;
       }
 
       return control || this.base(arguments, id);
     }
  }
});