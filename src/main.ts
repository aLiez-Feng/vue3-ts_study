import { createApp } from "vue";
import { globalRegister } from "./global";
import "normalize.css";
import "./assets/css/index.less";

// import './service/axios_demo'
import hyRequest from "./service";

import App from "./App.vue";

import router from "./router";
import store from "./store";

const app = createApp(App);

// 注册element-plus/其他
// 此处为局部引入，如果全局引入时，某些element的模块没有用到，也会打包，所以使用了局部引入
// =》 请到 /src/global 中去注册您即将使用的组件
app.use(globalRegister);
app.use(router);
app.use(store);

app.mount("#app");

console.log(process.env.VUE_APP_BASE_URL);
console.log(process.env.VUE_APP_BASE_NAME);

hyRequest.request({
  url: "/home/multidata",
  method: "GET",
  headers: {},
  interceptors: {
    requestInterceptor: (config) => {
      console.log("单独请求的config");
      config.headers["token"] = "123";
      return config;
    },
    responseInterceptor: (res) => {
      console.log("单独响应的response");
      return res;
    }
  }
});

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

hyRequest
  .get<DataType>({
    url: "/home/multidata",
    showLoading: false
  })
  .then((res) => {
    console.log(res.data);
    console.log(res.returnCode);
    console.log(res.success);
  });

// hyRequest.get()
