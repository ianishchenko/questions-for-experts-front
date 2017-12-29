import React from 'react';
import {Link} from 'react-router-dom';

class ExpertPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `/experts/${this.props.expert.id}`
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-push-3 col-md-6 text-center">
                    <Link to={this.state.url}>
                        <div className="h2">{this.props.expert.first_name} {this.props.expert.last_name}</div>
                        <div className="h4">{this.props.expert.small_description}</div>
                    </Link>
                </div>

            </div>
        )
    }
}

export default ExpertPreview;