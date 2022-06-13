import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.scss";
import { NavigationItems } from "../../../components";
export const Toolbar = ({ open }) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.DrawerToggle} onClick={open}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};
export default Toolbar;
