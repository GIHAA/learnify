import axios from "axios";
const cartItemAPI = process.env.REACT_APP_ORDER_SERVICES_URI + "/cartitems"

export const getCartItems = async (req, res) => {
    axios.get(`${cartItemAPI}/`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const getOneCartItem = async (req, res) => {
    axios.get(`${cartItemAPI}/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const createCartItem = async (req, res) => {
    axios.post(`${cartItemAPI}/create`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const updateCartItem = async (req, res) => {
    axios.put(`${cartItemAPI}/update/${req.params.id}`, req.body)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

export const deleteCartItem = async (req, res) => {
    axios.delete(`${cartItemAPI}/delete/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//get card by cart id
export const getCartItemsByCartID = async (req, res) => {
    axios.get(`${cartItemAPI}/cart/${req.params.id}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}

//recent 9 orders by brand
export const getRecentOrdersByBrand = async (req, res) => {
    axios.get(`${cartItemAPI}/recentorders/${req.params.brand}`)
        .then(response => {
            res.status(200).json(response.data);
        }).catch(error => {
            res.status(500).json(error);
        });
}