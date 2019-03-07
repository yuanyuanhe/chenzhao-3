var Validate = {
	/**
	 * 判断是否为空
	*/
	isEmpty:function(val){
		val = $.trim(val);
		if(!val || ""==val){
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 判断是否为数字
	*/
	isNumber:function(val){
		return !isNaN(val);
	},
	/**
	 * 判断是否整数
	 */
	 isInt:function(val){
		return /^-?\d+$/.test(val);
	 },
	 /**
	  *判断是否正整数
	  */
	 isPlusInt:function(val){
		return /^[0-9]*[1-9][0-9]*$/.test(val);
	 },
	 /**
	  * 判断是否负整数
	  */
	 isMinusInt:function(val){
		return /^-[0-9]*[1-9][0-9]*$/.test(val);
	 },
	 /**是否浮点数*/
	 isFloat:function(val){
		return /^(-?\d+)(\.\d+)?$/.test(val);
	 },
	/**是否正浮点数*/
	 isPlusFloat:function(val){
		return /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(val);
	 },
	/**是否负浮点数*/
	 isMinusFloat:function(val){
		return /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(val);
	 },
	 /**是否符合域名*/
	 isDomain:function(val){
		 return /^([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(val);
	 },
	 /**符合域名或IP*/
	 isIpOrDomain:function(val){
		 var MobileFlag = true;
		 var TelFlag = true;
         if(!Validate.isIp(val)){
        	 MobileFlag = false;
         }
         if(!Validate.isIpV6(val)){
        	 MobileFlag = false;
         }
         if(!Validate.isDomain(val)){
        	 TelFlag = false;
         }
         return (MobileFlag||TelFlag);		 
	 },
	 /**是否IP地址*/
	 isIp:function(val){
		 return  /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){2}(\.(([1-9]|[1-9][\d]{1}|1[\d]{2})|2[0-4][\d]|(25[0-4])))$/.test(val);
	 },
	 isIpV6:function(val){
		 return /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/.test(val);
	 },
	 /**是否Email*/
	 isEmail:function(val){
		 return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
	 },
	 /**是否手机*/
	 isMobile:function(val){
//		 return /^(13|15)[0-9]{9}$/.test(val);
		 return /^([+]{0,1}(\d){1,4}){0,1}((13|15|18)[0-9]{9})$/.test(val);
	 },
	 /**是否是自然数*/
	 isNaturalNum:function(val){
		 return /^[0-9]*$/.test(val);
	 },
	 /**大于等于0，且可以为小数点一位*/
	 isGTEqualZeroFloatOne:function(val){
		 return /^-?[0-9]*[\.]?[0-9]?$/.test(val); 
	 },
	 /**大于等于0，且可以为小数点二位*/
	 isGTEqualZeroFloatTwo:function(val){
		 return /^-?[0-9]*[\.]?[0-9]{1,2}?$/.test(val);
	 },
	 /**大于等于0，且可以为小数点三位*/
	 isGTEqualZeroFloatThree:function(val){
		 return /^-?[0-9]*[\.]?[0-9]{1,3}?$/.test(val);
	 },
	 /**大于等于0，且可以为小数点四位*/
	 isGTEqualZeroFloatFour:function(val){
		 return /^-?[0-9]*[\.]?[0-9]{1,4}?$/.test(val);
	 },
	 /**验证手机和固定电话*/
	 isTelOrMobile:function(val){
		 var MobileFlag = true;
		 var TelFlag = true;
         if(!Validate.isMobile(val)){
        	 MobileFlag = false;
         }
         if(!Validate.isTel(val)){
        	 TelFlag = false;
         }
         return (MobileFlag||TelFlag);
	 },
	 /**是否固定电话*/
	 isTel:function(val){
		 return /^[0-9\(\)+-]*$/.test(val);
//		 return /^d{3}-d{8}|d{4}-d{7}$/.test(val);
	 },
	 /**是否邮编*/
	 isZipCode:function(val){
		 return /^\\d{6}$/.test(val);
	 },
	 /**是否身份证*/
	 isCard:function(val){
		 return /^[1-9]([0-9]{14}|[0-9]{17})$/.test(val);
	 },
	 /**
	  * 其他普通文本特殊字符'%/\\:?<>|;&@#*"
	  * */
	 isIllegality:function(val){
		 return "null"!=val && /^$|^[^'\/\"%\\\\:?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 全部非法字符'"%()/\\:?<>;|&@*#
	  * */
	 isIllegalityAll:function(val){
		 return "null"!=val && /^$|^[^'\/\"%\(\)\\\\:?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 脚本路径特殊字符'"%\\:?<>|;&@*#"
	  * */
	 isScriptPathIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"%\\\\:?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 手机，电话，传真特殊字符'"%/:?<>|;&@*#
	  * */
	 isTelIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"%\/:?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 搜索特殊字符'"%()?<>|#*
	  */
	 isSearchIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"%\(\)?<>|#*]+$/.test(val);
	 },
	 /**
	  * 资源显示名称特殊字符'"%()\\:?<>|;&@#*
	  * */
	 isResourceNameIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"\\\\:%?<>|;&@#*\(\)]+$/.test(val);
	 },
	 /**
	  * 资源组名称特殊字符'"%/\\:?<>;|&@#*
	  * */
	 isResourceGroupNameIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"\/\\\\:%?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * URL特殊字符'"%\\<>;|@#*
	  */
	 isURLIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"\\\\%<>|;@#*]+$/.test(val);
	 },
	 /**
	  * EMail特殊字符'"%/\\:?<>;|&#*
	  */
	 isEmailIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"\/\\\\:?<>|;&#*]+$/.test(val);
	 },
	 /**
	  * 用户名特殊字符'"%/:?<>;|&@#*
	  * */
	 isUserNameIllegality:function(val){
		 return "null"!=val && /^$|^[^'\"\/:?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 是否包含非法字符包括正反斜杠'\"%\\:?<>|;&$#*"
	  * */
	 isIllegalityIncludeSlash:function(val){
		 return "null"!=val && /^$|^[^'\/\"%\\\\:?<>|;&@#*]+$/.test(val);
	 },	 
	 /**
	  * 是否包含非法字符'\"%\\?<>|;&$#*"   不包括冒号
	  * */
	 isIllegalityExcludeColon:function(val){
		 return "null"!=val && /^$|^[^'\"%\\?<>|;&@#*]+$/.test(val);
	 },
	 /**
	  * 是否符合mac地址格式
	  * */
	 isMac:function(val){
		 return /^[a-fA-F0-9]{2}[:-][a-fA-F0-9]{2}[:-][a-fA-F0-9]{2}[:-][a-fA-F0-9]{2}[:-][a-fA-F0-9]{2}[:-][a-fA-F0-9]{2}$/.test(val);
	 },
	 /**  
		* 函数名： validateMask
		*   函数功能： 验证子网掩码的合法性
		*   函数作者： 236F(fuwei236#gmail.com)
		* 传入参数： MaskStr:点分十进制的子网掩码(如：255.255.255.192)
		*   主调函数： 
		* 调用函数： _checkIput_fomartIP(ip) 
		* 返回值：   true:   MaskStr为合法子网掩码
		*      false: MaskStr为非法子网掩码
		**/
		isMask:function (MaskStr){
			/* 有效性校验 */
			var IPPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
			if(!IPPattern.test(MaskStr))return false;
	
			/* 检查域值 */
			var IPArray = MaskStr.split(".");
			var ip1 = parseInt(IPArray[0]);
			var ip2 = parseInt(IPArray[1]);
			var ip3 = parseInt(IPArray[2]);
			var ip4 = parseInt(IPArray[3]);
			if ( ip1<0 || ip1>255 /* 每个域值范围0-255 */
					   || ip2<0 || ip2>255
					   || ip3<0 || ip3>255
					   || ip4<0 || ip4>255 )
					{
					   return false;
					}
				/* 检查二进制值是否合法 */
				//拼接二进制字符串
			var ip_binary = (ip1+256).toString(2).substring(1)+(ip2+256).toString(2).substring(1)+(ip3+256).toString(2).substring(1)+(ip4+256).toString(2).substring(1);
			if(-1 != ip_binary.indexOf("01"))return false;
			return true;
		},
		/**
		 * 四位的数字验证
		 */
		 isSIMPinNumber:function (val) {
		 	 var patrn=/^[0-9]{4}$/;
			 return  patrn.test(val);
		 },
		 /**是否子网IP地址*/
		 isSubIp:function(val){
			return  /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){2}(\.(([0-9]|[1-9][\d]{1}|1[\d]{2})|2[0-4][\d]|(25[0-4])))$/.test(val);
		 },/**
		  *判断是否合法的VLAN ID
		  */
		 isValidateVlanID:function(val){
			if(/^[1-9]*[1-9][0-9]*$/.test(val)){
				if(parseInt(val)>=1 && parseInt(val)<=4094){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		 }	 
}
