import { Fragment, useState } from "react";
import { SideDrawer, Toolbar } from "../../components";
import classes from "./Layout.module.scss";
const Layout = ({ children }) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const openSideDrawer = () => {
        setShowSideDrawer(true);
    };
    const closeSideDrawer = () => {
        setShowSideDrawer(false);
    };
    return (
        <Fragment>
            <Toolbar open={openSideDrawer} />
            <SideDrawer closed={closeSideDrawer} show={showSideDrawer} />
            <main className={classes.content}>{children}</main>
        </Fragment>
    );
};
export default Layout;
