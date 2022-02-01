import axios from "axios";

export default function () {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    return axios.get(import.meta.env.VITE_API);
}
