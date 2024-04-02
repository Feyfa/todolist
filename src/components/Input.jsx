import PropTypes from "prop-types"
import { useState } from "react"

export default function Input({ onButtonSubmit }) {

    const [input, setInput] = useState(""); 

    function handleInputOnChange(event) {  
        setInput(event.target.value);
    }
    
    function handleButtonOnCLick() {
        if(!input) return;

        onButtonSubmit(input);

        setInput("");

        document.querySelector('input').focus();
    }

    return (
        <div className="p-3 flex gap-x-3">
            <input type="text" className="w-[70vw] p-3 border border-gray-500 outline-none rounded text-xl font-normal sm:w-[80vw]" value={input} onChange={handleInputOnChange} />
            <button onClick={handleButtonOnCLick} className="w-[30vw] border border-gray-500 bg-blue-500 text-gray-50 text-xl rounded sm:w-[20vw]">Add Task</button>
        </div>
    )
}

Input.propTypes = {
    onButtonSubmit: PropTypes.func
}