<template>
	<div>
		<div class="gamebg" :style="{ backgroundPositionY: index + 'px' }">
			<div class="game-peoples"><canvas id="peoples"></canvas></div>
			<div class="bottom-land" :style="{position:'absolute',bottom:-index+'px'}">
				<div class="bottom-land-xian" >
					<div
						class="bottom-land-xian-buttonleft"
						:style="{ backgroundImage: 'url(./static/game/' + leftbutton + '.png)' }"
						@click="truemz"
					></div>
					<div  class="bottom-land-xian-buttonright" :style="{filter:iscallgod?'':'grayscale(100%)'}"></div>
				</div>
			</div>
		</div>
		<!-- 往下落的动画 -->
		<div class="game-prop" :style="{transform:'translate(0px,'+index+'px)'}">
			<div class="game-prop-fader">
				<div @click="gameProp(10)" class="game-prop-zu" :style="{ filter: day >= 10 ? '' : 'grayscale(100%)'}" >
				</div>
				<div class="game-prop-shuom" v-show="isshuom==10">连续登陆10天获得此道具</div>
			</div>
			<div class="game-prop-fader">
			<div @click="gameProp(20)" class="game-prop-feng" :style="{ filter: day >= 20 ? '' : 'grayscale(100%)'}"></div>
			<div class="game-prop-shuom" v-show="isshuom==20">连续登陆20天获得此道具</div>
			</div>
			<div class="game-prop-fader">
			<div @click="gameProp(30)" class="game-prop-yun" :style="{ filter: day >= 30 ? '' : 'grayscale(100%)'}"></div>
			<div class="game-prop-shuom" v-show="isshuom==30">连续登陆30天获得此道具</div>
			</div>
		</div>
		<div class="game-rule" :style="{transform:'translate(0px,'+index+'px)'}">
			<div @click="showmodal('actrule')">活动规则</div>
			<div @click="showmodal('moneyget')">财运足迹</div>
		</div>
		<div class="xuli" v-if="gameProgress == 'forceFront'">
			<div>蓄力值：{{ yip }}</div>
			<div class="xulicao"><div :style="{ width: yip + '%' }"></div></div>
		</div>
		<div class="lasttime" v-if="gameProgress == 'forceAfter'">倒计时：{{ timenum }}</div>
		<modal :fuqian="fuqian" :type="types" :datalist="dataList" :haswhat="haswh" :isshow="modalshow" @getrecord="getrecord" @chosemodal="chosemodal" @closemodal="closemodal" @confirm="confirm"></modal>
	</div>
</template>

<script>
import api from '@/getapi.js';
import modal from '@/components/modal';
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
	name: 'game',
	data() {
		return {
			//显示左边框说明
			isshuom:0,
			//获得的奖品
			types:0,
			//签到的天数
			day: 220,
			//modal弹出的内容
			haswh: '',
			modalshow: true,
			//微信录音的id
			localId: '',
			serverId: '',
			//返回的音频
			yip: 56,
			voice: '',
			index: 0,
			//人物的图片对象
			peopleimg: '',
			//指针图片对象
			ponitimg:'',
			//选中是谁的图像
			imgurl: './static/game/woman.png',
			// 指针图片
			pointimg: './static/game/point.png',
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
			//判断是否开始了游戏
			isstartgame:false,
			//判断是否点过录音
			isclick:true,
			//判断是否有性别
			issex:null,
			//是否能开始长按喊财神
			iscallgod:false,
			//足迹数据
			dataList:'',
			//限定stop只触发一次
			stopnum:true,
			//福签号码
			fuqian:null,
			//10秒的倒计时循环
			lasttime:"",
			//装备的对象
			zqtobject:'',
			lefticonimg:'',
			//装备的x轴和y轴
			leftx:0,
			lefty:0,
			//选中的装备图标
			leftzb:'',
			//装备摇摆的判断
			zbright:true,
			zblinetime:0,
			// 只准点一次开始游戏
			isgame:true,
			//后台需要的值
			gameRecordId:'',
		};
	},
	inject:['isrouter'],
	components: {
		modal,
		MescrollVue
	},
	created() {
		this.haswh='wait';
		this.getstart();
		this.openweb();
	},
	mounted() {
		// this.getrecord();
		this.loadImg();
		// this.movepoint();
	},
	methods: {
		//添加竹蜻蜓
		zhuqingting(e){
			let that =this;
			let x,y;
			this.lefticonimg =new Image();
			if(e==10){
				this.lefticonimg.src='./static/game/zhuqingting.png';
				this.leftzb=10;
			}else if(e==20){
				this.lefticonimg.src='./static/game/fhl.png';
				this.leftzb=20;
			}else if(e==30){
				this.lefticonimg.src='./static/game/jdy.png';
				this.leftzb=30;
			}else{
				
			}
			that.lefticonimg.onload = function() {
				if(e==10){
					that.lefty=-(that.lefticonimg.height*that.imgheight/2);
					that.leftx=(that.lefticonimg.width*that.imgwidth/4);
					that.imgy = that.canvas.height - that.imgheight * that.peopleimg.height;
				}else if(e==20){
					that.leftx=that.peopleimg.width*that.imgwidth/5;
					that.lefty=that.peopleimg.height*that.imgheight*0.9;
					that.imgy = that.canvas.height - that.imgheight * that.peopleimg.height-(that.lefticonimg.height*that.imgheight*0.8);
				}else if(e==30){
					that.leftx=that.peopleimg.width*that.imgwidth/5;
					that.lefty=that.peopleimg.height*that.imgheight*0.9;
					that.imgy = that.canvas.height - that.imgheight * that.peopleimg.height-(that.lefticonimg.height*that.imgheight*0.8);
				}else{
					
				}
				// 先清空
				that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
				// 再绘图
				that.drawPoint(that.degrees);
				that.Dottedline();
				that.drawzhuqingting(that.leftx,that.lefty);
				that.drawImage();
			};
		},
		//绘制装备
		drawzhuqingting(x,y){
			let e =x||0;
			let f =y||0;
			let that = this;
			if(this.lefticonimg){
				that.zqtobject.save();
				that.zqtobject.drawImage(
					that.lefticonimg, //规定要使用的图像、画布或视频。
					0,
					0, //开始剪切的 x 坐标位置。
					that.lefticonimg.width,
					that.lefticonimg.height, //被剪切图像的高度。
					that.imgx+e,
					that.imgy+f,//在画布上放置图像的 x 、y坐标位置。
					that.lefticonimg.width * that.imgwidth,
					that.lefticonimg.height * that.imgheight //要使用的图像的宽度、高度
				);
				that.zqtobject.restore();
			}
		},
		// 获得用户是否选择了性别是否有性别的接口
		getstart(){
			let data={
				type:0
			}
			let that =this;
			api.start(data).then((res)=>{
				if(res.data.code==200){
					this.day=res.data.data.count;
					this.gamenum=res.data.data.user.gamesPlayed;
					this.issex=res.data.data.user.gender;
					if(res.data.data.user.gender==null){
						that.haswh='sex'
					}else if(res.data.data.user.gender==1){
						that.imgurl = './static/game/man.png';
						this.loadImg();
						that.haswh='start';
					}else if(res.data.data.user.gender==2){
						that.imgurl = './static/game/woman.png';
						this.loadImg();
						that.haswh='start';
					}
				}
			}).catch((err)=>{
				this.$layer.msg('性别获取失败')
			})
		},
		//游戏足迹的接口
		getrecord(e,f,g){
			let data ={
				pageNum:e,
				pageSize:f
			}
			api.record(data).then((res)=>{
				if(res.data.code==200){
					console.log(res.data.data)
					// 请求的列表数据
					let ishas =true;
					let arr = res.data.data;
					// 如果是第一页需手动置空列表
					if (e === 1) this.dataList = [];
					// 把请求到的数据添加到列表
					if(arr.pageCount>=e){
						this.dataList = this.dataList.concat(arr.dataList);
						// 数据渲染成功后,隐藏下拉刷新的状态
						this.$nextTick(() => {
							g.endSuccess(arr.dataList.length);
						});
					}else{
						ishas =false;
						g.endSuccess(arr.pageSize,ishas);
					}
					this.datalist=res.data.data.dataList
				}
			}).catch((err)=>{
				console.log(err);
			})
		},
		//点击左边电话
		gameProp(e){
				this.isshuom=e;
				setTimeout(()=>{
					this.isshuom=0;
				},1500)
			if(e==10&&e<=this.day){
				const zu =document.getElementsByClassName('game-prop-zu')[0];
			zu.classList.add('animated', 'heartBeat');
			setTimeout(()=>{
				zu.classList.remove('animated', 'heartBeat')
			},1000)
			this.zhuqingting(e);
			}else if(e==20&&e<=this.day){
				const feng =document.getElementsByClassName('game-prop-feng')[0];
				feng.classList.add('animated', 'heartBeat');
				setTimeout(()=>{
					feng.classList.remove('animated', 'heartBeat')
				},1000)
				this.zhuqingting(e);
			}else if(e==30&&e<=this.day){
				const yun =document.getElementsByClassName('game-prop-yun')[0];
				yun.classList.add('animated', 'heartBeat');
				setTimeout(()=>{
					yun.classList.remove('animated', 'heartBeat')
				},1000)
				this.zhuqingting(e);
			}
		},
		//人物移动
		movepeople(){
			let vocie=0;
			this.gameProgress='forceFront'
			if(this.yip>=68){
				vocie=68
			}else{
				vocie=this.yip
			}
			let height =document.body.clientHeight;
			let width=document.body.clientWidth;
			let ifwidth=Math.tan(this.degrees*Math.PI/180)*height;//应该走的宽度
			let ifheight=height*2.78*(vocie/68);//根据分贝走的高度
			let movepeo =setInterval(()=>{
				this.index+=ifheight/100;
				this.imgx+=3*ifwidth/100;
				this.allcanvas();
				if(this.imgx<=0||this.imgx>=width*3-this.peopleimg.width*this.imgwidth){
					clearInterval(movepeo);
					this.showmodal('wrongangle')
				}
				//如果当前背景移动的高度大于应该跑的高度则停止移动并弹出蓄力不足
				if(this.index>=ifheight){
					clearInterval(movepeo);
					this.showmodal('Insufficient');
				}
				if(this.index>=height*2){
					clearInterval(movepeo);
					let movelast=setInterval(()=>{
						if(this.imgy>0){
							this.imgx+=3*ifwidth/100;
							this.imgy-=3*ifheight/100;
							this.allcanvas();
							if(this.imgx<=0||this.imgx>=width*3-this.peopleimg.width*this.imgwidth){
								clearInterval(movelast);
								this.showmodal('wrongangle');
							}
							 if((ifheight-2*height)*3<=0.78*height*3-this.imgy-this.peopleimg.height*this.imgheight){
								clearInterval(movelast);
								this.showmodal('Insufficient');
							}
							console.log((ifheight-2*height)*3, 0.78*height*3-this.imgy-this.peopleimg.height*this.imgheight)
						}else{
							clearInterval(movelast);
							this.showmodal('wait');
							api.getPrizes().then((res)=>{
								if(res.data.code==200){
									this.showmodal('lookgod',res.data.data.type);
									if(res.data.data.type==1){
										this.fuqian=res.data.data.blessingRecordId;
									}
									console.log('中奖了')
								}else{
									this.$layer.msg('奖品获取失败（!200）');
								}
							}).catch((err)=>{
								this.$layer.msg('奖品获取失败');
							})
						}
					},50)
				}
			},50)
		},
		//绑定和解绑的函数
		toucheventstart(){
			let that =this;
			let starttime = '';
			let endtime = '';
			let callgod = document.getElementsByClassName('bottom-land-xian-buttonright')[0];
			if(that.isclick){
				starttime = new Date().getTime();
				that.timer = setTimeout(() => {
					callgod.classList.add('animated', 'jello');
					setTimeout(()=>{
						callgod.classList.remove('animated', 'jello')
					},1000)
					clearInterval(that.lasttime);
					that.leftbutton = 're';
					//开始录音
					/*测试*/
					that.star();
					/*测试*/
					that.timenum = 3;
					that.isclick=false;
					let timealse = setInterval(() => {
						if (that.timenum > 0) {
							that.timenum--;
						} else {
							clearInterval(timealse);
							if(that.stopnum){
								/*测试*/
								// that.judgetime();
								that.stop();
								/*测试*/
							}
						}
					}, 1000);
					console.log('长按开始');
				}, 700);
			}
			
		},
		toucheventend(){
			let that =this;
			let starttime = '';
			let endtime = '';
			let callgod = document.getElementsByClassName('bottom-land-xian-buttonright')[0];
			endtime = new Date().getTime();
			if (endtime - starttime < 700) {
				clearTimeout(that.timer);
				console.log('长按结束');
			} else {
				//结束录音
				if(that.timenum>=0&&that.timenum<=3){
					if(that.stopnum){
						/*测试*/
						// that.judgetime();
						that.stop();
						/*测试*/
					}
				}
			}
		},
		//绑定长按按钮
		touch() {
			let that = this;
			let callgod = document.getElementsByClassName('bottom-land-xian-buttonright')[0];
			this.iscallgod=true;
			callgod.addEventListener('touchstart',this.toucheventstart );
			callgod.addEventListener('touchend', this.toucheventend);
		},
		//解除绑定长按按钮
		retouch(){
			this.iscallgod=false;
			let callgod = document.getElementsByClassName('bottom-land-xian-buttonright')[0];
			callgod.removeEventListener('touchstart',this.toucheventstart);
				callgod.removeEventListener('touchend',this.toucheventend);
		},
		// 确认瞄准
		truemz() {
			if (this.leftbutton == 'ConfirmAiming') {
				this.leftbutton = 'ReAiming';
				this.touch();
				clearInterval(this.movep);
			} else if (this.leftbutton == 'ReAiming') {
				this.leftbutton = 'ConfirmAiming';
				this.retouch();
				this.movepoint();
			} else {
				return;
			}
		},
		// 画布循环内容
		allcanvas() {
			// 先清空
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// 再绘图 以下是抖动效果
			this.zblinetime;this.zbright;
			if(this.lefticonimg&&this.zbright){
				this.zblinetime+=10;
				this.leftx+=this.zblinetime;
				if(this.zblinetime>=this.lefticonimg.width/50){
					this.zbright=false
				}
			}else if(this.lefticonimg&&!this.zbright){
				this.zblinetime-=10;
				this.leftx+=this.zblinetime;
				if(this.zblinetime<=-this.lefticonimg.width/50){
					this.zbright=true
				}
			}
			this.drawzhuqingting(this.leftx,this.lefty);
			this.drawImage();
			// this.drawPoint();
		},
		// 初始化canvas属性
		loadImg() {
			let that = this;
			this.canvas = document.getElementById('peoples');
			this.context = this.canvas.getContext('2d'); //画布显示人物
			this.pointcont = this.canvas.getContext('2d'); //指针的画布
			this.line =this.canvas.getContext('2d');//虚线区域
			this.zqtobject=this.canvas.getContext('2d');
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
				that.Dottedline();
			};
		},
		//虚线区域
		Dottedline(){
			let cxt =this.line;
				cxt.lineWidth = 4;
			　　cxt.strokeStyle = 'black';
			　　cxt.beginPath();
			　　cxt.setLineDash([15, 15]);
			　　cxt.moveTo(0,-2*this.canvas.height);
			if(this.leftzb==10){
				cxt.lineTo(this.canvas.width/2,this.imgy+this.lefty);
			}else if(this.leftzb==20||this.leftzb==30){
				cxt.lineTo(this.canvas.width/2,this.imgy);
			}else{
				cxt.lineTo(this.canvas.width/2, this.canvas.height-this.peopleimg.height*this.imgheight);
			}
			　　cxt.stroke();
				cxt.beginPath();
			　　cxt.setLineDash([15, 15]);
			cxt.moveTo(this.canvas.width,-2*this.canvas.height);
			if(this.leftzb==10){
				cxt.lineTo(this.canvas.width/2,this.imgy+this.lefty);
			}else if(this.leftzb==20||this.leftzb==30){
				cxt.lineTo(this.canvas.width/2,this.imgy);
			}else{
				cxt.lineTo(this.canvas.width/2, this.canvas.height-this.peopleimg.height*this.imgheight);
			}
				cxt.stroke();
				cxt.moveTo( 300, 300 );
				cxt.font = '50px "微软雅黑"';           //设置字体
			    cxt.fillStyle = "black";               //设置填充颜色为紫色
			    cxt.textBaseline = "bottom";            //设置字体底线对齐绘制基线
			    cxt.textAlign = "left";                 //设置字体对齐的方式
			//     cxt.strokeText( "推荐瞄准区域", 450, 400 );
			let arr =['推','荐','瞄','准','区','域']
			for(let i =0;i<arr.length;i++){
				cxt.fillText( arr[i], this.canvas.width/2-25, 350+70*i );
			}
		},
		// 指针转动
		movepoint() {
			let degrees = this.degrees;
			let flag = this.flag;
			this.movep = setInterval(() => {
				if (flag) {
					degrees += 1;
					if (degrees >= 90) {
						flag = false;
					}
				} else {
					degrees -= 1;
					if (degrees <= -90) {
						flag = true;
					}
				}
				this.pointcont.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.drawPoint(degrees);
				this.Dottedline();
				this.drawzhuqingting(this.leftx,this.lefty);
				this.drawImage();
				this.flag = flag;
				this.degrees = degrees;
			}, 10);
		},
		// 调用指针
		drawPoint(e) {
			let num = e || 0;
			let that = this;
			that.pointcont.save();
			if(this.leftzb==10){
				that.pointcont.translate(this.canvas.width / 2, this.imgy+this.lefty);
			}else{
				that.pointcont.translate(this.canvas.width / 2, this.imgy);
			}
			// that.pointcont.translate(this.canvas.width / 2, this.canvas.height - this.peopleimg.height * this.imgheight);
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
		showmodal(e,f) {
			this.haswh = e;
			this.types=f||0;
			this.modalshow = true;
		},
		//关闭modal框
		closemodal(e) {
			if(this.isstartgame){
				this.modalshow = false;
			}else{
				if(this.issex!=null){
					this.haswh='start'
				}else{
					this.haswh='sex'
				}
			}
			if(e=="shua"){
				// this.$router.push('/game');//不兼容
				// this.isrouter();//无效
				window.location.reload();
			}
		},
		//替换模态框
		chosemodal(e){
			this.haswh=e;
		},
		//确认选择男女
		confirm(data) {
			if (data == 'man' || data == 'woman') {
				this.imgurl = './static/game/' + data + '.png';
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
			} else if (data == 'startgame'&&this.isgame==true) {
				let types ={
					type:1
				}
				this.isgame=false;
				console.log('还剩'+this.gamenum);
				if(this.gamenum>0){
					api.start(types).then((res)=>{
						if(res.data.code==200){
							this.gameRecordId=res.data.data.gameRecordId;
							this.isstartgame=true;
							this.closemodal();
							this.movepoint();
							let time = 10;
							this.lasttime = setInterval(() => {
								time--;
								if (time >= 1 && time <= 9) {
									this.timenum = '0' + time;
								} else if (time <= 0) {
									this.timenum = 0;
									this.leftbutton = 're';
									clearInterval(this.movep);
									//绑定长按按钮
									this.touch();
									clearInterval(this.lasttime);
									console.log('停止');
								}
							}, 1000);
						}else{
							this.$layer.msg('开始游戏错误，请刷新重试')
						}
					}).catch((err)=>{
						this.$layer.msg('开始游戏错误，请刷新重试')
					})
				}else{
					this.$layer.msg('抱歉您的游戏次数已用完！');
				}
			}
		},
		//在进入页面时录一段音已确定用户有无录音权限
		openweb(){
			this.wx.startRecord();
			setTimeout(()=>{
				this.wx.stopRecord({
					success:function(res){
						console.log('录音已授权')
					}
				})
			},1000)
			
		},
		// 开始录音
		star() {
			this.wx.startRecord();
		},
		// 停止录音
		stop() {
				console.log('结束录音');
				let that = this;
				that.stopnum=false;
				this.wx.stopRecord({
					success: function(res) {
						that.localId = res;
						that.wx.uploadVoice({
							localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
							isShowProgressTips: 1, // 默认为1，显示进度提示
							success: function(res) {
								that.serverId = res.serverId; // 返回音频的服务器端ID
								let data={
									id:res.serverId,
									gameRecordId:that.gameRecordId
								}
								api.getVoice(data).then(res => {
									if(res.data.code==200){
										that.yip=res.data.data;
										that.judgetime();
									}else{
										that.$layer.msg('上传录音失败');
									}
								}).catch((err)=>{
									that.$layer.msg('上传录音失败');
								});
							}
						});
					},
					cancel:function(err){
						that.$layer.msg('微信接口报错！')
					}
				});
		},
		// 判断时间
		judgetime(){
			let that =this;
			if(this.timenum==0){
				this.closemodal();
				 this.peopleimg.src =this.imgurl.slice(0,-4)+'end.png';
				 this.peopleimg.onload=function(){
					 that.movepeople();
				 }
			}else{
				setTimeout(()=>{
					this.judgetime();
				},1000)
			}
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
*{   
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
    -webkit-user-select:none; /*webkit浏览器*/   
    -khtml-user-select:none; /*早期浏览器*/   
    -moz-user-select:none;/*火狐*/   
    -ms-user-select:none; /*IE10*/   
    user-select:none;   
} 
input {      
     -webkit-user-select:auto; /*webkit浏览器*/     
} 
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
	.game-prop-fader{
		position: relative;
	}
	.game-prop-shuom{
		position: absolute;
		right: -90px;
		bottom: -50px;
		width: 140px;
		height: 75px;
		padding:15px 10px;
		box-sizing: border-box;
		font-size: 16px;
		background: url(../../static/game/callborder.png) no-repeat;
		background-size:100% 100% ;
		overflow: hidden;
	}
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
