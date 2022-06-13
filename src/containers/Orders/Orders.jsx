import { useCallback, useEffect,useMemo } from "react";
import Order from "../../components/Order/Order";
import axios from "../../httpRequest/axios-orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/order";
const Orders = () => {
    const loading = useSelector((state) => state.order.loading);
    const orders = useSelector((state) => state.order.orders);
    const dispatch = useDispatch();

    const onFetchOrders = useCallback(
        () => dispatch(actions.fetchOrders()),
        [dispatch]
    );
    useEffect(() => {
        
        onFetchOrders();
    }, [onFetchOrders]);

    let ordersElement = <Spinner />;
    if (!loading && orders.length > 0) {
        ordersElement = orders.map((order) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={Number(order.price).toFixed(2)}
            />
        ));
    }
    if (!loading && orders.length === 0) {
        ordersElement = (
            <p
                style={{
                    color: "orangered",
                    textAlign: "center",
                    fontSize: "20px",
                }}
            >
                there is not orders yet...
            </p>
        );
    }
    return <div>{ordersElement}</div>;
};

export default withErrorHandler(Orders, axios);
