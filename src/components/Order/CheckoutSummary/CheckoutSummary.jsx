import classes from "./CheckoutSummary.module.scss";
import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
const CheckoutSummary = ({
    ingredients,
    checkoutCancelled,
    checkoutContinue,
}) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> we hope it tastes well!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={ingredients} />
            </div>
            <div className="button">
                <Button btnType="Danger" clicked={checkoutCancelled}>
                    CANCEL
                </Button>
                <Button btnType="Success" clicked={checkoutContinue}>
                    CONTINUE
                </Button>
            </div>
        </div>
    );
};

export default CheckoutSummary;
