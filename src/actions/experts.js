import AxiosHelper from '../helpers/AxiosHelper';

let Type = {
    EXPERTS_LOADED_IN_PROCESS: 'EXPERTS_LOADED_IN_PROCESS',
    EXPERTS_LOADED_SUCCESS: 'EXPERTS_LOADED_SUCCESS',
    EXPERTS_LOADED_ERROR: 'EXPERTS_LOADED_ERROR'
};

export default Type;

export const expertsActions = {
    loadExpertsAction
};

function loadExpertsAction(dispatch, category_id) {
    return ((dispatch) => {
        dispatch({
            type: Type.EXPERTS_LOADED_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/categories/${category_id}/experts`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.EXPERTS_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.EXPERTS_LOADED_ERROR
            }))
    })(dispatch)
}