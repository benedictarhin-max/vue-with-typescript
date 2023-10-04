<script setup lang="ts">
    import TodoGroup from './TodoGroup.vue';
    import { TodoStatus } from '@/types';
    
</script>

<template>
    <div class="groups-wrapper">
        <img src="../assets/logo.svg" class="logo"/>
        <div class="groups">
            <TodoGroup :status="TodoStatus.Pending"/>
            <TodoGroup :status="TodoStatus.InProgress"/>
            <TodoGroup :status="TodoStatus.Complete"/>
        </div>
    </div>
</template>

<style scoped>
    .groups-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .groups-wrapper .logo{
        width: 200px;
        height: 70px;
    }
    .groups-wrapper .groups{
        display: flex;
        gap: 20px;
        margin-top: 20px;
    }
</style>