import axios from "axios";
import * as url from "./url";

const getAll = async () => {
    return await axios.get(url.GET_ALL_DELIVERIES, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const get = async (id) => {
    return await axios.get(url.GET_DELIVERY(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const create = async (data) => {
    return await axios.post(url.CREATE_DELIVERY, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const update = async (id, data) => {
    return await axios.put(url.UPDATE_DELIVERY(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const remove = async (id) => {
    return await axios.delete(url.DELETE_DELIVERY(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    get,
    create,
    update,
    remove
}