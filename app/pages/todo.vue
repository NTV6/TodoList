<script setup>
useHead({
  title: "Todo List"
})

import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

const { data } = await useFetch("/api/todos");

const inputValue = ref("");
const todolist = ref(data.value || []);

function formatTime(createAt) {
    const dateNow = new Date();
    const dateCreated = new Date(createAt);

    const result = dateNow - dateCreated;
    const diffMinutes = Math.floor(result / 60000);
    
    if (diffMinutes < 1)
    return "Created just now";
    else if (diffMinutes < 60)
    return `Created ${diffMinutes} minutes ago`;
    else if (diffMinutes < 1440)
    return `Created ${Math.floor(diffMinutes / 60)} hours ago`;
    return dateCreated.toLocaleString("vi-VN");
}

const handleAdd = async () => {
    if (inputValue.value.trim() === "") {
        alert("Please enter a todo item.");
        return;
    }

    try {
        const res = await $fetch("/api/todos", {
        method: "POST",
        body: { name: inputValue.value }
        });
        
        todolist.value.push(res);
    } catch (err) {
        console.error(err);
    }

    inputValue.value = "";
};

const handleUpdate=(id)=>{
    const newName = prompt("Enter the new name for the todo item:");
    if (newName) {
        const index = todolist.value.findIndex(value => value.id === id);
        todolist.value[index].name = newName;
    }
}

const handleDelete = async(id)=>{
    try {
        await $fetch(`/api/todos/${id}`, {
            method: "DELETE"
        });
        todolist.value = todolist.value.filter(value => value.id !== id);
    } catch (err) {
        console.error(err);
    }
}

const handleNewList = async()=>{
    if (!confirm("Bạn có chắc muốn xóa tất cả?")) return;
    try {
        await $fetch(`/api/todos`, {
            method: "DELETE"
        });
        todolist.value = [];
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <ClientOnly>
  <div class="max-w-6xl mx-auto p-4 space-y-8">
    <div class="bg-gray-100 dark:bg-gray-800 rounded-full h-20 flex justify-between items-center px-12">
        <strong class="text-xl">Nuxt Todos + Deno KV</strong>
            <DarkMode />
    </div>
    <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center rounded-lg p-4 h-20 border border-blue bg-gray-800 text-blue-400">
            <div class="font-semibold">Share this page to collaborate with others</div>
            <div class="space-x-8 font-medium">
                <button>Copy URL</button>
                <button @click="handleNewList">New List</button>
            </div>
        </div>
        <div class="flex h-12 my-8">
            <input type="text" class="border border-gray-600 mr-2 flex-1 px-3 rounded-lg" v-model="inputValue" placeholder="Add a todo item" />
            <button class="btn-action bg-blue-400" @click="handleAdd">
                <PlusIcon class="w-6 h-6 text-black" />
            </button>
        </div>
        <ul>
            <li 
                v-for="(value, index) in todolist" :key="value.id" :class="['flex justify-between items-center', index === todolist.length - 1 ? '' : 'border-b border-gray-800']">
                <div>
                    <div class="flex items-center space-x-4">
                        <h2 class="text-xl font-bold" :class="{ 'line-through text-gray-500': value.completed }">{{ value.name }}</h2>
                        <button @click="handleUpdate(value.id)">Update</button>
                    </div>
                    <div>{{formatTime(value.dataCreated)}}</div>
                </div>
                <div class="flex items-center space-x-4">
    
                    <Switch
                        v-model="value.completed"
                        :class="value.completed ? 'bg-blue-500' : 'bg-gray-500'"
                        class="relative inline-flex h-6 w-11 items-center rounded-full"
                    >
                        <span
                        :class="value.completed ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform bg-gray-800 rounded-full transition"
                        />
                    </Switch>
    
                    <button @click="handleDelete(value.id)" class="btn-action bg-red-900 h-12 my-4">
                        <XMarkIcon class="w-6 h-6 text-red-200"/>
                    </button>
                </div>
            </li>
        </ul>
    </div>
  </div>
    </ClientOnly>
</template>