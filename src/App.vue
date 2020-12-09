<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	@import 'assets/scss/base/fonts';
	@import 'assets/scss/base/normalize';
	@import 'assets/scss/base/typography';

	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 20px;
	}
	input {
		min-height: 30px;
		min-width: 200px;
		border: none;
		border-radius: 5px;
		padding-left: 10px;
		box-shadow: 4px 5px 50px -14px #000;
		border: 1px solid transparent;
		&::placeholder {
			font-weight: normal;
			font-size: 12px;
		}
	}
	button {
		align-self: flex-end;
		height: max-content;
		min-height: 30px;
		border: none;
		background-color: #4c5ca7;
		font-size: 12px;
		color: #fff;
		border-radius: 5px;
		padding: 0 20px;
	}
</style>
