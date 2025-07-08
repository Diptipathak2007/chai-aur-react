import { use, useEffect, useState } from "react";
import{ TodoProvider } from "./context/TodoContext";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {
  const [todos, settodos] = useState([]);
  const addTodo = (todo) => {
    settodos((prevTodos) => [
      ...prevTodos,//spreading the previous todos
      { id: Date.now(), todo, completed: false },
    ]);
  }
  const updateTodo = (id, updatedTodo) => {
    settodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: updatedTodo } : todo
      )
    );
  }
  const deleteTodo = (id) => {
    settodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }
  const toggleComplete=(id)=>{
    settodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos&&todos.length>0){
      settodos(todos)
    }
  },[])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className=" fixed inset-0 bg-[#172842] min-h-screen w-screen m-0 p-0">
        <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {
              todos.map((todo)=>(
                <div key={todo.id}
                className="w-full">
                  <TodoItem todo={todo} />

                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
