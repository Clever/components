"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsFor = propsFor;
exports.omitKeys = omitKeys;
exports.prefixKeys = prefixKeys;
exports.unprefixKeys = unprefixKeys;
/**
 * Extracts properties from props that klass's propTypes field specifies, as an object.
 * Useful for inheriting properties from other components; see ModalButton for examples.
 */
function propsFor(klass, props) {
  return Object.keys(props).reduce(function (prev, propKey) {
    if (Object.keys(klass.propTypes).indexOf(propKey) >= 0) prev[propKey] = props[propKey];
    return prev;
  }, {});
}

/**
 * Returns a copy of obj (Object) with keys toOmit ([string]) and their associated values removed.
 */
function omitKeys(obj) {
  for (var _len = arguments.length, toOmit = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    toOmit[_key - 1] = arguments[_key];
  }

  return Object.keys(obj).reduce(function (prev, key) {
    if (toOmit.indexOf(key) < 0) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}

/**
 * Returns a copy of obj (Object) with prefix (String) prepended to each key. Capitalizes the first
 * letter of the old key if capitalizeFirst (bool) is true.
 */
function prefixKeys(obj, prefix) {
  var capitalizeFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return Object.keys(obj).reduce(function (prev, key) {
    var suffix = capitalizeFirst ? key.charAt(0).toUpperCase() + key.slice(1) : key;
    prev[prefix + suffix] = obj[key];
    return prev;
  }, {});
}

/**
 * Returns a copy of obj (Object) with prefix (String) removed from the start of each key, if it is
 * present. Lowercases the first letter of the old key if lowercaseFirst (bool) is true AND the
 * old key begins with the prefix; if the prefix is not present, the key is preserved.
 */
function unprefixKeys(obj, prefixToRemove) {
  var lowercaseFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return Object.keys(obj).reduce(function (prev, key) {
    if (key.indexOf(prefixToRemove) === 0) {
      var sansPrefix = key.slice(prefixToRemove.length);
      var newKey = lowercaseFirst ? sansPrefix.charAt(0).toLowerCase() + sansPrefix.slice(1) : sansPrefix;
      prev[newKey] = obj[key];
    } else {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}