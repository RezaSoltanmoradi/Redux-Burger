import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId,
    });
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
    });
};
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
};
const fetchOrdersStart = (state, action) => {
    const getOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (getOrders) {
        return updateObject(state, { orders: getOrders, loading: false });
    } else {
        return updateObject(state, { loading: false });
    }
};
const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    });
};
const fetchOrdersFail = (state, action) => {
    const getOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (getOrders) {
        return updateObject(state, { orders: getOrders, loading: false });
    } else {
        return updateObject(state, { loading: false });
    }
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return purchaseInit(state, action);

        case actionType.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);

        case actionType.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionType.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);

        case actionType.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);

        case actionType.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);

        case actionType.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state, action);

        default:
            return state;
    }
};
export default reducer;
