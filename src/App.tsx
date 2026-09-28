import { useState } from 'react'
import type { Task } from './types/Task'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: 'Clean bathroom',
      id: 1,
      frequency: 'Weekly',
      completed: false,
      instructions: [
        'Clean sink',
        'Clean toilet',
        'Wipe mirror',
        'Mop floor',
      ],
      supplies: [
        'Bathroom cleaner',
        'Cloth',
        'Mop',
      ],
      supplyLocation: 'Utility room',
    },
    {
      name: 'Empty kitchen bins',
      id: 2,
      frequency: 'Daily',
      completed: false,
      instructions: [
        'Remove full bin bag',
        'Replace with a new bag',
        'Take rubbish to the correct container',
      ],
      supplies: [
        'Bin bags',
      ],
      supplyLocation: 'Kitchen cupboard',
    },
  ])
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }
  return (
    <>
      <h1>House Tasks</h1>
      <h2>Today's Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.frequency}</p>
          <p>{task.completed ? 'Completed' : 'Not completed'}</p>

          <button onClick={() => toggleTask(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      ))}
    </>
  )
}

export default App