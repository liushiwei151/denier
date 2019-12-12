<template>
	<div class="box">
		<div class="MoneyGod">
			<div class="topbox">
				<div class="topbox-cus">
					<p>昵称：小北999999999999999</p>
					<p>用户编号：1230600</p>
				</div>
				<div class="topbox-fuq">
					<p>
						活动中奖福签：
						<span>19161817,18452327</span>
					</p>
				</div>
				<div class="topbox-button"><button @click="goto('SearchAward')">查看完整中奖名单</button></div>
			</div>
			<div class="bottombox"></div>
			<ul class="bottomtable">
				<li>
					<div>获得的时间</div>
					<div>财神签编号</div>
					<div>来源</div>
					<div>
						盒包
						<br />
						财运积分
					</div>
					<div>
						条包
						<br />
						财运积分
					</div>
				</li>
				<div class="cuszj">
					<li v-for="(item, index) in 19" :key="index">
						<div>2019-11-23 00:59</div>
						<div>19161817</div>
						<div>扫码</div>
						<div></div>
						<div>1</div>
					</li>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MoneyGod',
	data() {
		return {
			custorm: {
				name: '小北',
				num: 1230600
			}
		};
	},
	methods: {
		goto(e) {
			this.$router.push(e);
		}
	}
};
</script>

<style scoped lang="less">
li {
	list-style-type: none;
}
.box {
	background-image: url(../../static/bg.png);
	background-size: 100% 100%;
	height: 100%;
	position: fixed;
	width: 750px;
	color: black;
}
.MoneyGod {
	background: url(../../static/MoneyGod.jpg) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 1334px;
	padding-top: 510px;
	box-sizing: border-box;
	.topbox {
		background: url(../../static/topbox.png) no-repeat;
		background-size: 100% 100%;
		width: 678px;
		height: 231px;
		margin: 0 auto 20px;
		font-weight: 600;
		.topbox-cus {
			display: flex;
			font-size: 30.82px;
			line-height: 70px;
			text-align: left;
			p {
				text-indent: 37px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 342px;
				height: 70px;
			}
		}
		.topbox-button {
			display: flex;
			justify-content: center;
			button {
				border: none;
				background: url(../../static/button.png) no-repeat;
				background-size: 100% 100%;
				width: 250px;
				height: 73px;
				color: rgb(249, 211, 149);
				font-size: 25px;
				font-weight: 600;
			}
		}
		.topbox-fuq {
			text-align: left;
			padding-left: 37px;
			box-sizing: border-box;
			margin: 15px 0;
			span {
				color: rgb(169, 31, 39);
			}
		}
	}
	.bottombox {
		background: url(../../static/getGod.png) no-repeat;
		background-size: 100% 100%;
		width: 674px;
		height: 70px;
		margin: 0 auto;
	}
	.bottomtable > li {
		border-bottom: solid 3px black;
	}
	.bottomtable {
		width: 674px;
		margin: 0 auto;
		border: solid 3px black;
		box-sizing: border-box;
		border-radius: 15px;
		font-size: 22.61px;
		.cuszj {
			height: 390px;
			overflow: scroll;
		}
		li {
			display: flex;
			justify-content: space-between;
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				padding: 5px;
				border-right: solid 3px black;
				border-bottom: solid 3px black;
				overflow: hidden;
				white-space: nowrap;
				font-weight: 600;
			}
			div:first-of-type {
				flex: none;
				width: 200px;
			}
			div:nth-of-type(2) {
				flex: 1.2;
			}
			div:last-of-type {
				border-right: none;
			}
		}

		li:last-of-type {
			div {
				border-bottom: none;
			}
		}
	}
}
</style>
