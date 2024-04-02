import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Heading from "./components/Heading";
import Input from "./components/Input";
import Column from "./components/Column";
import Task from "./components/Task";

function App() {
    const [tasks, setTasks] = useState([]);

    function handleDragEnd(event) {
        const { active, over } = event;

        if(active.id !== over.id) {
            setTasks(t => {
                const activeIndex = tasks.findIndex(item => item.id === active.id);
                const overIndex = tasks.findIndex(item => item.id === over.id);

                return arrayMove(t, activeIndex, overIndex);
            })
        }
    }

    function handleOnButtonSubmit(newTask) {
        setTasks(t => [
            ...t,
            {
                id: Date.now(),
                task: newTask
            }
        ]);
    }

    function handleOnSpanClick(id) {
        setTasks(t => t.filter(e => e.id !== id));
    }

    function handleOnTextAreaChange(id, newTask) {
        setTasks(t => t.map(item =>
            item.id === id ? 
            {...item, task: newTask} :
            item
        ));
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Heading />
            <Input onButtonSubmit={handleOnButtonSubmit} />

            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <Column>
                    {tasks.length === 0 ? 'Task Empty' : tasks.map((item) => 
                        <Task key={item.id} id={item.id} value={item.task} onSpanCLick={handleOnSpanClick} onTextAreaChange={handleOnTextAreaChange} />
                    )}
                </Column>
            </SortableContext>
        </DndContext>
    )
}

export default App
