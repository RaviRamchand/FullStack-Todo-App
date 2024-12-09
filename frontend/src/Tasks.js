import { useState, useEffect } from "react";
import DisplayTasks from "./DisplayTasks";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const[list, setList] = useState(true); 
    const[grid, setGrid] = useState(false);


    useEffect(() => {
        fetch("http://localhost:4000/")
            .then(res => res.json())
            .then(data => setTasks(data))
    }, []);

    function setGridView(){
        setGrid(true); 
        setList(false);
    }

    function setListView(){
        setList(true); 
        setGrid(false)
    }


    console.log(tasks);

    const display = tasks.map((t) => <DisplayTasks key={t.id} {...t} />);

    return (
        <div className="text-center">
            <h1 className="text-3xl mb-2 underline">TO DO'S</h1>

            <p className="mt-3 mb-3"><a href="/sortTasksDesc" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sort Newest First</a></p>

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

export default Tasks;