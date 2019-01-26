(function () {
   var $$dbClassInfo = {
      "dependsOn": {
         "qx.Theme": {
            "usage": "dynamic",
            "require": true
         },
         "wax.theme.Color": {
            "require": true
         },
         "wax.theme.Decoration": {
            "require": true
         },
         "wax.theme.Font": {
            "require": true
         },
         "qx.theme.icon.Tango": {
            "require": true
         },
         "wax.theme.Appearance": {
            "require": true
         }
      }
   };
   qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("wax.theme.Theme", {
      meta: {
         color: wax.theme.Color,
         decoration: wax.theme.Decoration,
         font: wax.theme.Font,
         icon: qx.theme.icon.Tango,
         appearance: wax.theme.Appearance
      }
   });
   wax.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1548480873568