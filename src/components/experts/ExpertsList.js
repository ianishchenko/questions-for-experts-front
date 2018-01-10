import React, {Component} from 'react';
import ExpertPreview from './ExpertPreview';
import PropTypes from 'prop-types';

export default class ExpertsList extends Component {

    static propTypes = {
        experts: PropTypes.array
    };

    render() {
        const {experts} = this.props;
        return (
            <div>
                {experts.map(expert => {
                    return <ExpertPreview key={expert.id} expert={expert}/>
                })}
            </div>
        );
    }
}