import { useEffect, useState } from 'react'
import './App.css'


type ITask = {
  _id: string
  text: string
}


function App() {
  const [text, setText] = useState("")
  const [tasks, setTasks] = useState<ITask[]>([])

  function createTask(text: string) {
    fetch("http://localhost:8000/add", {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST", body: JSON.stringify({
        text: text
      })
    })
      .then(response => response.json())
  }


  function getAllTasks() {
    fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(json => setTasks(json))
  }

  function deleteTask(id: string) {
    fetch(`http://localhost:8000/del/${id}`, { method: "DELETE" })
      .then(response => response.json())
  }

  useEffect(() => {
    getAllTasks()
  }, [tasks])

  return (
    <div className="App">
      <h1>User's tasks</h1>
      <header className="App-header">
        <input type="text" placeholder="Type your tasks here" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => createTask(text)}>Adicionar</button>
      </header>


      {
        tasks.map((task) => {
          return <div key={task._id} className="task">
            <p>{task.text}</p>
            <p>{task._id}</p>
            <p onClick={() => deleteTask(task._id)} className="close">X</p>
          </div>
        })
      }


    </div>
  )
}

export default App
