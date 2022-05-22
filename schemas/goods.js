// 데이터베이스 모델 세팅
const mongoose = require("mongoose");

// 스키마 함수를 활용해서 데이터베이스 형태를 세팅 (new를 통해서 클래스 생성)
const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  }
});

// 해당 데이터 구성: goods, goodschema, 재사용 가능하게 세팅
module.exports = mongoose.model("Goods", goodsSchema);