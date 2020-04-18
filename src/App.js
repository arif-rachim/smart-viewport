import React, {useEffect, useReducer, useRef} from 'react';

const DEFAULT_STATE = {
    contentWidth : 320,
    contentHeight : 640,
    viewPortWidth : 160,
    viewPortHeight : 160
};

const reducer = (state,action) => {
    return state;
};

function fillContentInViewPort(content, viewPort) {
    const {width:viewPortWidth,height:viewPortHeight} = viewPort;
    const {width:contentWidth,height:contentHeight} = content;
    const viewPortPortrait = viewPortHeight > viewPortWidth;
    const contentPortrait = contentHeight > contentWidth;
    // the idea is we need to fill the content against viewport
    // lets find the appropriate scale
    // the appopritate scale is the minimumSize of viewport to minimumSize of content
    const scale = contentPortrait ? (viewPortWidth / contentWidth) : (viewPortHeight / contentHeight);
    return {
        width : contentWidth * scale,
        height : contentHeight * scale
    };
}

export default function App(){
    const [state,dispatch] = useReducer(reducer,DEFAULT_STATE);
    const content = {width:state.contentWidth,height:state.contentHeight};
    const viewPort = {width:state.viewPortWidth,height:state.viewPortHeight};
    const viewPortRef = useRef();
    const contentRef = useRef();



    useEffect(() => {
        viewPortRef.current.setAttribute('style',`width:${viewPort.width}px;height:${viewPort.height}px`);
        contentRef.current.setAttribute('style',`width:${content.width}px;height:${content.height}px`);
    },[]);

    function updatePosition() {
        const {offsetWidth:viewPortWidth,offsetHeight:viewPortHeight} = viewPortRef.current;
        const {offsetWidth:contentWidth,offsetHeight:contentHeight} = contentRef.current;

        const newContent = fillContentInViewPort({width:contentWidth,height:contentHeight},{width:viewPortWidth,height:viewPortHeight});
        contentRef.current.setAttribute('style',`width:${newContent.width}px;height:${newContent.height}px`);
    }

    return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        <div ref={viewPortRef} className={'viewport'} >
            <div className={'content'} ref={contentRef}></div>
        </div>

        <div style={{position:'absolute',top:10,right:10}}>
            <button onClick={() => updatePosition()}>Update</button>
        </div>
    </div>
}
