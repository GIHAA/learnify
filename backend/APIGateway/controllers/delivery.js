import dotenv from "dotenv/config";
import axios from "axios";

const deliveryAPI = process.env.REACT_APP_ORDER_SERVICES_URI + "/deliveries";

export const getOneDelivery = async (req, res) => {
    axios.get(`${deliveryAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getDeliveries = async (req, res) => {
    axios.get(deliveryAPI)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createDelivery = async (req, res) => {
    axios.post(deliveryAPI + "/create", req.body)
        .then(response => {
            res.status(201).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateDelivery = async (req, res) => {
    axios.put(`${deliveryAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteDelivery = async (req, res) => {
    axios.delete(`${deliveryAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

