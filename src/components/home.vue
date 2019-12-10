<template>
	<div class="home">
		<div class="rulebutton" @click="gorule"></div>
		<div class="money">
			<div class="MoneyGod"><div class="cursor"></div></div>
			<div class="Fortunes"></div>
			<div class="callMoney"></div>
		</div>
		<button @click="fn" class="fn" :style="{top:num+'px'}">111</button>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			num:100
		};
	},
	methods: {
		gorule() {
			// this.$router.push('rule');
		},
		fn() {
			var audioContext = new AudioContext();
			let self =this;
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				// 获取用户的 media 信息
				navigator.mediaDevices
					.getUserMedia({ audio: true })
					.then(stream => {
						// 将麦克风的声音输入这个对象
						var mediaStreamSource = audioContext.createMediaStreamSource(stream);
						// 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
						var scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
						// 将该分析对象与麦克风音频进行连接
						mediaStreamSource.connect(scriptProcessor);
						// 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
						scriptProcessor.connect(audioContext.destination);
						// 开始处理音频
						scriptProcessor.onaudioprocess = function(e) {
							// 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
							let buffer = e.inputBuffer.getChannelData(0);
							// 获取缓冲区中最大的音量值
							let maxVal = Math.max.apply(Math, buffer);
							// 显示音量值
							self.num=Math.round(maxVal * 100);
							console.log(self.num,Math.round(maxVal * 100))
						};
					})
					.catch(error => {
						alert('获取音频时好像出了点问题。'+error)
					});
			} else {
				alert('不支持获取媒体接口');
			}
		}
	}
};
</script>

<style scoped lang="less">
	.fn{
		position: absolute;
	}
@button: {
	width: 206px;
	height: 255px;
	background-size: 100% 100%;
};
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
