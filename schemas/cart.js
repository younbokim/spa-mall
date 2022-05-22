const mongoose = require("mongoose");

// 상품 수량 항목을 수정
// 수량에는 유니크 항목을 제거
const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// db 모델명 세팅
module.exports = mongoose.model("Cart", cartSchema);