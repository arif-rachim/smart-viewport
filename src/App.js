import React, {useReducer} from 'react';

const DEFAULT_STATE = {
    contentWidth : 320,
    contentHeight : 640,
    viewPortWidth : 320,
    viewPortHeight : 320
};

const reducer = (state,action) => {
    return state;
};

function fillContentInViewPort(content, viewPort) {
    // viewPort is always the right position !
    return undefined;
}

export default function App(){
    const [state,dispatch] = useReducer(reducer,DEFAULT_STATE);
    const content = {width:state.contentWidth,height:state.contentHeight};
    const viewPort = {width:state.viewPortWidth,height:state.viewPortHeight};
    const newContent = fillContentInViewPort(content,viewPort);
    return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className={'viewport'} style={{width:state.viewPortWidth,height:state.viewPortHeight}} >
            <div className={'content'} style={{width:state.contentWidth,height:state.contentHeight}}></div>
        </div>
    </div>
}
