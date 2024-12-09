import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function CreateTask() {
    const navigate = useNavigate();
    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " "); //Date and Time

    const [data, setData] = useState({ taskName: "", taskSummary: "", taskDate: currentDateTime });


    function handleChange(event) {
        setData(prevData => {
            return {
                ...prevData, [event.target.name]: event.target.value
            }
        })
    }

    async function submitHandle(event) {
        event.preventDefault();

        const jsonData = JSON.stringify(data);

        try {
            const response = await fetch("http://localhost:4000/addTodo", {
                method: "POST",
                body: jsonData,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response;

            if (response.ok) {
                navigate("/")
            }
            else {
                const errorMessage = await response.text();
                console.error('Failed to submit data', response.status, response.statusText, errorMessage);
            }
        } catch (error) {
            console.log("error " + error);
        }
    }

    return (
        <div>
            <h1 className="text-center text-4xl underline">Create Task</h1>

            <form method="post" onSubmit={submitHandle}>
                <span className="flex justify-center">
                    <input onChange={handleChange} name="taskName" className="block p-2.5 w-6/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3 mb-3" placeholder="Task Name..." autoComplete="off" />
                </span>
                <span className="flex justify-center">
                    <textarea onChange={handleChange} name="taskSummary" rows="4" className="block p-2.5 w-6/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task Summary..."></textarea>
                </span>
                <span className="flex justify-center mt-3">
                    <input type="submit" value="Add Task" className="dark:bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-grat-800 rounded"/>
                </span>
            </form>
        </div>
    );
}
export default CreateTask;