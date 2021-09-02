import React from 'react';
import { useItem } from '../reactive';
import todoManager from '../todo-manager';
import { useSelector } from 'react-redux';

const st = {
    backgroundColor: '#4ae19644',
    padding: '5px',
    maxWidth: '200px',
    margin: '2px',
    textAlign: 'center',
    cursor: 'grab'
}

const st2 = {
    backgroundColor: '#4ae19644',
    padding: '5px',
    maxWidth: '200px',
    margin: '2px',
    textAlign: 'center',
    border: 'solid #4b9fe8',
    cursor: 'grab'
}

const TodoItem = (props) => {
    const todo = useItem('todo', props.tid);
    const markComplelte = () => {
        todoManager.markcomplete(todo.tid);
    }
    console.log('render TODO Item', todo);
    return (
        <div style={todo.complete ? st2 : st} onClick={markComplelte}>
            {todo.name}
        </div>
    );
};

export default TodoItem;