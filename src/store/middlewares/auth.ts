/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import { type Middleware } from "@reduxjs/toolkit";

import {jwtDecode} from "jwt-decode";

import { GET_user } from "@/server-actions";

const middleware: Middleware = (store) => (next) => (action: any) => {
    switch (action.type) {
        case "auth/loginSuccess": {
            const {token} = action.payload;
            const decodedToken: any = jwtDecode(token);

            const getUserData = async (id: string) => {
                const res = await GET_user(id);

                if(res.usuario) {
                    const newData = {token, userData: {...res.usuario}};

                    localStorage.setItem('gServicesUser', JSON.stringify(newData));

                    action.payload = newData;

                    next(action);
                } else {
                    next(action);
                }
            }
    
            getUserData(decodedToken.id_usuario);

            break;
        }
        case "auth/validateSession": {
            const userData = localStorage.getItem('gServicesUser');

            const getUserData = async (idUser: string, token: string, userData: string) => {
                const res = await GET_user(idUser);

                if(res.usuario) {
                    const newData = {token, userData: res.usuario};

                    localStorage.setItem('gServicesUser', JSON.stringify(newData));

                    action.payload = newData;
                } else {
                    action.payload = JSON.parse(userData);
                }

                next(action);
            }

            if(userData) {
                const token = JSON.parse(userData).token;
                const decodedToken: any = jwtDecode(token);

                if(decodedToken.exp) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    
                    if (decodedToken.exp > currentTime) {
                        getUserData(decodedToken.id_usuario, token, userData);
                    } else {
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