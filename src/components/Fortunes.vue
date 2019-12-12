<template>
	<div class="box">
		<div class="Fortunes">
			<div class="Fortunes-text">本次活动您已有过中奖纪录，不能参与后续竞奖，敬请谅解哦！</div>
			<div class="Fortunes-topbox">
				<div class="Fortunes-title">
					<p>昵称：小北</p>
					<p>用户编号：1230600</p>
				</div>
				<div class="Fortunes-topbox-box">
					<p>
						<span>
							条包财运积分：
							<span class="juh">2321</span>
						</span>
						<span>
							排名：
							<span class="juh">1</span>
						</span>
					</p>
					<p>
						<span>
							盒包财运积分：
							<span class="juh">2321</span>
						</span>
						<span>
							排名：
							<span class="juh">1</span>
						</span>
					</p>
					<p>
						活动中奖记录:
						<a href="#" class="juh">第一期条包财运榜top01</a>
					</p>
				</div>
			</div>
			<div class="Fortunes-bottombox">
				<div class="bottom-title"></div>
				<div class="bottomli">
					<div class="bottom-firstli">
						<div>排名</div>
						<div>用户编号</div>
						<div>昵称</div>
						<div>财运积分</div>
					</div>
					<ul class="cuszj">
						<li v-for="(item, index) in 19" :key="index">
							<div>top{{ index + 1 }}</div>
							<div>11230601</div>
							<div>小小北</div>
							<div>256355</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Fortunes'
};
</script>

<style scoped lang="less">
li {
	list-style-type: none;
}
.juh {
	color: rgb(169, 31, 39);
}
.box {
	position: flex;
	width: 100%;
	height: 100%;
}
.Fortunes {
	background: url(../../static/Fortunes.jpg) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 1334px;
	padding-top: 500px;
	box-sizing: border-box;
	.Fortunes-text {
		font-size: 20px;
		color: rgb(169, 31, 39);
		font-weight: 600;
		margin-bottom: 10px;
	}
	.Fortunes-topbox {
		background: url(../../static/topbox.png) no-repeat;
		background-size: 100% 100%;
		width: 678px;
		height: 231px;
		font-weight: 600;
		margin: 0 auto 20px;
		font-size: 26px;
		.Fortunes-topbox-box {
			margin-top: 15px;
			p {
				margin-bottom: 10px;
			}
		}
		.Fortunes-title {
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
	}
	.Fortunes-bottombox {
		background: url(../../static/bottombox.png) no-repeat;
		background-size: 100% 100%;
		width: 674px;
		height: 503px;
		margin: 0 auto;
		overflow: hidden;
		.bottom-title {
			background: url(../../static/bottomtitle.png) no-repeat;
			background-size: 100% 100%;
			width: 674px;
			height: 74px;
		}
		.bottomli {
			width: 674px;
			margin: 0 auto;
			box-sizing: border-box;
			font-size: 22.61px;
			.bottom-firstli {
				margin: 15px 0;
				display: flex;
				justify-content: space-between;
				div {
					width: 100%;
					font-weight: 600;
				}
			}
			.cuszj {
				height: 400px;
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
					overflow: hidden;
					white-space: nowrap;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
