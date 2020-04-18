import React, {useEffect, useReducer, useRef, useState} from 'react';
import MobileScreen from "./MobileScreen";

function createDiv() {
    const div = document.createElement('div');
    div.innerHTML = `<div style="width: 100%;height:100%;display: flex;align-items: center;justify-content: center">
                <img src="pics.jpg" />
            </div>`;
    return div;
}

export default function App() {
    const [videos,setVideos] = useState([]);
    useEffect(() => {
        const vids = [];
        for (let i = 0; i < 5; i++) {
            vids.push(createDiv());
        }
        setVideos(vids);
    },[]);

    function handleOnAdd() {
        setVideos((vids) => [...vids,createDiv()]);
    }

    function handleOnRemove(){
        setVideos((vids) => {
            return vids.filter((vid,idx) => {
                if(idx === vids.length - 1){
                    return false;
                }
                return true;
            });
        });
    }
    return <div style={{width:'100%',height:'100%',position:'relative'}}>
        <MobileScreen videos={videos}/>
        <div style={{position:'absolute',bottom:10,right:10}}>
            <button onClick={() => handleOnAdd()} style={{fontSize:'2rem'}}>Add Viewport</button>
            <button onClick={() => handleOnRemove()} style={{fontSize:'2rem'}}>Remove Viewport</button>
        </div>
    </div>
}
