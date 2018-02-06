import AxiosHelper from 'Helpers/AxiosHelper';
import {createTypes} from 'reduxsauce';

export const Types = createTypes(`
  EXPERTS_LOADED_IN_PROCESS
  EXPERTS_LOADED_SUCCESS
  EXPERTS_LOADED_ERROR
`);

export const expertsActions = {
    loadExpertsAction
};

function loadExpertsAction(dispatch, category_id) {
    return ((dispatch) => {
        dispatch({
            type: Types.EXPERTS_LOADED_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/categories/${category_id}/experts`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Types.EXPERTS_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.EXPERTS_LOADED_ERROR
            }))
    })(dispatch)
}