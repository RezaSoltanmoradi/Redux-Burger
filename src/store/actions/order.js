import * as actionTypes from "./actionTypes";
import axios from "../../httpRequest/axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error, orderData) => {
    const getLocalOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...getLocalOrders, orderData];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};
export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error.message, orderData));
            });
    };
};
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};
export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios
            .get("/orders.json")
            .then((res) => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error));
            });
    };
};
