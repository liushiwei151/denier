<template>
	<div>
		<button @click="star">开始录音</button>
		<button @click="stop">停止录音</button>
		<!-- <div>音频所有数据:{{localId}}</div>
		<div>音频编号:{{localId.localId}}</div> -->
		<button @click="bof">开始播放</button>
		<button @click="upload">上传语音</button>
	<!-- 	<div>音频服务端id：{{serverId}}</div> -->
		<div>返回的音频:{{yip}}</div>
		<audio :src="voice" controls='controls'>99999</audio>
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
			yip:"",
			voice:''
		}
	},
	mounted() {
	},
	methods: {
		star() {
			this.wx.startRecord();
		},
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
		bof(){
			this.wx.playVoice({
			  localId: this.localId.localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
		},
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
<style scoped></style>
