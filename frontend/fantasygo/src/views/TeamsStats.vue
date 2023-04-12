<template>
  <div class="flex flex-col w-full h-full text-gray-900 text-xl pl-10 pr-10">
    <card-teams-data-table />
  </div>
</template>

<script >
import CardTeamsDataTable from '../components/CardTeamsDataTable.vue'
export default {
  components: {
    CardTeamsDataTable
  },
}
</script>