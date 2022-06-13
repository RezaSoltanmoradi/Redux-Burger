import classes from "./Backdrop.module.scss";

const Backdrop = ({ showModal, closeModal, clicked }) => {
    return showModal ? (
        <div className={classes.Backdrop} onClick={closeModal || clicked}></div>
    ) : null;
};

export default Backdrop;
