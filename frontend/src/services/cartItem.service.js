import axios from "axios";
import * as url from "./url";

const getAll = async () => {
    return await axios.get(url.GET_ALL_CARTITEMS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const get = async (id) => {
    return await axios.get(url.GET_CARTITEM(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const create = async (data) => {
    return await axios.post(url.CREATE_CARTITEM, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const update = async (id, data) => {
    return await axios.put(url.UPDATE_CARTITEM(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const remove = async (id) => {
    return await axios.delete(url.DELETE_CARTITEM(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getByCartID = async (cart) => {
    return await axios.get(url.GET_CARTITEMS_BY_CARTID(cart), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getRecentOrdersByBrand = async (brand) => {
    return await axios.get(url.GET_RECENT_CARTITEMS_BY_BRAND(brand), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}


/* eslint-disable import/no-anonymous-default-export */
export default {
    getAll,
    get,
    create,
    update,
    remove,
    getByCartID,
    getRecentOrdersByBrand
};