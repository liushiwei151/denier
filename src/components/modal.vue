<template>
	<div class="modal" :class="{show:isshow}">
		<!-- 选择性别 -->
		<div class="chose" v-if="haswhat=='sex'">
			<div class="chose-people">
				<div><img src="/static/game/nan.png" alt="男性" @click="confirm('man')"></div>
			</div>
			<div class="chose-people">
				<div><img src="/static/game/nv.png" alt="女性" @click="confirm('woman')"></div>
			</div>
		</div>
		<!-- 开始游戏 -->
		<div v-if="haswhat=='start'">
			<div class="startgame" @click="confirm('startgame')">
				<img src="/static/game/startgame.png" alt="开始游戏">
			</div>
		</div>
		<!-- 活动规则 -->
		<div v-if="haswhat=='actrule'" >
			<div class="actrule">
				<p><span class="strong">1.游戏时间</span>：1月1日—2月9日；</p>
				 <p><span class="strong">2.参与方式:</span>游戏开始后，通过调整角色飞行的正确角度和喊“财神到”的声音，<span class="textred strong">控制角色的向上飞行。要角度准确，音量够大才能够见到财神哦，</span>每人每天都有三次参与机会，连续10天打卡将有惊喜彩蛋哦；</p>
				 <p><span class="strong">3.道具升级:</span>每天登录游戏，“见财神”道具还会升级哦！连续登录10天获得竹蜻蜓、20天获得风火轮、30天获得筋斗云；</p>
				 <p><span class="strong">4.游戏奖励:</span>成功见到财神后便可获得惊喜奖励，包括大吉大利财神签、楼币、超值福袋，海量楼楼周边等大波好礼；</p>
				 <p>5.点击页面上的“财运足迹”即可查看自己的奖品记录，分享游戏可额外获得1次游戏机会哦（每人每天最多可有一次额外机会）！</p>
			</div>
			<div class="closegame" @click="close"><div></div></div>
		</div>
		<!-- 蓄力不够 -->
		<div v-if="haswhat=='Insufficient'">
			<div class="Insufficient">
				<p>很遗憾，</p>
				<p>您的"财神到"蓄力还不够哦，</p>
				<p>这次没见到财神，还请再接再历哦！</p>
				<div class="moneygod">
					
				</div>
				<div class="closegame" @click="close"><div></div></div>
			</div>
		</div>
		<!-- 角度偏出 -->
		<div v-if="haswhat=='wrongangle'">
			<div class="Insufficient">
				<p>很遗憾，您的角度偏出咯，</p>
				<p>与财神插肩而过。</p>
				<p>对准推荐瞄准区更容易见到财神哦！</p>
				<div class="wrongangle">
					
				</div>
				<div class="closegame" @click="close"><div></div></div>
			</div>
		</div>
		<!-- 中奖 -->
		<div v-if="haswhat=='lookgod'">
			<div class="Insufficient">
				<p>恭喜您成功见到财神，</p>
				<p>并收货了一支大吉大利财神签！</p>
				<p>签号：<span class="textred strong">{{qianh}}</span></p>
				<div class="lookgod">
				</div>
				<div class="closegame" @click="close"><div></div></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'modal',
		data(){
			return{
				qianh:'084450',
			}
		},
		props:{
			haswhat:{
				type:String,
				default:'sex'
			},
			isshow:{
				type:Boolean,
				default:false,
			}
		},
		methods:{
			close(){
				this.$emit('closemodal');
			},
			//选中男女
			confirm(e){
				this.$emit('confirm',e);
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../common/font/font.css';
	// 多次使用的样式
	img{
		width: 100%;
		height: 100%;
	}
	.strong{
		font-weight: 600;
	}
	.textred{
		color:rgb(199,49,49)
	}
	// 关闭按钮
	.closegame{
		width: 100%;
		display: flex;
		justify-content: center;
		div{
			width: 301px;
			height: 93px;
			background: url(../../static/game/closegamerule.png) no-repeat;
			background-size:100% 100% ;
		}
	}
	
	// 模态框背景
	.modal {
	  z-index: -100;
	  position: fixed;
	  color: #fff;
	  font-size: 38px;
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
	// 选择男女
	.chose{
		background: url(../../static/game/chose.png) no-repeat;
		background-size:100% 100%;
		width: 750px;
		height: 544px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		.chose-people{
			div{
				width: 211px;
				height: 275px;
			}
		}
		
		
	}
	// 开始游戏
	.startgame{
		width: 296px;
		height: 137px;
	}
	// 游戏规则
	.actrule{
		background: url(../../static/game/actrule.png) no-repeat;
		background-size:100% 100%;
		width: 700px;
		height: 871px;
		box-sizing: border-box;
		padding:100px 30px 0;
		color:black;
		font-size: 30px;
		text-align: left;
		font-family: 'hyc1gj';
	}
	
	.Insufficient{
		font-size: 40px;
		color: rgb(245,175,76);
		P{
			margin-bottom:10px ;
		}
		p:last-of-type{
			margin-bottom: 0;
		}
		// 蓄力不够
		.moneygod{
			width: 495px;
			height:357px;
			background: url(../../static/game/moneygod.png) no-repeat;
			background-size:100% 100% ;
			margin: 50px auto;
		}
		// 角度不对
		.wrongangle{
			width: 422px;
			height: 523px;
			background: url(../../static/game/angle.png) no-repeat;
			background-size:100% 100% ;
			margin: 0 0 50px 130px;
		}
		//中奖
		.lookgod{
			width: 508px;
			height: 476px;
			background: url(../../static/game/god.png) no-repeat;
			background-size:100% 100% ;
			margin: 50px auto ;
		}
	}
</style>
