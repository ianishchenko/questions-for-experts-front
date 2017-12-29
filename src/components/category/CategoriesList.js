import React from 'react';
import Category from './Category';

export default function CategoriesList(props) {
    return (
        <ul>
            {props.categories.map(category => {
                return <Category key={category.id} category={category}/>
            })}
        </ul>
    );
}