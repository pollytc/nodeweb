var express = require('express');
var router = express.Router();
var actionpath = "../action/";
var modelpath = "../model/";
/* GET users listing. */
router.get('/*',function (req,res,next) {
    var plist = req.params[0].split("/")
    if(plist.length<=0)
        doget(req,res,"index",'index');
    else
        doget(req,res,plist[0],plist[1]);
})
router.post('/*',function(req,res,next){
    var plist = req.params[0].split("/");
    if(plist.length<=0)
        dopost(req,res,"index",'index');
    else
        dopost(req,res,plist[0],plist[1]);
})

function dopost(req,res,mod,act){
    mod =mod||"index";
    act =act||'index';
    try{
        var aact = require(actionpath+mod+"Action")(req,res);
        if(aact[act])
            aact[act].call(aact,req.body);
        else
            throw new Error(act+" not find")
    }catch (e){
        throw e;
    }
}

function doget(req,res,mod,act) {
    mod =mod||"index";
    act =act||'index';
    try{
        var aact = require(actionpath+mod+"Action")(req,res);
        if(aact[act])
            aact[act].call(aact,req.query);
        else
            throw new Error(act+" not find")
    }catch (e){
        throw e;
    }

}

module.exports = router;
