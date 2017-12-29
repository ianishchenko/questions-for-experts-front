import React from "react";
import {
    expertsActions,
} from '../../actions/experts';
import {connect} from 'react-redux';
import ExpertsList from './ExpertsList';
import FiltersBlock from './FiltersBlock';

class ExpertsPage extends React.Component {
    componentWillMount() {
        this.props.loadExpertsAction(this.props.match.params.category_id);
    }

    render() {
        return (
            <div className="text-center">
                {this.props.errorFetching || !this.props.experts.length ?
                    (<div>Empty list</div>) :
                    (
                        <div>
                            <FiltersBlock/>
                            <ExpertsList experts={this.props.experts}/>
                        </div>
                    )
                }
            </div>);
    }
}

const mapStateToProps = (store) => {
    return {
        experts: store.experts.experts,
        loading: store.experts.experts_loaded_from_api_in_process,
        errorFetching: store.experts.experts_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadExpertsAction: expertsActions.loadExpertsAction.bind(null, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertsPage);