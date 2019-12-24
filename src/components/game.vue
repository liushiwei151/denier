<template>
	<div>
		<div class="gamebg" :style="{ backgroundPositionY: index + 'px' }">
			<div class="game-peoples"><canvas id="peoples"></canvas></div>
			<div class="bottom-land">
				<div class="bottom-land-xian">
					<div
						class="bottom-land-xian-buttonleft"
						:style="{ backgroundImage: 'url(../../static/game/' + leftbutton + '.png)' }"
						@click="truemz"
					></div>
					<div class="bottom-land-xian-buttonright"></div>
				</div>
			</div>
		</div>
		<!-- 往下落的动画 -->
		<div class="game-prop">
			<div @click="gameProp(10)" class="game-prop-zu" :style="{ filter: day >= 10 ? '' : 'grayscale(100%)' }" ></div>
			<div @click="gameProp(20)" class="game-prop-feng" :style="{ filter: day >= 20 ? '' : 'grayscale(100%)' }"></div>
			<div @click="gameProp(30)" class="game-prop-yun" :style="{ filter: day >= 30 ? '' : 'grayscale(100%)' }"></div>
		</div>
		<div class="game-rule">
			<div @click="showmodal('actrule')">活动规则</div>
			<div @click="showmodal('moneyget')">财运足迹</div>
		</div>
		<div class="xuli" v-if="gameProgress == 'forceFront'">
			<div>蓄力值：{{ xuli }}</div>
			<div class="xulicao"><div :style="{ width: xuli + '%' }"></div></div>
		</div>
		<div class="lasttime" v-if="gameProgress == 'forceAfter'">倒计时：{{ timenum }}</div>
		<modal :haswhat="haswh" :isshow="modalshow" @closemodal="closemodal" @confirm="confirm"></modal>
	</div>
</template>

<script>
import api from '@/getapi.js';
import modal from '@/components/modal';
export default {
	name: 'game',
	data() {
		return {
			//签到的天数
			day: null,
			//modal弹出的内容
			haswh: '',
			modalshow: true,
			//微信录音的id
			localId: '',
			serverId: '',
			//返回的音频
			yip: '',
			voice: '',
			index: 0,
			//返回的蓄力值
			xuli: 30,
			//人物的图片对象
			peopleimg: '',
			//选中是谁的图像
			imgurl: '/static/game/woman.png',
			// 指针图片
			pointimg: '/static/game/point.png',
			imgIsLoaded: false, //人物图片是否加载完成;
			imgIspoint: false, //指针图片是否加载完成
			//canvas对象
			canvas: '',
			//人物图像的比例
			imgwidth: '',
			imgheight: '',
			//人物的坐标
			imgx: 0,
			imgy: 0,
			//指针的循环对象
			movep: '',
			degrees: 0, //指针度数
			leftbutton: 'ConfirmAiming', //button按钮的样式
			flag: true, //指针方向true右false左
			timenum: 10, //倒计时时间
			//游戏进度确定倒计时和蓄力曹的切换
			gameProgress: 'forceAfter',
			timer: '', //长按点击的循环对象
			//游戏剩余的次数
			gamenum:null,
		};
	},
	components: {
		modal
	},
	created() {
		this.getstart();
		this.getrecord();
	},
	mounted() {
		this.loadImg();
		// this.movepoint();
	},
	methods: {
		// 接口
		// 获得用户是否选择了性别是否有性别的接口
		getstart(){
			let data={
				type:0
			}
			let that =this;
			api.start(data).then((res)=>{
				if(res.data.code==200){
					this.day=res.data.data.count;
					this.gamenum=res.data.data.user.gamesPlayed
					if(res.data.data.user.gender==null){
						that.haswh='sex'
					}else if(res.data.data.user.gender==1){
						that.imgurl = '/static/game/man.png';
						this.loadImg();
						that.haswh='start';
					}else if(res.data.data.user.gender==2){
						that.imgurl = '/static/game/woman.png';
						this.loadImg();
						that.haswh='start';
					}
				}
			}).catch((err)=>{
				this.$layer.msg('性别获取失败')
			})
		},
		//游戏足迹的接口
		getrecord(){
			let data ={
				pageNum:10,
				pageSize:10
			}
			api.record(data).then((res)=>{
				console.log(res);
			}).catch((err)=>{
				console.log(err);
			})
		},
		//点击左边电话
		gameProp(e){
			if(e==10&&e<=this.day){
				const zu =document.getElementsByClassName('game-prop-zu')[0];
			zu.classList.add('animated', 'heartBeat');
			setTimeout(()=>{
				zu.classList.remove('animated', 'heartBeat')
			},1000)
			}else if(e==20&&e<=this.day){
				const feng =document.getElementsByClassName('game-prop-feng')[0];
				feng.classList.add('animated', 'heartBeat');
				setTimeout(()=>{
					feng.classList.remove('animated', 'heartBeat')
				},1000)
			}else if(e==30&&e<=this.day){
				const yun =document.getElementsByClassName('game-prop-yun')[0];
				yun.classList.add('animated', 'heartBeat');
				setTimeout(()=>{
					yun.classList.remove('animated', 'heartBeat')
				},1000)
			}
		},
		//人物移动
		movepeople(){
			setInterval(()=>{
				this.index+=30;
				/*if(this.index<=3000){
					this.imgy--;
					this.drawImage();
				}*/
			},50)
		},
		//绑定长按按钮
		touch() {
			let starttime = '';
			let endtime = '';
			let that = this;
			let callgod = document.getElementsByClassName('bottom-land-xian-buttonright')[0];
			callgod.addEventListener('touchstart', function() {
				starttime = new Date().getTime();
				this.timer = setTimeout(() => {
					//开始录音
					that.timenum = 3;
					let timealse = setInterval(() => {
						if (that.timenum > 0) {
							that.timenum--;
						} else {
							clearInterval(timealse);
						}
						console.log('倒计时中');
					}, 1000);
					console.log('长按开始');
				}, 700);
			});
			callgod.addEventListener('touchend', function() {
				endtime = new Date().getTime();
				if (endtime - starttime < 700) {
					clearTimeout(this.timer);
					console.log('长按结束');
					
				} else {
					//模拟直接移动
					that.movepeople();
					//结束录音
					console.log('结束录音');
				}
			});
		},
		// 确认瞄准
		truemz() {
			if (this.leftbutton == 'ConfirmAiming') {
				this.leftbutton = 'ReAiming';
				clearInterval(this.movep);
			} else if (this.leftbutton == 'ReAiming') {
				this.leftbutton = 'ConfirmAiming';
				this.movepoint();
			} else {
				return;
			}

			console.log('度数' + this.degrees);
		},
		// 画布循环内容
		allcanvas() {
			// 先清空
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// 再绘图
			this.drawImage();
			// this.drawPoint();
		},
		// 初始化canvas属性
		loadImg() {
			let that = this;
			this.canvas = document.getElementById('peoples');
			this.context = this.canvas.getContext('2d'); //画布显示人物
			this.pointcont = this.canvas.getContext('2d'); //指针的画布
			this.canvas.width = this.canvas.offsetWidth * 3;
			this.canvas.height = this.canvas.offsetHeight * 3;
			this.imgwidth = document.body.clientWidth / 750;
			this.imgheight = document.body.clientHeight / 1334;
			// this.context.translate(73.5, 141.5);
			// this.context.rotate(0);
			// that.imgx=that.imgx-73.5;
			// that.imgy=that.imgy-141.5;
			this.peopleimg = new Image();
			this.peopleimg.src = this.imgurl;
			this.peopleimg.onload = function() {
				that.imgIsLoaded = true;
				that.imgx = (that.canvas.width - that.imgwidth * (that.peopleimg.width + 30)) / 2;
				that.imgy = that.canvas.height - that.imgheight * that.peopleimg.height;
				that.drawImage();
			};
			//指针图像
			this.ponitimg = new Image();
			this.ponitimg.src = this.pointimg;
			this.ponitimg.onload = function() {
				that.imgIspoint = true;
				that.drawPoint();
			};
		},
		// 指针转动
		movepoint() {
			let degrees = this.degrees;
			let flag = this.flag;
			this.movep = setInterval(() => {
				if (flag) {
					degrees += 2;
					if (degrees >= 90) {
						flag = false;
					}
				} else {
					degrees -= 2;
					if (degrees <= -90) {
						flag = true;
					}
				}
				this.pointcont.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.drawPoint(degrees);
				this.drawImage();
				this.flag = flag;
				this.degrees = degrees;
			}, 50);
		},
		// 调用指针
		drawPoint(e) {
			let num = e || 0;
			let that = this;
			that.pointcont.save();
			that.pointcont.translate(this.canvas.width / 2, this.canvas.height - this.peopleimg.height * this.imgheight);
			that.pointcont.rotate((Math.PI / 180) * num);
			that.pointcont.drawImage(
				that.ponitimg,
				0,
				0,
				this.ponitimg.width,
				this.ponitimg.height,
				-this.ponitimg.width * this.imgwidth * 0.5,
				-this.ponitimg.height * this.imgheight,
				this.ponitimg.width * this.imgwidth,
				this.ponitimg.height * this.imgheight
			);
			that.pointcont.restore();
		},
		// 调用人物图片
		drawImage() {
			let that = this;
			// this.context.save();
			// this.context.translate((that.canvas.width - that.imgwidth * 147) / 2+147,that.canvas.height - that.imgheight *283);
			// this.context.rotate(Math.PI/16)
			that.context.save();
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
			that.context.restore();
		},
		//弹出modal的内容
		showmodal(e) {
			this.haswh = e;
			this.modalshow = true;
		},
		//关闭modal框
		closemodal() {
			this.modalshow = false;
		},
		//确认选择男女
		confirm(data) {
			if (data == 'man' || data == 'woman') {
				this.imgurl = '/static/game/' + data + '.png';
				let datas ={
					gender:data=='man'?1:2
				}
				api.updateGender(datas).then((res)=>{
					if(res.data.code==200){
						this.haswh = 'start';
					}else{
						this.$layer.msg('更新性别错误，请刷新重试')
					}
				}).catch((err)=>{
					this.$layer.msg('更新性别错误，请刷新重试')
				})
				this.loadImg();
				// this.drawPoint();
			} else if (data == 'startgame') {
				let types ={
					type:1
				}
				console.log('还剩'+this.gamenum);
				if(this.gamenum>0){
					api.start(types).then((res)=>{
							this.closemodal();
							this.movepoint();
							let time = 5;
							let lasttime = setInterval(() => {
								time--;
								if (time >= 1 && time <= 9) {
									this.timenum = '0' + time;
								} else if (time <= 0) {
									this.timenum = 0;
									this.leftbutton = 're';
									clearInterval(this.movep);
									//绑定长按按钮
									this.touch();
									clearInterval(lasttime);
									console.log('停止');
								}
							}, 1000);
					}).catch((err)=>{
						console.log(err)
					})
				}else{
					this.$layer.msg('抱歉您的游戏次数已用完！');
				}
				
				
			}
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
//蓄力槽
.xuli {
	position: fixed;
	top: 7%;
	color: rgb(240, 131, 49);
	font-size: 28px;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	.xulicao {
		margin-top: 15px;
		width: 300px;
		height: 35px;
		border: solid 3px black;
		border-radius: 30px;
		box-shadow: 0px 10px 10px rgb(208, 110, 106) inset;
		overflow: hidden;
		box-sizing: border-box;
		div {
			height: 40px;
			border-right: solid 3px black;
			background-color: rgb(240, 131, 49);
		}
	}
}
//倒计时样式
.lasttime {
	position: fixed;
	top: 7%;
	color: rgb(241, 131, 49);
	font-size: 58px;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
.people {
	width: 147px;
	height: 283px;
	background: url(../../static/game/woman.png) no-repeat;
	background-size: 100% 100%;
}
</style>
