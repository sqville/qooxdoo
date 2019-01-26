(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Font": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("wax.theme.Font", {
    extend: qx.theme.indigo.Font,

    fonts: {
      "default": {
        size: 14,
        family: ["Lato", "Helvetica Neue", "arial", "Helvetica", "sans-serif"],
        color: "text",
        lineHeight: 1.5
      },

      "default-bold": {
        include: "default",
        bold: true
      },

      "mainmenubutton": {
        include: "default",
        size: 16
      },

      "mainmenuindicator": {
        include: "default-bold",
        size: 14
      },

      "headeratom": {
        include: "default-bold",
        size: 16
      },

      "control-header": {
        include: "default",
        size: 32
      },

      "area-header": {
        include: "default",
        size: 21
      }
    }
  });
  wax.theme.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1548480884460