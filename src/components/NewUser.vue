<template>
	<div class="new-user-overlay"  @click="clickOutside" ref="overlay">
		<div class="new-user">
			<div class="new-user__close" @click="$emit('close')"></div>
			<div class="new-user__description">Добавление данных о экспертах и  по оценке и руководителей</div>
			<form @submit.prevent="submitHandler">
				<div class="new-user__field" :class="{invalid: $v.date.$dirty && !$v.date.required}">
					<label>
						<span>Дата регистрации </span>
						<date-picker
							type="date"
							v-model="date"
							:formatter="dateFormater"
						/>
					</label>
					<span
						class="new-user__error"
						v-show="$v.date.$dirty && !$v.date.required"
					>Выберете дату</span>
				</div>
				<div class="new-user__field" :class="{invalid: $v.name.$dirty && !$v.name.required}">
					<label>
						<span>ФИО</span>
						<input
							type="text"
							placeholder="Введите ФИО"
							v-model="name"
						>
					</label>
					<span
						class="new-user__error"
						v-show="$v.name.$dirty && !$v.name.required"
					>Введите имя</span>
				</div>
				<div  class="new-user__field" :class="{invalid: $v.name.$dirty && !$v.name.required}">
					<label>
						<span>Должность</span>
						<input
							type="text"
							placeholder="Введите должность"
							v-model="position"
						>
					</label>
					<span
						class="new-user__error"
						v-show="$v.name.$dirty && !$v.name.required"
					>Введите должность</span>
				</div>
				<div  class="new-user__field" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email )}">
					<label>
						<span>Почта(логин)</span>
						<input
							type="text"
							placeholder="Введите email"
							v-model="email"
						>
					</label>
					<span
						class="new-user__error"
						v-show="$v.email.$dirty && !$v.email.required"
					>	Введите email</span>
					<span
						class="new-user__error"
						v-show="$v.email.$dirty && !$v.email.email"
					>	Некорректный email</span>
				</div>
				<div  class="new-user__field" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength )}">
					<label>
						<span>Пароль</span>
						<input
							:type="showPassword"
							placeholder="Введите пароль"
							v-model="password"
						>
						<div class="new-user__eye" @click="showHidePassword">
							<img src="../assets/visibility.svg" alt="">
						</div>
					</label>
					<span
						class="new-user__error"
						v-show="$v.password.$dirty && !$v.password.required"
					>Введите пароль	</span>
					<span
						class="new-user__error"
						v-show="$v.password.$dirty && !$v.password.minLength"
					>Минимум 6 символов	</span>
				</div>
				<div  class="new-user__field" :class="{invalid: $v.phone.$dirty && !$v.phone.minLength }">
					<label>
						<span>Телефон привязанный <br> к мессенджеру</span>
						<phone-mask-input 
							defaultCountry="ru" 
							key="phone"
							v-model="phone"
						/>
					</label>
					<span
						class="new-user__error"
						v-show="$v.phone.$dirty && !$v.phone.minLength"
					>Некорректный номер	</span>
				</div>
				<button type="submit">Сохранить</button>
			</form>
		</div>
	</div>
</template>

<script>
import PhoneMaskInput from "vue-phone-mask-input";
import DatePicker from 'vue2-datepicker';
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
	components: {
		DatePicker
	},
	data() {
		return {
			date: new Date(),
			name: '',
			position: '',
			email: '',
			password: '',
			phone: '',
			showPassword: 'password',
			dateFormater: {
				stringify: () => this.$options.filters.dateFilter(this.date)
			},
		}
	},
	computed: {
		dateFormat() {
			return new Date().toLocaleString('ru-RU')
		}
	},
	methods: {
		clickOutside(e) {
			if(e.target === this.$refs.overlay) {
				this.$emit('close')
			}
		},
		submitHandler() {
			if(this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			const formData = {
				date: this.$options.filters.dateFilter(this.date), 
				name: this.name, 
				position: this.position, 
				email: this.email, 
				password: this.password, 
				phone: this.phone, 
			}
			this.$store.dispatch('addUser', formData)

			this.$emit('close')
		},
		showHidePassword() {
			this.showPassword = this.showPassword === 'password' ? 'text' : 'password'
		}
	},
	filters: {
		dateFilter(val) {
			const options = {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			}
			return new Intl.DateTimeFormat('ru-RU', options).format(val)
		}
	},
	validations: {
		date: {required},
		name: {required},
		position: {required},
		email: {email, required},
		password: {required, minLength: minLength(6)},
		phone: {minLength: minLength(12)}
	},
	mounted() {
	
	},
}
</script>

<style lang="scss">
@import '~vue2-datepicker/scss/index.scss';

.new-user {
	position: relative;
}
.new-user__description {
	margin-bottom: 50px;
	font-size: 22px;
	color: #4c5ca7;
	text-align: center;
}
.new-user-overlay {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background-color: rgba($color: #000000, $alpha: .5);
}
.new-user {
	padding: 40px;
	background-color: #fff;
	border-radius: 5px;

	button {
		display: block;
		margin: 0 auto;
		min-width: 210px;
	}
}
.new-user__field {
	position: relative;
	width: max-content;
	margin: 0 auto;
	margin-bottom: 40px;

	&.invalid input {
		border: 1px solid red;
	}
	span {
		display: block;
		margin-bottom: 5px;
		color: #4c5ca7;
		font-weight: bold;
	}
}
span.new-user__error {
	position: absolute;
	left: 0;
	bottom: -20px;
	font-size: 10px;
	font-weight: normal;
	color: red;
}
.mx-input {
	border: none;
	min-height: 30px;
	min-width: 200px;
	border: none;
	border-radius: 5px;
	padding-left: 10px;
	box-shadow: 4px 5px 24px -11px #000;
	&::placeholder {
		font-weight: normal;
		font-size: 12px;
	}
}
.new-user__close {
	position: absolute;
	right: 20px;
	top: 20px;
	width: 20px;
	height: 20px;
	cursor: pointer;
	&:before, &:after {
		content: '';
		position: absolute;
		width: 20px;
		height: 2px;
		background-color: #000;
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
}
.new-user__eye {
	position: absolute;
	right: -20px;
	top: 30px;
	width: 15px;
	cursor: pointer;
	img{max-width: 100%;}
}
</style>
