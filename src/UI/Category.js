import React from 'react';
import { useList } from '../reactive';

const Category = (props) => {
    const {name, active, handle} = props;
    const total = useList("ChatManager", name, lists => lists.length, {equalityFn: (l,r) => l === r});

    console.log('render Category', name);
    return (
        <div className={`category-item ${active ? "active" : ""}`} onClick={() => handle(name)}>
            {`${name}(${total})`}
        </div>
    );
};

export default Category;