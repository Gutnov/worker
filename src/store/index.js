import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [
			{
				id: '1',
				date: '01.11.2020',
				name: 'Иванов Иван Иванович',
				position: 'HR',
				email: 'ivan@mail.ru',
				password: '123456',
				phone: '+79999999999'
			},
			{
				id: '2',
				date: '01.11.2020',
				name: 'Петров Петр Петрович',
				position: 'HR',
				email: 'petr@mail.ru',
				password: '123456',
				phone: '+79999999999'
			}
		],
	},
	mutations: {
		addUser(state, userData) {
			const lastUsersId = state.users[state.users.length - 1].id;
			userData = {...userData, id: (+lastUsersId + 1).toString()}
			state.users = [...state.users, userData]
		}
	},
	actions: {
		addUser({commit}, userData) {
			commit('addUser', userData)
		},
		fiterUsers({commit}, filtersData) {
			commit('fiterUsers', filtersData)
		}
	},
	getters: {
		users: s => s.users,
	},
	modules: {
	}
})
