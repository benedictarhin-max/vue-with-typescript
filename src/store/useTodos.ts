import { TodoStatus, type Todo } from '@/types';
import { computed, reactive } from 'vue';

interface TodoStore {
    [TodoStatus.Pending]: Todo[],
    [TodoStatus.InProgress]: Todo[],
    [TodoStatus.Complete]: Todo[],
};

const defaultVal = {
    [TodoStatus.Pending]: [{
        id: 1,
        title: "Learn Vuejs",
        description: "Read the docs",
        status: TodoStatus.Pending,
    }],
    [TodoStatus.InProgress]: [],
    [TodoStatus.Complete]: [],
};

const todoStore = reactive<TodoStore>(defaultVal);

export default ()=> {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => todoStore[todoStatus]);
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
    };

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo);
    };

    const deleteTodo = (todoToDelete: Todo) => {
        todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
            (todo) => todo.id !== todoToDelete.id)
    }
    return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo };
}