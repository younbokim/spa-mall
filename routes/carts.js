// 장바구니에 상품들을 넣고, 이를 출력하는 API

const express = require("express");
const Goods = require("../schemas/goods");
const Carts = require("../schemas/cart");
const router = express.Router();

router.get("/carts", async (req, res) => {
    // 카트에 있는 전체 리스트 출력
    const carts = await Carts.find();
    
    // cart에 있는 각 요소마다으 ㅣgoodsid를 배열로 추출
    const goodsIds = carts.map((cart) => cart.goodsId);
    
    // 검색 대상 아이디에만 해당하는 상품들만 출력
    const goods = await Goods.find({ goodsId: goodsIds });

    res.json({
        carts: carts.map((cart) => ({
                quantity: cart.quantity,
                goods: goods.find((item) => item.goodsId === cart.goodsId)
            })),
    })
});

module.exports = router;