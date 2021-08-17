/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const Http = axios.create({
    baseURL: 'http://10.0.2.2:3000',
});

export const HttpAuth = axios.create({
    baseURL: 'http://10.0.2.2:3000/auth',
});

export const HttpAuthVerify = axios.create({
    baseURL: 'http://10.0.2.2:3000/auth',
});

HttpAuthVerify.interceptors.request.use(
    async(config) => {
        if (await AsyncStorage.getItem('refresh_token')){
            config.headers.authorization = `Bearer ${await AsyncStorage.getItem('refresh_token')}`;
        }
        return config;
    },
);

HttpAuthVerify.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response){
        if (error.response.status === 401){
            AsyncStorage.removeItem('refresh_token');
        }
    }
});

HttpAuth.interceptors.request.use(
    async(config) => {
        if (await AsyncStorage.getItem('access_token')){
            config.headers.authorization = `Bearer ${await AsyncStorage.getItem('access_token')}`;
        }
        return config;
    },
);

HttpAuth.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response){
        if (error.response.status === 401){
            console.log('errorInterceptors:', error);
            // AsyncStorage.removeItem('access_token');
        }
    }
});

Http.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response){
        if (error.response.status === 401){
            console.log('errorInterceptors:', error.response.data);
        }
    }
});
