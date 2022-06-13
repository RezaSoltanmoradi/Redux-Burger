import { useState } from "react";
import classes from "./ContactData.module.scss";
import Button from "../../../components/UI/Button/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "../../../httpRequest/axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";
const ContactData = (props) => {
    const { ingredients, totalPrice } = useOutletContext();

    const [formIsValid, setFormIsValid] = useState(false);
    const loading = useSelector((state) => state.order.loading);
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Your Name",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Street",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "ZIP Code [number]",
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Country",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your E-Mail",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastest" },
                    { value: "cheapest", displayValue: "Cheapest" },
                ],
            },
            validation: {},
            valid: true,
            value: "fastest",
            touched: true,
        },
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderBurgerHandler = (orderData) => {
        dispatch(actions.purchaseBurger(orderData));
        dispatch(
            actions.putIngredients(orderData.ingredients, orderData.price)
        );
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };
    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] =
                orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: formData,
        };
        orderBurgerHandler(order);
    };

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                orderForm[inputIdentifier].validation
            ),
            touched: true,
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement,
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };
    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) =>
                        inputChangeHandler(event, formElement.id)
                    }
                    clicked={(event) =>
                        inputChangeHandler(event, formElement.id)
                    }
                />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>
                ORDER
            </Button>
        </form>
    );
    if (loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4> Enter Your Contact Data</h4>
            {form}
        </div>
    );
};
export default withErrorHandler(ContactData, axios);
