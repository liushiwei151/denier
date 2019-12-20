<template>
	<div class="box">
		<div class="SearchAward">
			<div class="SearchAward-input">
				<input type="tel" maxlength="7" placeholder="输入楼主编号" v-model="cusnum" />
				<div class="SearchAward-img" @click="souch"><div><img src="../../static/souch.png" alt="" /></div></div>
			</div>
			<div class="SearchAward-text">恭喜以下{{ allnum}}位楼主，喜提财神宝盒！</div>

			<mescroll-vue ref="mescroll"  :up="mescrollUp" @init="mescrollInit">
				<div class="SearchAward-li">
					<div v-for="(item, index) in dataList" :key="index" :class="{ active: parseInt(index / 3) % 2 === 0,nomargin:parseInt(index+1)%3===0 }">
						{{ item.memberId }}
					</div>
				</div>
			</mescroll-vue>
		</div>
	</div>
</template>

<script>
import api from '@/getapi';
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
	name: 'SearchAward',
	data() {
		return {
			cusnum: '',
			allnum: '',
			member: '',
			// 刷新组件的属性
			mescroll: null, // mescroll实例对象
			mescrollUp: {
				callback: this.upCallback,
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 36 //每页数据条数,默认10
				},
				htmlNodata: '<p class="upwarp-nodata">-- 没有更多 --</p>',
			},
			dataList: [] // 列表数据
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
	inject: ['isloadingshow'],
	mounted() {
		this.member = this.$route.params.memberId;
		console.log(this.member)
		// this.getwinners(1, 1000);
	},
	methods: {
		// mescroll组件初始化的回调,可获取到mescroll对象
		mescrollInit(mescroll) {
			this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
		},
		downCallback(){
			
		},
		upCallback(page, mescroll) {
			this.getwinners(page.num,page.size);
		},
		//原
		getwinners(e, m) {
			// this.isloadingshow(true);
			console.log(e,m)
			let that = this;
			let data = {
				pageNum: e, //第几页,
				pageSize: m, //页大小,
				memberId: that.cusnum||''
			};
			api.winners(data).then(res => {
				if (res.data.code == 200) {
					// 请求的列表数据
					let ishas =true;
					let arr = res.data.data.winners;
					that.allnum =arr.rowCount;
					// 如果是第一页需手动置空列表
					if (e === 1) this.dataList = [];
					// 把请求到的数据添加到列表
					if(arr.pageCount>=e){
						this.dataList = this.dataList.concat(arr.dataList);
						// 数据渲染成功后,隐藏下拉刷新的状态
						this.$nextTick(() => {
							this.mescroll.endSuccess(arr.dataList.length);
						});
					}else{
						ishas =false;
						this.mescroll.endSuccess(arr.pageSize,ishas);
					}
				}
			}).catch(err=>{
				// 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
				mescroll.endErr();
			});
		},
		souch() {
			// this.getwinners(1, 1000, this.cusnum);
			this.mescroll.resetUpScroll(true);
		}
	}
};
</script>

<style scoped lang="less">
	.box{
		background: url(../../static/bg.png) repeat;
		background-size: 100% 100%;
		height: 100%;
	}
//刷新插件的样式
.mescroll {
	max-height: 750px;
}
// 整个页面的样式
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
			height: 100%;
			div{
				width: 48px;
				height: 48px;
				img {
					width: 100%;
					height: 100%;
				}
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
		justify-content: flex-start;
		flex-wrap: wrap;
		div {
			padding: 10px 30px;
			text-align: center;
			height: 40px;
			width: 150px;
			margin-right:12px;
		}
		.active {
			background-color: #f0c072;
		}
		.nomargin{
			margin-right: 0;
		}
	}
}
</style>
