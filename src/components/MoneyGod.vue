<template>
	<div class="box">
		<div class="MoneyGod">
			<div class="topbox">
				<div class="topbox-cus">
					<p>昵称：{{custorm.nickName}}</p>
					<p>用户编号：{{custorm.memberId}}</p>
				</div>
				<div class="topbox-fuq">
					<ul>
						<li style="color:black">活动中奖财神签：</li>
						<li v-for="(item,index) in custorm.winnerNrs" :key="index">{{item}}<span v-show="index!=custorm.winnerNrs.length-1">,</span></span></li>
					</ul>
				</div>
				<div class="topbox-button"><button @click="goto('SearchAward')">查看完整中奖名单</button></div>
			</div>
			<div class="bottombox"></div>
			<ul class="bottomtable">
				<li>
					<div>获得的时间</div>
					<div>财神签编号</div>
					<div>来源</div>
					<div>
						盒包
						<br />
						财运积分
					</div>
					<div>
						条包
						<br />
						财运积分
					</div>
				</li>
				<div class="cuszj">
					<li v-for="(item, index) in custorm.yqBlessingRecords" :key="index">
						<div>{{item.insertTime}}</div>
						<div>{{item.blessingRecordId}}</div>
						<div>{{item.source}}</div>
						<div><span v-show="item.pack==2">{{item.score}}</span></div>
						<div><span v-show="item.pack==1">{{item.score}}</span></div>
					</li>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '@/getapi.js'
export default {
	name: 'MoneyGod',
	data() {
		return {
			custorm:""
		};
	},
	 inject: ['isloadingshow'],
	mounted() {
		this.isloadingshow(true);
		let that =this;
		api.fortuneSign().then((res)=>{
			if(res.data.code==200){
				this.isloadingshow(false);
				that.custorm=res.data.data
			}
		})
	},
	methods: {
		goto(e) {
			this.$router.push({ name: e, params: { memberId: this.custorm.memberId }})
		}
	}
};
</script>

<style scoped lang="less">
li {
	list-style-type: none;
}
.box {
	background-image: url(../../static/bg.png);
	background-size: 100% 100%;
	// height: 100%;
	// position: fixed;
	// width: 750px;
	color: black;
}
.MoneyGod {
	background: url(../../static/MoneyGod.jpg) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 1334px;
	padding-top: 510px;
	box-sizing: border-box;
	.topbox {
		background: url(../../static/topbox.png) no-repeat;
		background-size: 100% 100%;
		width: 678px;
		margin: 0 auto 20px;
		font-weight: 600;
		padding-bottom:10px;
		box-sizing: border-box;
		font-size: 32px;
		.topbox-cus {
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
		.topbox-button {
			display: flex;
			justify-content: center;
			button {
				border: none;
				padding:0;
				background: url(../../static/button.png) no-repeat;
				background-size: 100% 100%;
				width: 250px;
				height: 73px;
				color: rgb(249, 211, 149);
				font-size: 24px;
				font-weight: 600;
				white-space: nowrap;
				overflow: hidden;
			}
		}
		.topbox-fuq {
			text-align: left;
			padding-left: 37px;
			box-sizing: border-box;
			margin: 15px 0;
			ul{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap:wrap				
			}
			li {
				color: rgb(169, 31, 39);
				margin-right:10px ;
			}
			
		}
	}
	.bottombox {
		background: url(../../static/getGod.png) no-repeat;
		background-size: 100% 100%;
		width: 674px;
		height: 70px;
		margin: 0 auto;
	}
	.bottomtable > li {
		border-bottom: solid 3px black;
	}
	.bottomtable {
		width: 674px;
		margin: 0 auto;
		border: solid 3px black;
		box-sizing: border-box;
		border-radius: 15px;
		font-size: 22.61px;
		.cuszj {
			max-height: 390px;
			overflow: scroll;
		}
		li {
			display: flex;
			justify-content: space-between;
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				padding: 5px;
				border-right: solid 3px black;
				border-bottom: solid 3px black;
				overflow: hidden;
				white-space: nowrap;
				font-weight: 600;
			}
			div:first-of-type {
				flex: none;
				width: 220px;
			}
			div:nth-of-type(2) {
				flex: 1.2;
			}
			div:last-of-type {
				border-right: none;
			}
		}

		li:last-of-type {
			div {
				border-bottom: none;
			}
		}
	}
}
</style>
