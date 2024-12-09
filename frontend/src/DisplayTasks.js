import { useEffect } from "react";


function DisplayTasks(props) {

    const date = new Date(props.date_added);
    const formatDate = date.toLocaleDateString("en-US");


    async function handleButton() {
        try {
            const response = await fetch("http://localhost:4000/completeTask/" + props.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await response;

            if (response.ok) {
                window.location.reload();
            }
            else {
                console.log("error");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch("http://localhost:4000/delete/" + props.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await response;

            if (response.ok) {
                window.location.reload();
            }
            else {
                console.log("error");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="flex justify-center mb-2">
            <div className="max-w-sm w-80 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{props.title.toUpperCase()}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-white text-center">{props.summary}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-white text-center">Created On: {formatDate}</p>

                <button onClick={handleButton} className="dark:bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-gray-800 rounded flex items-center space-x-2">
                    DONE TASK &nbsp; <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <button onClick={handleDelete} className="dark:bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-gray-800 rounded flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="trash">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </button>
            </div>
        </div>


    );
}

export default DisplayTasks;