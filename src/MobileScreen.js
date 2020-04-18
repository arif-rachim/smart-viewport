import React, {useReducer} from "react";

const DEFAULT_STATE = {
    numberOfBoxes : 4,
    mainBox : 1
};
const reducer = (state,action) => {
    switch (action.type) {
        case 'update-boxes' :
            return {...state,numberOfBoxes : action.value}
    }
    return state;
}
export default function MobileScreen(){
    const [state,dispatch] = useReducer(reducer,DEFAULT_STATE);
    const arrayOfBoxes = [];
    for (let i = 0; i <state.numberOfBoxes ; i++) {
        arrayOfBoxes.push(i);
    }
    return <div style={{border:'1px solid red',height:'100%',boxSizing:'border-box',position:'relative'}}>
        {arrayOfBoxes.map((i)=> {
            return <div key={i} style={{
                backgroundColor:'blue',
                padding:'1rem',
                display:'inline-block',
                position:'absolute'}}>Tahi</div>
        })}

        <div style={{position:'absolute',top:10,left:10,display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex'}}>
                <div style={{width:120}}>Number of Box</div>
                <input type="number" value={state.numberOfBoxes} onChange={(e) => dispatch({type:'update-boxes',value:e.target.value})}/>
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:120}}>Main Box</div>
                <input type="number" />
            </div>
        </div>
    </div>
}
