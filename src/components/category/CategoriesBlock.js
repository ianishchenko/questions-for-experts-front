import React, {PureComponent} from "react";
import {
    categoryActions,
} from 'Actions/category';
import {connect} from 'react-redux';
import CategoriesList from './CategoriesList';
import PropTypes from 'prop-types';

class CategoriesBlock extends PureComponent {

    static propTypes = {
        loadCategoriesAction: PropTypes.func,
        categories: PropTypes.array,
        loading: PropTypes.bool
    };

    componentWillMount() {
        this.props.loadCategoriesAction();
    }

    render() {
        const {loading, categories} = this.props;
        return <div>
            <h2 className="post-title">
                We have experts on such categories:
            </h2>
            <div className="text-left">
                <CategoriesList categories={categories}/>
                {loading === true && <div className="loading">Loading...</div>}
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    const {category} = store;
    return {
        categories: category.categories,
        loading: category.categories_loaded_from_api_in_process
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadCategoriesAction: categoryActions.loadCategoriesAction.bind(null, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBlock);