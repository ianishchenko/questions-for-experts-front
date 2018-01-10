import React, {PureComponent} from 'react';
import Rating from 'Components/rating/RatingComponent';
import {connect} from 'react-redux';
import {
    questionActions,
} from 'Actions/questions';
import PropTypes from 'prop-types';

class AnswerPreview extends PureComponent {

    static propTypes = {
        changeAnswer: PropTypes.func,
        answer: PropTypes.object.isRequired,
        loading: PropTypes.bool
    };

    handleChangeRating = (val) => {
        const {answer} = this.props;
        answer.score = val;
        this.props.changeAnswer(answer);
    };

    render() {
        const {answer: {text, score}, loading} = this.props;

        return (
            <div className="row">
                {text}
                <div className="col-md-offset-9 col-md-3">
                    <Rating initialState={parseInt(score)} handleChange={this.handleChangeRating}/>
                </div>
                {loading === true && <div className="loading">Loading...</div>}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    const {questions} = store;

    return {
        loading: questions.answer_change_in_process
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAnswer: questionActions.changeAnswerAction.bind(null, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AnswerPreview);