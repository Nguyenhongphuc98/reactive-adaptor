import {createStore, combineReducers} from 'redux';
import { reactiveAdaptor, configStore } from './reactive';
import  TodoManager  from './todo-manager';

reactiveAdaptor.registerDataManager(TodoManager);

const raReducer = reactiveAdaptor.createReducer();

const rootReducer = combineReducers({...raReducer});

export const store = createStore(rootReducer);
configStore(store);
TodoManager.fetchTodo();
