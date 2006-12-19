/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2006 by 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Create a new instance of qx.locale.Number
 */
qx.OO.defineClass("qx.locale.Number");


/**
 * Get deciaml seperator for number formatting
 *
 * @param locale {string} optional locale to be used
 * @return {qx.locale.LocalizedString} deciaml seperator.
 */
qx.Class.getDecimalSeperator = function(locale) {
  return new qx.locale.LocalizedString("cldr_number_decimal_seperator", [], locale);
};


/**
 * Get thousand grouping seperator for number formatting
 *
 * @param locale {string} optional locale to be used
 * @return {qx.locale.LocalizedString} group seperator.
 */
qx.Class.getGroupSeperator = function(locale) {
  return new qx.locale.LocalizedString("cldr_number_group_seperator", [], locale);
};


/**
 * Get percent format string
 *
 * @param locale {string} optional locale to be used
 * @return {qx.locale.LocalizedString} percent format string.
 */
qx.Class.getPercentFormat = function(locale) {
  return new qx.locale.LocalizedString("cldr_number_percent_format", [], locale);
};