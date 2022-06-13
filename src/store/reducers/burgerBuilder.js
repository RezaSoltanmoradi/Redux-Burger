import * as actionType from "../actions/actionTypes";
import INGREDIENT_PRICES from "../../helper/Types";
import { updateObject } from "../../shared/utility";
const initialState = {
    ingredients: {
        meat: 0,
        bacon: 0,
        salad: 0,
        cheese: 0,
    },
    totalPrice: 0,
    error: false,
    loading: true,
};
const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    };
    return updateObject(state, updatedState);
};
const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
    return updateObject(state, updatedSt);
};
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.ingredients.salad,
            bacon: action.ingredients.ingredients.bacon,
            meat: action.ingredients.ingredients.meat,
            cheese: action.ingredients.ingredients.cheese,
        },
        error: false,
        totalPrice: action.ingredients.totalPrice,
        loading: false,
    });
};
const fetchIngredientFail = (state, action) => {
    const getIngredients =
        JSON.parse(localStorage.getItem("ingredients")) || null;
    const getTotalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;
    if (getIngredients && getTotalPrice) {
        return updateObject(state, {
            ingredients: {
                salad: getIngredients.salad,
                bacon: getIngredients.bacon,
                meat: getIngredients.meat,
                cheese: getIngredients.cheese,
            },
            error: false,
            loading: false,
            totalPrice: getTotalPrice,
        });
    } else {
        return updateObject(state, { loading: false, error: true });
    }
};
const putIngredientStart = (state, action) => {
    return updateObject(state, { loading: true });
};
const putIngredientSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        ingredients: {
            salad: action.salad,
            bacon: action.bacon,
            meat: action.meat,
            cheese: action.cheese,
        },
        totalPrice: action.totalPrice,
    });
};
const putIngredientFail = (state, action) => {
    return updateObject(state, { loading: false, error: true });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return addIngredient(state, action);

        case actionType.REMOVE_INGREDIENTS:
            return removeIngredient(state, action);

        case actionType.SET_INGREDIENTS:
            return setIngredients(state, action);

        case actionType.FETCH_INGREDIENTS_FAIL:
            return fetchIngredientFail(state, action);

        case actionType.PUTINGREDIENT_START:
            return putIngredientStart(state, action);

        case actionType.PUTINGREDIENT_SUCCESS:
            return putIngredientSuccess(state, action);

        case actionType.PUTINGREDIENT_FAIL:
            return putIngredientFail(state, action);

        default:
            return state;
    }
};
export default reducer;
