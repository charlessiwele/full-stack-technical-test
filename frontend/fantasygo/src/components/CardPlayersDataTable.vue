<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Player Stats
          </h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <div>
            <span class="relative" data-te-dropdown-ref>
              <button
                class="bg-gray-500 text-white active:bg-gray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" id="playerDropDownMenu" data-te-dropdown-toggle-ref aria-expanded="false"
                data-te-ripple-init data-te-ripple-color="light" :class="buttonDimensions">
                {{ buttonDisplay }}
              </button>
              <button
              class="bg-gray-500 text-white active:bg-gray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="togglePointsSort" :class="buttonDimensions">
              <i :class="togglePointsIcon"></i>
              Sort By Points
            </button>
            <ul
                class="z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="playerDropDownMenu" data-te-dropdown-menu-ref>
                <li v-for="(dropDownOption, idx) in dropDownOptions" :key="idx">
                  <button @click="dropDownOptionClick(dropDownOption)"
                    class="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                    data-te-dropdown-item-ref>{{ dropDownOption }}
                  </button>
                </li>
              </ul>
            </span>

            <button
              class="w-32 bg-orange-500 text-white active:bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="playersPaginateBack" :class="buttonDimensions">
              <i :class="backIcon"></i>
              Previous
            </button>
            <button
              class="w-32 bg-orange-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="playersPaginateNext" :class="buttonDimensions">
              Next
              <i :class="nextIcon"></i>
            </button>
            <button
              class="bg-orange-500 text-white active:bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="playersListReset"  :class="buttonDimensions">
              <i :class="refreshIcon"></i>
              Reset
            </button>
            <button
              class="bg-orange-500 text-white active:bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="playersListReshuffle" :class="buttonDimensions">
              <i :class="refreshIcon"></i>
              Reshuffle
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>

            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
              <span :class="tableHeaderFirstNameResponsive1">First Name</span> 
              <span :class="tableHeaderFirstNameResponsive2">Players</span> 
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="tableHeaderSecondNameResponsive">
              Second Name
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="tableWebNameResponsive">
              Web Name
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="tableHeaderTeamNameResponsive">
              Team
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="tableHeadertotalPointsResponsive">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-200 cursor-pointer" v-for="(playerData, idx) in getPlayersPaginatedList" :key="idx"
            @click="viewMoreDetail(playerData, idx)">
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              <div>
                <div class="inline md:hidden">First Name:</div>
                {{ playerData.first_name }}</div>
              <div class="inline  md:hidden">Second Name: {{ playerData.second_name }}</div>
              <div class="block md:hidden">Team: {{ getTeamNameByCode(playerData.team_code) }}</div>
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              :class="tableSecondNameResponsive">
              {{ playerData.second_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              :class="tableWebNameResponsive">
              {{ playerData.web_name }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              :class="tableTeamNameResponsive">
              {{ getTeamNameByCode(playerData.team_code) }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              :class="tabletotalPointsResponsive">
              {{ playerData.total_points }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script >
import * as te from 'tw-elements';

export default {
  data() {
    let buttonDisplay = 'Search By Team'
    let dropDownOptions = []
    return {
      buttonDisplay,
      dropDownOptions
    }
  },
  methods: {
    playersPaginateBack() {
      if (this.$store.getters.playersDataPaginationState.pageIndex > 0) {
        this.$store.dispatch('incrementPlayersDataPaginationIndex', - 1)
        this.$store.dispatch('updatePlayersPaginatedList')
      }
    },

    playersPaginateNext() {
      const pageUpperLimit = (this.$store.getters.playersDataPaginationState.pageIndex + 1) * this.$store.getters.playersDataPaginationState.pageSize
      if (this.$store.getters.playersData.length > pageUpperLimit) {
        this.$store.dispatch('incrementPlayersDataPaginationIndex', 1)
        this.$store.dispatch('updatePlayersPaginatedList')
      }
    },

    playersListReset() {
      this.$store.dispatch('clearFilters')
      this.playersPaginateReset()
    },

    async playersListReshuffle() {
      this.$store.dispatch('clearFilters')
      await this.$store.dispatch('playersListReshuffle')
    },

    playersPaginateReset() {
      this.$store.getters.playersDataPaginationState.pageIndex = 0
      this.$store.dispatch('updatePlayersPaginatedList')
    },


    viewMoreDetail(playerData) {
      this.$store.dispatch('updateCurrentPlayerData', playerData.id)
      this.$router.push('/stats/player/' + playerData.id)
    },

    togglePointsSort() {
      this.$store.dispatch('pointsSortStateIsToggled', true)
      this.$store.dispatch('updatePointsSortState', !this.$store.getters.pointsSortState)
      this.playersPaginateReset()
    },

    getTeamNameByCode(code) {
      let teamData = []
      if (this.$store.getters.teamsData) {
        teamData = this.$store.getters.teamsData.filter(item => item.code === code)
      }
      if (teamData.length > 0) {
        return teamData[0].name
      }
    },

    dropDownOptionClick(dropDownOption) {
      this.$store.dispatch('teamFilterStateIsToggled', true)
      this.$store.dispatch('filterByTeam', dropDownOption)
      this.buttonDisplay = dropDownOption
      this.$store.dispatch('updatePlayersPaginatedList')
    },
  },
  computed: {
    tableSecondNameResponsive() {
      return 'hidden md:table-cell'
    },
    tableWebNameResponsive() {
      return 'hidden xl:table-cell'
    },
    tabletotalPointsResponsive() {
      return 'hidden lg:table-cell'
    },
    tableTeamNameResponsive() {
      return 'hidden lg:table-cell'
    },
    tableHeaderFirstNameResponsive1() {
      return 'hidden md:table-cell'
    },
    tableHeaderFirstNameResponsive2() {
      return 'table-cell md:hidden '
    },
    tableHeaderSecondNameResponsive() {
      return 'hidden md:table-cell'
    },
    tableWebNameResponsive() {
      return 'hidden xl:table-cell'
    },
    tableHeadertotalPointsResponsive() {
      return 'hidden lg:table-cell'
    },
    tableHeaderTeamNameResponsive() {
      return 'hidden lg:table-cell'
    },

    getPlayersPaginatedList() {
      return this.$store.getters.playersPaginatedList
    },
    backIcon() {
      return 'pi pi-chevron-left'
    },
    nextIcon() {
      return 'pi pi-chevron-right'
    },
    refreshIcon() {
      return 'pi pi-refresh'
    },
    togglePointsIcon() {
      if (this.$store.getters.pointsSortState) {
        return 'pi pi-sort-numeric-down-alt'
      } else {
        return 'pi pi-sort-numeric-up-alt'
      }
    },
    buttonDimensions() {
      return 'w-32'
    }
  },
  async created() {
    await this.$store.dispatch('updateApiData')
    await this.$store.dispatch('updatePlayersData')
    await this.$store.dispatch('updateTeamsData')
    await this.$store.dispatch('updateDropDownOptions')
    this.dropDownOptions = this.$store.getters.dropDownOptions
    this.$store.dispatch('updatePlayersPaginatedList')
  }
}
</script>