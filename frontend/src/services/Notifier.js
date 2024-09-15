import {Bounce, toast} from "react-toastify";

const Notifier = {
    success: (message, autoClose = 5000) => {
        toast.success(message, {
            position: "top-right",
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
            transition: Bounce,
        });
    },

    error: (message, autoClose = 5000) => {
        toast.error(message, {
            position: "top-right",
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
            transition: Bounce,
        });
    },

    warning: (message, autoClose = 5000) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
            transition: Bounce,
        });
    },

    info: (message, autoClose = 5000) => {
        toast.info(message, {
            position: "top-right",
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            progress: undefined,
            transition: Bounce,
        });
    },
};

export default Notifier;
