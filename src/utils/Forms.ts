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
