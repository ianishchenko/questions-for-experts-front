import AxiosHelper from 'Helpers/AxiosHelper';
import {createTypes} from 'reduxsauce';

export const Types = createTypes(`
  CATEGORIES_LOADED_IN_PROCESS
  CATEGORIES_LOADED_SUCCESS
  CATEGORIES_LOADED_ERROR
`);

export const categoryActions = {
    loadCategoriesAction
};

function loadCategoriesAction(dispatch) {
    return ((dispatch) => {
        dispatch({
            type: Types.CATEGORIES_LOADED_IN_PROCESS
        });

        const axios = new AxiosHelper();
        return axios.setUrl(`/categories`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Types.CATEGORIES_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.CATEGORIES_LOADED_ERROR
            }))
    })(dispatch);
}