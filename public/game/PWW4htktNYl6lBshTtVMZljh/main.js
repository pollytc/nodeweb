/**
 * Created by Administrator on 2016/11/4.
 */
var _static ={
    ser:'/gameServer/index',
    gamefold:""
};
$s.config.baseURI=_static.gamefold+"movie/";
function changeScene(sec){
    switch(sec){
        case "road":
            $s.stage.reset();
            road();
            break;
        case "room":
            $s.stage.reset();
            room();
            break;
        case 'login':
            $s.stage.reset();
            login(1);
            break;
        case 'resigter':
            login(0);
            break;
        case 'square':
            $s.stage.reset();
            square();
            break;
        case 'sport':
            $s.stage.reset();
            $s.stage.color="#330000"
            sport();
            break;
    }
    if(sec != 'login'){
        var pa = new figure();
        pa.name ='figure';
        pa.x= $s.stage.stageWidth-300;
        $s.stage.addChild(pa);
    }
    var param = localData();
    if(!param)return;
    param.scene = sec;
    localData(param);
    postSerData({fun:'person',data:param});
    // var e =$s.dsEvent('scene');
    // e.scene =sec;
    // $s.stage.dispatchEvent(e);

}

function getSerData(param,back){
    var url = new $s.dsURLRequest(_static.ser);
    url.method ='get';
    url.dataType="json";
    url.data = param;
    var load = $s.dsURLLoader(url);
    load.addEventListener('complete',function(){
        var d = load.data?JSON.parse(load.data):'';
        if(back)back.call(null,d);
    })
}
function postSerData(param,back){
    var url = new $s.dsURLRequest(_static.ser);
    url.dataType="json";
    url.method ='post';
    url.data = param;
    var load = $s.dsURLLoader(url);
    load.addEventListener('complete',function(){
        var d = load.data?JSON.parse(load.data):'';
        if(back)back.call(null,d);
    })
}

var serverdata ={};
function localData(){
    var data = arguments[1];
    var key = arguments[0];
    if(key && typeof key != 'string'){
        data = key;
        key = 'username';
        serverdata[key]= data;
    }else{
        key = key||'username';
        return serverdata[key];
    }
}

