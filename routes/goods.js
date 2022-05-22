const express = require("express");
const Carts = require('../schemas/cart');
const Goods = require("../schemas/goods");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is Root Page");
});

// const goods = [
//     {
//       goodsId: 4,
//       name: "상품 4",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
//       category: "drink",
//       price: 0.1,
//     },
//     {
//       goodsId: 3,
//       name: "상품 3",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
//       category: "drink",
//       price: 2.2,
//     },
//     {
//       goodsId: 2,
//       name: "상품 2",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
//       category: "drink",
//       price: 0.11,
//     },
//     {
//       goodsId: 1,
//       name: "상품 1",
//       thumbnailUrl:
//         "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
//       category: "drink",
//       price: 6.2,
//     },
//   ];

// get 메서드 활용해서 모든 리스트 회신(목록 조회 API)
router.get("/goods", async(req, res) => {
    
    // 조회 항목을 카테고리에 넣게 설정(필터링 기능을 위해)
    const { category } = req.query;

    const goods = await Goods.find({category});

    res.json({
        goods,// goods라는 키에 goods 배열 값으로 출력한 것, 객체의 키 이름과 value명이 같다면 걍 하나만 넣어도 됨
    });
});

// 상세조회를 위한 API
router.get("/goods/:goodsId", async (req, res) => {
    
    const { goodsId } = req.params;

    const [detail] = await Goods.find({goodsId : Number(goodsId)});

    // const [detail] = goods.filter((item) => item.goodsId === Number(goodsId));

    res.json({
        detail : detail,
    });

});

// 장바구니에 추가하는 API
router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;
    const existsCarts = await Carts.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
    }

    await Carts.create({ goodsId: Number(goodsId), quantity: quantity });

    res.json({ result: "success" });
});

// 장바구니에서 제거하는 API
router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const existsCarts = await Carts.find({ goodsId });
    if (existsCarts.length > 0) {
        await Carts.deleteOne({ goodsId });
    }

    res.json({ result: "success" });
});

// 장바구니 수정 API
router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Carts.find({ goodsId: Number(goodsId) });
    // 이번에는 카트에 없을 때 에러를 발생시켜야 함
    if (!existsCarts.length) {
        return res.status(400).json({ success : false, errorMessage : "장바구니에 해당 상품이 없습니다."});
    }

    // 어떠한 값으로 바꿀 것인지에 대해서는 setf를 사용
    await Carts.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });

    res.json({ success: true });
});

// 상품 자체를 추가하는 API
// async에는 awaits 연계해서 붙여줘야함
router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body; // 디스트럭쳐링
    const goods = await Goods.find({ goodsId });
    // 찾은 데이터 길이가 1이상(truethy)이다: 데이터가 존재한다
    if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });//response로 경고 문구 송부, 리턴을 통해서 콜백함수를 종료
    }
    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });//없으면 db에 데이터 생성
    res.json({ goods: createdGoods });//json형식으로 응답 데이터 전달
});

module.exports = router;
