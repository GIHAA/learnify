import dotenv from "dotenv/config";
import axios from "axios";

const cartAPI = process.env.REACT_APP_ORDER_SERVICES_URI + "/carts"

export const getCarts = async (req, res) => {
    axios.get(`${cartAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getOneCart = async (req, res) => {
    axios.get(`${cartAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createCart = async (req, res) => {
    axios.post(`${cartAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateCart = async (req, res) => {
    axios.put(`${cartAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteCart = async (req, res) => {
    axios.delete(`${cartAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//get carts by buyerID
export const getCartsByBuyerID = async (req, res) => {
    axios.get(`${cartAPI}/buyer/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//get carts with pending status
export const getCartsByStatus = async (req, res) => {
    axios.get(`${cartAPI}/status/${req.params.status}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//get carts with that the status is not delivered by buyerID
export const getCartsByBuyerIDAndNotDelivered = async (req, res) => {
    axios.get(`${cartAPI}/buyer/${req.params.id}/notdelivered`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//get carts with status delivered by buyerID
export const getCartsByBuyerIDAndDelivered = async (req, res) => {
    axios.get(`${cartAPI}/buyer/${req.params.id}/delivered`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}