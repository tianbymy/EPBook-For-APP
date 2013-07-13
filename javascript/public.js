var base_url="http://61.139.87.56:3000"
var base_url="http://192.168.2.100:3000"
/* 此处 ：模拟用户  实际情况的时候，根据登录帐号 获取  */
var user = {"account":"xiegang","created_at":"2013-07-09T15:33:51+08:00","email":"xiegang@zhiyisoft.com","id":2,"membership_id":2,"name":"谢刚","organ_id":2,"phone":"18628171676","status":0,"updated_at":"2013-07-09T15:33:51+08:00"}

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

/* 定义能访问的 api path */
var login_path = base_url + "/api/sessions/login";
var logout_path = base_url + "/api/sessions/logout";
var get_root_organ_path = base_url + "/api/organs/get_root" ;
var get_childs_organ_path = base_url +"/api/organs/get_organ_tree" ;

function logout(){
    alert("正在退出")
    $.ajax({
	type: "GET",
	url: logout_path,
	data: {email: $.cookie("email")},
	dataType: "jsonp",
	jsonp: "callback",
	success: function(msg){
	    if(msg.status=="success"){
		localStorage.removeItem('email');
		localStorage.removeItem('token');
		$.mobile.changePage("index.html","slidedown", true, true);
	    }else{
		$("$message").html("退出失败");
	    }
	}
    });
}

