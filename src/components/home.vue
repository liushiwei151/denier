<template>
	<div class="box">
		<div class="home">
			<div class="rulebutton" @click="goto('rule')"></div>
			<div class="money">
				<div class="MoneyGod" @click="goto('MoneyGod')"><div class="cursor"></div></div>
				<div class="Fortunes" @click="goto('Fortunes')"></div>
				<div class="callMoney"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			num: 100
		};
	},
	methods: {
		goto(e) {
			this.$router.push(e);
		},
	}
};
</script>

<style scoped lang="less">
.fn {
	position: absolute;
}
@button: {
	width: 206px;
	height: 255px;
	background-size: 100% 100%;
};
.box{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color:rgb(56,134,198) ;
}
.home {
	width: 750px;
	height: 1334px;
	background: url(../../static/homepagebg.jpg) no-repeat;
	background-size: 100% 100%;
	position: relative;
	.rulebutton {
		width: 95px;
		height: 99px;
		background: url(../../static/rulebutton.png) no-repeat;
		background-size: 100% 100%;
		top: 282px;
		position: absolute;
		left: 0;
	}
	.money {
		display: flex;
		justify-content: space-between;
		width: 657px;
		position: absolute;
		bottom: 23px;
		left: 46.5px;
		.MoneyGod {
			background: url(../../static/button3.png) no-repeat;
			@button();
			position: relative;
			.cursor {
				width: 82px;
				height: 93px;
				background: url(../../static/cursor.png) no-repeat;
				background-size: 100% 100%;
				bottom: 0;
				right: 0;
				position: absolute;
			}
		}
		.Fortunes {
			background: url(../../static/button2.png) no-repeat;
			@button();
		}
		.callMoney {
			background: url(../../static/button1.png) no-repeat;
			@button();
		}
	}
}
</style>
