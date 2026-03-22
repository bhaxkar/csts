import toast from "react-hot-toast";

export const Notification = (message: string) => {
  toast.success(message, {
    style: {
    border: '1px solid #0565F7',
    },
    iconTheme: {
      primary: "#0565F7",
      secondary: "#FFFFFF",
    },
  });
};
