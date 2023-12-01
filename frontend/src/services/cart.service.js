import axios from "axios";
import * as url from "./url";

const getAll = async () => {
    return await axios.get(url.GET_ALL_CARTS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const get = async (id) => {
    return await axios.get(url.GET_CART(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const create = async (data) => {
    return await axios.post(url.CREATE_CART, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const update = async (id, data) => {
    return await axios.put(url.UPDATE_CART(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const remove = async (id) => {
    return await axios.delete(url.DELETE_CART(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getByBuyerID = async (buyer) => {
    return await axios.get(url.GET_CARTS_BY_BUYERID(buyer), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

//get cart by status
const getByStatus = async (status) => {
    return await axios.get(url.GET_CARTS_BY_STATUS(status), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

//get carts with that the status is not delivered by buyerID
const getByBuyerIDAndNotDelivered = async (buyer) => {
    return await axios.get(url.GET_CARTS_BY_BUYER_NOT_DELIVERED(buyer), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

//get carts with that the status is delivered by buyerID
const getByBuyerIDAndDelivered = async (buyer) => {
    return await axios.get(url.GET_CARTS_BY_BUYER_DELIVERED(buyer), {
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
    getByBuyerID,
    getByStatus,
    getByBuyerIDAndNotDelivered,
    getByBuyerIDAndDelivered
};

