import React, { useState } from "react";

const Counter =()=>{
    const[count,setCount] =useState(0);


return (
    <>
    <div>
        <h1>Counter</h1>
        <p>Count:{count}</p>
        <div>
            <button onClick={()=>setCount((prev=>prev+1))} >INCREMENT</button>
            <button onClick={()=>setCount((prev=>prev-1))}>DECREMENT</button>
        </div>
    </div>
    </>
)
}
export default Counter