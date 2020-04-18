import React, {useEffect, useReducer, useRef} from 'react';
import Slider from "@material-ui/core/Slider";

const DEFAULT_STATE = {
    contentWidth: 320,
    contentHeight: 320,
    viewPortWidth: 160,
    viewPortHeight: 160
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'viewport-width-update' : {
            return {...state, viewPortWidth: action.value}
        }
        case 'viewport-height-update' : {
            return {...state, viewPortHeight: action.value}
        }
        case 'content-width-update' : {
            return {...state, contentWidth: action.value}
        }
        case 'content-height-update' : {
            return {...state, contentHeight: action.value}
        }
    }
    return state;
};

function fillContentInViewPort(content, viewPort) {
    const {offsetWidth: viewPortWidth, offsetHeight: viewPortHeight} = viewPort;
    const {offsetWidth: contentWidth, offsetHeight: contentHeight} = content;
    const viewPortPortrait = viewPortHeight > viewPortWidth;
    const contentPortrait = contentHeight > contentWidth;
    const scaleX = viewPortWidth / contentWidth;
    const scaleY = viewPortHeight / contentHeight;
    const scale = Math.max(scaleX,scaleY);
    const newContentWidth = contentWidth * scale;
    const newContentHeight = contentHeight * scale;
    const top = (viewPortHeight - newContentHeight)  / 2;
    const left = (viewPortWidth - newContentWidth) / 2;
    content.setAttribute('style', `
        width:${newContentWidth}px;
        height:${newContentHeight}px;
        top:${top}px;
        left:${left}px;
        position:absolute;
        transition:all 300ms ease-in-out;
    `);
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const content = {width: state.contentWidth, height: state.contentHeight};
    const viewPort = {width: state.viewPortWidth, height: state.viewPortHeight};
    const viewPortRef = useRef();
    const contentRef = useRef();
    const contentSizeRef = useRef();
    contentSizeRef.current = content;

    function updateContentSize() {
        contentRef.current.setAttribute('style', `width:${contentSizeRef.current.width}px;height:${contentSizeRef.current.height}px`);
    }

    useEffect(() => {
        updateContentSize();
    }, []);

    useEffect(() => {
        viewPortRef.current.setAttribute('style', `width:${viewPort.width}px;height:${viewPort.height}px`);
    }, [viewPort]);

    function updatePosition() {
        fillContentInViewPort(contentRef.current, viewPortRef.current);
    }


    return <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    }}>
        <div ref={viewPortRef} className={'viewport'}>
            <div className={'content'} ref={contentRef}></div>
        </div>

        <div style={{position: 'absolute', top: 10, left: 10, width: 200}}>
            <div style={{display: 'flex'}}>
                <div style={{width: 100}}>
                    Width
                </div>
                <Slider min={0} max={800} value={viewPort.width}
                        onChange={(event, value) => dispatch({type: 'viewport-width-update', value})}/>
                {viewPort.width}
            </div>
            <div style={{display: 'flex'}}>
                <div style={{width: 100}}>
                    Height
                </div>
                <Slider min={0} max={800} value={viewPort.height}
                        onChange={(event, value) => dispatch({type: 'viewport-height-update', value})}/>
                {viewPort.height}
            </div>
            <button onClick={() => updatePosition()}>Update</button>
            <br/>
            <div style={{display: 'flex'}}>
                <div style={{width: 100}}>
                    Width
                </div>
                <Slider min={0} max={800} value={content.width}
                        onChange={(event, value) => dispatch({type: 'content-width-update', value})}/>
                {content.width}
            </div>
            <div style={{display: 'flex'}}>
                <div style={{width: 100}}>
                    Height
                </div>
                <Slider min={0} max={800} value={content.height}
                        onChange={(event, value) => dispatch({type: 'content-height-update', value})}/>
                {content.height}
            </div>
            <button onClick={() => updateContentSize()}>Update Content</button>
        </div>
    </div>
}
