<template>
	<div class="box">
		<div class="SearchAward">
			<div class="SearchAward-input">
				<input type="tel" maxlength="7" placeholder="输入楼主编号" v-model="cusnum" />
				<div class="SearchAward-img" @click="souch"><img src="../../static/souch.png" alt="" /></div>
			</div>
			<div class="SearchAward-text">恭喜以下{{allnum.rowCount}}位楼主，喜提黄鹤宝盒！</div>
			<div class="SearchAward-li">
				<!-- allnum.dataList -->
				<div v-for="(item, index) in 42" :key="index"  :class="{ active: parseInt(index/3) % 2 === 0 }">{{item.memberId}}1234567</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/getapi'
export default {
	name: 'SearchAward',
	data(){
		return{
			cusnum:'',
			allnum:'',
			member:''
		}
	},
	mounted() {
		this.member=this.$route.params.memberId;
		this.getwinners(1,1)
	},
	methods:{
		getwinners(e,m,f){
			let that =this;
			let data={
				 pageNum: e,//第几页,
				  pageSize:m,//页大小,
				   memberId:f||""
			}
			api.winners(data).then((res)=>{
				if(res.data.code==200){
					that.allnum=res.data.data.winners
				}
			})
		},
		souch(){
			if(this.cusnum.length==7){
				this.getwinners(1,100,this.cusnum)
			}
		}
	}
};
</script>

<style scoped lang="less">
.SearchAward {
	background: url(../../static/bg3.png) no-repeat;
	background-size: 100% 100%;
	width: 750px;
	height: 1334px;
	padding-top: 350px;
	box-sizing: border-box;
	.SearchAward-input {
		border-radius: 30px;
		height: 66px;
		width: 574px;
		box-sizing: border-box;
		border: solid 3px #de817c;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		.SearchAward-img {
			background-color: #f69655;
			width: 138px;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 48px;
				height: 48px;
			}
		}
		input {
			border: none;
			width: 100%;
			height: 100%;
			text-indent: 40px;
			font-size: 28px;
		}
		input::-webkit-input-placeholder {
			/* Chrome/Opera/Safari */
			color: #d6d6d6;
		}
		input::-moz-placeholder {
			/* Firefox 19+ */
			color: #d6d6d6;
		}
		input:-ms-input-placeholder {
			/* IE 10+ */
			color: #d6d6d6;
		}
		input:-moz-placeholder {
			/* Firefox 18- */
			color: #d6d6d6;
		}
	}
	.SearchAward-text {
		font-size: 36px;
		color: #ad332d;
		font-weight: 600;
		margin: 30px 0;
	}
	.SearchAward-li {
		padding: 0 45px;
		box-sizing: border-box;
		font-size: 30px;
		font-weight: 600;
		color: black;
		max-height: 750px;
		overflow: scroll;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		div {
				padding: 10px 30px;
				text-align: center;
				height: 40px;
				width: 150px;
		}
		.active{
			background-color: #f0c072;
		}
	}
}
</style>
