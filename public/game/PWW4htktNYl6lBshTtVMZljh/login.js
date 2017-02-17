/**
 * Created by Administrator on 2016/11/4.
 */

function login(){
    var logo = new $s.dsLoader().load(_static.gamefold+'img/logo.png');
    $s.stage.addChild(logo);
    logo.addEventListener('complete',function(){
        logo.x = $s.stage.stageWidth*0.1;
        logo.y = ($s.stage.stageHeight-logo.height)*0.5;
    })


    var btn = new $s.dsLoader().load(_static.gamefold+'img/btn.png');
    $s.stage.addChild(btn);
    btn.name = 'btn'
    btn.x = $s.stage.stageWidth*0.7;
    btn.y = 100;
    var panel = null;
    btn.addEventListener('mousedown',function(){
        if(!panel)panel = loginPanel();
    })

    var btn1 = new $s.dsLoader().load(_static.gamefold+'img/shuoming.png');
    $s.stage.addChild(btn1);
    btn1.x = $s.stage.stageWidth*0.7;
    btn1.y = 200;
    btn1.addEventListener('mousedown',function(){

    })

    function loginPanel(){
        if(isLogin()){
            var query = getquery();
            var send = {fun:'person','gameid':query.id};
            getSerData(send,function (result) {
                if(result.status==1){
                    localData(result.result);
                     var s =result.result.scene||"login";
                     changeScene(s);
                }else{
                    alert(result.message)
                }
            })
        }
    }
}


