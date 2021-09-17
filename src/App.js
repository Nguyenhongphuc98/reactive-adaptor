import { useState, useEffect } from 'react';
import ChatBoxView from './UI/chat-box-view';

import "./index.css";
import SideBar from './UI/side-bar';
import appInstance from './chat-application';
import Loader from './UI/loader';

function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appInstance.chatController.init()
            .then(v => {
                setLoading(false);
            })
    }, []);

    const renderContent = () => {
        return (
            <div className="app-content">
                <SideBar chatController={appInstance.chatController} />
                <ChatBoxView />
            </div>
        )
    }

    console.log('App render...............');
    return (
        <div className="app">
            {loading ? <Loader /> : renderContent()}
        </div>
    );
}

export default App;
