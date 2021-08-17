/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Http, HttpAuth } from '../../config/http';
import { changeLoading } from './loadingAction';

interface PropsCredentials{
    email: string;
    password: string;
}

interface PropsRegisterCredentials{
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    telphone?: string;
}

export const actionTypes = {
    CHANGE: 'CHANGE_AUTH',
    CREATE: 'CHANGE_CREATE',
    CREATENOW: 'CHANGE_CREATENOW',
    ERROR: 'CHANGE_ERROR',
    SUCCESS: 'CHANGE_SUCCESS',
    LOADING: 'CHANGE_LOADING',
};

export const change = (payload: any) => ({
    type: actionTypes.CHANGE,
    payload,
});

export const create = (payload: any) => ({
    type: actionTypes.CREATE,
    payload,
});

export const createnow = (payload: any) => ({
    type: actionTypes.CREATENOW,
    payload,
});

export const error = (payload: any) => ({
    type: actionTypes.ERROR,
    payload,
});

export const success = (payload: any) => ({
    type: actionTypes.SUCCESS,
    payload,
});

export const loading = (payload: any) => ({
    type: actionTypes.LOADING,
    payload,
});

export const authenticationRefreshToken = (idRefresh: string) => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));
    await Http.post('/refresh_token', {
        refresh_token: idRefresh,
    }).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            if (res.data.refreshToken.newRefreshToken){
                AsyncStorage.setItem('refresh_token', res.data.refreshToken.newRefreshToken.id);
            } else {
                AsyncStorage.setItem('access_token', res.data.refreshToken);
            }
            dispatch(authenticationTokenValidation());
            dispatch(success(true));
            dispatch(error(''));
        } else {
            dispatch(error('Erro ao fazer login'));
            dispatch(success(false));
        }

    }).catch(() => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        dispatch(error('Token inválido.'));
        dispatch(success(false));
    });
};

export const authenticationTokenValidation = () => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));
    await HttpAuth.get('/me').then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(change(res.data));
            dispatch(success(true));
            dispatch(error(''));
        } else {
            dispatch(success(false));
            dispatch(error('Erro ao entrar'));
        }
    }).catch(() => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        dispatch(error('Token inválido.'));
        dispatch(success(false));
    });
};

export const authentication = (credentials: PropsCredentials) => async(dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));
    await Http.post('/sessions', credentials).then(async(res) => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        if (!res.data.error){
            AsyncStorage.setItem('access_token', res.data.token);
            AsyncStorage.setItem('refresh_token', res.data.refreshToken.id);
            dispatch(authenticationRefreshToken(res.data.refreshToken.id));
        }

    }).catch(() => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        dispatch(error('Dados inválidos.'));
        dispatch(success(false));
    });
};

export const logout = () => async(dispatch: any) => {
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('refresh_token');
    dispatch(change({
        id: '',
        name: '',
        telphone: '',
        email: '',
        image: '',
        refresh_token: '',
        confirmation: false,
    }));
};

export const saveImage = (credentials: PropsRegisterCredentials) => (dispatch: any) => {
    dispatch(create({...credentials}));
};

export const registerCredentials = (credentials: PropsRegisterCredentials, navigation: any) => (dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));

    Http.post('/signup', credentials).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(createnow(res.data.user.id));
            dispatch(error(''));
            dispatch(success(true));
            navigation.navigate('Confirm');
        } else {
            dispatch(error('Erro ao cadastrar'));
            dispatch(success(false));
        }
    }).catch(() => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        dispatch(error('Erro ao criar sua conta.'));
        dispatch(success(false));
    });
    dispatch(create({...credentials}));
};

export const confirmAccount = (code: string, id: string, navigation: any) => (dispatch: any) => {
    dispatch(changeLoading(true));
    dispatch(loading(true));

    Http.get(`/confirmation?id=${id}&code=${code}`).then(res => {
        dispatch(changeLoading(false));
        dispatch(loading(false));

        if (!res.data.error){
            dispatch(error(''));
            dispatch(success(true));
            navigation.navigate('Congratulations');
        } else {
            dispatch(error('Erro ao verificar conta'));
            dispatch(success(false));
        }
    }).catch(() => {
        dispatch(changeLoading(false));
        dispatch(loading(false));
        dispatch(error('Erro ao confirmar conta.'));
        dispatch(success(false));
    });
};
