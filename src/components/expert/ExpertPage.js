import React from "react";
import {
    expertActions,
} from '../../actions/expert';
import {connect} from 'react-redux';
import ExpertAvatar from './ExpertAvatar';
import {API_HOST_FILE_URL} from '../../config';
import NewQuestion from '../question/NewQuestion';

class ExpertPage extends React.Component {
    componentWillMount() {
        this.props.loadExpertAction(this.props.match.params.expert_id);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.expert.id !== null;
    }

    render() {
        let avatarUrl = false;

        if(this.props.expert.id != null){
            this.props.expert.attachments.map((attachment) => {
                if(attachment.is_avatar){
                    avatarUrl = API_HOST_FILE_URL+attachment.url_path;
                }
            });
        }
        return (
            <div className="text-center">
                {avatarUrl?<ExpertAvatar url={avatarUrl}/>:''}
                <div>{this.props.expert.first_name} {this.props.expert.last_name}</div>
                <div className="expert-description">{this.props.expert.small_description}</div>
                <NewQuestion expert_id={this.props.match.params.expert_id} category={this.props.expert.category_id}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        expert: store.expert.expert,
        loading: store.expert.expert_loaded_from_api_in_process,
        errorFetching: store.expert.expert_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadExpertAction: expertActions.loadExpertAction.bind(null, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertPage);