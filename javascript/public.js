var base_url="http://61.139.87.56:3000"
var base_url="http://192.168.1.109:3000"
/* 此处 ：模拟用户  实际情况的时候，根据登录帐号 获取  */
var user = {"account":"xiegang","created_at":"2013-07-09T15:33:51+08:00","email":"xiegang@zhiyisoft.com","id":2,"membership_id":2,"name":"谢刚","organ_id":2,"phone":"18628171676","status":0,"updated_at":"2013-07-09T15:33:51+08:00"}

function get_servers(url,data){
    result = $.ajax({
	type: "GET",
	url: base_url+url,
	data: data,
	dataType: "jsonp",
	jsonp: "callback",
	success: function(result){
	    return result;
	}
    })
    return result;
}

function get_organ(organ_id){
    url = "/organs/get_organ" ;
    return get_servers(url,{"organ_id": organ_id});
}
get_organ(user.organ_id)
