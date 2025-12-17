import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

export default function Notify(status, message) {
  if (status === "success") {
    toast.success(message, {
      icon: <Icon icon="mdi:check-circle-outline" width={18} />,
      position: "top-right",
      style: {
        // color: "#37A26A",
        color: "#ffff",
        fontSize: "15px",
      },
    });
  } else {
    toast.error(message, {
      icon: <Icon icon="mdi:alert-circle-outline" width={18} />,
      position: "top-right",
      style: {
        // color: "#E67063",
        color: "#ffff",
        fontSize: "15px",
      },
    });
  }
}
