import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface Task {
  name: string,
  done: boolean
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  }

  const addTask = (name: string) :void => {
    const newTasks: Task[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  const toggleDoneTask = (index: number): void => {
    const newTasks: Task[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  const removeTask = (index: number) => {
    const newTasks: Task[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  onChange={e => setNewTask(e.target.value)} 
                  value={newTask} className='form-control' 
                  autoFocus={true}
                  ref={taskInput}
                />

                <button className='btn btn-success btn-block mt-2'>
                  Save
                </button>
              </form>
            </div>
          </div>

          {
            tasks.map((task: Task, index: number) => (
              <div className='card card-body mt-2' key={index}>
                <h2 style={{textDecoration: task.done ? 'line-through' : ''}}>{task.name}</h2>

                <div>
                  <button className='btn btn-secondary' onClick={() => toggleDoneTask(index)}>
                    {task.done ? '✓' : '✗'}
                  </button>

                  <button className='btn btn-danger ml-2' onClick={() => removeTask(index)}>
                    🗑
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;