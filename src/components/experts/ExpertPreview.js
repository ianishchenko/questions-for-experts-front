import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ExpertPreview extends Component {

    static propTypes = {
        expert: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            url: `/experts/${this.props.expert.id}`
        }
    }

    render() {
        const {expert: {first_name, last_name, small_description}} = this.props;
        return (
            <div className="row">
                <div className="col-md-push-3 col-md-6 text-center">
                    <Link to={this.state.url}>
                        <div className="h2">{first_name} {last_name}</div>
                        <div className="h4">{small_description}</div>
                    </Link>
                </div>

            </div>
        )
    }
}
