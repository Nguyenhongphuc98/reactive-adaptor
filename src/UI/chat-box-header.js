import React, { useState } from 'react';
import { useItem } from '../reactive';

const ChatBoxHeader = (props) => {
    const { id, controller } = props;
    const itemName = useItem("ChatManager", id, item => item.name);

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {

        if (edit) {
            // save
            const text = document.getElementById("iptt").value;
            controller.updateConvtitle(text);
            document.getElementById("iptt").value = "";
        }
        setEdit(!edit);
    }

    console.log('render ChatBoxHeader', itemName);
    return (
        <div className="chat-header">
            {edit ? <input id="iptt" placeholder={itemName}></input> : itemName}
            <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
        </div>
    );
};

export default ChatBoxHeader;