import dotenv from "dotenv/config";
import axios from "axios";

const reviewAPI = process.env.REACT_APP_ITEM_SERVICES_URI + "/reviews";

export const getReviews = async (req, res) => {
    axios.get(`${reviewAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getOneReview = async (req, res) => {
    axios.get(`${reviewAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createReview = async (req, res) => {
    axios.post(`${reviewAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateReview = async (req, res) => {
    axios.put(`${reviewAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteReview = async (req, res) => {
    axios.delete(`${reviewAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getReviewsByItem = async (req, res) => {
    axios.get(`${reviewAPI}/item/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getReviewsByUser = async (req, res) => {
    axios.get(`${reviewAPI}/user/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}
