import React from 'react';
import { useItem } from '../reactive';

const Message = (props) => {
    const {id} = props;
    const content = useItem("ChatManager", id, item => item.content);

    console.log('render Message', content);
    return (
        <div className="message">
            {content}
        </div>
    );
};

export default Message;