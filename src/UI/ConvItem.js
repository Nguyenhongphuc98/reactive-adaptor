import React from 'react';
import { useItem } from '../reactive';

const ConvItem = (props) => {
    const {id, controller} = props;
    const itemName = useItem("ChatManager", id, item => item.name);
    const activeItem = useItem("ChatManager", "currentConv", {equalityFn :(l,r) => l!==id && r!==id});

    const itemClicked = (e) => {
        console.log("item click");
        e.preventDefault();
        controller.changeConv(id)
    }

    const changeList = (e) => {
        console.log("change list req");
        e.preventDefault();
        controller.changeList(id)
    }

    const remove = (e) => {
        console.log("item remove req");
        e.preventDefault();
        controller.removeItem(id);
    }

    console.log('render ConvItem', itemName);
    return (
        <div className={`conv-item ${activeItem === id ? " conv-active" : ""}`}>
            <p  onClick={itemClicked}>{itemName}</p>
            <button className="impo" onClick={changeList}>~</button>
            <button className="impo" onClick={remove}>x</button>
        </div>
    );
};

export default React.memo(ConvItem);