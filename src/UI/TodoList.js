import React from 'react';
import { useList } from '../reactive';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';


const List = (props) => {

    const list = useList('todo', props.type);
    console.log(`render Lists -${props.type}`, list);
    return (
        <div>
            {list.map(item => <TodoItem key={item} tid={item}/>)}
        </div>
    );
};

const TodoList = (props) => {

    console.log(`render TODO List -${props.type}`);
    return (
        <div>
            <TodoHeader list = {props.type}/>
            <List type = {props.type}/>
        </div>
    );
};

export default TodoList;