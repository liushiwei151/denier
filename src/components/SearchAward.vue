<template>
	<div class="box">
		<div class="SearchAward">
			<div class="SearchAward-input">
				<input type="tel" maxlength="7" placeholder="输入楼主编号" v-model="cusnum" />
				<div class="SearchAward-img" @click="souch"><img src="../../static/souch.png" alt="" /></div>
			</div>
			<div class="SearchAward-text">恭喜以下{{ allnum.rowCount }}位楼主，喜提黄鹤宝盒！</div>

			<mescroll-vue ref="mescroll"  :up="mescrollUp" @init="mescrollInit">
				<div class="SearchAward-li">
					<div v-for="(item, index) in allnum.dataList" :key="index" :class="{ active: parseInt(index / 3) % 2 === 0 }">
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
				toTop: {
					//回到顶部按钮
					src: './static/down.png', //图片路径,默认null,支持网络图
					offset: 0, //列表滚动1000px才显示回到顶部按钮
				},
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 1 //每页数据条数,默认10
				}
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
		getwinners(e, m, f) {
			// this.isloadingshow(true);
			console.log(e,m,f)
			let that = this;
			let data = {
				pageNum: e, //第几页,
				pageSize: m, //页大小,
				memberId: f || ''
			};
			api.winners(data).then(res => {
				if (res.data.code == 200) {
					// that.allnum = res.data.data.winners;
					// this.isloadingshow(false);
					// 请求的列表数据
					let arr = res.data.data.winners.dataList;
					console.log(arr, res.data.data.winners)
					// 如果是第一页需手动置空列表
					if (e === 1) this.dataList = [];
					// 把请求到的数据添加到列表
					this.dataList = this.dataList.concat(arr);
					// 数据渲染成功后,隐藏下拉刷新的状态
					this.$nextTick(() => {
						this.mescroll.endSuccess(arr.length);
						console.log(this.dataList)
					});
				}
			}).catch(err=>{
				// 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
				mescroll.endErr();
			});
		},
		souch() {
			this.getwinners(1, 1000, this.cusnum);
		}
	}
};
</script>

<style scoped lang="less">
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
		.active {
			background-color: #f0c072;
		}
	}
}
</style>
