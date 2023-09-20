import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { type IconProps, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";

const ToastIcon = ({ type }: IconProps) => {
  if (type === "success") return <FiCheckCircle size={22} />;

  return <FiAlertCircle size={22} />;
};

const TOAST_CLASSES = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
  warning: "toast-warning",
  default: "toast-default",
} as const;

const ToastProvider = ({ children }: WithChildren) => (
  <>
    {children}
    <ToastContainer
      className="toast-container"
      toastClassName={(context) =>
        `toast ${TOAST_CLASSES[context?.type ?? "default"]}`
      }
      bodyClassName="toast-body"
      icon={ToastIcon}
      position="bottom-right"
      transition={cssTransition({
        enter: "toast-enter",
        exit: "toast-exit",
      })}
      hideProgressBar
    />
  </>
);

export { ToastProvider };
