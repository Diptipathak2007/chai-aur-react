import React, { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
    const [todoInput, setTodoInput] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        const trimmed = todoInput.trim();
        if (!trimmed) return;

        addTodo(trimmed); // we pass a string — rest is handled in App.jsx
        setTodoInput("");
    };

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
            />
            <button
                type="submit"
                className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;





