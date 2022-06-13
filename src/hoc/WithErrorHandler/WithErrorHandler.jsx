import React, { Fragment } from "react";

import Modal from "../../components/UI/Modal/Modal";
import useHttpError from "../../hooks/http-error";
const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, claerError] = useHttpError(axios);
        return (
            <Fragment>
                <Modal showModal={error} closeModal={claerError}>
                    {error ? error : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;
