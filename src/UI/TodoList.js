import React from 'react';
import { useList } from '../reactive';
import TodoItem from './TodoItem';



const TodoList = (props) => {

    const list = useList('todo', props.type);
    console.log(`render TODO List -${props.type}`, list);
    return (
        <div>
            <h3>{props.type}</h3>
            {list.map(item => <TodoItem key={item} tid={item}/>)}
        </div>
    );
};

export default TodoList;