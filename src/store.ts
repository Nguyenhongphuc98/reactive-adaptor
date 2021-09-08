import {createStore, combineReducers} from 'redux';
import { reactiveAdaptor, configStore } from './reactive';
import  chatManager  from './manager/chat-manager';
import groupChatManager from './manager/group-chat-manager';
import friendChatManager from './manager/friend-chat-manager';

reactiveAdaptor.registerDataManager(chatManager);
reactiveAdaptor.registerDataManager(groupChatManager);
reactiveAdaptor.registerDataManager(friendChatManager);

const raReducer = reactiveAdaptor.createReducer();

const rootReducer = combineReducers({...raReducer});

export const store = createStore(rootReducer);
configStore(store);
