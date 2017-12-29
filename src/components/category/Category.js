import React from 'react';
import {Link} from 'react-router-dom';

export default function (props) {
    const url = `/categories/${props.category.id}/experts`;
    const title = props.category.title.toUpperCase();
    return (
        <li>
            <Link to={url}>
                {title}
            </Link>
        </li>
    );
}