<template>
  <div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white shadow-lg">
    <div class="sidebar-icon group" @click="goToPlayersStats">
      <i class="pi pi-user"></i>
      <span class="sidebar-tooltip group-hover:scale-100">Players</span>
    </div>
    <div class="sidebar-icon group" @click="goToTeamsStats">
      <i class="pi pi-users"></i>
      <span class="sidebar-tooltip group-hover:scale-100">Teams</span>
    </div>
  </div>
</template>

<script >
  import 'primeicons/primeicons.css';

  export default {
    methods: {
      goToPlayersStats() {
        this.$router.push('/stats/players')
      },
      goToTeamsStats() {
        this.$router.push('/stats/teams')
      },
    },
  }
</script>
