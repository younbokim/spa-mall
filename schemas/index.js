const mongoose = require("mongoose");

// mongoose를 통해서 mongodb에 연결하는 함수 생성
// 몽고db와 통신, 뒤에 있는 것은 데이터베이스의 이름, 카테고리 넘기지 않으면 오류 발생 안함
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/spa_mall", { ignoreUndefined: true }).catch((err) => {
    console.log(err);
  });//에러 컨트롤(에러 발생시 에러 내용을 출력
};

// 연결 중간에 에러 발생시 에러 문구 출력
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});
//외부에서 connect함수를 사용할 수 있게 세팅
module.exports = connect;