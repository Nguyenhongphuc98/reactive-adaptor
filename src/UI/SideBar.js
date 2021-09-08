
import { useState } from 'react';
import Category from './Category';
import ConvList from './ConvList';

const SideBar = (props) => {
    const {chatController} = props;
    const [appState, setAppState] = useState({
        isLoading: true,
        activeCategory: "normal"
      });
    
      const changeCategory = (cate) => {
        setAppState({
          ...appState,
          activeCategory: cate
        })
      }

      console.log('render SideBar');
    return (
        <div className="side-bar">
          <div className ="category">
            <Category name={"normal"} active={appState.activeCategory === "normal"} handle={changeCategory}/>
            <Category name={"importance"} active={appState.activeCategory === "importance"} handle={changeCategory}/>
          </div>
          <ConvList name={appState.activeCategory} controller={chatController}/>
        </div>
    );
};

export default SideBar;