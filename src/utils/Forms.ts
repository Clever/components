// Keep this in sync with src/less/forms.less

export const FormElementSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  FULL_WIDTH: "fullWidth",
};

export function formElementSizeClassName(size: string): string {
  return `dewey--formElementSize--${size}`;
}
