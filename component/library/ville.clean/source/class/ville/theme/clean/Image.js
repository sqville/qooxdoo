/* ************************************************************************

   SQville Software

   http://sqville.com

   Copyright:
     None

   License:
     MIT

   Authors:
     * Chris Eskew (chris.eskew@sqville.com)

************************************************************************ */
/* ************************************************************************


************************************************************************* */
/**
 * Mapping class for all images used in the clean theme.
 *
 * @asset(qx/static/blank.png)
 * @asset(ville/theme/clean/decoration/checkbox/*)
 * @asset(ville/theme/clean/decoration/arrows/*)
 */
qx.Class.define("ville.theme.clean.Image",
{
  extend : qx.core.Object,

  statics :
  {    
    /**
     * Holds a map containig all the URL to the images.
     * @internal
     */
    URLS :
    {
      "blank" : "qx/static/blank.png",

      // checkbox
      "checkbox-checked" : "ville/theme/clean/decoration/checkbox/checkbox-check.svg",
      "checkbox-undetermined" : "decoration/checkbox/undetermined.png",  //Replaced with -- pure Qx -- Decoration entry:: checkbox-undetermined
      "checkbox-checked-disabled" : "ville/theme/clean/decoration/checkbox/checkbox-check-disabled.svg",

      // window
      "window-minimize" : "decoration/window/minimize.gif", //Replaced with -- pure Qx -- Decoration entry:: window-button-minimize-icon
      "window-maximize" : "decoration/window/maximize.gif", //Replaced with -- pure Qx -- Decoration entry:: window-button-maximize-icon
      "window-restore" : "decoration/window/restore.gif", //Replaced with -- pure Qx -- Decoration entry:: window-button-restore
      "window-close" : "decoration/window/close.gif", //Replaced with Decoration entries:: window-button-close-icon and window-button-close-icon-hover - Qx + CSS

      // cursor
      "cursor-copy" : "decoration/cursors/copy.gif", //Replaced with -- pure Qx --
      "cursor-move" : "decoration/cursors/move.gif", //Replaced with -- pure Qx --
      "cursor-alias" : "decoration/cursors/alias.gif", //Replaced with -- pure Qx --
      "cursor-nodrop" : "decoration/cursors/nodrop.gif", //Replaced with Qx + CSS

      // arrows
      "arrow-right" : "ville/theme/clean/decoration/arrows/right.gif", //Replaced with -- pure Qx -- Decoration entry:: sqv-css-icon-arrow-right
      "arrow-left" : "ville/theme/clean/decoration/arrows/left.gif", //Replaced with -- pure Qx -- Decoration entry:: sqv-css-icon-arrow-left
      "arrow-up" : "ville/theme/clean/decoration/arrows/up.gif", //Replaced with -- pure Qx -- Decoration entry:: sqv-css-icon-arrow-up
      "arrow-down" : "ville/theme/clean/decoration/arrows/down.gif",  //Replaced with -- pure Qx -- Decoration entry:: sqv-css-icon-arrow-down
      //"arrow-forward" : "decoration/arrows/forward.gif", //Replaced by Qx code
      //"arrow-rewind" : "decoration/arrows/rewind.gif", //Replaced by Qx code
      "arrow-down-small" : "ville/theme/clean/decoration/arrows/down-small.gif", //Embed option - Decoration entry:: sqv-css-icon-arrow-down-small
      "arrow-up-small" : "ville/theme/clean/decoration/arrows/up-small.gif",  //Replaced by Decoration entry:: sqv-css-icon-arrow-up-small
      "arrow-up-invert" : "ville/theme/clean/decoration/arrows/up-invert.gif", //Replaced by Decoration entry:: sqv-css-icon-arrow-up-invert
      "arrow-down-invert" : "ville/theme/clean/decoration/arrows/down-invert.gif", //Replaced by Decoration entry:: sqv-css-icon-arrow-down-invert
      "arrow-right-invert" : "ville/theme/clean/decoration/arrows/right-invert.gif", //Replaced by Decoration entry:: sqv-css-icon-arrow-right-invert

      // split pane
      "knob-horizontal" : "decoration/splitpane/knob-horizontal.png", //Replaced by pure Qx
      "knob-vertical" : "decoration/splitpane/knob-vertical.png", // Replaced by pure Qx

      // tree
      //"tree-minus" : "decoration/tree/minus.gif", //Replaced
      //"tree-plus" : "decoration/tree/plus.gif", //Replaced

      // table
      "select-column-order" : "decoration/table/select-column-order.png", //Replaced by Decoration entries:: select-column-order and select-column-order-hover - Qx + CSS
      "table-ascending" : "decoration/table/ascending.png",  //Replaced by Decoration:: sqv-css-icon-arrow-up-dark-gray
      "table-descending" : "decoration/table/descending.png", //Replaced by Decoration:: sqv-css-icon-arrow-down-dark-gray

	  // tree virtual
	  "tree-minus" : "decoration/treevirtual/minus.gif",
      "tree-plus" : "decoration/treevirtual/plus.gif",
      "treevirtual-line" : "decoration/treevirtual/line.gif",
      "treevirtual-minus-only" : "decoration/treevirtual/only_minus.gif",
      "treevirtual-plus-only" : "decoration/treevirtual/only_plus.gif",
      "treevirtual-minus-start" : "decoration/treevirtual/start_minus.gif",
      "treevirtual-plus-start" : "decoration/treevirtual/start_plus.gif",
      "treevirtual-minus-end" : "decoration/treevirtual/end_minus.gif",
      "treevirtual-plus-end" : "decoration/treevirtual/end_plus.gif",
      "treevirtual-minus-cross" : "decoration/treevirtual/cross_minus.gif",
      "treevirtual-plus-cross" : "decoration/treevirtual/cross_plus.gif",
      "treevirtual-end" : "decoration/treevirtual/end.gif",
      "treevirtual-cross" : "decoration/treevirtual/cross.gif",

      // menu
      "menu-checkbox" : "decoration/menu/checkbox.gif", //Replaced with Qx + CSS
      "menu-checkbox-invert" : "decoration/menu/checkbox-invert.gif", //Replaced with Qx + CSS
      "menu-radiobutton-invert" : "decoration/menu/radiobutton-invert.gif", //Replaced with Qx + CSS
      "menu-radiobutton" : "decoration/menu/radiobutton.gif", //Replaced with Qx + CSS

      // tabview
      "tabview-close" : "decoration/tabview/close.gif" // Replaced by qx+css using freeStyleCss class and "window-button-close-icon"
    }
  }
});
