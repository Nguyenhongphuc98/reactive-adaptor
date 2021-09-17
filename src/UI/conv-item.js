import React from 'react';
import { useItem } from '../reactive';

const ConvItem = (props) => {
    const { id, controller } = props;
    
    const miniConv = useItem("ChatManager", id, item => {
        return {
            convName: item.convName,
            avatar: item.avatar,
            lastMess: item.lastMessage,
            lastDname: item.lastDname
        };
    });

    const activeItem = useItem("ChatManager", "currentConv", {
        equalityFn: (l, r) => (l !== id && r !== id) || l === r
    });

    const itemClicked = (e) => {
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

    console.log('render ConvItem', miniConv);
    return (
        <div className={`conv-item ${activeItem === id ? " conv-active" : ""}`}>
            <img src={miniConv.avatar} alt={miniConv.convName} />
            <div onClick={itemClicked}>
                <p><b>{miniConv.convName}</b></p>
                <p> {`${miniConv.lastDname ? miniConv.lastDname +":": ""} ${miniConv.lastMess}`}</p>
            </div>
            <button className="impo" onClick={changeList}>~</button>
            <button className="impo" onClick={remove}>x</button>
        </div>
    );
};

export default React.memo(ConvItem);