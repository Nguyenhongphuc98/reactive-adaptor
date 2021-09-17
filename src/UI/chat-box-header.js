import { memo, useState } from 'react';
import { useItem } from '../reactive';

const ChatBoxHeader = (props) => {
    const { id, controller } = props;
    const itemName = useItem("ChatManager", id, item => item ? item.convName : "");

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {

        if (edit) {
            // save
            const text = document.getElementById("iptt").value;
            controller.updateConvName(text);
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

export default memo(ChatBoxHeader);