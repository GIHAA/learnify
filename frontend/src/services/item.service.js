import axios from "axios";
import * as url from "./url";

const getAll = async () => {
    return await axios.get(url.GET_ALL_ITEMS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const get = async (id) => {
    return await axios.get(url.GET_ITEM(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const create = async (data) => {
    return await axios.post(url.CREATE_ITEM, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const update = async (id, data) => {
    return await axios.put(url.UPDATE_ITEM(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const remove = async (id) => {
    return await axios.delete(url.DELETE_ITEM(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getNewBySeller = async (seller) => {
    return await axios.get(url.GET_NEW_ITEMS_BY_SELLERID(seller), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getBySeller = async (seller) => {
    return await axios.get(url.GET_ITEMS_BY_SELLERID(seller), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getByCategory = async (category) => {
    return await axios.get(url.GET_ITEMS_BY_CATEGORY(category), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getByBrand = async (brand) => {
    return await axios.get(url.GET_ITEMS_BY_BRAND(brand), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getNew = async () => {
    return await axios.get(url.GET_NEW_ITEMS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getRandom = async () => {
    return await axios.get(url.GET_RANDOM_ITEMS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const getTopRating = async () => {
    return await axios.get(url.GET_TOP_RATING_ITEMS, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

const search = async (keyword) => {
    return await axios.get(url.GET_ITEMS_BY_SEARCH(keyword), {
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
    remove,
    getNewBySeller,
    getBySeller,
    getByCategory,
    getByBrand,
    getNew,
    getRandom,
    getTopRating,
    search
}