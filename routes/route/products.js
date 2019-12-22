const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../../api/models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products"
  });
});

// 新增產品
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(200).json({
    retCode: 1,
    retMsg: "新增成功",
    retData: []
  });
  //   res.status(201).json({
  //     message: "Handling POST request to /products",
  //     createProduct: product
  //   });
});

// 取得產品資訊
router.get("/info/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From database ", doc);
      if (doc) {
        res.status(200).json({
          retCode: 1,
          retMsg: "",
          retData: doc
        });
        // res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "no valid entry found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// 取得產品列表
router.get("/lists", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// 刪除產品
router.delete("/info/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(doc => {
      //   res.status(200).json(doc);
      res.status(200).json({
        retCode: 1,
        retMsg: "刪除成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// 修改產品
router.patch("/info/:productId", (req, res, next) => {
  console.log(123);
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(doc => {
      //   res.status(200).json(doc);
      res.status(200).json({
        retCode: 1,
        retMsg: "更新成功"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
