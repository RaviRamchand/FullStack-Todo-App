import Tasks from "./Tasks";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header';
import CreateTask from "./CreateTask";
import CompletedTasks from "./CompletedTasks";
import SortTasksDesc from "./SortTasksDesc";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Tasks />}/>
        <Route path="/createTask" element={<CreateTask />}/>
        <Route path="/completedTasks" element={<CompletedTasks/ >}/>
        <Route path="/sortTasksDesc" element={<SortTasksDesc/ >}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
