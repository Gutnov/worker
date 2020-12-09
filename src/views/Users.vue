<template>
<div class="workers">
	<div class="workers__top">
		<h1 class="workers__title">Список экспертов по оценке и руководителей</h1>
		<div class="container">
			<div class="worker__filters">
				<form @submit.prevent="fiterUsers">
					<div class="worker__filter">
						<label>
							<span>ID</span>
							<input
								type="text"
								placeholder="Введите ID"
								v-model="formData.id"
							>
						</label>
					</div>
					<div class="worker__filter">
						<label>
							<span>ФИО</span>
							<input
								type="text"
								placeholder="Введите ФИО участника"
								v-model="formData.name"
							>
						</label>
					</div>
					<div class="worker__filter">
						<label>
							<span>Должность</span>
							<input
								type="text"
								placeholder="Введите должность участника"
								v-model="formData.position"
							>
						</label>
					</div>
					<div class="worker__filter">
						<label>
							<span>Почта(логин)</span>
							<input
								type="text"
								placeholder="Введите Почту(логин) участника"
								v-model="formData.email"
							>
						</label>
					</div>
					<button type="submit">Примеить фильтры</button>
				</form>
			</div>
		</div>
	</div>
	<UsersTable :users="filteredUsers" v-if="filteredUsers.length"/>
	<div class="container" v-else>
		<h2>Ничего не найдено</h2>
	</div>
	<transition name="fade">
		<NewUser v-if="popupOpen" @close="updateTable"/>
	</transition>
	<div class="container">
		<button class="workers__add" @click="popupOpen = true">Добавить пользоватуля</button>
	</div>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import UsersTable from '@/components/UsersTable'
import NewUser from '@/components/NewUser'

export default {
	components: {
		UsersTable, NewUser
	},
	data() {
		return {
			popupOpen : false,
			formData: {
				id: '',
				name: '',
				position: '',
				email: '',
			},
			filteredUsers: [],
			tableKey: Date.now()
		}
	},
	computed: {
		...mapGetters(['users']),
	},
	methods: {
		fiterUsers() {
			let isEmptyFilters = true;

			for(let i in this.formData) {
				if(this.formData[i]) {
					isEmptyFilters = false
				}
			}
			if(isEmptyFilters) {
				this.filteredUsers = this.users
				return
			}
			this.filteredUsers = this.users.filter(u => {
				for(let f in this.formData) {
					if(this.formData[f]) {
						return u[f].toLowerCase().includes(this.formData[f].toLowerCase())
					}
				}
			})
		},
		updateTable() {
			this.popupOpen = false
			this.fiterUsers()
		},
	},
	mounted() {
		this.filteredUsers = this.users
	},
}

</script>
<style lang="scss">
.workers {
	padding-bottom: 50px;
}
.workers__top {
	margin-bottom: 50px;
	padding-top: 50px;
	padding-bottom: 100px;
	background-color: #f7f7f7;
}
.workers__title {
	font-size: 22px;
	font-weight: bold;
	margin-top: 0;
	margin-bottom: 40px;
	text-align: center;
}
.worker__filters {
	form {
		display: flex;
		justify-content: space-between;
	}
}
.worker__filter {
	margin-right: 20px;
	
	label {
		color: #4c5ca7;
		font-weight: bold;
	}
	span {
		display: block;
		margin-bottom: 10px;
	}
}

.workers__add {
	display: block;
	margin-top: 40px;
	margin-left: auto;
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	opacity: 0;
}

@media (max-width: 1110px) {
	.worker__filters {
		form {
			justify-content: start;
			flex-wrap: wrap;
		}
			button{margin-bottom: 20px;}
	}
	.worker__filter {
		margin-bottom: 20px;
	}
}
@media (max-width: 575px) {
	.workers__top {
		padding-bottom: 30px;
	}
	.worker__filters form {
		& > div {
			flex-basis: 100%;
			input {width: 100%;}
		}
		button {
			margin-top: 50px;
		}
	}
}
</style>
