import React from 'react';
import { useList } from '../reactive';

const TodoHeader = (props) => {

    // const total = useList('todo', props.list, {equalityFn: (l,r) => {console.log('comparefn calle');return false}});
    const total = useList('todo', props.list, lists => 100,{getOption: {m:102}});
    console.log('render header', props.list);
    return (
        <div>
            {`${props.list} (${total})`}
        </div>
    );
};

export default TodoHeader;