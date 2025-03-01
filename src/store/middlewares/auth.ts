/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { type Middleware } from "@reduxjs/toolkit";

import {jwtDecode} from "jwt-decode";

import { GET_user } from "@/server-actions";

const middleware: Middleware = (store) => (next) => (action: any) => {
    switch (action.type) {
        case "auth/loginSuccess": {
            const {token} = action.payload;
            const decodedToken: any = jwtDecode(token);

            const getUserData = async (id: string, roles: any) => {
                const res = await GET_user(id);

                if(res.usuario) {
                    const newData = {token, userData: {...res.usuario, roles}};

                    localStorage.setItem('gServicesUser', JSON.stringify(newData));

                    action.payload = newData;

                    next(action);
                } else {
                    next(action);
                }
            }
    
            getUserData(decodedToken.id_usuario, decodedToken.roles);

            break;
        }
        case "auth/validateSession": {
            const userData = localStorage.getItem('gServicesUser');

            if(userData) {
                const decodedToken: any = jwtDecode(JSON.parse(userData).token);

                if(decodedToken.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    
                    if (decodedToken.exp < currentTime) {
                        next(action);
                    } else {
                        action.payload = JSON.parse(userData);
    
                        next(action);
                    }
                }
            } else {
                next(action);
            }

            break;
        }
        case "auth/logout": {
            localStorage.removeItem('gServicesUser');

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