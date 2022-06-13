import classes from "./Modal.module.scss";
import React, { Fragment, memo } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classNames from "classnames";

const Modal = ({ children, showModal, closeModal }) => {
    const modalClasses = classNames({
        [classes.Modal]: true,
        [classes.openModal]: showModal,
        [classes.closeModal]: !showModal,
    });
    return (
        <Fragment>
            <Backdrop
                showModal={showModal}
                closeModal={closeModal}
            />

            <div className={modalClasses}>{children}</div>
        </Fragment>
    );
};

export default memo(Modal);
