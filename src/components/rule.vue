<template>
	<div class="rule">
		<div class="rule-box">
			<div class="imgtext1"></div>
			<p class="firstp">活动期间，每次参与扫码验真即可获取一支带有编号的财神签，编号与1916沙龙公布号码相同，可获得财神宝盒奖励！</p>
			<div class="imgtext2"></div>
			<p >活动期间，每次参与扫码验真即可获得财运积分，运气好的楼主还有机会获得双倍积分哦！根据条包扫码和盒包扫码设有两个财运积分榜，积分排名前10的用户可获得财神宝盒奖励！ </p>
			<p class="twop">特别提示：扫码越多，获奖几率越大哦，每位用户在整个财运榜PK活动中仅可获得一次财神宝盒奖励，已有中奖纪录的用户如在下期活动中排名前10，财运榜排名会顺延，还请谅解哦。中奖结果在阶段活动结束后关注1916沙龙推文查看！</p>
			<div class="imgtext3"></div>
			<p>1.游戏时间：1月1日—2月9日；</p>
			<p>2.参与方式：游戏开始后，通过喊“财神到”声音的高低长短，控制角色的向上飞行节奏，要有足够的音量才能见到财神哦，每人每天都有三次参与机会；</p>
			<p>3.游戏奖励：成功见到财神后便可获得惊喜奖励，包括大吉大利财神签、楼币、超值福袋，海量楼楼周边等大波好礼；</p>
			<p>4.点击页面上的“我的财运足迹”即可查看自己的奖品记录，分享游戏可额外获得1次游戏机会哦（每人每天最多可有一次额外机会）！</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:'rule'
	}
</script>

<style scoped lang="less">
	@import '../common/font/font.css';
	@imgtexts:{
		background-size:100% 100% ;
		width: 555px;
		height: 39px;
		margin:10px 0;
	}
	.rule{
		background: url(../../static/rulebg.jpg) no-repeat;
		background-size: 100% 100%;
		width: 750px;
		height: 1334px;
		padding-top:280px ;
		box-sizing: border-box;
		font-size: 26px;
		text-align: left;
		font-weight: 600;
		color: black;
		.rule-box{
			margin: 0 77px 70px;
		}
		.imgtext1{
			background: url(../../static/img1.png) no-repeat;
			@imgtexts();
		}
		.imgtext2{
			background: url(../../static/img2.png) no-repeat;
			@imgtexts();
		}
		.imgtext3{
			background: url(../../static/img3.png) no-repeat;
			@imgtexts();
		}
		.firstp{
			// margin-bottom:70px;
		}
		.twop{
			// margin-bottom:80px;
		}
	}
</style>
