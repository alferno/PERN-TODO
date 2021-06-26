import React, { Fragment, useState, useEffect } from 'react'

import EditTodo from './EditTodo'

const ListTodo = () => {
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    try {
      const res = await fetch('http://localhost:5000/todos')
      const jsonData = await res.json()

      setTodos(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  //Delete Todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })

      setTodos(todos.filter((todo) => todo.todo_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <Fragment>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
              <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
              </tr>*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListTodo
