<template>
	<div class="box">
		<div class="home">
			<div class="rulebutton" @click="goto('rule')"></div>
			<div class="money">
				<div class="MoneyGod" @click="!isguanzhu ? (isshow = false) : goto('MoneyGod')"><div class="cursor"></div></div>
				<div class="Fortunes" @click="!isguanzhu ? (isshow = false) : goto('Fortunes')"></div>
				<div class="callMoney" @click="onlygoto()"></div>
			</div>
		</div>
		<div class="modal" :class="{ show: !isshow }">
			<div class="qrcbox">
				<div class="qrcbox-img"><img src="../../static/qrcnei.png" /></div>
				<div class="modal-button" @click="close">关闭</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/getapi.js';
export default {
	name: 'home',
	data() {
		return {
			num: 100,
			isshow: true,
			//是否关注了
			isguanzhu: ''
		};
	},
	inject: ['isloadingshow'],
	mounted() {
		this.isloadingshow(true);
		let that = this;
		let datas = {
			url: location.href.split('#')[0]
		};
		api.jsSign(datas).then(res => {
			if (res.data.code == 200) {
				that.wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: res.data.data.appid, // 必填，公众号的唯一标识
					timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
					signature: res.data.data.signature, // 必填，签名
					jsApiList: ['getLocation', 'startRecord', 'stopRecord', 'playVoice', 'uploadVoice','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
				});
				console.log('wx获取权限结束');
				let url ='http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toYq';
				that.wx.ready(function() {
					//发送给朋友
					that.wx.updateAppMessageShareData({
						title: '乐享黄鹤楼，共度中支年', // 分享标题
						desc: '码上发财！圣诞扫码好运来！', // 分享描述
						link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
						success: function() {
							console.log('分享设置成功')
						}
					});
					//分享朋友圈
					 that.wx.updateTimelineShareData({ 
					    title: '乐享黄鹤楼，共度中支年', // 分享标题
					    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
					    success: function () {
					      // 设置成功
					    }
					  });
					console.log('开始获取坐标接口');
					that.wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function(res) {
							console.log('获取结束');
							var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							var speed = res.speed; // 速度，以米/每秒计
							var accuracy = res.accuracy; // 位置精度
							let data = {
								latitude: latitude || 0,
								longitude: longitude || 0
							};
							api.subscribe(data).then(res => {
								console.log('调取subscribe接口成功');
								if (res.data.code == 200) {
									that.isshow = res.data.data.isSubscribe;
									that.isguanzhu = res.data.data.isSubscribe;
									that.isloadingshow(false);
								} else {
									alert('认证失败');
								}
							});
						}
					});
				});
			}
		});
		//测试使用，正式时删除start
		let data = {
			latitude: 0,
			longitude: 0
		};
		api.subscribe(data).then(res => {
			if (res.data.code == 200) {
				console.log('开始测试环境下调取接口');
				that.isshow = res.data.data.isSubscribe;
				that.isguanzhu = res.data.data.isSubscribe;
				this.isloadingshow(false);
			} else {
				alert('认证失败');
			}
		});
		//测试使用，正式时删除end
	},
	methods: {
		goto(e) {
			this.$router.push(e);
		},
		close() {
			this.isshow = true;
		},
		onlygoto() {
			//正式
			// this.$layer.msg('活动时间为1月1日- 2月9日，敬请期待');
			//测试
			this.$router.push('game');
		}
	}
};
</script>

<style scoped lang="less">
// 未关注用户
.modal {
	z-index: -100;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	opacity: 0;
	outline: 0;
	text-align: center;
	-ms-transform: scale(1.185);
	-webkit-transform: scale(1.185);
	transform: scale(1.185);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-perspective: 1096px;
	perspective: 1096px;
	background: rgba(0, 0, 0, 0.6);
	-webkit-transition: all 0.3s ease-in-out 0s;
	-o-transition: all 0.3s ease-in-out 0s;
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;
	box-sizing: border-box;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	.modal-button {
		background: url(../../static/button.png) no-repeat;
		background-size: 100% 100%;
		width: 300px;
		height: 100px;
		line-height: 100px;
		font-size: 36px;
		color: rgb(249, 211, 149);
		font-weight: 700;
		letter-spacing: 10px;
		text-indent: 10px;
		white-space: nowrap;
	}
	.qrcbox {
		background: url(../../static/qrc.png) no-repeat;
		width: 623px;
		height: 790px;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.qrcbox-img {
			width: 464px;
			height: 464px;
			margin-top: 110px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.show {
	-webkit-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
	-ms-transform: scale(1);
	-webkit-transform: scale(1);
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;
	opacity: 1;
	z-index: 100;
}
@button: {
	width: 206px;
	height: 255px;
	background-size: 100% 100%;
};
.box {
	// position: fixed;
	// width: 100%;
	// height: 100%;
	// background-color: rgb(56, 134, 198);
	// background-color: rgb(56, 133, 197);
	height: 100%;
}
.home {
	width: 750px;
	height: 100%;
	background: url(../../static/homepagebg.png) no-repeat;
	background-size: 100% 100%;
	position: fixed;
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
				animation: fight 1s ease infinite both;
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
// 手指动画
@keyframes fight {
	0% {
		transform: none;
	}
	70% {
		transform: scale3d(0.8, 0.8, 0.8);
	}
	100% {
		transform: none;
	}
}
</style>
