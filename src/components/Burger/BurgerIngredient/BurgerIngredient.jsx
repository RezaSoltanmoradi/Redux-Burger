import classes from "./BurgerIngredient.module.scss";
import PropTypes from "prop-types";
import * as types from "../../../helper/Types";

const BurgerIngredient = ({ type }) => {
    let ingredient = null;

    switch (type) {
        case types.breadBottom:
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case types.breadTop:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case types.meat:
            ingredient = <div className={classes.Meat}></div>;
            break;
        case types.cheese:
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case types.bacon:
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case types.salad:
            ingredient = <div className={classes.Salad}></div>;
            break;
        default:
            ingredient = null;
            break;
    }
    return ingredient;
};
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};
export default BurgerIngredient;
