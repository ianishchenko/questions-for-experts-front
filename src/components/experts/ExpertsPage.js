import React, {Component} from "react";
import {
    expertsActions,
} from 'Actions/experts';
import {connect} from 'react-redux';
import ExpertsList from './ExpertsList';
import FiltersBlock from './FiltersBlock';
import authenticatedPageDecorator from 'Decorators/authenticatedPage';
import PropTypes from 'prop-types';

@authenticatedPageDecorator()
class ExpertsPage extends Component {

    static propTypes = {
        loadExpertsAction: PropTypes.func,
        experts: PropTypes.array,
        loading: PropTypes.bool,
        errorFetching: PropTypes.bool
    };

    componentWillMount() {
        this.props.loadExpertsAction(this.props.match.params.category_id);
    }

    render() {
        const {loading, errorFetching, experts} = this.props;
        return (
            <div className="page container text-center">
                {errorFetching || !experts.length ?
                    (<div>Empty list</div>) :
                    (
                        <div>
                            <FiltersBlock/>
                            <ExpertsList experts={experts}/>
                        </div>
                    )
                }
                {loading === true && <div className="loading">Loading...</div>}
            </div>);
    }
}

const mapStateToProps = (store) => {
    const {experts} = store;
    return {
        experts: experts.experts,
        loading: experts.experts_loaded_from_api_in_process,
        errorFetching: experts.experts_loaded_from_api_error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadExpertsAction: expertsActions.loadExpertsAction.bind(null, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpertsPage);