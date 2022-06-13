import { useState, useEffect } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (httpClient) => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use((req) => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            setError(
                "دسترسی شما به سرور قطع هست, فیلتر شکن خود را روشن کنید" || err
            );
        }
    );
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [
        httpClient.interceptors.request,
        httpClient.interceptors.response,
        reqInterceptor,
        resInterceptor,
    ]);

    const errorConfirmedHandler = () => {
        setError(null);
    };
    return [error, errorConfirmedHandler];
};
