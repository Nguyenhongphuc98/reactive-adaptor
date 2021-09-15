
import { memo } from 'react';
import { useItem } from '../reactive';

const Message = (props) => {
    const { id } = props;
    const content = useItem("ChatManager", id, item => item.content, {equalityFn: (l,r) => l === r});

    console.log('render Message', content);
    return (
        <div className="message">
            {content}
        </div>
    );
};

export default memo(Message);