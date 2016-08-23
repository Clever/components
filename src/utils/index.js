/**
 * Extracts properties from props that klass's propTypes field specifies, as an object.
 * Useful for inheriting properties from other components; see ModalButton for examples.
 */
export function propsFor(klass, props) {
  return Object.keys(props).reduce((prev, propKey) => {
    if (Object.keys(klass.propTypes).indexOf(propKey) >= 0) prev[propKey] = props[propKey];
    return prev;
  }, {});
}

/**
 * Returns a copy of obj (Object) with keys toOmit ([string]) and their associated values removed.
 */
export function omitKeys(obj, ...toOmit) {
  return Object.keys(obj).reduce((prev, key) => {
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
export function prefixKeys(obj, prefix, capitalizeFirst = true) {
  return Object.keys(obj).reduce((prev, key) => {
    const suffix = capitalizeFirst ? key.charAt(0).toUpperCase() + key.slice(1) : key;
    prev[prefix + suffix] = obj[key];
    return prev;
  }, {});
}

/**
 * Returns a copy of obj (Object) with prefix (String) removed from the start of each key, if it is
 * present. Lowercases the first letter of the old key if lowercaseFirst (bool) is true AND the
 * old key begins with the prefix; if the prefix is not present, the key is preserved.
 */
export function unprefixKeys(obj, prefixToRemove, lowercaseFirst = true) {
  return Object.keys(obj).reduce((prev, key) => {
    if (key.indexOf(prefixToRemove) === 0) {
      const sansPrefix = key.slice(prefixToRemove.length);
      const newKey = lowercaseFirst ? sansPrefix.charAt(0).toLowerCase() +
        sansPrefix.slice(1) : sansPrefix;
      prev[newKey] = obj[key];
    } else {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}

/**
 * Returns a className string containing all non-empty classes from the given list of candidates.
 */
export function joinClasses(...candidates) {
  return candidates.filter(candidate => !!candidate).join(" ");
}
