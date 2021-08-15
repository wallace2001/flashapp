/* eslint-disable prettier/prettier */

export const actionTypes = {
    CHANGE: 'CHANGE_LOADING',
};

export const change = (payload: boolean) => ({
    type: actionTypes.CHANGE,
    payload,
});

export const changeLoading = (status: boolean) => (dispatch: any) => {
    dispatch(change(status));
};
