import * as actionTypes from "./actionTypes";
import axios from "../../httpRequest/axios-orders";
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name,
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name,
    };
};
export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};
export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        error: error.message,
    };
};
export const putIngredientStart = () => {
    return {
        type: actionTypes.PUTINGREDIENT_START,
    };
};
export const putIngredientSuccess = (ingredinetsData) => {
    return {
        type: actionTypes.PUTINGREDIENT_SUCCESS,
        ingredients: ingredinetsData.ingredients,
        totalPrice: ingredinetsData.totalPrice,
    };
};
export const putIngredientFail = (ingredinetsData, error) => {
    localStorage.setItem(
        "ingredients",
        JSON.stringify(ingredinetsData.ingredients)
    );
    localStorage.setItem(
        "totalPrice",
        JSON.stringify(ingredinetsData.totalPrice)
    );
    return {
        type: actionTypes.PUTINGREDIENT_FAIL,
        error: error,
    };
};
export const putIngredients = (ingredients, totalPrice) => {
    const ingredinetsData = { ingredients, totalPrice };
    return (dispatch) => {
        dispatch(putIngredientStart());
        try {
            axios
                .put(
                    "https://http-request-85462-default-rtdb.firebaseio.com/ingredients.json",
                    ingredinetsData
                )
                .then((Response) => {
                    console.log("response:", Response.data);
                    dispatch(putIngredientSuccess(ingredinetsData));
                })
                .catch((error) => {
                    dispatch(putIngredientFail(ingredinetsData, error));
                });
        } catch (error) {
            dispatch(putIngredientFail(ingredinetsData, error));
        }
    };
};
export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get(
                "https://http-request-85462-default-rtdb.firebaseio.com/ingredients.json"
            )
            .then((Response) => {
                dispatch(setIngredient(Response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsFailed(error));
            });
    };
};
