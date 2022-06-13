import classNames from "classnames";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.scss";
const NavigationItem = ({ children, link }) => {
    
    const linkClasses = (link) =>
        classNames({
            [classes.active]: link.isActive ? true : false,
            [classes.NavigationItem]: true,
        });
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={link} className={(link) => linkClasses(link)}>
                {children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;
