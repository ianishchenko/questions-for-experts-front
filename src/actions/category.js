import AxiosHelper from '../helpers/AxiosHelper';

let Type = {
    CATEGORIES_LOADED_FROM_API_IN_PROCESS: 'CATEGORIES_LOADED_FROM_API_IN_PROCESS',
    CATEGORIES_LOADED_FROM_API_SUCCESS: 'CATEGORIES_LOADED_FROM_API_SUCCESS',
    CATEGORIES_LOADED_FROM_API_ERROR: 'CATEGORIES_LOADED_FROM_API_ERROR'
};

export default Type;

export const categoryActions = {
    loadCategoriesAction
};

function loadCategoriesAction(dispatch){
    return ((dispatch) => {
        dispatch({
            type: Type.CATEGORIES_LOADED_FROM_API_IN_PROCESS
        });

        const axios = new AxiosHelper();
        return axios.setUrl(`/categories`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.CATEGORIES_LOADED_FROM_API_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.CATEGORIES_LOADED_FROM_API_ERROR
            }))
    })(dispatch)
}