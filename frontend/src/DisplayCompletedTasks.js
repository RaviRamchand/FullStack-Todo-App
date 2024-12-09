function DisplayCompletedTasks(props) {
    const completedTime = new Date(props.date_completed).toISOString().slice(0, 10);

    return (
        <div className="flex justify-center mb-2">
            <div className="max-w-sm w-80 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{props.title.toUpperCase()}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-white text-center">{props.summary}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-white text-center">Completed On: {completedTime}</p>            
            </div>
        </div>
    );
}
export default DisplayCompletedTasks;