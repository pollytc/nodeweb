/**
 * Created by Administrator on 2016/10/30.
 */

function Person(){
    $s.dsExtend(Person,$s.dsDisplayObjectContainer);
    var per =new Person.prototype.__init();
    return per;
}
Person.prototype.__init =function() {
    this.head = new $s.dsLoader();
    this.head.name = "head";
    this.body = new $s.dsLoader();
    var per =localData();
    if(per){
        this.head.load(_static.gamefold+'img/head' + per.sex + '.png');
        this.body.load(_static.gamefold+'img/body' + cupBody(per.weight) + '.png');
        $s.stage.dispatchEvent($s.dsEvent('updatefigure'));
    }else{
        return changeScene('login');
    }

    this.hand = new $s.dsMovieClip();

    this.hand.gotoAndStop(3)
    this.foot = new $s.dsMovieClip();
    this.foot.gotoAndStop(2);
    this.speed = 5;
    this.timeid =0;
    this.action = '';
    this.addChild(this.head);
    this.addChild(this.body);
    this.addChild(this.hand).load("hand");
    this.addChild(this.foot).load("jiao");
    this.body.x =-8;
    this.body.y = -107;
    this.foot.y =-25;
    this.hand.y=-80;
    this.hand.x = 5;
    this.head.y =-150;
    this.__code = {};
    this.__curkey = '';
    this.__cur= {};
}

Person.prototype.push = function(dx,dy,key,bestop){
    if(this.__code[key]==null)this.__code[key]=[];
    this.__code[key].push({x:dx,y:dy,stop:bestop});
}
Person.prototype.gowalk = function(key){
    if(this.__curkey != key){
        if(this.__cur.stop){
            delete this.__code[this.__curkey];
            this.__cur={};
        }
    }
    var cc = this.__code[key];
    if(cc.length<=0)return false;
    if(this.__cur.stop)return;
    this.__cur=cc.shift();
    this.__curkey=key;
    this.walk(this.__cur.x, this.__cur.y);
    return true;

}
function cupBody(b){
    var m =(b-75)*0.5+3;
    if(m<=0)m=1;
    else if(m>20)m = 20;
    var n = 4-m.toString().length;
    for(var i=0;i<n;i++){
        m='0'+ m.toString();
    }
    return m;
}
function BMItoimg(h,l){
    var m = parseInt(h/(l*l));
    if(m<=16)m= 1
    else if(m>35)m= 20;
    else m=m -16;
    var n = 4-m.toString().length;
    for(var i=0;i<n;i++){
        m='0'+ m.toString();
    }
    return m;
}

Person.prototype.walk = function(dx,dy,face){
        if(dx<this.x) {this.scaleX = -1;}
    else this.scaleX = 1;

    this.foot.play();
    var r = new $s.dsRectangle(dx - 10, dy -10, 20, 20);
    var self = this;
    if (r.contains(self.x, self.y)) {

    } else {
        var a = Math.atan2(dy - self.y, dx - self.x);
        clearInterval(self.timeid);
        self.timeid = setInterval(function () {
            self.x += Math.cos(a) * self.speed;
            self.y += Math.sin(a) * self.speed;
            if (r.contains(self.x, self.y)) {
                if(self.__curkey){
                    self.__cur={}
                    if(self.gowalk(self.__curkey))return
                }
                self.stand(1);
                self.dispatchEvent(new $s.dsEvent('walkover'));
                var e = $s.dsEvent('action');
                e.action = self.action;
                $s.stage.dispatchEvent(e);
            }
        }, 100);
    }
}
Person.prototype.stand = function(face){
    clearInterval(this.timeid);
    this.foot.gotoAndStop(2);
}



