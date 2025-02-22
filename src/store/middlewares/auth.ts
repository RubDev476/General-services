/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { type Middleware } from "@reduxjs/toolkit";

import {jwtDecode} from "jwt-decode";

const middleware: Middleware = (store) => (next) => (action: any) => {
    switch (action.type) {
        case "auth/loginSuccess": {
            const {token} = action.payload;

            localStorage.setItem('gServicesToken', token);
    
            const decodedToken = jwtDecode(token);
    
            action.payload = {token, userData: decodedToken};
    
            next(action);

            break;
        }
        case "auth/validateSession": {
            const token = localStorage.getItem('gServicesToken');

            if(token) {
                const decodedToken = jwtDecode(token);

                //console.log(decodedToken);
    
                if(decodedToken.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    
                    if (decodedToken.exp < currentTime) {
                        next(action);
                    } else {
                        action.payload = {token, userData: decodedToken};
    
                        next(action);
                    }
                }
            } else {
                next(action);
            }

            break;
        }
        case "auth/logout": {
            localStorage.removeItem('gServicesToken');

            next(action);

            break;
        }
        default: {
            next(action);
            break;
        }
    }
};

export default middleware;