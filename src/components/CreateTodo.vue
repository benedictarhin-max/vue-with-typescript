<script setup lang="ts">
import { ref, reactive, } from 'vue';
import type { Todo, TodoStatus } from '@/types';
import useTodos from '@/store/useTodos';


interface Props {
    status: TodoStatus;
};

const props = defineProps<Props>()

const shouldDisplayForm = ref(false);

const newTodo = reactive<Omit<Todo, "id">>({
    title: "",
    description: "",
    status: props.status,
});

const resetForm = () => {
    shouldDisplayForm.value = false;
    newTodo.title = "";
    newTodo.description = "";
};

const openForm = () => {
    shouldDisplayForm.value = true;
};

const { addNewTodo } = useTodos();

const handleOnSubmit = () =>{
    addNewTodo({
        id: Math.random() * 1000000000000000,
        ...newTodo})
    resetForm();
}

</script>



<template>
    <div>
        <h3 v-if="!shouldDisplayForm" @click="openForm" class="label">Add New</h3>
        <template v-else>
            <form @submit.prevent="handleOnSubmit">
                <div>
                    <input type="text" placeholder="Title" v-model="newTodo.title">
                </div>
                <div>
                    <input type="textarea" placeholder="Description" v-model="newTodo.description">
                </div>
                <button type="submit">Submit</button>
                <button type="submit" @click="resetForm">Cancel</button>
            </form>
        </template>
    </div>
</template>

<style scoped>
    .label{
        color: darkgray;
    }
</style>