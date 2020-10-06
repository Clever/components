/** A utility function that can be used with MessagingAvatar to convert a name into initials. */
export function convertNameToInitials(name: string): string {
  if (!name.trim()) {
    return "";
  }

  const nameSegments = name
    .split("-")
    .map((seg) => seg.trim())
    .join(" ")
    .split(" ")
    .filter((seg) => seg);

  // Special handling if someone only types in one segment.
  if (nameSegments.length === 1) {
    // If someone is already writing their own initials or goes by a short, all-caps
    //  mononym (e.g. JR Smith of NBA fame is often simply "JR"), then don't mangle it.
    if (name === name.toUpperCase() && name.length <= 3) {
      return name;
    }
    return name.substring(0, 1).toUpperCase();
  }

  const prefixExclusions = ["ms", "miss", "mr", "mrs", "mx", "dr"];
  const suffixExclusions = [
    "jr",
    "sr",
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
  ];

  // We don't want to exclude "Ron Valentine" putting in "Ron V" - the "V" is an initial.
  if (nameSegments.length > 2) {
    const lastSeg = nameSegments[nameSegments.length - 1]
      .toLowerCase()
      .split("")
      .filter((char) => char !== ".")
      .join("");
    if (suffixExclusions.includes(lastSeg)) {
      nameSegments.splice(nameSegments.length - 1, 1);
    }
  }

  const firstSeg = nameSegments[0]
    .toLowerCase()
    .split("")
    .filter((char) => char !== ".")
    .join("");
  if (prefixExclusions.includes(firstSeg)) {
    nameSegments.splice(0, 1);
  }

  // Max of three initials.
  if (nameSegments.length > 3) {
    nameSegments.splice(3);
  }

  return nameSegments
    .map((_name) => _name.substring(0, 1))
    .map((initial) => initial.toUpperCase())
    .join("");
}
