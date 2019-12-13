<template>
	<div class="box">
		<div class="SearchAward">
			<div class="SearchAward-input">
				<input type="tel" maxlength="8" placeholder="输入楼主编号" v-model="cusnum"/>
				<div class="SearchAward-img" @click="souch">
					<img src="../../static/souch.png" alt="">
				</div>
			</div>
			<div class="SearchAward-text">恭喜以下100位楼主，喜提黄鹤宝盒！</div>
			<div class="SearchAward-li">
				<ul v-for="(item,index) in 20" :key="index">
					<li >12345678</li>
					<li >12345678</li>
					<li >12345678</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SearchAward',
	data(){
		return{
			cusnum:''
		}
	},
	methods:{
		souch(){
			if(this.cusnum.length==8){
				alert(this.cusnum)
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
	padding-top:350px;
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
		.SearchAward-img{
			background-color: #f69655;
			width: 138px;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
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
			color: #D6D6D6;
		}
		input::-moz-placeholder {
			/* Firefox 19+ */
			color: #D6D6D6;
		}
		input:-ms-input-placeholder {
			/* IE 10+ */
			color: #D6D6D6;
		}
		input:-moz-placeholder {
			/* Firefox 18- */
			color: #D6D6D6;
		}
	}
	.SearchAward-text{
		font-size: 36px;
		color:#AD332D;
		font-weight: 600;
		margin: 30px 0;
	}
	.SearchAward-li{
		padding:0 45px;
		box-sizing: border-box;
		font-size: 30px;
		font-weight: 600;
		color:black;
		height: 750px;
		overflow: scroll;
		ul{
			display: flex;
			justify-content: space-between;
			width: 660px;
			margin-bottom: 10px;
			li{
				list-style-type: none;
				padding:10px 30px;
				text-align: left;
			}
		}
		ul:nth-of-type(odd){
			li{
				background-color:#F0C072;
			}
		}
	}
}

</style>
