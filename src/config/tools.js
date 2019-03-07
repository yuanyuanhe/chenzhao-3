import Toast from 'react-simple-toast';
import { text } from './data.js'
import createBrowserHistory from 'history/createBrowserHistory';
import axios from 'axios'
const $ = window.$;
const history = createBrowserHistory();

// axios.interceptors.request.use(function(config) {
// 	toast.loading('正在加载')
// 	return config
// })

axios.interceptors.response.use(function (response) {
	if (response.data.result === 'RC500') {
		toast.error(response.data.errMsg);
		setTimeout(() => {
			localStorage.setItem('isLogin', false);
			window.location.reload();
		}, 3000)
	}
	//toast.loaded('')
	return response
})

/*
get object to map
 */
export const getObject = (num) => {
	let obj = [];
	for (let i = 0; i < num; i++) {
		obj.push({})
	}

	return obj;
}


/*
check data
 */
export const checkResult = (data) => {
	return data.result === 'RC100';
}

/*
checkDate
 */
export const checkDate = (dateString) => {
	var a = /^(\d{4})-(\d{2})-(\d{2})$/;
	return a.test(dateString);
}

/*
encode
 */
export const UrlEncode = (str) => {
	let result = "";
	let special = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
	for (let i in str) {
		if (special.indexOf(str[i]) !== -1 || (/.*[\u4e00-\u9fa5]+.*$/.test(str[i]))) {
			result += escape(str[i]).toLowerCase();
		} else {
			result += str[i];
		}
	}
	return result;
}

export const policyNoInput = (e) => {
	let policyNo = e.target.value;
	if (!/^[A-Z]/.test(policyNo)) {
		return '';
	}
	if (!/^[A-Z][0-9]*$/.test(policyNo)) {
		return policyNo[0] + policyNo.replace(/[^0-9]/ig, "");
	}
	if (!/^\S{1,10}$/.test(policyNo)) {
		return policyNo.slice(0, 10);
	}
	return policyNo;
}

/*
message text
 */
export const messageText = (string) => {
	return text[string] || string;
}
/*
toast
type : msg | loading | success | fail | offline
 */
export const toast = {
	duration: 1000,
	text(msg, duration = this.duration) {
		Toast({
			type: "msg",
			msg: msg.toString(),
			duration: duration,
		})
	},
	success(msg, duration = this.duration) {
		Toast({
			type: "success",
			msg: msg.toString(),
			duration: duration,
		})
	},
	error(msg, duration = this.duration) {
		if (msg !== undefined) {
			Toast({
				type: "fail",
				msg: msg.toString(),
				duration: duration,
			})
		}
	},
	offline(msg, duration = this.duration) {
		Toast({
			type: "offline",
			msg: msg.toString(),
			duration: duration,
		})
	},
	loading(msg, duration = this.duration) {
		Toast({
			type: "loading",
			msg: msg.toString(),
			typeStatus: 1
		})
	},
	loaded(msg, duration = this.duration) {
		Toast({
			type: "loading",
			msg: msg.toString(),
			typeStatus: 2
		})
	},

}
/*
down file
author: jichuangwei
 */
export const downFile = (data, name) => {
	var blob = new Blob([data])
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		window.navigator.msSaveOrOpenBlob(blob, name + ".xls")
	} else {
		var url = window.URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.href = url;
		a.download = name + ".xls";
		a.click();
	}

}

export const dataURLtoBlob = (data) => {//data是文件流
	var bstr = window.$.base64.atob(data);//解码
	var n = bstr.length;
	var u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);//转二进制
	}
	return new Blob([u8arr], { type: 'application/pdf' });//用blob生成pdf文件,返回PDF文件
}




export const downpdf = (data, name) => {
	//var blob = new Blob([data], {type:'application/pdf'})
	// if (!!window.ActiveXObject || "ActiveXObject" in window){
	// 	window.navigator.msSaveOrOpenBlob(data,name)
	// }else{
	if (window.navigator.msSaveOrOpenBlob) {//msSaveOrOpenBlob方法返回bool值
		navigator.msSaveBlob(data, name) || window.navigator.msSaveOrOpenBlob(data, name);//本地保存
	} else {
		var url = window.URL.createObjectURL(data);
		var a = document.createElement('a');
		a.href = url;
		a.download = name + ".pdf";
		a.click();
	}

}

//时间格式转换  date,"yyyy-mm-dd HH-mm-ss"
export const format = (timestamp, type) => {
	let now = new Date(timestamp);
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	if (type === 'y-m-d') {
		return year + "-" + month + "-" + day;
	}
	if (type === 'y-m-d h-m') {
		return year + "-" + month + "-" + day + " " + hour + ":" + minute;
	}
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

//去掉字符串前后所有空格
export const Trim = (str) => {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}


//权限验证demo
export const Power = (arr1, arr2) => {
	if (arr2 === '' || arr2 === '0011') {
		setTimeout(() => {
			localStorage.setItem('isLogin', false);
			window.location.reload();
		}, 1000)
		toast.error('该用户没有分配权限')
	}
	let list = arr2.split(',');
	for (let i in list) {
		if (arr1.indexOf(list[i]) !== -1) {
			return true;
		}
	}
	return false;
}

//权限选择时间展示
export const datatime = (arr1) => {
	var list1 = arr1.split(',')
	if (list1.indexOf('0014') !== -1 || list1.indexOf('0015') !== -1) {
		return true
	} else {
		return false
	}
}


//获取结账方式年份
export const year = () => {
	let obj = []
	var dqyear = 2018
	var d = new Date()
	var xyear = d.getFullYear()
	for (var i = 0; i < 10; i++) {
		if (xyear >= dqyear) {
			obj.push(xyear)
			xyear--;
		}
	}
	return obj
}


//EWS
export const connect = (data, picPath, strPics) => {
	var data = data
	var picPath = picPath
	var strPics = strPics
	var arr_pics = splitStrToArray(strPics, "|", 2);


	function splitStrToArray(str, sep, dimention) {

		if (dimention == 1) {
			return str.substring(0, str.length - 1).split(sep);
		} else if (dimention == 2) {
			var rtnArr = new Array();
			var tempArr = str.substring(0, str.length - 1).split(sep);
			for (var i = 0; i < (tempArr.length / 2); i++) {
				rtnArr[i] = new Array(2);
				rtnArr[i][0] = tempArr[2 * i];
				rtnArr[i][1] = tempArr[2 * i + 1];

			}
			return rtnArr;
		} else if (dimention == 3) {
			var rtnArr = new Array();
			tempArr = str.substring(0, str.length - 1).split(sep);
			for (var i = 0; i < (tempArr.length / 3); i++) {
				rtnArr[i] = new Array(3);
				rtnArr[i][0] = tempArr[3 * i];
				rtnArr[i][1] = tempArr[3 * i + 1];
				rtnArr[i][2] = tempArr[3 * i + 2];

			}
			return rtnArr;
		} else if (dimention == 4) {
			var rtnArr = new Array();
			tempArr = str.substring(0, str.length - 1).split(sep);
			for (var i = 0; i < (tempArr.length / 4); i++) {
				rtnArr[i] = new Array(4);
				rtnArr[i][0] = tempArr[4 * i];
				rtnArr[i][1] = tempArr[4 * i + 1];
				rtnArr[i][2] = tempArr[4 * i + 2];
				rtnArr[i][3] = tempArr[4 * i + 3];

			}
			return rtnArr;
		}
	}
	function parseData(data) {
		var temp = "";
		if (data.indexOf("\n") > -1
			|| data.indexOf(" ") > -1
			|| data.indexOf("<") > -1
			|| data.indexOf(">") > -1
			|| data.indexOf("&") > -1
		) {
			var temp_char = "";
			for (var i = 0; i < data.length; i++) {
				temp_char = data.charAt(i);
				if (temp_char == "\n") {
					temp = temp + "<br>";
				} else if (temp_char == " ") {
					temp = temp + "&nbsp;";
				} else if (temp_char == "&") {
					temp = temp + "&amp;";
				} else if (temp_char == "<") {
					temp = temp + "&lt;";
				} else if (temp_char == ">") {
					temp = temp + "&gt;";
				} else {
					temp = temp + temp_char;
				}
			}
		} else {
			temp = data;
		}
		temp = replaceStrToPic(temp, picPath);
		//temp='"'+temp+'"'
		console.log(temp)
		return temp;

	}
	function replaceStrToPic(text, imagePath) {
		var temp = text;

		for (var jj = 0; jj < arr_pics.length; jj++) {
			var sgl_pic = imagePath + arr_pics[jj][0];
			var str1 = new RegExp(arr_pics[jj][1], "g");
			//var str2 = "<img src = {require('" + sgl_pic + "')}/>";
			var str2 = "<img src = '" + sgl_pic + "'/>";
			if (temp.indexOf("@##") > -1 && temp.indexOf("##@") > 3) {
				temp = temp.replace(str1, str2);
			}
		}
		return (temp);
	}
	return parseData(data)

}


//去掉数组中的空字符串
export const removeEmptyArrayEle = (arr) => {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == "") {
			arr.splice(i, 1);
			i = i - 1;
		}
	}
	return arr;
}