<script setup lang="ts">
import { ref, reactive, computed, } from 'vue';
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
};

const submitCheck = computed(() => {
    return newTodo.title.length > 0;
});

</script>



<template>
    <div>
        <h3 v-if="!shouldDisplayForm" @click="openForm" class="label">Add New</h3>
        <template v-else>
            <form @submit.prevent="handleOnSubmit">
                <div>
                    <input type="text" placeholder="Title" v-model="newTodo.title" class="user-input">
                </div>
                <div>
                    <input type="textarea" placeholder="Description" v-model="newTodo.description" class="user-input">
                </div>
                <button type="submit" class=[submit] :disabled="!submitCheck">Submit</button>
                <button type="submit" @click="resetForm" class="cancel">Cancel</button>
            </form>
        </template>
    </div>
</template>

<style scoped>
    .label{
        color: darkgray;
        cursor: pointer;
    }
    .user-input{
        width: 100%;
        outline: none;
        height: 25px;
        margin-bottom: 5px;
        border-radius: 5px;
        padding-left: 5px;
        font-size: 15px;
    }
    button{
        padding: 5px 10px;
        font-size: 1rem;
        border-radius: 4px;
        color: rgb(193, 186, 186);
        background-color: darkcyan;
        outline: none;
        margin-top: 5px;
        cursor: pointer;
    }

    button:disabled {
        background-color: rgba(255, 255, 255, 0.3);
    }
    /* .submit{
        background-color: 
        margin-right: 3px;
    } */
    .cancel{
        background-color: black;
    }
</style>