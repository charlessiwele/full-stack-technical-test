<template>
  <div class="flex flex-col w-full h-full text-gray-900 text-xl pl-10 pr-10">
    <card-players-data-table/>
  </div>
</template>

<script >
import CardPlayersDataTable from '../components/CardPlayersDataTable.vue'
  export default {
    components: {
      CardPlayersDataTable
    },
  }
</script>