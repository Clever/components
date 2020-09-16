import { Button } from "../Button/Button";

const Type = {
  PRIMARY: Button.Type.PRIMARY,
  SECONDARY: Button.Type.SECONDARY,
  DESTRUCTIVE: Button.Type.DESTRUCTIVE,
  LINK: Button.Type.LINK,
} as const;

const ArrowType = {
  CARET: "caret",
  ELLIPSIS: "ellipsis",
};

export { Type, ArrowType };
