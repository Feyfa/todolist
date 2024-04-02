import moveIcon from "../assets/move.png";
import deleteIcon from "../assets/delete.png";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ id, value, onSpanCLick, onTextAreaChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    function handleSpanOnCLick() {
        onSpanCLick(id);
    }

    function handleCheckboxOnChange(event) {
        const divParent = event.target.parentElement;
        const textArea = event.target.nextElementSibling;
        
        if(event.target.checked) {
            divParent.classList.add('opacity-80');

            divParent.classList.remove('bg-white');
            divParent.classList.add('bg-[rgba(0,0,0,.3)]');

            textArea.classList.add('line-through');
        }
        else {
            divParent.classList.remove('opacity-80');
            
            divParent.classList.remove('bg-[rgba(0,0,0,.3)]');
            divParent.classList.add('bg-white');

            textArea.classList.remove('line-through');
        }
    }

    function handleTextAreaOnChange(event) {
        onTextAreaChange(id, event.target.value);
    }

    return (
        <div style={style} className="border border-gray-500 bg-white flex justify-between items-center gap-x-4 p-5 rounded">
            <img ref={setNodeRef} {...attributes} {...listeners} src={moveIcon} alt="menu" className="w-[20px] h-[20px] cursor-move touch-none" />
            <input onChange={handleCheckboxOnChange} type="checkbox" className="border border-black inline-block w-5 h-5" />
            <textarea value={value} onChange={handleTextAreaOnChange} rows="1" className="flex-grow-[7] resize-none outline-none bg-transparent" />
            <img onClick={handleSpanOnCLick} src={deleteIcon} alt="delete" className="w-[25px] h-[25px] cursor-pointer" />
        </div>
    )
}

Task.propTypes = {
    id: PropTypes.number,
    value: PropTypes.string,
    onSpanCLick: PropTypes.func,
    onTextAreaChange: PropTypes.func
}