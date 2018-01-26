import AxiosHelper from '../helpers/AxiosHelper';

const Type = {
    CATEGORIES_LOADED_IN_PROCESS: 'CATEGORIES_LOADED_IN_PROCESS',
    CATEGORIES_LOADED_SUCCESS: 'CATEGORIES_LOADED_SUCCESS',
    CATEGORIES_LOADED_ERROR: 'CATEGORIES_LOADED_ERROR'
};

export default Type;

export const categoryActions = {
    loadCategoriesAction
};

function loadCategoriesAction(dispatch){
    return ((dispatch) => {
        dispatch({
            type: Type.CATEGORIES_LOADED_IN_PROCESS
        });

        const axios = new AxiosHelper();
        return axios.setUrl(`/categories`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.CATEGORIES_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.CATEGORIES_LOADED_ERROR
            }))
    })(dispatch);
}