<template>
	<div class="box">
		<div class="Fortunes">
			<div class="Fortunes-text" ><span v-show="!istop">本次活动您已有过中奖纪录，不能参与后续竞奖，敬请谅解哦！</span></div>
			<div class="Fortunes-topbox">
				<div class="Fortunes-title">
					<p>昵称：{{fortun.nickName}}</p>
					<p>用户编号：{{fortun.memberId}}</p>
				</div>
				<div class="Fortunes-topbox-box">
					<p>
						<span>
							条包财运积分：
							<span class="juh">{{fortun.stripScore}}</span>
						</span>
						<span>
							排名：
							<span class="juh">{{fortun.stripRank}}</span>
						</span>
					</p>
					<p>
						<span>
							盒包财运积分：
							<span class="juh">{{fortun.boxScore}}</span>
						</span>
						<span>
							排名：
							<span class="juh">{{fortun.boxRank}}</span>
						</span>
					</p>
					<div class="Fortunes-topbox-p">
						<span>活动中奖记录:</span>
						<div>
							<a href="#" class="juh" :key="index" v-for="(item,index) in paihanb">{{item}}</a>
						</div>
					</div>
				</div>
			</div>
			<div class="Fortunes-bottombox" @click="tiaobshow" :class="{tiaobheight1:isheight}">
				<div class="bottom-title"></div>
				<div class="bottomli">
					<div class="bottom-firstli">
						<div>排名</div>
						<div>用户编号</div>
						<div>昵称</div>
						<div>财运积分</div>
					</div>
					<ul class="cuszj">
						<!-- fortun.stripRankTop10 -->
						<li v-for="(item, index) in fortun.stripRankTop10" :key="index">
							<div>top{{item.ranking}}</div>
							<div>{{item.memberId}}</div>
							<div>{{item.nickName}}</div>
							<div>{{item.score}}</div>
						</li>
					</ul>
				</div>
			</div>
		<!-- 盒包榜单 -->
		<div class="Fortunes-bottombox" @click="hebaobd" :class="[isheight2?'tiaobheight1':'tiaobheight2']">
			<div class="bottom-title2"></div>
			<div class="bottomli">
				<div class="bottom-firstli">
					<div>排名</div>
					<div>用户编号</div>
					<div>昵称</div>
					<div>财运积分</div>
				</div>
				<ul class="cuszj">
					<li v-for="(item, index) in fortun.boxRankTop10" :key="index">
						<div>top{{item.ranking}}</div>
						<div>{{item.memberId}}</div>
						<div>{{item.nickName}}</div>
						<div>{{item.score}}</div>
					</li>
				</ul>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import api from '@/getapi'
export default {
	name: 'Fortunes',
	data(){
		return{
			fortun:'',
			isheight:true,
			isheight2:true,
			istop:false
		}
	},
	mounted() {
		let that =this;
		api.fortuneList().then((res)=>{
			if(res.data.code==200){
				that.fortun=res.data.data;
				that.istop=res.data.data.isTop
			}
		})
	},
	computed:{
		paihanb:function(){
			if(this.fortun){
				return this.fortun.listRecord.split('，')
			}else{
				return ""
			}
			
		}
	},
	methods:{
		tiaobshow(){
			this.isheight=!this.isheight
		},
		hebaobd(){
			this.isheight2 =!this.isheight2
		}
	}
};
</script>

<style scoped lang="less">
li {
	list-style-type: none;
}
.juh {
	color: rgb(169, 31, 39);
}
.Fortunes {
	background: url(../../static/Fortunes.jpg) no-repeat;
	background-size: 750px 1900px;
	background-position:0% 0% ;
	width: 750px;
	min-height: 1334px;
	max-height: 1900px;
	padding: 500px 0 50px;
	box-sizing: border-box;
	.Fortunes-text {
		font-size: 20px;
		color: rgb(169, 31, 39);
		font-weight: 600;
		margin-bottom: 10px;
	}
	.Fortunes-topbox {
		background: url(../../static/topbox.png) no-repeat;
		background-size: 100% 100%;
		width: 678px;
		font-weight: 600;
		margin: 0 auto 20px;
		font-size: 26px;
		padding-bottom:10px;
		.Fortunes-topbox-box {
			margin-top: 15px;
			p {
				margin-bottom: 10px;
				display: flex;
				justify-content: space-between;
				padding: 0 150px;
			}
			.Fortunes-topbox-p{
				justify-content: center;
				padding: 0 80px;
				display: flex;
				justify-content: space-between;
				a{
					display: block;
				}
				span{
					width: 200px;
				}
			}
		}
		.Fortunes-title {
			display: flex;
			font-size: 30.82px;
			line-height: 70px;
			text-align: left;
			p {
				text-indent: 37px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 342px;
				height: 70px;
			}
		}
	}
	.Fortunes-bottombox {
		background: url(../../static/bottombox.png) no-repeat;
		background-size: 100% 100%;
		width: 674px;
		margin: 0 auto 20px;
		overflow: hidden;
		max-height: 503px;
		
		 // transition: transform 2s ease-out;
		.bottom-title {
			background: url(../../static/bottomtitle.png) no-repeat;
			background-size: 100% 100%;
			width: 674px;
			height: 74px;
		}
		.bottom-title2{
			background: url(../../static/title.png) no-repeat;
			background-size: 100% 100%;
			width: 674px;
			height: 74px;
			}
		.bottomli {
			width: 674px;
			margin: 0 auto;
			box-sizing: border-box;
			font-size: 22.61px;
			.bottom-firstli {
				margin: 15px 0;
				display: flex;
				justify-content: space-between;
				div {
					width: 100%;
					font-weight: 600;
				}
			}
			.cuszj {
				height: 400px;
				overflow: scroll;
			}
			li {
				display: flex;
				justify-content: space-between;
				height: 40px;
				div {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					padding: 5px;
					overflow: hidden;
					white-space: nowrap;
					font-weight: 600;
				}
			}
		}
	}
}
.tiaobheight1{
	max-height: 73px !important;
	// transition: transform 2s ease-out;
}
</style>
