import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 10000; //响应时间
axios.defaults.baseURL = 'http://192.168.2.117:9100';   //配置接口地址
axios.defaults.withCredentials = true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    alert('错误的传参')
    return Promise.reject(error);
});

//用户是否关注
const subscribe = () => {
  return axios.get('/yq/subscribe')
}
//财神签客户数据
const fortuneSign =()=>{
	return axios.get('/yq/wealth/fortuneSign')
}
//完整名单排名
const winners =(data)=>{
	return axios.get('/yq/wealth/winners',{
    params: data
  })
} 
//中奖名单
const fortuneList =()=>{
	return axios.get('/yq/fortune/fortuneList')
}
export default {
	subscribe,
	fortuneSign,
	winners,
	fortuneList
}
