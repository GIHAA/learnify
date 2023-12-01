const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

//seller
export const REGISTER_SELLER = `${BASE_URL}/sellers/create`;
export const LOGIN_SELLER = `${BASE_URL}/sellers/login`;
export const GET_SELLER = (id) => `${BASE_URL}/sellers/${id}`;
export const UPDATE_SELLER = (id) => `${BASE_URL}/sellers/update/${id}`;
export const DELETE_SELLER = (id) => `${BASE_URL}/sellers/delete/${id}`;
export const GET_ALL_SELLERS = `${BASE_URL}/sellers`;
export const VERIFY_SELLER = (id) => `${BASE_URL}/sellers/verifySeller/${id}`;

//buyer
export const REGISTER_BUYER = `${BASE_URL}/buyers/create`;
export const LOGIN_BUYER = `${BASE_URL}/buyers/login`;
export const GET_BUYER = (id) => `${BASE_URL}/buyers/${id}`;
export const UPDATE_BUYER = (id) => `${BASE_URL}/buyers/update/${id}`;
export const DELETE_BUYER = (id) => `${BASE_URL}/buyers/delete/${id}`;
export const GET_ALL_BUYERS = `${BASE_URL}/buyers`;
export const VERIFY_BUYER = (id) => `${BASE_URL}/buyers/verify/${id}`;

//admin
export const REGISTER_ADMIN = `${BASE_URL}/admins/create`;
export const LOGIN_ADMIN = `${BASE_URL}/admins/login`;
export const GET_ADMIN = (id) => `${BASE_URL}/admins/${id}`;
export const UPDATE_ADMIN = (id) => `${BASE_URL}/admins/update/${id}`;
export const DELETE_ADMIN = (id) => `${BASE_URL}/admins/delete/${id}`;
export const GET_ALL_ADMINS = `${BASE_URL}/admins`;

//category
export const GET_ALL_CATEGORIES = `${BASE_URL}/categories`;
export const GET_CATEGORY = (id) => `${BASE_URL}/categories/${id}`;
export const CREATE_CATEGORY = `${BASE_URL}/categories/create`;
export const UPDATE_CATEGORY = (id) => `${BASE_URL}/categories/update/${id}`;
export const DELETE_CATEGORY = (id) => `${BASE_URL}/categories/delete/${id}`;

//item
export const GET_ALL_ITEMS = `${BASE_URL}/items`;
export const GET_ITEM = (id) => `${BASE_URL}/items/${id}`;
export const CREATE_ITEM = `${BASE_URL}/items/create`;
export const UPDATE_ITEM = (id) => `${BASE_URL}/items/update/${id}`;
export const DELETE_ITEM = (id) => `${BASE_URL}/items/delete/${id}`;
export const GET_NEW_ITEMS_BY_SELLERID = (seller) => `${BASE_URL}/items/new/${seller}`;
export const GET_ITEMS_BY_SELLERID = (seller) => `${BASE_URL}/items/seller/${seller}`;
export const GET_ITEMS_BY_CATEGORY = (category) => `${BASE_URL}/items/category/${category}`;
export const GET_ITEMS_BY_BRAND = (brand) => `${BASE_URL}/items/brand/${brand}`;
export const GET_NEW_ITEMS = `${BASE_URL}/items/new/items`;
export const GET_RANDOM_ITEMS = `${BASE_URL}/items/get/random`;
export const GET_TOP_RATING_ITEMS = `${BASE_URL}/items/get/top`;
export const GET_ITEMS_BY_SEARCH = (search) => `${BASE_URL}/items/search/${search}`;

//review
export const GET_ALL_REVIEWS = `${BASE_URL}/reviews`;
export const GET_REVIEW = (id) => `${BASE_URL}/reviews/${id}`;
export const CREATE_REVIEW = `${BASE_URL}/reviews/create`;
export const UPDATE_REVIEW = (id) => `${BASE_URL}/reviews/update/${id}`;
export const DELETE_REVIEW = (id) => `${BASE_URL}/reviews/delete/${id}`;
export const GET_REVIEWS_BY_ITEMID = (item) => `${BASE_URL}/reviews/item/${item}`;
export const GET_REVIEWS_BY_USERID = (buyer) => `${BASE_URL}/reviews/user/${buyer}`;

//cart
export const GET_ALL_CARTS = `${BASE_URL}/carts`;
export const GET_CART = (id) => `${BASE_URL}/carts/${id}`;
export const CREATE_CART = `${BASE_URL}/carts/create`;
export const UPDATE_CART = (id) => `${BASE_URL}/carts/update/${id}`;
export const DELETE_CART = (id) => `${BASE_URL}/carts/delete/${id}`;
export const GET_CARTS_BY_BUYERID = (buyer) => `${BASE_URL}/carts/buyer/${buyer}`;
export const GET_CARTS_BY_STATUS = (status) => `${BASE_URL}/carts/status/${status}`;
export const GET_CARTS_BY_BUYER_NOT_DELIVERED = (buyer) => `${BASE_URL}/carts/buyer/${buyer}/notDelivered`;
export const GET_CARTS_BY_BUYER_DELIVERED = (buyer) => `${BASE_URL}/carts/buyer/${buyer}/delivered`;

//cartItem
export const GET_ALL_CARTITEMS = `${BASE_URL}/cartItems`;
export const GET_CARTITEM = (id) => `${BASE_URL}/cartItems/${id}`;
export const CREATE_CARTITEM = `${BASE_URL}/cartItems/create`;
export const UPDATE_CARTITEM = (id) => `${BASE_URL}/cartItems/update/${id}`;
export const DELETE_CARTITEM = (id) => `${BASE_URL}/cartItems/delete/${id}`;
export const GET_CARTITEMS_BY_CARTID = (cart) => `${BASE_URL}/cartItems/cart/${cart}`;
export const GET_RECENT_CARTITEMS_BY_BRAND = (brand) => `${BASE_URL}/cartItems/recentorders/${brand}`;

//payment
export const INITIATE_PAYMENT = `${BASE_URL}/stripe/payment`;

//delivery
export const GET_ALL_DELIVERIES = `${BASE_URL}/deliveries`;
export const GET_DELIVERY = (id) => `${BASE_URL}/deliveries/${id}`;
export const CREATE_DELIVERY = `${BASE_URL}/deliveries/create`;
export const UPDATE_DELIVERY = (id) => `${BASE_URL}/deliveries/update/${id}`;
export const DELETE_DELIVERY = (id) => `${BASE_URL}/deliveries/delete/${id}`;