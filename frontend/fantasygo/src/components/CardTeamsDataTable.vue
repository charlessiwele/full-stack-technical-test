<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Team Stats
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
        <button
            class="bg-orange-500 text-white active:bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" @click="teamsPaginateBack"
          >
            Previous
          </button>
          <button
            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" @click="teamsPaginateNext"
          >
            Next
          </button>
          <button
            class="bg-gray-500 text-white active:bg-gray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" @click="togglePointsSort"
          >
            <i :class="togglePointsIconState"></i>
            Sort By Points
          </button>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead class="thead-light">
          <tr>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Name
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Played
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Won
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Lost
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Draw
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Points
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
            Win Rate
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teamsData, idx) in getTeamsPaginatedList" :key="idx">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
              {{teamsData.name}}
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            {{teamsData.played}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            {{teamsData.win}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            {{teamsData.loss}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            {{teamsData.draw}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
            {{teamsData.points}}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                <span class="mr-2">{{ calculateWinRate(wins, played) }}%</span>
                <div class="relative w-full">
                  <div
                    class="overflow-hidden h-2 text-xs flex rounded bg-red-200"
                  >
                    <div
                      :style="{ 'width': calculateWinRate(wins, played) + '%' }"
                      class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      :class="calculateWinRateColorLevels(wins, played)"
                    ></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script >
  export default {
    data() {
      let pointsSortState = false
      let pointsSortStateIsToggled = false
      return {
        pointsSortState,
      }
    },
    methods: {
      calculateWinRate(wins=0, played=0) {
        if (played > 0) {
          return (wins/played) * 100
        }
        return 0
      },

      calculateWinRateColorLevels(wins=0, played=0) {
        const rate = played > 0 ? ((wins/played) * 100) : 0
        let colorLevel
        if (rate < 30) {
          colorLevel = 'bg-red-500'
        }
        else if(rate < 40) {
          colorLevel = 'bg-orange-500'            
        }
        else if(rate < 60) {
          colorLevel = 'bg-yellow-500'            
        }
        else if(rate >= 60) {
          colorLevel = 'bg-green-500'            
        }
        return colorLevel
      },

      teamsPaginateBack() {
        if (this.$store.getters.teamsDataPaginationState.pageIndex > 0) {
          this.$store.getters.teamsDataPaginationState.pageIndex = this.$store.getters.teamsDataPaginationState.pageIndex - 1
          this.setTeamsPaginatedList()
        }
      },

      teamsPaginateNext() {
        const pageUpperLimit = (this.$store.getters.teamsDataPaginationState.pageIndex + 1) * this.$store.getters.teamsDataPaginationState.pageSize
        if (this.$store.getters.teamsData.length > pageUpperLimit) {
        this.$store.getters.teamsDataPaginationState.pageIndex = this.$store.getters.teamsDataPaginationState.pageIndex + 1
        this.setTeamsPaginatedList()
        }
      },

      teamsPaginateReset() {
        this.$store.getters.teamsDataPaginationState.pageIndex = 0
        this.setTeamsPaginatedList()
      },

      setTeamsPaginatedList() {
        this.$store.dispatch('updateTeamsPaginatedList')
      },
      togglePointsSort() {
        this.pointsSortStateIsToggled = true
        this.pointsSortState = !this.pointsSortState
        this.teamsPaginateReset()
      },
    },
    computed: {
      getTeamsPaginatedList(){
        this.setTeamsPaginatedList()
        return this.$store.getters.teamsPaginatedList
      },
      togglePointsIconState() {
        if (this.pointsSortState) {
          return 'pi pi-sort-numeric-down-alt'
        } else {
          return 'pi pi-sort-numeric-up-alt'
        }
      },
    },
  }
</script>