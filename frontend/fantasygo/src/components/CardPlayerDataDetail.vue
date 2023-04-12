<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6">
          <div class="text-center mt-12">
        <h3
          class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
        >
          {{ currentPlayerData.first_name + ' ' + currentPlayerData.second_name }}
        </h3>
        </div>
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 text-center mt-5">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{ currentPlayerData.yellow_cards }}
              </span>
              <span class="text-sm text-blueGray-400">Yellow Cards</span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{ currentPlayerData.red_cards }}
              </span>
              <span class="text-sm text-blueGray-400">Red Cards</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{ currentPlayerData.goals_scored }}

              </span>
              <span class="text-sm text-blueGray-400">Goals Scored</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{ currentPlayerData.goals_conceded }}

              </span>
              <span class="text-sm text-blueGray-400">Goals Conceded</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                {{ currentPlayerData.total_points }}

              </span>
              <span class="text-sm text-blueGray-400">Total Points</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <div
          class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
        >
          <i class="pi pi-flag mr-2 text-lg text-blueGray-400"></i>
          Team: {{ currentPlayerTeam.name }}
        </div>
        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          Position: {{ currentPlayerType.singular_name }}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <button @click="$router.back()" class="font-normal text-emerald-500">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  export default {
    data() {
      const currentPlayerData = this.$store.getters.currentPlayerData[0]
      const currentPlayerTeam = this.getTeamByCode(currentPlayerData.team_code)
      const currentPlayerType = this.getPlayerTypeByElementType(currentPlayerData.element_type)
      return {
        currentPlayerData,
        currentPlayerTeam,
        currentPlayerType
      }
    },
    methods: {
      getTeamByCode(code) {
          let teamData = []
          if (this.$store.getters.teamsData) {
              teamData = this.$store.getters.teamsData.filter(item=>item.code===code)
          }
          if (teamData.length > 0) {
            return teamData[0]
          }
          return {}
      },

      getPlayerTypeByElementType(element_type) {
        let elementTypesData = []
        if (this.$store.getters.teamsData) {
          elementTypesData = this.$store.getters.apiData.data.element_types.filter(item=>item.id===element_type)
        }
        if (elementTypesData.length > 0) {
          return elementTypesData[0]
        }
        return {}
      },
    }
  }
</script>