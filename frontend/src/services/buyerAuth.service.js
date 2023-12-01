import axios from "axios";
import * as url from "./url";

const register = async (data) => {
    return await axios.post(url.REGISTER_BUYER, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
};

const login = async (data) => {
    return await axios.post(url.LOGIN_BUYER, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getCurrentUser = (id) => {
    return axios.get(url.GET_BUYER(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const updateBuyer = (id, data) => {
    return axios.put(url.UPDATE_BUYER(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const deleteBuyer = (id) => {
    return axios.delete(url.DELETE_BUYER(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    getCurrentUser,
    updateBuyer,
    deleteBuyer
}