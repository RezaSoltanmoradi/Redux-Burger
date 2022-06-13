import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
const CheckOut = () => {
    const navigate = useNavigate();
    const ingredients = useSelector((state) => state.burgerBulder.ingredients);
    const purchased = useSelector((state) => state.burgerBulder.purchased);
    const totalPrice = useSelector((state) => state.burgerBulder.totalPrice);

    function checkoutCancelledHandler() {
        navigate(-1);
    }
    function checkoutContinueHandler() {
        navigate("/checkout/contact-data");
    }
    let summary = <Navigate replace to="/" />;
    if (ingredients) {
        const purchasedRedirect = purchased ? (
            <Navigate replace to="/" />
        ) : null;

        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinue={checkoutContinueHandler}
                />
                <Outlet
                    context={{
                        ingredients: ingredients,
                        totalPrice: totalPrice,
                    }}
                />
            </div>
        );
    }
    return summary;
};

export default CheckOut;
