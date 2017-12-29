import AxiosHelper from '../helpers/AxiosHelper';

let Type = {
    EXPERT_LOADED_FROM_API_IN_PROCESS: 'EXPERT_LOADED_FROM_API_IN_PROCESS',
    EXPERT_LOADED_FROM_API_SUCCESS: 'EXPERT_LOADED_FROM_API_SUCCESS',
    EXPERT_LOADED_FROM_API_ERROR: 'EXPERT_LOADED_FROM_API_ERROR'
};

export default Type;

export const expertActions = {
    loadExpertAction
};

function loadExpertAction(dispatch, expert_id) {
    return ((dispatch) => {
        dispatch({
            type: Type.EXPERT_LOADED_FROM_API_IN_PROCESS
        });
        const axios = new AxiosHelper();
        return axios.setUrl(`/experts/${expert_id}`)
            .request()
            .then((result) => {
                return dispatch(
                    {
                        type: Type.EXPERT_LOADED_FROM_API_SUCCESS,
                        payload: result.data
                    }
                );
            }, (err) => dispatch({
                type: Type.EXPERT_LOADED_FROM_API_ERROR
            }))
    })(dispatch)
}