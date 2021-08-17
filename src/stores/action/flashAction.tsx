/* eslint-disable prettier/prettier */

import { Asset } from 'react-native-image-picker';
import { HttpAuth } from '../../config/http';
import { requestFolder } from './folderAction';
import { changeLoading } from './loadingAction';

interface PropsForms{
    folder_id?: string
    sub_folder_id?: string;
    question?: string;
    response?: string;
    photos?: Asset[];
    progress?: number;
    navigation?: any;
}

export const acionTypes = {
    CHANGE: 'CHANGE',
    CREATE: 'CREATE',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
};

export const change = (payload: any) => ({
    type: acionTypes.CHANGE,
    payload,
});

export const create = (payload: any) => ({
    type: acionTypes.CREATE,
    payload,
});

export const error = (payload: any) => ({
    type: acionTypes.ERROR,
    payload,
});

export const success = (payload: any) => ({
    type: acionTypes.SUCCESS,
    payload,
});

export const changeProgress = (progress: number) => (dispatch: any) => {
    dispatch(change(progress));
};

export const createFlashCard = (forms: PropsForms, projectId: string) => async(dispatch: any) => {
    const config = {
        folder_id: forms.folder_id ? forms.folder_id : '',
        sub_folder_id: forms.sub_folder_id ? forms.sub_folder_id : '',
        question: forms.question ? forms.question : '',
        response: forms.response ? forms.response : '',
        photos: forms.photos ? forms.photos : '',
    };

    dispatch(create(config));

    if (forms.progress === 3){
        dispatch(changeLoading(true));

        const data = new FormData();
        data.append('folder_id', config.folder_id);
        data.append('sub_folder_id', config.sub_folder_id);
        data.append('question', config.question);
        data.append('response', config.response);
        for (let i = 0; i < config.photos.length; i++) {
            data.append('file', config.photos[i]);
        }

        await HttpAuth.post('/create_file', data).then(res => {
            dispatch(changeLoading(false));

            if (!res.data.error){
                dispatch(requestFolder(projectId));
                forms.navigation.navigate('Main');
                dispatch(error(''));
                dispatch(success(true));
            } else {
                dispatch(error('Erro ao criar arquivo.'));
                dispatch(success(false));
            }
        }).catch(() => {
            dispatch(error('Erro ao criar arquivo.'));
            dispatch(success(false));
        });
    }
};

export const deleteFlashCard = (id: string, projectId: string, folderId: string | undefined, navigation: any, subFolderId?: string) => async(dispatch: any) => {

    await HttpAuth.delete(`/delete_file?folder_id=${folderId}&sub_folder_id=${subFolderId ? subFolderId : ''}&id=${id}`).then(res => {
        if (!res.data.error){
            dispatch(requestFolder(projectId));
            navigation.navigate('Home');
            dispatch(success(true));
            dispatch(error(''));
        }
    }).catch(() => {
        dispatch(success(false));
        dispatch(error('Erro ao deletar arquivo.'));
    });
};
