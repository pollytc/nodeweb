/**
 * Created by Administrator on 2016/11/17.
 */
function sport(){
    var fstage = new $s.dsSprite();
    fstage.y = 500-$s.stage.stageHeight;
    fstage.width = 800;
    fstage.height=600;
    $s.stage.addChild(fstage);
    var ellw = 300;
    var ellh  = 150;
    var cenx = 400;
    var ceny = 300;
    var bg = new $s.dsSprite();
    bg.graphics.lineStyle(2,0xffff00);
    // bg.graphics.beginFill(0xE2EB20);
    bg.graphics.drawEllipse(0,0,ellw,ellh);
    bg.graphics.drawEllipse(0,30,ellw+50,ellh+50);
    bg.x = cenx;
    bg.y = ceny;
    var flowes = [];
    for(var i=0;i<5;i++){
        var l = new $s.dsLoader().load('img/hua.png');
        l.x = Math.random()*100;
        l.y = Math.random()*100;
        flowes.push(l);
        fstage.addChild(l);
    }
    fstage.addChild(bg);

    var person = new Person();
    person.x = 700;
    person.y = 400;
    fstage.addChild(person);

    var pollice = new $s.dsMovieClip('xiaobing');
    pollice.x = 700;
    pollice.y = 50;
    //pollice.stop();
    fstage.addChild(pollice);
    var rotation = 0;

    var btn = $s.dsSprite();
    var begin = new $s.dsLoader().load('img/sportbtn.jpg');
    btn.x = ($s.stage.stageWidth-120)*0.5;

     btn.addChild(begin);
    var t=new $s.dsTextField();
    t.y=10;t.x = 30;
    t.defaultTextFormat.bold = 100;
    t.text="开始";
    btn.addChild(t);
    fstage.addChild(btn);
    btn.addEventListener('click',function(){
        if(runid==0)
        {
            runid=setInterval(run,200);
            t.text="暂停";
        }else{
            clearInterval(runid);
            runid=0;
            t.text="开始";
        }
    })
    var runid = 0;
    function run(){
        if(rotation>=360)rotation=0;
        rotation++;
        var r =rotation/Math.PI*0.5;
        person.x = Math.cos(r)*(ellw+30)+cenx;
        person.y = Math.sin(r)*(ellw+30)*ellh/ellw+ceny;
    }

}