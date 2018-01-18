import React, {PureComponent} from "react";
import {
    expertActions,
} from 'Actions/expert';
import {connect} from 'react-redux';
import ExpertAvatar from './ExpertAvatar';
import {API_HOST_FILE_URL} from '../../constants';
import NewQuestion from 'Components/question/NewQuestion';
import authenticatedPageDecorator from 'Decorators/authenticatedPage';
import PropTypes from 'prop-types';

@authenticatedPageDecorator()
class ExpertPage extends PureComponent {

    static propTypes = {
        loadExpertAction: PropTypes.func,
        expert: PropTypes.object.isRequired,
        loading: PropTypes.bool,
        errorFetching: PropTypes.bool
    };

    componentWillMount() {
        this.props.loadExpertAction(this.props.match.params.expert_id);
    }

    render() {
        let avatarUrl = false;
        const {expert: {id, first_name, last_name, category_id, small_description, attachments}, loading, match} = this.props;
        if (id != null) {
            attachments.map((attachment) => {
                if (attachment.is_avatar) {
                    avatarUrl = API_HOST_FILE_URL + attachment.url_path;
                }
                return true;
            });
        }
        return (
            <div className="text-center">
                {loading === true && <div className="loading">Loading...</div>}
                {avatarUrl ? <ExpertAvatar url={avatarUrl}/> : ''}
                <div>{first_name} {last_name}</div>
                <div className="expert-description">{small_description}</div>
                <NewQuestion expert_id={parseInt(match.params.expert_id)} category={category_id}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    const {expert} = store;

    return {
        expert: expert.expert,
        loading: expert.expert_loaded_from_api_in_process,
        errorFetching: expert.expert_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadExpertAction: expertActions.loadExpertAction.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertPage);