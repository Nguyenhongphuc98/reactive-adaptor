import { useState, useEffect } from 'react';
import ChatController from './controller/chat-controller';
import ChatBoxView from './UI/ChatBoxView';

import "./index.css";
import SideBar from './UI/SideBar';


function App() {

  const [loading, setLoading] = useState(true);

  const chatController = new ChatController();

  useEffect(() => {
  chatController.init()
    .then(v => {
       setLoading(false);
    })
}, []);

  console.log('App render...............');

  const renderContent = () => {
    return (
      <div className="app-content">
        <SideBar chatController = {chatController}/>
        <ChatBoxView/>
      </div>
    )
  }
  return (
    <div className="app">
      {loading ? <h1>Loading...</h1> : renderContent()}
    </div>
  );
}

export default App;
