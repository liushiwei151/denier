<template>
  <div id="app">
    <keep-alive><router-view/></keep-alive>
		<div class="loading" v-if="isshow">
			<div class="loadingimg"></div> 
		</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      isloadingshow:this.isloadingshow
    }
  },
  data(){
	return {
		isshow:true
	}  
  },
	mounted() {
		this.$router.push('/')
	},
	methods:{
		isloadingshow(e){
			this.isshow=e;
		}
	}
}
</script>

<style>
  body,html,p,ul{
    margin:0;
    padding:0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:black;
}
.loading{  
    width:100%;  
    height:100%;  
    position: fixed; 
	 top:0;
    color:#fff;  
    background: #000 url(../static/loading.gif) no-repeat;  
	background-size:100px 100px ;
	background-position:center center ;
    opacity: 0.6;  
    z-index:9999;  
    -moz-border-radius:20px;  
    -webkit-border-radius:20px;  
    border-radius:20px;  
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=70); 
	 display: flex;
	 justify-content: center;
	 align-items: center;
}  
.loadingimg{}
</style>
