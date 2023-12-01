import axios from "axios";
import * as url from "./url";

const register = async (data) => {
    return await axios.post(url.REGISTER_SELLER, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const login = async (data) => {
    return await axios.post(url.LOGIN_SELLER, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getCurrentUser = (id) => {
    return axios.get(url.GET_SELLER(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const updateSeller = (id, data) => {
    return axios.put(url.UPDATE_SELLER(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const deleteSeller = (id) => {
    return axios.delete(url.DELETE_SELLER(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getAllSellers = () => {
    return axios.get(url.GET_ALL_SELLERS, {
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
    updateSeller,
    deleteSeller,
    getAllSellers
}