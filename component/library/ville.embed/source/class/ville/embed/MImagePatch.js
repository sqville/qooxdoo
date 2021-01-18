/* ************************************************************************

   Ville Software

   http://sqville.com

   Copyright:
     None

   License:
     MIT:

   Authors:
     * Chris Eskew (chris.eskew@sqville.com)

************************************************************************ */

/**
 * A mixin that enables the font property, and thus, font handling abilities to the Image object
 * This mixin is needed to enable font icons to show up using the Font object
 */
qx.Mixin.define("ville.embed.MImagePatch",
{
  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties :
  {
  	/** Control the text alignment */
    textAlign :
    {
      check : ["left", "center", "right", "justify"],
      nullable : true,
      themeable : true,
      apply : "_applyTextAlign",
      event : "changeTextAlign"
    },
    
    /** Font size of the widget */
    textSize :
    {
      check : "Integer",
      init : null,
      apply : "_applyTextSize",
      themeable : true,
      nullable : true
    },

    /** Font size of the widget */
    emTextsize :
    {
      check : "Integer",
      init : null,
      apply : "_applyEmTextsize",
      themeable : true,
      nullable : true
    },
    
  /**
     * The tag to use for this element
     */
    cssClass :
    {
      check : "String",
      init : "",
      nullable : true,
      themeable : true,
      apply : "_applyCssClass"
    },

    /**
     * The color of the rendered icon/image.
     */
    iconColor :
    {
      nullable : true,
      check : "Color",
      apply : "_applyIconColor",
      event : "changeIconColor",
      themeable : true,
      inheritable : true
    },

    /** Font size, width and calculated height all in one property - 
     * Array values in order:
     *  0 = size
     *  1 = adjustment
     *   
    dynamicSize :
    {
      check : "Array",
      init : null,
      apply : "_applyDynamicSize",
      themeable : true,
      nullable : true
    },
    */
    
    /** Any text string which can contain HTML, too */
    html :
    {
      check : "String",
      apply : "_applyHtml",
      event : "changeHtml",
      nullable : true,
      themeable : true
    },
    
    /** Color of the svg fill property */
    fill :
    {
      check : "Color",
      nullable : true,
      themeable : true,
      apply : "_applyFill",
      event : "changeFill"
    },
    
    /** Any text string to populate the image tag's data-type attribute */
    datatype :
    {
      check : "String",
      apply : "_applyDataType",
      nullable : true,
      themeable : true
    }
  	
  },
  
  

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /*
  	__font : null,
    __invalidContentSize : null,
    __tapListenerId : null,
    __webfontListenerId : null,
    */
    
    // property apply
    _applySource : function(value, old)
    {
      // abort loading current image
      if (old) {
        if (qx.io.ImageLoader.isLoading(old)) {
          qx.io.ImageLoader.abort(old);
        }
      }

      if (qx.lang.String.startsWith(value, "data:text/embedded;")) {
       // this.__setMode("embedded");
       console.log("here source");
       this.__mode = "embedded";
        
        //console.log(qx.util.StringSplit.split(value,";",2));
       // this.setHtml(qx.util.StringSplit.split(value,";",2)[1]);
        this.getContentElement().setAttribute("html", qx.util.StringSplit.split(value,";",2)[1]||"");
        // Mark text size cache as invalid
        //this.__invalidContentSize = true;
  
        // Update layout
        //qx.ui.core.queue.Layout.add(this);
        
      } else {
        this._styleSource();
      }
      
    },

    // property apply, overridden
    _applyEnabled : function(value, old)
    {
      //this.base(arguments, value, old);

      if (this.__mode != "embedded") {
        this._styleSource();
      }
    },

    // property apply
    _applyScale : function(value) {
      if (this.__mode != "embedded") {
        this._styleSource();
      }
    },

    	
    _applyFill : function(value, old)
    {
      if (value) {
        this.getContentElement().setStyle("fill", qx.theme.manager.Color.getInstance().resolve(value));
      }
    },
    
    _applyTextSize : function(value, old)
    {
      if (value) {
        this.getContentElement().setStyle("font-size", value + "px");
      }
    },

    _applyEmTextsize : function(value, old)
    {
      if (value) {
        this.getContentElement().setStyle("font-size", value + "em");
      }
    },
    
    /*
    _applyDynamicSize : function(value, old)
    {
      if (value) {
        this.setTextSize(value[0]);
        this.setWidth(value[0]);     
        this.setHeight(Math.round(value[0]*value[1]));
      }
    },
    */

    // property apply
    _applyCssClass : function (value, old) {
      this.getContentElement().removeClass(old);
      this.getContentElement().addClass(value);
    },
  	
  	// property apply
    _applyHtml : function(value, old)
    {
      this.getContentElement().setAttribute("html", value||"");
      // Mark text size cache as invalid
      this.__invalidContentSize = true;

      // Update layout
      qx.ui.core.queue.Layout.add(this);
    },
  	
  	// property apply
    _applyTextAlign : function(value, old) {
      this.getContentElement().setStyle("textAlign", value);
    },

    // property apply
    _applyIconColor : function(value, old) {
      this.getContentElement().setStyle("color", value||"");
    },
    
    // property apply
    _applyDataType : function(value, old)
    {
      this.getContentElement().setAttribute("data-type", value||"");
    },

    /**
     * Applies the source to the clipped image instance or preload
     * an image to detect sizes and apply it afterwards.
     *
     
    _styleSource : function()
    {
      if (this.__mode != "embedded") {
        var AliasManager = qx.util.AliasManager.getInstance();
        var ResourceManager = qx.util.ResourceManager.getInstance();

        var source = AliasManager.resolve(this.getSource());

        var element = this.getContentElement();
        if (this.__wrapper) {
          element = element.getChild(0);
        }

        if (!source)
        {
          this.__resetSource(element);
          return;
        }

        this.__checkForContentElementSwitch(source);

        if ((qx.core.Environment.get("engine.name") == "mshtml") &&
          (parseInt(qx.core.Environment.get("engine.version"), 10) < 9 ||
          qx.core.Environment.get("browser.documentmode") < 9))
        {
          var repeat = this.getScale() ? "scale" : "no-repeat";
          element.tagNameHint = qx.bom.element.Decoration.getTagName(repeat, source);
        }

        var contentEl = this.__getContentElement();

        // Detect if the image registry knows this image
        if (ResourceManager.isFontUri(source)) {
          this.__setManagedImage(contentEl, source);
          var color = this.getTextColor();
          if (qx.lang.Type.isString(color)) {
            this._applyTextColor(color, null);
          }
        }
        else if (ResourceManager.has(source)) {
          var highResolutionSource = ResourceManager.findHighResolutionSource(source);
          if (highResolutionSource) {
            var imageWidth = ResourceManager.getImageWidth(source);
            var imageHeight = ResourceManager.getImageHeight(source);
            this.setWidth(imageWidth);
            this.setHeight(imageHeight);

            // set background size on current element (div or img)
            var backgroundSize = imageWidth + "px, " + imageHeight + "px";
            this.__currentContentElement.setStyle("background-size", backgroundSize);

            this.setSource(highResolutionSource);
            source = highResolutionSource;
          }
          this.__setManagedImage(contentEl, source);
          this.__fireLoadEvent();
        } else if (qx.io.ImageLoader.isLoaded(source)) {
          this.__setUnmanagedImage(contentEl, source);
          this.__fireLoadEvent();
        } else {
          this.__loadUnmanagedImage(contentEl, source);
        }
      }
    },
*/

    /**
     * Overridden
     * 
     * Returns the current mode if set. Otherwise checks the current source and
     * the current scaling to determine the current mode.
     *
     * @return {String} current internal mode
     
    __getMode : function()
    {
            
      if (this.__mode == null)
      {
        var source = this.getSource();

        if (source && qx.lang.String.startsWith(source, "@")) {
          this.__mode = "font";
        }

        if (source && qx.lang.String.startsWith(source, "data:text/icon;")) {
          this.__mode = "icon";
          // set appearance
          //this.setAppearance(qx.util.StringSplit(source,";",1));
        }

        if (source && qx.lang.String.startsWith(source, "data:text/html+css;")) {
          this.__mode = "htmlcss";
          // set appearance
          this.setAppearance(qx.util.StringSplit(source,";",1));
        }

        if (source && qx.lang.String.startsWith(source, "data:image/svg+xml;")) {
          this.__mode = "svg";
          // set appearance
          this.setAppearance(qx.util.StringSplit(source,";",1));
        }

        var isPng = false;
        if (source != null) {
          isPng = source.endsWith(".png");
        }

        if (this.getScale() && isPng && qx.core.Environment.get("css.alphaimageloaderneeded")) {
          this.__mode = "alphaScaled";
        } else if (this.getScale()) {
          this.__mode = "scaled";
        } else {
          this.__mode = "nonScaled";
        }
      }

      return this.__mode;
    },
*/

    /**
     * Overridden
     * 
     * Creates a contentElement suitable for the current mode
     *
     * @param mode {String} internal mode
     * @return {qx.html.Image} suitable image content element
     */
    __createSuitableContentElement : function(mode)
    {
      var scale;
      var tagName;
      var clazz = qx.html.Image;

      console.log("made it here:");

      switch (mode) {
        case "embedded":
          clazz = qx.html.Label;
          scale = true;
          tagName = "div";
          break;
        case "font":
          clazz = qx.html.Label;
          scale = true;
          tagName = "div";
          break;
        case "alphaScaled":
          scale = true;
          tagName = "div";
          break;
        case "nonScaled":
          scale = false;
          tagName = "div";
          break;
        default:
          scale = true;
          tagName = "img";
          break;
      }

      var element = new (clazz)(tagName);
      element.connectWidget(this);
      if (mode == "embedded") {
        element.setStyles({
          "overflowX": "visible",
          "overflowY": "visible",
          "boxSizing": "border-box"
        });
      } else {
        element.setStyles({
          "overflowX": "hidden",
          "overflowY": "hidden",
          "boxSizing": "border-box"
        });
      }

      if (mode == "font" || mode == "embedded") {
        console.log("here mode");
        element.setRich(true);
      }
      else {
        element.setScale(scale);

        if (qx.core.Environment.get("css.alphaimageloaderneeded")) {
          var wrapper = this.__wrapper = new qx.html.Element("div");
          element.connectWidget(this);
          wrapper.setStyle("position", "absolute");
          wrapper.add(element);
          return wrapper;
        }
      }

      return element;
    }


    /*
    // property apply
    _applyFont : function(value, old)
    {
      if (old && this.__font && this.__webfontListenerId) {
        this.__font.removeListenerById(this.__webfontListenerId);
        this.__webfontListenerId = null;
      }
      // Apply
      var styles;
      if (value)
      {
        this.__font = qx.theme.manager.Font.getInstance().resolve(value);
        if (this.__font instanceof qx.bom.webfonts.WebFont) {
          this.__webfontListenerId = this.__font.addListener("changeStatus", this._onWebFontStatusChange, this);
        }
        styles = this.__font.getStyles();
      }
      else
      {
        this.__font = null;
        styles = qx.bom.Font.getDefaultStyles();
      }

      // check if text color already set - if so this local value has higher priority
      if (this.getTextColor() != null) {
        delete styles["color"];
      }
      
      // check if text size already set - if so this local value has higher priority
      if (this.getTextSize() != null) {
        delete styles["fontSize"];
      }

      this.getContentElement().setStyles(styles);

      // Invalidate text size
      this.__invalidContentSize = true;

      // Update layout
      qx.ui.core.queue.Layout.add(this);
    },
    */
    
    /**
     * Triggers layout recalculation after a web font was loaded
     *
     * @param ev {qx.event.type.Data} "changeStatus" event
     */
    /*
    _onWebFontStatusChange : function(ev)
    {
      if (ev.getData().valid === true) {

        // safari has trouble resizing, adding it again fixed the issue [BUG #8786]
        if (qx.core.Environment.get("browser.name") == "safari" &&
          parseFloat(qx.core.Environment.get("browser.version")) >= 8) {
            window.setTimeout(function() {
              this.__invalidContentSize = true;
              qx.ui.core.queue.Layout.add(this);
            }.bind(this), 0);
        }

        this.__invalidContentSize = true;
        qx.ui.core.queue.Layout.add(this);
      }
    }
    */
  }
});