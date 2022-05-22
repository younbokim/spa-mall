const express = require("express");
const connect = require("./schemas")//경로는 스키마 안의 인덱스를 자동으로 추적
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods.js");
const cartsRouter = require("./routes/carts.js");

// app.use((req, res, next) => {
//   console.log("미들웨어가 구현되었나?");
//   console.log("주소는?", req.path);
//   if (req.path === "/test") {
//     res.send("테스트 페이지로 도착");
//   } else {
//     next();
//   }
// });

// 이렇게 콜백 함수를 따로 저장해서 관리하는 것 또한 가능
const requestMiddleware = (req, res, next) => {
  console.log("Requested URL:", req.originalUrl, "-", new Date());
  next();
}
app.use(express.json());// body로 들어오는 json 데이터를 파싱해주는 함수(여기 미들웨어에는 무조건 들어옴, 1순위)
app.use(requestMiddleware);

app.use("/api", [goodsRouter, cartsRouter]);  // api url 들어가면 모든 라우터를 가동, 둘 역할이 겹치면 앞쪽이 우선

app.get('/', (req, res) =>{
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
});
