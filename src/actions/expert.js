import AxiosHelper from 'Helpers/AxiosHelper';
import {createTypes} from 'reduxsauce';

export const Types = createTypes(`
  EXPERT_LOADED_IN_PROCESS
  EXPERT_LOADED_SUCCESS
  EXPERT_LOADED_ERROR
`);

export const expertActions = {
    loadExpertAction
};

function loadExpertAction(dispatch, expert_id) {
    return ((dispatch) => {
        dispatch({
            type: Types.EXPERT_LOADED_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/experts/${expert_id}`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Types.EXPERT_LOADED_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Types.EXPERT_LOADED_ERROR
            }))
    })(dispatch)
}