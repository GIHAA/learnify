import axios from "axios";
import * as url from "./url";

export const register = async (data) => {
    return await axios.post(url.REGISTER_ADMIN, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const login = async (data) => {
    return await axios.post(url.LOGIN_ADMIN, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getCurrentUser = (id) => {
    return axios.get(url.GET_ADMIN(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const add = (data) => {
    return axios.post(url.REGISTER_ADMIN, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const update = (id, data) => {
    return axios.put(url.UPDATE_ADMIN(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const remove = (id) => {
    return axios.delete(url.DELETE_ADMIN(id), {
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
    add,
    update,
    remove
}