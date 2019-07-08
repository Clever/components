import { Values } from "../utils/types";

export type ToastNotificationType = Values<typeof ToastType>;

export const ToastType = {
  ERROR: "error",
  INFO: "info",
  PROCESSING: "processing",
  SUCCESS: "success",
  WARNING: "warning",
} as const;
