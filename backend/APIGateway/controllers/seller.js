import dotenv from "dotenv/config";
import axios from "axios";

const userAPI = process.env.REACT_APP_USER_SERVICES_URI + "/sellers";

export const authSeller = async (req, res) => {
    axios.post(`${userAPI}/login`, req.body)
        .then(response => {
            res.status(response.status).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getSeller = async (req, res) => {
    axios.get(`${userAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getAllSellers = async (req, res) => {
    axios.get(`${userAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createSeller = async (req, res) => {
    axios.post(`${userAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateSeller = async (req, res) => {
    axios.put(`${userAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteSeller = async (req, res) => {
    axios.delete(`${userAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const verifySeller = async (req, res) => {
    axios.get(`${userAPI}/verifySeller/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
};
