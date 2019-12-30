<template>
	<div id="app">
		<keep-alive exclude="game"><router-view v-if="isrouter"></router-view></keep-alive>
		<div class="loading" v-if="isshow"><div class="loadingimg"></div></div>
	</div>
</template>

<script>
	import api from '@/getapi.js';
export default {
	name: 'App',
	provide() {
		return {
			isloadingshow: this.isloadingshow,
			isrouter:this.isrouter
		};
	},
	data() {
		return {
			isshow: false,
			isrouters:true
		};
	},
	mounted() {
		 // this.$router.push('/');
		if(this.$route.path!='/'){
			this.getwx();	
			console.log(123)
		}
	},
	methods: {
		//开关路由刷新
		isrouter(){
			this.isrouters= false;
			this.$nextTick(function(){
			  this.isrouters=true
			})
		},
		// 获取微信权限
		getwx() {
			let that =this;
			if (localStorage.getItem('jsSign')) {
				this.isloadingshow(true);
				let jsSign =JSON.parse(localStorage.getItem('jsSign'));
				this.wxsdk(jsSign);
			} else {
				this.isloadingshow(true);
				let datas = {
					url: location.href.split('#')[0]
				};
				api.jsSign(datas).then(res => {
					if (res.data.code == 200) {
						localStorage.setItem('jsSign',JSON.stringify(res.data.data));
						that.wxsdk(res.data.data)
					}else{
						that.$layer.msg('获取权限失败')
					}
				}).catch((err)=>{
					that.$layer.msg('获取权限失败')
				})
			}
		},
		wxsdk(e) {
			let that = this;
			that.wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: e.appid, // 必填，公众号的唯一标识
				timestamp: e.timestamp, // 必填，生成签名的时间戳
				nonceStr: e.nonceStr, // 必填，生成签名的随机串
				signature: e.signature, // 必填，签名
				jsApiList: [
					'getLocation',
					'startRecord',
					'stopRecord',
					'playVoice',
					'uploadVoice',
					'updateAppMessageShareData',
					'updateTimelineShareData',
					'onMenuShareTimeline',
					'onMenuShareAppMessage'
				] // 必填，需要使用的JS接口列表
			});
			console.log('wx获取权限结束');
			//正式
			//let url = 'https://wx.hhl1916.com/huanghelou1916-center/wx/gCode?name=toYq';
			//测试http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toYq
			let url ='http://qrhhl.yunyutian.cn/huanghelou1916-center/wx/gCode?name=toYq';
			that.wx.ready(function() {
				//发送给朋友
				that.wx.updateAppMessageShareData({
					title: '乐享黄鹤楼，共度中支年', // 分享标题
					desc: '码上发财！圣诞扫码好运来！', // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
					success: function() {
						console.log('分享设置成功');
					}
				});
				//分享朋友圈
				that.wx.updateTimelineShareData({
					title: '乐享黄鹤楼，共度中支年', // 分享标题
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
					success: function() {
						// 设置成功
						console.log('分享朋友圈设置成功');
					}
				});
				console.log('开始获取坐标接口');
				// 分享朋友圈回调
				that.wx.onMenuShareTimeline({
					title: '乐享黄鹤楼，共度中支年', // 分享标题
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
						api.share()
							.then(res => {
								if (res.data.code == 200) {
									that.$layer.msg('分享成功');
								} else {
									that.$layer.msg('分享失败');
								}
							})
							.catch(err => {
								that.$layer.msg('服务器链接失败');
							});
					}
				});
				// 分享朋友回调
				that.wx.onMenuShareAppMessage({
					title: '乐享黄鹤楼，共度中支年', // 分享标题
					desc: '码上发财！圣诞扫码好运来！', // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://pic.cwyyt.cn/upload/img/20191220/1337253725_fenxiang.jpg', // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						api.share()
							.then(res => {
								if (res.data.code == 200) {
									that.$layer.msg('分享成功');
								} else {
									that.$layer.msg('分享失败');
								}
							})
							.catch(err => {
								that.$layer.msg('服务器链接失败');
							});
					}
				});
				//获取经纬度
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
					}
				});
				that.isloadingshow(false);
			});
		},
		isloadingshow(e) {
			this.isshow = e;
		}
	}
};
</script>

<style lang="less">
body,
html,
p,
ul {
	margin: 0;
	padding: 0;
}
.mescroll-downwarp {
	.downwarp-tip {
		font-size: 30px;
	}
}
.mescroll-upwarp {
	.upwarp-tip {
		font-size: 30px;
	}
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: black;
	width: 750px;
	height: 100%;
}
.loading {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	color: #fff;
	background: #000 url(../static/loading.gif) no-repeat;
	background-size: 100px 100px;
	background-position: center center;
	opacity: 0.6;
	z-index: 9999;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	border-radius: 20px;
	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
	display: flex;
	justify-content: center;
	align-items: center;
}
.loadingimg {
}
</style>
