import dotenv from "dotenv/config";
import axios from "axios";

const itemAPI = process.env.REACT_APP_ITEM_SERVICES_URI + "/items";

export const getOneItem = async (req, res) => {
    axios.get(`${itemAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getItems = async (req, res) => {
    axios.get(`${itemAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createItem = async (req, res) => {
    axios.post(`${itemAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateItem = async (req, res) => {
    axios.put(`${itemAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteItem = async (req, res) => {
    axios.delete(`${itemAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getNewItems = async (req, res) => {
    axios.get(`${itemAPI}/new/items`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getNewItemsBySeller = async (req, res) => {
    axios.get(`${itemAPI}/new/${req.params.seller}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getItemsBySeller = async (req, res) => {
    axios.get(`${itemAPI}/seller/${req.params.seller}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getItemsByCategory = async (req, res) => {
    axios.get(`${itemAPI}/category/${req.params.category}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getItemByBrand = async (req, res) => {
    axios.get(`${itemAPI}/brand/${req.params.brand}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getRandomItems = async (req, res) => {
    axios.get(`${itemAPI}/get/random`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getTopRatingItems = async (req, res) => {
    axios.get(`${itemAPI}/get/top`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getItemsBySearch = async (req, res) => {
    axios.get(`${itemAPI}/search/${req.params.search}`)
        .then(response => {
            res.status(200).json(response.data);
        }
        ).catch(error => {
            res.status(500).json(error);
        });
}
