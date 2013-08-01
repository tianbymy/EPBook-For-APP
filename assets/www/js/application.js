var base_url="http://phonebook.zhiyisoft.com"
//var base_url="http://192.168.1.103:8080"

$(function(){
    $.ajaxSetup ({
	cache: false //关闭AJAX相应的缓存
    });
    $.mobile.defaultPageTransition = 'none';
})

$( document ).bind( 'mobileinit', function(){
    $.mobile.loader.prototype.options.text = "加载中...";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "<img src='/css/images/ajax_loader.gif />'";
});
//显示加载器
function showLoader() {
    $.mobile.loading('show', {
        text: '加载中...', //加载器中显示的文字
        textVisible: false, //是否显示文字
        theme: 'a',        //加载器主题样式a-e
        textonly: false,   //是否只显示文字
        html: "<img src='/css/images/ajax_loader.gif />'"           //要显示的html内容，如图片等
    });
}
function hideLoader()
{
    $.mobile.loading('hide');
}



function get_servers(obj){
    $.ajax({
	type: "GET",
	url: obj.url,
	beforeSend: showLoader(),
	complete: hideLoader(),
	data: obj.data,
	dataType: "jsonp",
	jsonp: "callback",
	success: function(result){obj.callback(result)}
    })
}

// 定义能访问的 api path
var login_path = base_url + "/api/sessions/login";
var logout_path = base_url + "/api/sessions/logout";
var get_user_path = base_url + "/api/sessions/get_user";
var get_users_path = base_url + "/api/users/get_users";
var get_root_organ_path = base_url + "/api/organs/get_root" ;
var get_childs_organ_path = base_url +"/api/organs/get_organ_tree" ;
var get_version_path =  base_url +"/api/versions" ;

function logout(){
    $.ajax({
	type: "GET",
	url: logout_path,
	data: {"email": localStorage.getItem('email')},
	dataType: "jsonp",
	jsonp: "callback",
	success: function(msg){
	    if(msg.status=="success"){
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		$.mobile.changePage("index.html","slidedown", false, false);
		navigator.app.exitApp();

	    }else{
		$("$message").html("退出失败");
	    }
	}
    });
}

inituser = function(email,token){
    get_servers({
	url: get_user_path,
	data: {"email": email,"token":token},
	callback: function(data){
	    if (data.status){
		$.mobile.changePage("index.html","slidedown", true, true);
	    }else{
		for (i in data){
		    localStorage.setItem(i,data[i]);
		}
	    }
	}
    })
}
function welcome(){
    html="";
    if (localStorage.getItem("name")==null){
	html+="<span>欢迎您，尊敬的："+localStorage.getItem("email")+"</span>";
    }else{
	html+="<span>欢迎您，尊敬的："+localStorage.getItem("name")+"</span>";
    }
    $("#user").html(html)
}

