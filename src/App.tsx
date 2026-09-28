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
       estimatedTime: 20,
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
      estimatedTime: 10,
    },
  ])

  const [openTaskId, setOpenTaskId] = useState<number | null>(null)

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
        <div key={task.id} className="task-card">
          <h3>{task.name}</h3>
          <p>{task.frequency}</p>
          <p>Estimated time: {task.estimatedTime} min</p>
          <p>{task.completed ? 'Completed' : 'Not completed'}</p>

          <div className="task-actions">
            <button
              onClick={() =>
                setOpenTaskId(openTaskId === task.id ? null : task.id)
              }
            >
              {openTaskId === task.id ? 'Hide details' : 'Show details'}
            </button>

            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </div>

          {openTaskId === task.id && (
            <div className="task-details">
              <h4>Instructions</h4>
              <ul>
                {task.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>

              <h4>Supplies</h4>
              <ul>
                {task.supplies.map((supply) => (
                  <li key={supply}>{supply}</li>
                ))}
              </ul>

              <h4>Location</h4>
              <p>{task.supplyLocation}</p>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default App