
import { useList } from '../reactive';
import ConvItem from './conv-item';

const ConvList = (props) => {
    const { name, controller } = props;
    const list = useList("ChatManager", name);

    console.log('render ConvList', name);
    return (
        <div className="list">
            {list.map(iid => <ConvItem key={iid} id={iid} controller={controller} />)}
        </div>
    );
};

export default ConvList;