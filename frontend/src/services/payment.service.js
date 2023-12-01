import axios from "axios";
import * as url from "./url";

const pay = async (data) => {
    return await axios.post(url.INITIATE_PAYMENT, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    pay
}
