import React, {PureComponent} from "react";
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import './index.css';

export default class RatingComponent extends PureComponent {

    static propTypes = {
        handleChange: PropTypes.func,
        initialState: PropTypes.number
    };

    render() {
        const {initialState, handleChange} = this.props;
        return <Rating
            emptySymbol="glyphicon glyphicon-star-empty"
            fullSymbol="glyphicon glyphicon-star"
            onChange={handleChange}
            initialRating={initialState}
        />
    }
}