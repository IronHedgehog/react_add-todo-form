import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import TodoAddForm from './components/TodoAddForm/TodoAddFrom';
import { TodoList } from './components/TodoList';
import { getUserById } from './helpers/getUserById';
import { Todo } from './types/todos';

const updateTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || undefined,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(updateTodos);

  const addNewTodo = (newTodo: Todo): void => {
    const todo = {
      ...newTodo,
      id: Math.max(...todos.map(todod => todod.id)) + 1,
    };

    setTodos(prev => [...prev, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoAddForm addTodo={addNewTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
