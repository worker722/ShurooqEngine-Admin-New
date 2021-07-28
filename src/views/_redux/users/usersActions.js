import * as requestFromServer from "./usersCrud";
import { usersSlice, callTypes } from "./usersSlice";
import MockUtils from "../../../_utiles/mock.utils";

const { actions } = usersSlice;

export const addUser = (productForCreation, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .addUser(productForCreation, token)
        .then(({data}) => {
            dispatch(actions.statusFetched({ statusData: data.msg }));
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getUserData = (id, token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getUserData(id, token)
        .then(({ data }) => {
            if (data.success) {
                let userRole = "1";
                if(data.data.role == "Vendor") 
                {
                    userRole = "2";
                }
                const  userdata = {
                    id: data.data.id,
                    username: data.data.username,
                    role: data.data.role,
                    password: '',
                    confirmpwd: '',
                }
                dispatch(actions.userFetched({ userData: userdata }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't find cient";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const getUserLists = () => dispatch => {
    // dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getUserLists()
        .then(({ data }) => {
            dispatch(actions.userListFetched({userListData: data.data}));
        })
        .catch(error => {
            error.clientMessage = "Can't find vendors";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
}

export const setUserData = (token) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getUserLists(token)
        .then(({ data }) => {
            if (data.success) {
                dispatch(actions.setUserDataFetched({ statusData: data.data }));
            }
        })
        .catch(error => {
            error.clientMessage = "Can't create product";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};