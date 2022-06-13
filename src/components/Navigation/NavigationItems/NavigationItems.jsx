import { NavigationItem } from "../../../components";
import classes from "./NavigationItems.module.scss";
const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/home">Burger Builder</NavigationItem>
            <NavigationItem link="/checkout">Checkout</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
