<script setup>
const { data: todosData } = await useFetch("/api/todos");
console.log("🚀 ~ todosData:", todosData)

// const nameItem = computed(() => {
//   if (!datas.value || datas.value.length === 0) {
//     return 'No name available'; // Handle the case where data is not available or empty
//   }
//   return datas.value[0].name;
// });
</script>

<template>
  <!-- <div class="w-20 h-20 bg-red-500">{{ data.data[0].name }} - {{ data.success }}</div> -->
<div class="w-20 h-20 bg-red-500" v-for="u in todosData.data" :key="u.id">
    {{ u.name }}
  </div>
</template>