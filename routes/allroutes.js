/**
 * Created by Administrator on 2016/12/14.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/:item/:mod/:act',function(req, res, next) {
    res.json(req.params)
});
router.use('/:mod/:act/*',function(req, res, next) {
    res.json(req.params)
});
router.use('/:mod/:act',function(req, res, next) {
    res.json(req.params)
});
router.use('/:mod',function(req, res, next) {
    res.json(req.params)
});

module.exports = router;
