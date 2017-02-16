/**
 * Created by Administrator on 2016/12/8.
 */
$(document).ready(function(){
    //餐单设置
    $(".ds-sidenav li").click(function(e){
        $(this).find('ul').toggleClass('active')
    })
})

function loadCon(str,id){
    id = id||"#content";
    var param =getquery();
    str =param['href']||str;
    str =str||"list";
    $.ajax({url:str,type:"GET",data:param,dataType:"html",success:function (e) {
        $(id).html(e)
    }})
}
var cache =[];
function loadHTML(str,id,back){
    if(cache[str]){
        $(id).append(cache[id]);
        if(back)back();
        return;
    }
    $.ajax({url:str,type:"GET",data:{},dataType:"html",async:'false',success:function (e) {
        if($(id).length==0){
            id = 'body';
        }
        $(id).append(e);
        cache[str]=e;
        if(back)back();
    }});
}

function getquery(){
    var arr = window.top.location.href.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+",'g'));
    var reslt={};if(!arr)return reslt
    for(var i = 0;i<arr.length;i++){
        var a = arr[i].substring(1).split("=");
        reslt[a[0]]=a[1];
    }
    return reslt;
}

function initExdit(){
    var editor;
    var K = KindEditor;
        editor = K.create('textarea[name="content"]', {
            allowFileManager : false,
            fieldName : 'imgFile',
            url:'/file/uploading',
            items : ['source','|',
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'emoticons', 'image', 'link','|','code']
        });
    return editor;
}

function initUpload() {
    var uploadbutton = KindEditor.uploadbutton({
        button : KindEditor('#image3')[0],
        fieldName : 'imgFile',
        url : '/file/uploading',
        afterUpload : function(data) {
            if (data.error === 0) {
                KindEditor('.url3').val(data.url);
            } else {
                alert(data.message);
            }
        },
        afterError : function(str) {
            alert('自定义错误信息: ' + str);
        }
    });
    uploadbutton.fileBox.change(function(e){
        uploadbutton.submit();
    });
}

function insertSri(sour,dest){
    $(dest).text($(sour).html());
}

function isLogin(){
    return window.top.showlogin();
}

function showlogin(id){
    id =id||"body";
    if($('#logstate').val()=='login'){
        return true;
    }else{
        loadHTML('/html/login.html',id,function () {
            $('.gamelogin').modal('show');
        })
        return false;
    }
}

function drag(ele) {
    var upfile = null
    ele = ele||'drag'
    var dropbox = document.getElementById(ele)
    dropbox.addEventListener("drop", function(e){
        e.stopPropagation();
        e.preventDefault();
        upfile = readDrag(e.dataTransfer.files);
    }, false);
    dropbox.addEventListener("dropover",function(e){
        e.preventDefault();
        e.stopPropagation();
    },false );

    dropbox.onclick = function () {
        $("#selfile").click()
        $("#selfile").change(function (e) {
            upfile = readDrag($("#selfile")[0].files)
        })
    }
    $("#dsimg").click(function () {
        if(upfile){
            var fData = new FormData()
            fData.append('imgFile',upfile)
            var oReq = new XMLHttpRequest();
            oReq.onreadystatechange=function(){
                if(oReq.readyState==4){
                    if(oReq.status==200){
                        var json=JSON.parse(oReq.responseText);
                        insertTemp(json)
                    }
                }
            }
            oReq.open("POST", "/graph/serach");
            oReq.send(fData);
        }else{
            alert('没有匹配文件')
        }
    })

    function insertTemp(arr){
        if (arr.length ==0)
        {
            alert('没有找到匹配')
            return
        }
        var temp = $("#templete").text()
        var res = ''
        for(var i = 0;i<arr.length;i++){

            var reg=new RegExp("#src","g")
            res += temp.replace(reg,unescape(arr[i].url))
        }
        $('#temp').html(res)
    }
}



function readDrag(files){
    if(files.length<1){
        return alert('空文件')
    }
    var ele = document.getElementById('info')
    file = files[0]
    var reader=new FileReader();
    if(/^image/.test(file.type)){
        reader.readAsDataURL(file);
        reader.onload=function(evt){
            var msg="";
            msg+="文件大小："+(file.size/1024).toFixed(1)+"k"+"<br>";
            msg+="文件名："+file.name+"<br>";
            msg+="文件类型："+file.type+"<br>";
            var finfo = '<p class="bg-success">'+msg+'</p>'
            finfo += '<img id="uploadimg" src="'+reader.result+'" class="img-thumbnail">'
            ele.innerHTML = finfo
        };
    }else{
        alert("不支持文件格式")
    }
    return file
}

function spider(){
    type = ''
    $(".spy_start").click(function () {
        type = 'spy_start'
        $.post('/user/spider/spy',{statu:1},callback)
    })
    $(".spy_stop").click(function () {
        type = 'spy_stop'
        $.post('/user/spider/spy',{statu:0},callback)
    })
    $(".analysis_start").click(function () {
        type = 'analysis_start'
        $.post('/user/spider/analysis',{statu:1},callback)
    })
    $(".analysis_stop").click(function () {
        type = 'analysis_stop'
        $.post('/user/spider/analysis',{statu:0},callback)
    })

    function callback(param){
        if(param.status ==0){
            alert(param.msg)
            return
        }
        switch (type){
            case "spy_stop":
                $('#spy .run').html(0)
                break
            case "spy_start":
                $('#spy .run').html(1)
                break
            case "analysis_start":
                $('#analysis .run').html(1)
                break
            case "analysis_stop":
                $('#analysis .run').html(0)
                break
        }
    }
}