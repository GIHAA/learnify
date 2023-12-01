import dotenv from "dotenv/config";
import axios from "axios";

const userAPI = process.env.REACT_APP_USER_SERVICES_URI + "/admins";

export const authAdmin = async (req, res) => {
    axios.post(`${userAPI}/login`, req.body)
        .then(response => {
            res.status(response.status).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
};

export const getAdmin = async (req, res) => {
    axios.get(`${userAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
};

export const getAllAdmins = async (req, res) => {
    axios.get(`${userAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createAdmin = async (req, res) => {
    axios.post(`${userAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateAdmin = async (req, res) => {
    axios.put(`${userAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteAdmin = async (req, res) => {
    axios.delete(`${userAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}
