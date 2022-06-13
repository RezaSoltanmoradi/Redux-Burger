import { Fragment } from "react";
import Button from "../../../components/UI/Button/Button";

const OrderSummary = ({
    ingredients,
    canceledPerchase,
    continuePerchase,
    price,
}) => {
    const ingredientSummery = Object.keys(ingredients).map((ingKey) => {
        return (
            <li key={ingKey}>
                <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:
                {ingredients[ingKey]}
            </li>
        );
    });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A Delicious burger with the following ingredients </p>
            <ul>{ingredientSummery}</ul>
            <p>
                <strong>Total Price: {price.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button btnType={"Danger"} clicked={canceledPerchase}>
                CANCEL
            </Button>
            <Button btnType={"Success"} clicked={continuePerchase}>
                CONTINUE
            </Button>
        </Fragment>
    );
};

export default OrderSummary;
