(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("wax.theme.Appearance", {
    extend: qx.theme.indigo.Appearance,

    appearances: {
      "header-atom": {
        alias: "atom",

        style: function style(states) {
          return {
            iconPosition: "top",
            center: true,
            padding: [10, 6, 20, 6],
            font: "headeratom"
          };
        }
      },

      "header-atom/icon": {
        include: "image",

        style: function style(states) {
          return {
            width: 56,
            height: 56
          };
        }
      },

      "groupbox/legend/icon": {
        style: function style() {
          return {
            width: 32,
            height: 32
          };
        }
      },

      "groupbox/legend": {
        alias: "atom",

        style: function style(states) {
          return {
            paddingRight: 35,
            margin: 4
          };
        }
      },

      "groupbox/open": {
        include: "image",
        style: function style(states) {
          return {
            height: 30,
            decorator: states.opened ? "groupbox-open" : "groupbox-closed"
          };
        }
      },

      "groupbox-connected": {
        alias: "groupbox",
        style: function style(states) {
          return {
            decorator: "white-box",
            contentPadding: 10
          };
        }
      },

      "groupbox-connected/legend": {
        include: "groupbox/legend",
        style: function style(states) {
          return {
            font: "area-header",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12
          };
        }
      },

      "groupbox-connected/frame": {
        include: "groupbox/frame",

        style: function style(states) {
          return {
            marginTop: 30,
            decorator: "connected-top-box"
          };
        }
      },

      "groupbox-connected/open": {
        include: "groupbox/open",

        style: function style(states) {
          return {
            height: 60
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        wax.MENUBUTTON
      ---------------------------------------------------------------------------
      */
      "mainmenubutton-frame": {
        alias: "atom",

        style: function style(states) {
          var decorator = "mainmenubutton-box";
          var padding = [12, 6, 12, 19];
          //var textcolor = "#606060";
          var textcolor = "black";
          var opacity = .75;

          if (!states.disabled) {
            if (states.hovered && !states.pressed && !states.checked) {
              decorator = "mainmenubutton-box-hovered";
              padding = [12, 6, 12, 14];
              textcolor = "black";
              opacity = 1;
            } /*else if (states.hovered && (states.pressed || states.checked)) {
              decorator = "mainmenubutton-box-pressed-hovered";
              }*/else if (states.pressed || states.checked) {
                decorator = "mainmenubutton-box-pressed";
                padding = [12, 6, 12, 14];
                textcolor = "black";
                opacity = 1;
              }
          }

          return {
            decorator: decorator,
            padding: padding,
            cursor: states.disabled ? undefined : "pointer",
            minWidth: 5,
            minHeight: 5,
            textColor: textcolor,
            font: "mainmenubutton",
            opacity: opacity
          };
        }
      },

      "mainmenubutton-frame/label": {
        alias: "atom/label",

        style: function style(states) {
          return {
            textColor: states.disabled ? "text-disabled" : undefined
          };
        }
      },

      "mainmenubutton": {
        alias: "mainmenubutton-frame",
        include: "mainmenubutton-frame",

        style: function style(states) {
          return {
            center: false,
            minWidth: 220,
            gap: 14
          };
        }
      },

      "mainmenubutton/icon": {

        style: function style() {
          return {
            scale: true,
            width: 32,
            height: 32
          };
        }
      },

      "mainmenuindicator": {
        style: function style() {
          return {
            backgroundColor: "gray",
            textColor: "white",
            height: 24,
            padding: [2, 6, 2, 6],
            decorator: "mainmenuindicator",
            font: "mainmenuindicator"
          };
        }
      },

      "submenubutton": {
        style: function style(states) {
          return {
            cursor: states.disabled ? undefined : "pointer",
            textColor: states.hovered ? "black" : "#505050",
            font: "mainmenubutton",
            decorator: "mainmenubutton-box-pressed"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        WINDOW
      ---------------------------------------------------------------------------
      */

      "wax-window": {
        alias: "window",

        include: "window",

        style: function style(states) {
          return {
            showMaximize: false,
            showMinimize: false
          };
        }
      },

      "wax-window/title": {
        alias: "window/title",

        style: function style(states) {
          return {
            textColor: "black",
            font: "control-header"
          };
        }
      },

      "wax-window/captionbar": {
        include: "window/captionbar",

        style: function style(states) {
          return {
            decorator: "window-captionbar-default"
          };
        }
      },

      "wax-window/close-button": {
        alias: "button",

        style: function style(states) {
          return {
            marginLeft: 2,
            icon: states.hovered ? "wax/close-red-24px.svg" : "wax/close-24px.svg",
            padding: [1, 2],
            cursor: states.disabled ? undefined : "pointer"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
      PROGRESSBAR
      ---------------------------------------------------------------------------
      */

      "progressbar": {
        style: function style(states) {
          return {
            decorator: "progressbar",
            padding: 0,
            backgroundColor: "progressbar-base",
            width: 200,
            height: 20
          };
        }
      },

      "progressbar-trans": {
        include: "progressbar",
        style: function style(states) {
          return {
            decorator: "progressbar-trans",
            backgroundColor: "transparent"
          };
        }
      },

      "progressbar/progress": {
        style: function style(states) {
          return {
            backgroundColor: "progressbar-gray"
          };
        }
      },

      /*
      ---------------------------------------------------------------------------
        wax.UPLOAD
      ---------------------------------------------------------------------------
      */

      "upload": {
        style: function style(states) {
          return {
            decorator: "upload-area"
          };
        }
      },

      "upload/progressbar": "progressbar-trans",

      "upload/progressbar/progress": {
        style: function style(states) {
          return {
            backgroundColor: "progressbar-gray"
          };
        }
      },

      "upload/message/icon": {
        style: function style(states) {
          return {
            scale: true,
            width: 88,
            height: 88,
            opacity: .35
          };
        }
      }

    }
  });
  wax.theme.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1548480884663