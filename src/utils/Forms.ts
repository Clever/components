// Keep this in sync with src/less/forms.less

export const FormElementSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  UNBOUNDED: "unbounded",
};

export function formElementSizeClassName(size: string): string {
  return `dewey--formElementSize--${size}`;
}
