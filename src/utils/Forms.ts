// Keep this in sync with src/less/forms.less
import { Values } from "../utils/types";

export type Size = Values<typeof FormElementSize>;

export const FormElementSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  FULL_WIDTH: "fullWidth",
} as const;

export function formElementSizeClassName(size: Size) {
  return `dewey--formElementSize--${size}`;
}

export const FormElementRequirement = {
  // may be removed in the future
  OPTIONAL: "optional",
  REQUIRED: "required",
  DISABLED: "disabled",
} as const;

export type AutoComplete =
"on" |
"off" |
"name" |
"honorific-prefix" |
"given-name" |
"additional-name" |
"family-name" |
"honorific-suffix" |
"nickname" |
"organization-title" |
"username" |
"new-password" |
"current-password" |
"organization" |
"street-address" |
"address-line1" |
"address-line2" |
"address-line3" |
"address-level4" |
"address-level3" |
"address-level2" |
"address-level1" |
"country" |
"country-name" |
"postal-code" |
"cc-name" |
"cc-given-name" |
"cc-additional-name" |
"cc-family-name" |
"cc-number" |
"cc-exp" |
"cc-exp-month" |
"cc-exp-year" |
"cc-csc" |
"cc-type" |
"transaction-currency" |
"transaction-amount" |
"language" |
"bday" |
"bday-day" |
"bday-month" |
"bday-year" |
"sex" |
"url" |
"photo" |
"tel" |
"tel-country-code" |
"tel-national" |
"tel-area-code" |
"tel-local" |
"tel-local-prefix" |
"tel-local-suffix" |
"tel-extension" |
"email" |
"impp";