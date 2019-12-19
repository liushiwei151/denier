<template>
	<div>
		<div class="gamebg" :style="{backgroundPositionY: index + 'px'}">
			<div class="game-content">
				<div class="game-prop">
					<div class="game-prop-zu"></div>
					<div class="game-prop-feng"></div>
					<div class="game-prop-yun"></div>
				</div>
				<div class="game-rule">
					<div>活动规则</div>
					<div>财运足迹</div>
				</div>
				<div class="bottom-land">
					<div class="bottom-land-xian">
						<div class="bottom-land-xian-buttonleft"></div>
						<div class="bottom-land-xian-buttonright"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="people"  :style="{position:'fixed',bottom:bottomum+'px',left:leftNum+'px'}" ></div>
	</div>
</template>

<script>
import api from '@/getapi.js';
export default {
	name: 'game',
	data(){
		return{
			localId:'',
			serverId:'',
			//返回的音频
			yip:"",
			voice:'',
			index:0,
		}
	},
	computed:{
		// 人物的位置
		bottomum:()=>{
			return 20+10
		},
		leftNum:()=>{
			return 100+20
		}
	},
	mounted() {
		setInterval(this.top,1000000)
	},
	methods: {
		top(){
			this.index=this.index+2;
		},
		// 开始录音
		star() {
			this.wx.startRecord();
		},
		// 停止录音
		stop() {
			let that =this;
			this.wx.stopRecord({
				success: function(res) {
					that.localId = res;
					that.wx.uploadVoice({
					  localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
					  isShowProgressTips: 1, // 默认为1，显示进度提示
					  success: function (res) {
					    that.serverId = res.serverId; // 返回音频的服务器端ID
						console.log(res.serverId);
						api.getVoice(res.serverId).then((res)=>{
							that.yip=res;
						})
					  }
					});
					
				}
			});
		},
		// 上传语音
		upload(){
			this.wx.uploadVoice({
			  localId: this.localId.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
			  isShowProgressTips: 1, // 默认为1，显示进度提示
			  success: function (res) {
			    this.serverId = res.serverId; // 返回音频的服务器端ID
			  }
			});
		}
	}
};
</script>
<style scoped lang="less">
	// 灰色滤镜
	.gray{
		filter: grayscale(100%);
	}
	.gamebg{
		background: url(../../static/callbg.jpg) repeat-y;
		background-size: 100% 100%;
		width: 750px;
		height: 1334px;
	}
	.game-content{
		position: fixed;
		bottom: 0;
		.game-prop{
			height: 400px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-bottom:150px;
			padding-left:20px ;
			.game-prop-zu{
				width: 132px;
				height: 99px;
				background: url(../../static/game/zuqingt.png) no-repeat;
				background-size:100% 100% ;
			}
			.game-prop-feng{
				width: 142px;
				height: 126px;
				background: url(../../static/game/fenghuolun.png) no-repeat;
				background-size:100% 100% ;
			}
			.game-prop-yun{
				width: 136px;
				height: 99px;
				background: url(../../static/game/yun.png) no-repeat;
				background-size:100% 100% ;
			}
		}
		.game-rule{
			display: flex;
			justify-content: space-between;
			margin-bottom:50px;
			div{
				width:141px ;
				height: 75px;
				white-space:nowrap;
				color:rgb(249,211,149);
				font-size: 25px;
				line-height: 75px;
				font-weight: 600;
				text-align: center;
			}
			div:first-of-type{
				background: url(../../static/game/rule.png) no-repeat;
				background-size:100% 100% ;
			}
			div:last-of-type{
				background: url(../../static/game/rule2.png) no-repeat;
				background-size:100% 100% ;
			}
			
		}
		.bottom-land{
			background: url(../../static/game/bottom.png) no-repeat;
			background-size:100% 100% ;
			width: 750px;
			height: 260px;
			padding:40px 85px 0;
			box-sizing: border-box;
			.bottom-land-xian{
				background: url(../../static/game/zu12.png) no-repeat;
				background-size:580px 72px ;
				width: 580px;
				height: 150px;
				display: flex;
				justify-content: space-between;
				background-position-y:50% ;
				box-sizing: border-box;
				padding:0 23px;
				.bottom-land-xian-buttonleft{
					width: 233px;
					height: 136px;
					background: url(../../static/game/ConfirmAiming.png) no-repeat;
					background-size:100% 100% ;
				}
				.bottom-land-xian-buttonright{
					width: 233px;
					height: 136px;
					background: url(../../static/game/callgod.png) no-repeat;
					background-size:100% 100% ;
				}
			}
		}
	}
	.people{
		width: 147px;
		height: 283px;
		background: url(../../static/game/woman.png) no-repeat;
		background-size:100% 100% ;
	}
</style>
