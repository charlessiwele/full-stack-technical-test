import { createStore } from 'vuex'
import MakeRequests from '../requests/MakeRequests';

const store = createStore ({
    state: {
        apiData: '',
        teamsData: '',
        currentTeamData: {},
        playersData: '',
        currentPlayerData: {},
        teamsDataPaginationState: {
            pageIndex: 0,
            pageSize: 10,
        },
        playersDataPaginationState: {
            pageIndex: 0,
            pageSize: 10,
        },
        playersPaginatedList: [],
        teamsPaginatedList: [],
        dropDownOptions: [],
        teamFilterStateIsToggled: false,
        pointsSortStateIsToggled: false,
        pointsSortState: false,
        shufflePlayers: false,
        filterByTeam: ""

    },

    getters: {
        apiData: (state) => state.apiData,
        teamsData: (state) => state.teamsData,
        playersData: (state) => state.playersData,
        teamsDataPaginationState: (state) => state.teamsDataPaginationState,
        playersDataPaginationState: (state) => state.playersDataPaginationState,
        currentTeamData: (state) => state.currentTeamData,
        currentPlayerData: (state) => state.currentPlayerData,
        playersPaginatedList: (state) => state.playersPaginatedList,
        teamsPaginatedList: (state) => state.teamsPaginatedList,
        dropDownOptions: (state) => state.dropDownOptions,
        teamFilterStateIsToggled: (state) => state.teamFilterStateIsToggled,
        pointsSortStateIsToggled: (state) => state.pointsSortStateIsToggled,
        pointsSortState: (state) => state.pointsSortState,
        filterByTeam: (state) => state.filterByTeam,
        shufflePlayers: (state) => state.shufflePlayers,
    },

    mutations: {
        apiData: (state, apiData) => state.apiData = apiData,
        teamsData: (state, teamsData) => state.teamsData = teamsData,
        playersData: (state, playersData) => state.playersData = playersData,
        teamsDataPaginationState: (state, teamsDataPaginationState) => state.teamsDataPaginationState = teamsDataPaginationState,
        playersDataPaginationState: (state, playersDataPaginationState) => state.playersDataPaginationState = playersDataPaginationState,
        playersDataPaginationIncrement: (state, indexIncrement) => state.playersDataPaginationState.pageIndex = state.playersDataPaginationState.pageIndex + indexIncrement,
        currentTeamData: (state, currentTeamData) => state.currentTeamData = currentTeamData,
        currentPlayerData: (state, currentPlayerData) => state.currentPlayerData = currentPlayerData,
        playersPaginatedList: (state, playersPaginatedList) => state.playersPaginatedList = playersPaginatedList,
        teamsPaginatedList: (state, teamsPaginatedList) => state.teamsPaginatedList = teamsPaginatedList,
        dropDownOptions: (state, dropDownOptions) => state.dropDownOptions = dropDownOptions,
        teamFilterStateIsToggled: (state, teamFilterStateIsToggled) => state.teamFilterStateIsToggled = teamFilterStateIsToggled,
        pointsSortStateIsToggled: (state, pointsSortStateIsToggled) => state.pointsSortStateIsToggled = pointsSortStateIsToggled,
        pointsSortState: (state, pointsSortState) => state.pointsSortState = pointsSortState,
        filterByTeam: (state, filterByTeam) => state.filterByTeam = filterByTeam,
        shufflePlayers: (state, shufflePlayers) => state.shufflePlayers = shufflePlayers,
    },

    actions: {
        async updateApiData({state, commit}) {
            const makeRequests = new MakeRequests()
            const apiData = await makeRequests.makeInternalGetRequest('getbootstrap')
            return commit('apiData', apiData)
        },

        updateTeamsData({state, commit}) {
            if (state.apiData.data) {
                const teamsData = state.apiData.data.teams
                return commit('teamsData', teamsData)
            }
        },

        updatePlayersData({state, commit}) {
            if (state.apiData.data) {
                const playersData = state.apiData.data.elements
                return commit('playersData', playersData)
            }
            return commit('playersData', {})
        },

        updateTeamsDataPaginationState({state, commit}, teamsDataPaginationState) {
            return commit('teamsDataPaginationState', teamsDataPaginationState)
        },

        updatePlayersDataPaginationState({state, commit}, playersDataPaginationState) {
            return commit('playersDataPaginationState', playersDataPaginationState)
        },

        incrementPlayersDataPaginationIndex({state, commit}, indexIncrement) {
            return commit('playersDataPaginationIncrement', indexIncrement)
        },

        async updateCurrentTeamData({state, commit}, team_code) {
            const currentTeamData = await state.teamsData.filter(item=>item.team_code===team_code)
            return commit('currentTeamData', currentTeamData)
        },

        async updateCurrentPlayerData({state, commit}, player_code) {
            const currentPlayerData = await state.playersData.filter(item=>item.id===player_code)
            return commit('currentPlayerData', currentPlayerData)
        },

        async playersListReshuffle({state, commit, dispatch}) {            
            commit('shufflePlayers', true)
            await dispatch('updatePlayersPaginatedList')
            commit('shufflePlayers', false)
        },

        async updatePlayersPaginatedList({state, commit, dispatch}) {
            const pageUpperLimit = (state.playersDataPaginationState.pageIndex + 1) * state.playersDataPaginationState.pageSize
            const pageLowerLimit = pageUpperLimit - state.playersDataPaginationState.pageSize
            let playersPaginatedList = state.playersData;
            if (state.teamFilterStateIsToggled && state.filterByTeam) {
                const teamByName = await dispatch('getTeamByName', state.filterByTeam)
                playersPaginatedList = await playersPaginatedList.filter(item => item.team === teamByName.id)
            }
            if (state.pointsSortStateIsToggled) {
                console.log('state.pointsSortState', state.pointsSortState)
                if (state.pointsSortState) {
                    playersPaginatedList.sort(function (a, b) {
                        return b.total_points - a.total_points;
                    });
                } else {
                    playersPaginatedList.sort(function (a, b) {
                        return a.total_points - b.total_points;
                    });
                }
            }
            if (state.shufflePlayers) {
                playersPaginatedList.map((item, index) => {
                    const randomIndex = Math.floor(Math.random() * (playersPaginatedList.length - 1))
                    playersPaginatedList[randomIndex] = playersPaginatedList[index]
                    playersPaginatedList[index] = playersPaginatedList[randomIndex]
                    return item
                })
            }
            playersPaginatedList = playersPaginatedList.slice(pageLowerLimit, pageUpperLimit);
            return commit('playersPaginatedList', playersPaginatedList)
        },

        getTeamByName({state, commit}, name) {
            let teamData = []
            if (state.teamsData) {
                teamData = state.teamsData.filter(item=>item.name===name)
            }
            if (teamData.length > 0) {
              return teamData[0]
            }
            return {}
        },

        getTeamNameByCode({state, commit, dispatch}, code) {
            const teamData = dispatch('getTeamByCode', code)
            if (teamData.length > 0) {
              return teamData[0].name
            }
            return ''
        },

        updateDropDownOptions({state, commit, dispatch}) {
            const dropDownOptions = []
            state.teamsData.map(item=> dropDownOptions.push(item.name))
            return commit('dropDownOptions', dropDownOptions)
        },    

        async updateTeamsPaginatedList({state, commit}) {
            const pageUpperLimit = (state.teamsDataPaginationState.pageIndex + 1) * state.teamsDataPaginationState.pageSize
            const pageLowerLimit = pageUpperLimit - state.teamsDataPaginationState.pageSize
            const teamsPaginatedList = state.teamsData.slice(pageLowerLimit, pageUpperLimit);
            return commit('teamsPaginatedList', teamsPaginatedList)
        },
        
        updatePointsSortState({state, commit}, pointsSortState) {
            return commit('pointsSortState', pointsSortState)
        },

        pointsSortStateIsToggled({state, commit}, isToggled) {
            return commit('pointsSortStateIsToggled', isToggled)
        },

        teamFilterStateIsToggled({state, commit}, isToggled) {
            return commit('teamFilterStateIsToggled', isToggled)
        },
        filterByTeam({state, commit}, filterByTeam) {
            return commit('filterByTeam', filterByTeam)
        },

        clearFilters({state, commit}, filterByTeam) {
            commit('teamFilterStateIsToggled', false)
            commit('pointsSortStateIsToggled', false)
            commit('filterByTeam', '')
        },


    },
})

export default store;
