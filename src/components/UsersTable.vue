<template>
	<div class="users-table">
		<div class="container">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Дата регистрации</th>
						<th>ФИО</th>
						<th>Должность</th>
						<th>Почта(логин)</th>
						<th>Пароль</th>
						<th>Телефон, привязанный к мессенджеру</th>
					</tr>
				</thead>
				<tbody key="">
					<tr v-for="(user, index) in users" :key="user.id">
						<td>{{user.id}}</td>
						<td>{{user.date}}</td>
						<td>{{user.name}}</td>
						<td>{{user.position}}</td>
						<td>{{user.email}}</td>
						<td>{{user.password}}</td>
						<td>{{user.phone}}</td>
					</tr>
				</tbody>
		</table>
		</div>
	</div>
</template>

<script>

export default {
	props: ['users'],
}
</script>

<style lang="scss">
.users-table {
	margin: 0 auto;
	overflow-x: auto;
	table {
		border-collapse: collapse;
		width: 100%;
		table-layout: fixed;
		font-weight: normal;
	}

	th, td {
		border: 1px solid #e6e6e6;
		padding: 15px 10px;
		font-weight: normal;
		text-align: center;
	}
	th {
		color: #4c5ca7;
		padding: 5px 10px;
	}
	th:first-child {
		width: 40px;
	}
}
@media (max-width: 960px) {
	.users-table {
		th, td {
			width: 150px;
		}
	}
}
</style>
