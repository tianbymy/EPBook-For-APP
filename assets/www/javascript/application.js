var base_url="http://61.139.87.56:3000"
var base_url="http://192.168.1.108:3000"
$(function(){
    $.ajaxSetup ({

	cache: false //关闭AJAX相应的缓存

    });
})
// 此处 ：模拟用户  实际情况的时候，根据登录帐号 获取
//var user = {"account":"xiegang","created_at":"2013-07-09T15:33:51+08:00","email":"xiegang@zhiyisoft.com","id":2,"membership_id":2,"name":"谢刚","organ_id":2,"phone":"18628171676","status":0,"updated_at":"2013-07-09T15:33:51+08:00"}

function get_servers(obj){
    $.ajax({
	type: "GET",
	url: obj.url,
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

function logout(){
    $.ajax({
	type: "GET",
	url: logout_path,
	data: {"user_login[email]": localStorage.getItem('email')},
	dataType: "jsonp",
	jsonp: "callback",
	success: function(msg){
	    if(msg.status=="success"){
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		$.mobile.changePage("index.html","slidedown", true, true);
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


