import React,{useRef} from "react";

export default function useContentFiller(){
    const viewPortRef = useRef();
    const contentRef = useRef();
    function fillContentInViewPort(content, viewPort) {
        const {offsetWidth: viewPortWidth, offsetHeight: viewPortHeight} = viewPort;
        const {offsetWidth: contentWidth, offsetHeight: contentHeight} = content;
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
    return {
        viewPortRef,
        contentRef,
        adjustContentSize : () => fillContentInViewPort(contentRef.current,viewPortRef.current)
    }
}
