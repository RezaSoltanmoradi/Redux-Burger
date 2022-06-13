import classes from "./Burger.module.scss";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classNames from "classnames";
import { breadTop, breadBottom } from "../../helper/Types";

const Burger = ({ ingredients }) => {
    
    let transformedIngredients = Object.keys(ingredients)
        .map((ingKey) => {
            return [...Array(ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        })
        .reduce((perv, curr) => {
            return perv.concat(curr);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>please start adding ingredient</p>;
    }

    const burgerClass = classNames({
        [classes.Burger]: true,
        [classes.BurgerScroll]:
            transformedIngredients.length > 5 ? true : false,
    });
    return (
        <div className={burgerClass}>
            <BurgerIngredient type={breadTop} />
            {transformedIngredients}
            <BurgerIngredient type={breadBottom} />
        </div>
    );
};

export default Burger;
