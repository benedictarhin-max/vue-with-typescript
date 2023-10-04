<script setup lang="ts">
// import { computed } from 'vue';
import { TodoStatus, } from '@/types';
import Draggable from 'vuedraggable'
import useTodos from '@/store/useTodos';
import CreateTodo from './CreateTodo.vue'

interface Props {
    status: TodoStatus;
};

const props = defineProps<Props>();

const { getTodosByStatus, deleteTodo, updateTodo } = useTodos();

const todoList = getTodosByStatus(props.status);

const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.InProgress]: "In Progress",
    [TodoStatus.Complete]: "Complete",
};

const onDragged = (payload: any) => {
    if(payload?.added.element){
        updateTodo(payload?.added.element, props.status)
    }
}

</script>

<template>
    <div class="group-wrapper">
        <h3 class="label">{{ groupLabel[props.status] }}</h3>
        <Draggable class="draggable" :list="todoList" group="todos" itemKey="id" @change="onDragged">
            <template #item="{element: todo}">
                <li>
                    {{ todo.title }}
                    {{ todo.status }}
                    <span class="delete-icon" @click="deleteTodo(todo)">x</span>
                    <div>
                        <span class="todo-description">{{ todo.description }}</span>
                    </div>
                </li>
            </template>
        </Draggable>
        <CreateTodo :status="props.status"/>
    </div>
</template>

<style scoped>
    .group-wrapper{
        border: 1px solid black;
        flex: 1;
        padding: 20px;
        background-color: rgb(56, 60, 103);
        width: 300px;
    }
    .group-wrapper .label{
        color: darkgray;
    }
    .group-wrapper ul{
        padding: 0;
    }
    .group-wrapper li{
        list-style-type: none;
        background: aliceblue;
        color: rgb(56, 60, 103);
        padding: 2px 5px;
        cursor: grab;
        margin-bottom: 10px;
    }
    .todo-description{
        font-size: 12px;
    }
    .draggable{
        min-height: 200px;
    }
    .delete-icon{
        float: right;
        cursor: pointer;
    }
</style>