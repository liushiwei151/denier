<template>
	<div class="rule">
		<div class="rule-box">
			<div class="imgtext2"></div>
			<p>活动期间，每次参与扫码验真即可获取一支带有编号的财神签，编号与1916沙龙公布号码相同，可获得财神宝盒奖励！</p>
			<div class="imgtext3"></div>
			<p>活动期间，每次参与扫码验真即可获得财运积分，运气好的楼主还有机会获得双倍积分哦！根据条包扫码和盒包扫码设有两个财运积分榜，积分排名前10的用户可获得财神宝盒奖励！ <br />
3.特别提示：扫码越多，获奖几率越大哦，每位用户在整个财运榜PK活动中仅可获得一次财神宝盒奖励，已有中奖纪录的用户如在下期活动中排名前10，财运榜排名会顺延，还请谅解哦。中奖结果在每阶段活动结束后关注1916沙龙推文查看！</p>
			<div class="imgtext1"></div>
			<p class="firstp">
				1.游戏时间: 1月1日- 2月9日;
				<br />
				2.参与方式:游戏开始后，通过调整人物到正确的飞行角度和喊“财神到”的音量，控制角色的向上飞行。要角度准确，音量够大（可参考页面上的音量蓄力值）才能够见到财神哦，每人每天都有三次参与机会；
				<br />
				3.游戏奖励:成功见到财神后便可获得惊喜奖励，包括大吉大利财神签、楼币、超值福袋，海量楼楼周边等大波好礼;
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'rule'
};
</script>

<style scoped lang="less">
@import '../common/font/font.css';
@imgtexts: {
	background-size: 100% 100%;
	width: 555px;
	height: 39px;
	margin: 10px 0;
};
.rule {
	background: url(../../static/rulebg.png) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 100%;
	box-sizing: border-box;
	font-size: 26px;
	text-align: left;
	font-weight: 600;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	.rule-box {
		background: url(../../static/rulebg2.png) no-repeat;
		background-size:100% 100% ;
		width: 700px;
		height: 1128px;
		padding: 100px 30px 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.imgtext1 {
		background: url(../../static/img1.png) no-repeat;
		@imgtexts();
	}
	.imgtext2 {
		background: url(../../static/img2.png) no-repeat;
		@imgtexts();
	}
	.imgtext3 {
		background: url(../../static/img3.png) no-repeat;
		@imgtexts();
	}
	.firstp {
		// margin-bottom:70px;
	}
	.twop {
		// margin-bottom:80px;
	}
}
</style>
