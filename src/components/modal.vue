<template>
	<div class="modal" :class="{ show: isshow }">
		<!-- wait -->
		<div v-if="haswhat == 'wait'"><div class="wait"></div></div>
		<!-- 选择性别 -->
		<div class="chose" v-if="haswhat == 'sex'">
			<div class="chose-people">
				<div><img src="../../static/game/nan.png" alt="男性" @click="confirm('man')" /></div>
			</div>
			<div class="chose-people">
				<div><img src="../../static/game/nv.png" alt="女性" @click="confirm('woman')" /></div>
			</div>
		</div>
		<!-- 开始游戏 -->
		<div v-if="haswhat == 'start'">
			<div class="startgame" @click="confirm('startgame')"><img src="../../static/game/startgame.png" alt="开始游戏" /></div>
		</div>
		<!-- 活动规则 -->
		<div v-if="haswhat == 'actrule'">
			<div class="actrule">
				<p>
					<span class="strong">1.游戏时间</span>
					：1月1日—2月9日；
				</p>
				<p>
					<span class="strong">2.参与方式:</span>
					游戏开始后，楼主通过调整人物到正确的飞行角度和喊“财神到”的音量，控制角色的向上飞行。要角度准确，音量够大（可参考页面上的音量蓄力值）才能够见到财神哦，每位楼主每天都有三次参与机会；
				</p>
				<p>
					<span class="strong">3.道具升级:</span>
					累计登录10天可获得竹蜻蜓（奖励“补登卡”3张）、累计登录20天可获得风火轮（奖励“生花之笔”3支）、累计登录30天可获得筋斗云（奖励“神来之笔”3支），奖励道具将于活动结束后5个工作日发放~
				</p>
				<p>
					<span class="strong">4.游戏奖励:</span>
					成功见到财神后的楼主们便可获得惊喜奖励，包括大吉大利财神签、楼币、超值福袋，海量楼楼周边等大波好礼;
				</p>
				<p>5.点击页面上的“财运足迹”即可查看自己的奖品记录。</p>
			</div>
			<div class="closegame" @click="close"><div></div></div>
		</div>
		<!-- 蓄力不够 -->
		<div v-if="haswhat == 'Insufficient'">
			<div class="Insufficient">
				<p>很遗憾，</p>
				<p>您的"财神到"蓄力还不够哦，</p>
				<p>这次没见到财神，还请再接再历哦！</p>
				<div class="moneygod"></div>
				<div class="closegame" @click="close('shua')"><div></div></div>
			</div>
		</div>
		<!-- 角度偏出 -->
		<div v-if="haswhat == 'wrongangle'">
			<div class="Insufficient">
				<p>很遗憾，您的角度偏出咯，</p>
				<p>与财神插肩而过。</p>
				<p>对准推荐瞄准区更容易见到财神哦！</p>
				<div class="wrongangle"></div>
				<div class="closegame" @click="close('shua')"><div></div></div>
			</div>
		</div>
		<!-- 中奖 -->
		<div v-if="haswhat == 'lookgod'">
			<div class="Insufficient">
				<p>恭喜您成功见到财神</p>
				<div v-if="type == 1">
					<p>并收获了一支大吉大利财神签！</p>
					<p>
						签号：
						<span class="textred strong">{{ fuqian }}</span>
					</p>
				</div>
				<div v-if="type == 2"><p>并收获了18楼币！</p></div>
				<div v-if="type == 3"><p>并收获了福袋！</p></div>
				<div v-if="type == 4"><p>并收获了楼楼周边！</p></div>
				<div class="lookgod"></div>
				<div class="closegame" @click="close('shua')"><div></div></div>
			</div>
		</div>
		<!-- 财运足迹 -->
		<div v-if="haswhat == 'moneyget'" class="moneyget">
			<div class="moneytext"></div>
			<div class="moneygetBox">
				<div class="moneytitle">
					<div><span>时间</span></div>
					<div><span>奖励</span></div>
				</div>
				<mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
					<ul>
						<li v-for="(item, index) in datalist" :key="index">
							<div>
								<span>{{ item.insertTime }}</span>
							</div>
							<div>
								<span>{{ item.prizeName }}{{ item.blessingRecordId }}</span>
							</div>
						</li>
						<!-- 虚线充位置 -->
						<li v-for="(item, index) in datalistlength" :key="index + '1'">
							<div><span></span></div>
							<div><span></span></div>
						</li>
					</ul>
				</mescroll-vue>
			</div>
			<div class="closegame" @click="close"><div></div></div>
		</div>
		<div class="game-rule" v-if="haswhat == 'sex' || haswhat == 'start'">
			<div @click="chosemodal('actrule')">活动规则</div>
			<div @click="chosemodal('moneyget')">财运足迹</div>
		</div>
	</div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
	name: 'modal',
	data() {
		return {
			// 刷新组件的属性
			mescroll: null, // mescroll实例对象
			mescrollUp: {
				callback: this.upCallback,
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 8 //每页数据条数,默认10
				},
				htmlNodata: '<p class="upwarp-nodata">-- 没有更多 --</p>'
			},
			dataList: []
		};
	},
	beforeRouteEnter(to, from, next) {
		// 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
		next(vm => {
			// 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
			vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
		});
	},
	beforeRouteLeave(to, from, next) {
		// 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
		// 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
		this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave();
		next();
	},
	components: {
		MescrollVue
	},
	props: {
		haswhat: {
			type: String,
			default: 'wait'
		},
		isshow: {
			type: Boolean,
			default: false
		},
		datalist: {
			default: ''
		},
		type: {
			default: 0
		},
		fuqian: {
			default: null
		}
	},
	computed: {
		datalistlength() {
			if (8 - this.datalist.length > 0) {
				return 8 - this.datalist.length;
			} else {
				return 0;
			}
		}
	},
	methods: {
		// mescroll组件初始化的回调,可获取到mescroll对象
		mescrollInit(mescroll) {
			this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
		},
		downCallback() {},
		upCallback(page, mescroll) {
			this.getrecord(page.num, page.size, this.mescroll);
		},
		// 获取第几页几个
		getrecord(e, f, g) {
			this.$emit('getrecord', e, f, g);
		},
		close(m) {
			this.$emit('closemodal', m);
		},
		//选中男女
		confirm(e) {
			this.$emit('confirm', e);
		},
		//显示规则或者足迹
		chosemodal(e) {
			this.$emit('chosemodal', e);
		}
	}
};
</script>

<style scoped lang="less">
@import '../common/font/font.css';
// 多次使用的样式
img {
	width: 100%;
	height: 100%;
}
.strong {
	font-weight: 600;
}
.textred {
	color: rgb(199, 49, 49);
}
// mescroll的样式
.mescroll {
	height: 90%;
	.mescroll-upwarp {
		padding: 0;
	}
}
// 关闭按钮
.closegame {
	width: 100%;
	display: flex;
	justify-content: center;
	div {
		width: 301px;
		height: 93px;
		background: url(../../static/game/closegamerule.png) no-repeat;
		background-size: 100% 100%;
	}
}
// 固定能点击的两按钮
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
//等待
.wait {
	background: url(../../static/loading.gif) no-repeat;
	background-size: 100% 100%;
	width: 100px;
	height: 100px;
}
// 选择男女
.chose {
	background: url(../../static/game/chose.png) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 544px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	box-sizing: border-box;
	.chose-people {
		div {
			width: 211px;
			height: 275px;
		}
	}
}
// 开始游戏
.startgame {
	width: 296px;
	height: 137px;
}
// 游戏规则
.actrule {
	background: url(../../static/game/actrule.png) no-repeat;
	background-size: 100% 100%;
	width: 700px;
	height: 871px;
	box-sizing: border-box;
	padding: 100px 30px 0;
	color: black;
	font-size: 30px;
	text-align: left;
	font-family: 'hyc1gj';
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
}

.Insufficient {
	font-size: 40px;
	color: rgb(245, 175, 76);
	p {
		margin-bottom: 10px;
	}
	p:last-of-type {
		margin-bottom: 0;
	}
	// 蓄力不够
	.moneygod {
		width: 495px;
		height: 357px;
		background: url(../../static/game/moneygod.png) no-repeat;
		background-size: 100% 100%;
		margin: 50px auto;
	}
	// 角度不对
	.wrongangle {
		width: 422px;
		height: 523px;
		background: url(../../static/game/angle.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 0 50px 130px;
	}
	//中奖
	.lookgod {
		width: 508px;
		height: 476px;
		background: url(../../static/game/god.png) no-repeat;
		background-size: 100% 100%;
		margin: 50px auto;
	}
}
// 财运足迹
.moneyget {
	background: url(../../static/game/moneyget.png) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.moneytext {
		background: url(../../static/game/moneytext.png) no-repeat;
		background-size: 100% 100%;
		width: 448px;
		height: 77px;
	}
	.moneygetBox {
		background: url(../../static/game/moneygetbox.png) no-repeat;
		background-size: 100% 100%;
		width: 700px;
		height: 790px;
		padding: 7px 13px 7px 7px;
		box-sizing: border-box;
		text-align: center;
		ul {
			height: 660px;
			margin-bottom: 60px;
			box-sizing: border-box;
			overflow-y: scroll;
		}
		li {
			display: flex;
			justify-content: space-around;
			font-size: 22.61px;
			color: black;
			border-bottom: dashed 2px black;
			// box-sizing: border-box;
			padding: 8px 0;
			height: 60px;
			line-height: 60px;
			div {
				width: 50%;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		li:first-of-type {
			padding: 20px 0;
		}
		.moneytitle {
			height: 70px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #f9d395;
			text-indent: 20px;
			letter-spacing: 20px;
			font-size: 32px;
			div {
				width: 50%;
			}
		}
	}
}
</style>
