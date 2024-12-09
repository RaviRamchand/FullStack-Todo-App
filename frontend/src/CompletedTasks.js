import { useEffect, useState } from "react";
import DisplayCompletedTasks from "./DisplayCompletedTasks";

function CompletedTasks() {

    const [completedTasks, setCompletedTasks] = useState([]);
    const [list, setList] = useState(true);
    const [grid, setGrid] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/completedTasks")
            .then(res => res.json())
            .then(data => setCompletedTasks(data))
    })

    function setGridView() {
        setGrid(true);
        setList(false);
    }

    function setListView() {
        setList(true);
        setGrid(false)
    }

    const compTasks = completedTasks.map((c) => <DisplayCompletedTasks key={c.id} {...c} />)

    return (
        <div>
            <h1 className="text-3xl mb-2 underline text-center">COMPLETED TASKS</h1>
            <div className="flex justify-end gap-2 me-2">
                <button onClick={setListView}>List View</button>
                <button onClick={setGridView}>Grid View</button>
            </div>

            <div className="mb-2">
                {grid ? (<p className="grid grid-cols-4">{compTasks}</p>) : <p>{compTasks}</p>}
            </div>
        </div>
    );
}
export default CompletedTasks;