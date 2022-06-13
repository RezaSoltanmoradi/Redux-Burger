import axios from "axios";

const instance = axios.create({
    baseURL: "https://http-request-85462-default-rtdb.firebaseio.com/",
    
});

export default instance;
