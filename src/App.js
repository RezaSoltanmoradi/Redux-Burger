import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ContactData from "./containers/Checkout/ContactData/ContactData";
import Spinner from "./components/UI/Spinner/Spinner";
const CheckOut = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const BurgerBuilder = lazy(() =>
    import("./containers/BurgerBuilder/BurgerBuilder")
);
function App() {
    return (
        <Layout>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="*" element={<Navigate replace to="/home" />} />
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route element={<BurgerBuilder />} path="/home" />
                    <Route element={<Orders />} path="/orders" />
                    <Route element={<CheckOut />} path="/checkout/*">
                        <Route path="contact-data" element={<ContactData />} />
                    </Route>
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App;
