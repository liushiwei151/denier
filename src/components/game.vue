<template>
	<div>
		<div class="gamebg" :style="{ backgroundPositionY: index + 'px' }">
			<div class="game-peoples"><canvas id="peoples"></canvas></div>
			<div class="bottom-land">
				<div class="bottom-land-xian">
					<div class="bottom-land-xian-buttonleft" @click="fn"></div>
					<div class="bottom-land-xian-buttonright"></div>
				</div>
			</div>
		</div>
		<!-- 往下落的动画 -->
		<div class="game-prop">
			<div class="game-prop-zu"></div>
			<div class="game-prop-feng"></div>
			<div class="game-prop-yun"></div>
		</div>
		<div class="game-rule">
			<div>活动规则</div>
			<div>财运足迹</div>
		</div>
		<div class="xuli">
				<div>蓄力值：{{xuli}}</div>
				<div class="xulicao">
					<div :style="{width:xuli+'%'}"></div>
				</div>
		</div>
		<modal></modal>
	</div>
</template>

<script>
import api from '@/getapi.js';
import modal from '@/components/modal'
export default {
	name: 'game',
	data() {
		return {
			localId: '',
			serverId: '',
			//返回的音频
			yip: '',
			voice: '',
			index: 0,
			//返回的蓄力值
			xuli:30,
			//人物的图片对象
			peopleimg: '',
			//选中是谁的图像
			imgurl: '/static/game/man.png',
			imgIsLoaded: 'false', //图片是否加载完成;
			//canvas对象
			canvas: '',
			//人物图像的比例
			imgwidth: '',
			imgheight: '',
			//人物的坐标
			imgx: 0,
			imgy: 0
		};
	},
	components:{
		modal
	},
	mounted() {
		this.loadImg();
	},
	methods: {
		fn() {
			let that = this;
			//尝试旋转图像
			// that.context.translate(this.canvas.width,this.canvas.height);
			// that.context.rotate(Math.PI/4);
			let move = setInterval(() => {
				// that.imgx=that.imgx-1;
				if (that.imgy < 50) {
					console.log('移动结束');
					clearInterval(move);
				} else {
					console.log('移动中');
					that.imgx = that.imgx - 0.5;
					that.imgy = that.imgy - 1;
					that.index++;
				}
				that.drawImage();
			}, 10);
		},
		// 初始化canvas属性
		loadImg() {
			this.peopleimg = new Image();
			let that = this;
			this.canvas = document.getElementById('peoples');
			this.context = this.canvas.getContext('2d'); //画布显示二维图片
			this.canvas.width = this.canvas.offsetWidth;
			this.canvas.height = this.canvas.offsetWidth;
			this.imgwidth = document.body.clientWidth / 750;
			this.imgheight = document.body.clientHeight / 1334;
			this.peopleimg.src = this.imgurl;
			that.imgx = (that.canvas.width - that.imgwidth * 147) / 2;
			that.imgy = that.canvas.height - that.imgheight *283;
			this.peopleimg.onload = function() {
				that.imgIsLoaded = true;
				that.drawImage();
			};
			console.log(this.imgx, this.imgy);
		},
		// 调用图片
		drawImage() {
			let that = this;
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.drawImage(
				that.peopleimg, //规定要使用的图像、画布或视频。
				0,
				0, //开始剪切的 x 坐标位置。
				this.peopleimg.width,
				this.peopleimg.height, //被剪切图像的高度。
				this.imgx,
				this.imgy, //在画布上放置图像的 x 、y坐标位置。
				this.peopleimg.width * this.imgwidth,
				this.peopleimg.height * this.imgheight //要使用的图像的宽度、高度
			);
			console.log(this.imgx,this.imgy)
		},
		// 开始录音
		star() {
			this.wx.startRecord();
		},
		// 停止录音
		stop() {
			let that = this;
			this.wx.stopRecord({
				success: function(res) {
					that.localId = res;
					that.wx.uploadVoice({
						localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						isShowProgressTips: 1, // 默认为1，显示进度提示
						success: function(res) {
							that.serverId = res.serverId; // 返回音频的服务器端ID
							console.log(res.serverId);
							api.getVoice(res.serverId).then(res => {
								that.yip = res;
							});
						}
					});
				}
			});
		},
		// 上传语音
		upload() {
			this.wx.uploadVoice({
				localId: this.localId.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function(res) {
					this.serverId = res.serverId; // 返回音频的服务器端ID
				}
			});
		}
	}
};
</script>
<style scoped lang="less">
.game-peoples {
	width: 750px;
	height: 78%;
	#peoples {
		width: 100%;
		height: 100%;
	}
}

// 灰色滤镜
.gray {
	filter: grayscale(100%);
}
.gamebg {
	background: url(../../static/callbg.jpg) repeat-y;
	background-size: 100% 100%;
	width: 750px;
	height: 100%;
	position: fixed;
}

.game-prop {
	height: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 20px;
	position: fixed;
	bottom: 50%;
	.game-prop-zu {
		width: 132px;
		height: 99px;
		background: url(../../static/game/zuqingt.png) no-repeat;
		background-size: 100% 100%;
	}
	.game-prop-feng {
		width: 142px;
		height: 126px;
		background: url(../../static/game/fenghuolun.png) no-repeat;
		background-size: 100% 100%;
	}
	.game-prop-yun {
		width: 136px;
		height: 99px;
		background: url(../../static/game/yun.png) no-repeat;
		background-size: 100% 100%;
	}
}
.game-rule {
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 30%;
	width: 100%;
	div {
		width: 141px;
		height: 75px;
		white-space: nowrap;
		color: rgb(249, 211, 149);
		font-size: 25px;
		line-height: 75px;
		font-weight: 600;
		text-align: center;
	}
	div:first-of-type {
		background: url(../../static/game/rule.png) no-repeat;
		background-size: 100% 100%;
	}
	div:last-of-type {
		background: url(../../static/game/rule2.png) no-repeat;
		background-size: 100% 100%;
	}
}
.bottom-land {
	background: url(../../static/game/bottom.png) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 22%;
	padding: 40px 85px 0;
	box-sizing: border-box;
	.bottom-land-xian {
		background: url(../../static/game/zu12.png) no-repeat;
		background-size: 580px 72px;
		width: 580px;
		height: 150px;
		display: flex;
		justify-content: space-between;
		background-position-y: 50%;
		box-sizing: border-box;
		padding: 0 23px;
		.bottom-land-xian-buttonleft {
			width: 233px;
			height: 136px;
			background: url(../../static/game/ConfirmAiming.png) no-repeat;
			background-size: 100% 100%;
		}
		.bottom-land-xian-buttonright {
			width: 233px;
			height: 136px;
			background: url(../../static/game/callgod.png) no-repeat;
			background-size: 100% 100%;
		}
	}
}
.xuli{
	position: fixed;
	top:7%;
	color:rgb(240,131,49);
	font-size: 28px;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	.xulicao{
		margin-top:15px ;
		width: 300px;
		height: 35px;
		border: solid 3px black;
		border-radius: 30px;
		box-shadow: 0px 10px 10px rgb(208,110,106) inset;
		overflow: hidden;
		box-sizing: border-box;
		div{
			height:40px;
			border-right:solid 3px black;
			background-color:rgb(240,131,49) ;
		}
	}
}
.people {
	width: 147px;
	height: 283px;
	background: url(../../static/game/woman.png) no-repeat;
	background-size: 100% 100%;
}
</style>
