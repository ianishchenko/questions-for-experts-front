import React from "react";
import {
    categoryActions,
} from 'Actions/category';
import {connect} from 'react-redux';
import CategoriesList from './CategoriesList';

class CategoriesBlock extends React.Component {
    componentWillMount() {
        this.props.loadCategoriesAction();
    }

    render() {
        return <div>
            <h2 className="post-title">
                We have experts on such categories:
            </h2>
            <div className="text-left">
                <CategoriesList categories={this.props.categories}/>
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        categories: store.category.categories,
        loading: store.category.categories_loaded_from_api_in_process
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadCategoriesAction: categoryActions.loadCategoriesAction.bind(null, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBlock);