import { useState, useEffect } from "react";
import DisplayTasks from "./DisplayTasks";

function SortTasksDesc() {
    const [task, setTask] = useState([]);
    const [list, setList] = useState(true);
    const [grid, setGrid] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/sortNewest")
            .then(res => res.json())
            .then(data => setTask(data))
    }, []);

    const display = task.map((t) => <DisplayTasks key={t.id} {...t} />)

    function setGridView() {
        setGrid(true);
        setList(false);
    }

    function setListView() {
        setList(true);
        setGrid(false)
    }


    return (
        <div className="text-center">
            <h1 className="text-3xl mb-2 underline">TO DO'S</h1>
            <p className="mt-3 mb-3"><a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sort Oldest First</a></p>

            <div className="flex justify-end gap-2 me-2">
                <button onClick={setListView}>List View</button>
                <button onClick={setGridView}>Grid View</button>
            </div>

            <div className="mb-2">
                {grid ? (<p className="grid grid-cols-4">{display}</p>) : <p>{display}</p>}
            </div>

            <button class="dark:bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-grat-800 rounded">
                <a href="/createTask">ADD TASK</a>
            </button>

        </div>
    );
}

export default SortTasksDesc; 