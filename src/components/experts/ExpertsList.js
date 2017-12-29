import React from 'react';
import ExpertPreview from './ExpertPreview';

class ExpertsList extends React.Component {
    render() {
        return (
            <div>
                {this.props.experts.map(expert => {
                    return <ExpertPreview key={expert.id} expert={expert}/>
                })}
            </div>
        );
    }
}

export default ExpertsList;