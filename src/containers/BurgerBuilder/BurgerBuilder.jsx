import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../httpRequest/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import { useSelector, useDispatch } from "react-redux";

const BurgerBuilder = () => {
    const [perchaseing, setPerchaseing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ingredients = useSelector((state) => state.burgerBulder.ingredients);
    const totalPrice = useSelector((state) => state.burgerBulder.totalPrice);
    const loading = useSelector((state) => state.burgerBulder.loading);
    const error = useSelector((state) => state.burgerBulder.error);

    const addIngredientHandler = (type) => {
        dispatch(actions.addIngredient(type));
    };
    const removeIngredientHandler = (type) => {
        dispatch(actions.removeIngredient(type));
    };

    useEffect(() => {
        dispatch(actions.initIngredients());
    }, [dispatch]);

    const updatedPerchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingKey) => {
                return ingredients[ingKey];
            })
            .reduce((prev, curr) => {
                return prev + curr;
            }, 0);
        return sum > 0;
    };

    const perchaseHandler = () => {
        setPerchaseing(true);
    };
    const cancelPerchaseHandler = () => {
        setPerchaseing(false);
    };
    const continuePerchaseHandler = () => {
        dispatch(actions.purchaseInit());

        const queryParams = [];
        for (let x in ingredients) {
            queryParams.push(
                encodeURIComponent(x) + "=" + encodeURIComponent(ingredients[x])
            );
        }
        queryParams.push("price=" + totalPrice.toFixed(2));
        const queryString = queryParams.join("&");
        navigate({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    };

    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger;
    if (ingredients && !loading) {
        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    addIng={addIngredientHandler}
                    removeIng={removeIngredientHandler}
                    disabled={disabledInfo}
                    perchaseable={updatedPerchaseState(ingredients)}
                    price={totalPrice.toFixed(2)}
                    ordered={perchaseHandler}
                />
            </Fragment>
        );
    } else {
        burger = <Spinner />;
    }
    return (
        <Fragment>
            <Modal showModal={perchaseing} closeModal={cancelPerchaseHandler}>
                <OrderSummary
                    price={totalPrice}
                    canceledPerchase={cancelPerchaseHandler}
                    continuePerchase={continuePerchaseHandler}
                    ingredients={ingredients}
                />
            </Modal>
            {burger}
        </Fragment>
    );
};
export default WithErrorHandler(BurgerBuilder, axios);
