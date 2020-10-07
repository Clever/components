import classnames from "classnames";

/**
 * Extracts properties from props that klass's propTypes field specifies, as an object.
 * Useful for inheriting properties from other components; see ModalButton for examples.
 */
export function propsFor(klass, props) {
  return Object.keys(props).reduce((prev, propKey) => {
    if (Object.keys(klass.propTypes).indexOf(propKey) >= 0) {
      prev[propKey] = props[propKey];
    }
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
 * old key begins with the prefix.
 */
export function unprefixKeys(obj, prefixToRemove, lowercaseFirst = true) {
  return Object.keys(obj).reduce((prev, key) => {
    if (key.indexOf(prefixToRemove) === 0) {
      const sansPrefix = key.slice(prefixToRemove.length);
      const newKey = lowercaseFirst
        ? sansPrefix.charAt(0).toLowerCase() + sansPrefix.slice(1)
        : sansPrefix;
      prev[newKey] = obj[key];
    }
    return prev;
  }, {});
}

/**
 * Combine classname strings with long kabobs (--), and prepend each
 * prefix to the result.
 * For example:
 * ```
 * // returns "Component--a--b MyCustomClassName--a--b"
 * classNamesFor(["Component", "MyCustomClassName"], "a", "b")
 * ```
 * If no prefixes are provided (i.e. prefixes === null or prefixes only contains null/empty values)
 * it just doesn't append a prefix—i.e. it kabobs the rest of the arguments together.
 * @param {string | Array<string>} prefixes Prefixes to prepend to resulting classname
 * @param {string | Array<string>} classSegments Class names to kabob together
 */
export function classNameFor(prefixes: string | string[], classSegments?: string | string[]) {
  const prefixList = (prefixes instanceof Array ? prefixes : [prefixes]).filter(p => !!p);
  let classSegmentList: string[];
  if (!classSegments) {
    classSegmentList = [];
  } else {
    classSegmentList = classSegments instanceof Array ? classSegments : [classSegments];
  }

  if (prefixList.length === 0) {
    return classSegmentList.join("--");
  }

  return classnames(prefixList.map(p => [p].concat(classSegmentList).join("--")));
}

// This is defined as a separate function to avoid binding multiple event
// listeners. We do not want this code to run more than once.
function polyfillTouchAndHover() {
  const { classList } = document.querySelector("body");

  if ("ontouchstart" in window) {
    classList.add("mq-touch-enabled");
  } else {
    classList.add("mq-hover");
  }
}

/**
 * Detect browser capabilities and apply faux media queries
 *
 * This will allow us to write CSS rules like:
 *
 *     .mq-hover .conditional-styles {
 *       // only applied when the browser supports hover
 *     }
 */
export function polyfillMediaQueries() {
  window.addEventListener("load", polyfillTouchAndHover);
}
