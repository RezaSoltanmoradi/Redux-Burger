import Logo from "../../Logo/Logo";
import { NavigationItems } from "../../../components";
import { Fragment } from "react";
import Backdrop from "./../../../components/UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.scss";
import classNames from "classnames";
import { AiOutlineClose } from "react-icons/ai";
const SideDrawer = ({ show, closed }) => {
    const backdropClasses = classNames({
        [classes.SideDrawer]: true,
        [classes.close]: !show,
        [classes.show]: show,
    });
    return (
        <Fragment>
            {show && <Backdrop showModal={show} clicked={closed} />}
            <div className={backdropClasses} onClick={closed}>
                <div className={classes.buttonContainer}>
                    <AiOutlineClose
                        className={classes.closeButton}
                        onClick={closed}
                    />
                </div>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;
