import axios from 'axios'
import { server, timeout } from './data.js'
const user = {
    account: localStorage.getItem('account'),
    ldToken: localStorage.getItem('ldToken'),
}

//login
export const login = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${server}/dologin/login`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//登陆获取分公司
export const loginselect = (params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(`${server}/userauthoritysetting/selectBranchByAccount`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}
/*
/checkupitemmst/selectall
 */
export const checkupitemmst_selectall = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/selectall`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
checkupitemmst/insert
 */
export const checkupitemmst_insert = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/insert`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
checkupitemmst/update
 */
export const checkupitemmst_update = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/update`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/healthcategory/selectall
 */
export const healthcategory_selectall = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcategory/selectallcategory`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
checkupitemmst/delete
 */
export const checkupitemmst_delete = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/delete`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/healthcheckupparty/selectall
 */
export const healthcheckupparty_selectall = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcheckupparty/selectall`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
healthcheckupparty/delete
 */
export const healthcheckupparty_delete = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcheckupparty/delete`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/payBill/payBillList
 */
export const payBill_payBillList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/payBill/payBillList`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/payBill/changeSettlementStatus
 */
export const payBill_changeSettlementStatus = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/payBill/changeSettlementStatus`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/payBill/exportExcel
 */
export const payBill_exportExcel = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/payBill/exportExcel`, {
            params,
            timeout,
            responseType: 'blob',
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
待发医院列表
/appointmentmanagerment/unsendhospitallist
 */
export const unsendhospitallist = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/unsendhospitallist`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
取消体检医院通知列表
/appointmentmanagerment/canceltohospitallist
 */
export const canceltohospitallist = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/canceltohospitallist`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
资料返回登记列表
/appointmentmanagerment/datareturnedlist
 */
export const datareturnedlist = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/datareturnedlist`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/appointmentmanagerment/canceltohospitadetails
取消预约体检详情
 */
export const canceltohospitadetails = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/canceltohospitadetails`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
deletecheckuporder
删除待发医院
 */
export const deletecheckuporder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/deletecheckuporder`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/appointmentmanagerment/ updatecheckuporder
待发医院详情
 */
export const updatecheckuporder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/updatecheckuporder`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/appointmentmanagerment/updatecheckorder
操作历史
 */
export const updatecheckorder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/updatecheckorder`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/appointmentmanagerment/ updatedetails
待发医院编辑
 */
export const updatedetails = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/updatedetails`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/appointmentmanagerment/ insertdatacomplete
资料返回补登
 */
export const insertdatacomplete = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/insertdatacomplete`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/appointmentmanagerment/returndetaildata
资料返回登记详情
 */
export const returndetaildata = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/returndetaildata`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
updatereturnsthedata
资料返回登记修改
 */
export const updatereturnsthedata = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/updatereturnsthedata`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
/partybranchpackage/selectalpackage
体检机构套餐列表所有
 */
export const partybranchpackage_selectalpackage = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/partybranchpackage/selectalpackage`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/checkupitemmst/selectallitems
体检项目列表所有
 */
export const checkupitemmst_selectallitems = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/selectallitems`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/healthcheckupparty/selectone
体检机构详情
 */
export const healthcheckupparty_selectone = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcheckupparty/selectone`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
healthcheckupparty/insert
增加体检机构
 */
export const healthcheckupparty_insert = (params) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    for(let i in user){
        params.append(i,user[i])
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${server}/healthcheckupparty/insert`,
            data: params,
            timeout,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

/*
healthcheckupparty/update
修改体检机构
 */
export const healthcheckupparty_update = (params) => {
     let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    for(let i in user){
        params.append(i,user[i])
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${server}/healthcheckupparty/update`,
            data: params,
            timeout,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
    // params = {
    //     ...user,
    //     ...params
    // };
    // return new Promise((resolve, reject) => {
    //     axios.get(`${server}/healthcheckupparty/update`, {
    //         params,
    //         timeout,
    //     }).then(function(response) {
    //         resolve(response.data)
    //     }).catch(function(error) {
    //         reject(error.message);
    //     });
    // });
}

/*
/appointmentmanagerment/ sendfaxandemail
待发医院邮件页面
 */
export const sendfaxandemail = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/sendfaxandemail`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
/*
/appointmentmanagerment/ exportword
待发医院发邮件发传真
 */
export const exportword = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appointmentmanagerment/exportword`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}



/*-----------------------------------------------------------*/

//医院体检类别维护列表查询
export const classMaintain = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcategory/selectall`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//新增医院体检类别
export const addclassMaintain = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcategory/insert`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//体检项目类别删除接口
export const remclassMaintain = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcategory/delete`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//体检项目类别修改接口
export const updataclassMaintain = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthcategory/update`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//预约体检详情
export const detailorderParticulars = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/orderParticulars`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//权限demo
export const getRoleCodeList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/userauthoritysetting/getRoleCodeList`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//批量修改查询
export const plbatchStatus = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/batchStatus`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}



//批量修改确认
export const plupdateBatchStatus = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/updateBatchStatus`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//修改预约详情
export const xgyyupdate = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/update`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}



//取消体检 取消预约 完成体检接口
export const typecancelOrder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/cancelOrder`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//新增日期查询
export const dataOrderTime = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/OrderTime`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}





/*---------------------------清单数据扫描----------------------------*/
listdataScanning
export const listdataScanning = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/dataDetail/dataDetailList`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//查询月报表列表
export const monthlystatementlist = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/monthlystatement/monthlystatementlist`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}

//月报表记录删除
export const monthlymesDelete = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/monthlystatement/messageDelete`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });
}


//分公司、城市、体检机构查询
export const monthlyselect = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/monthlystatement/selectQueryMessage`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}


//导出月报表excel文件
export const monthlyExcel = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/monthlystatement/exportExcel`, {
                params,
                responseType: 'blob',
                timeout,
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}


//公司最迟时间设置功能
export const thelatestTime = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/lasttimesetting/search`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//体检预约主界面
export const healthorderqueryAll = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/queryAll`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//最迟预约时间修改按钮接口
export const modifyTime = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/lasttimesetting/update`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//添加时间
export const appendTime = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/lasttimesetting/insert`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//删除设置的最迟体检预约时间
export const removeTime = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/lasttimesetting/delete`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}


//预约体检分公司机构医院身份类型查询
export const healthorderOrder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/order`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}



//常量维护
export const Constantmaintenance = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/codemst/selectall`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//新增体检预约登记
export const healthorderaddOrder = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/addOrder`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//新增、修改、删除常量
export const Appendmaintenance = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/codemst/operation`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}



/*-----------------------------------------------------------*/
//.查询预约记录
export const querycenter = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/querycenter/queryAppointmentRecord`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//查询预约记录查询条件
export const seequerycenter = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/querycenter/ queryQueryCondition`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
// 预约记录详情
export const appointmentRecordDetail = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/querycenter/queryAppointmentRecordDetail`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//导出清单数据
export const exportExcels = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/dataDetail/exportExcel`, {
                params,
                responseType: 'blob',
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}



/*-----------------------------------------------------------*/
//发送设置
export const setCodeList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/sendsetting/search`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

//新增发送设置记录
export const appendsetList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/sendsetting/insert`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//发送方式和附件类型下拉框的加载
export const selectList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/sendsetting/selectWayAll`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//修改发送设置记录
export const updateList = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/sendsetting/update`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//删除
export const removeadd = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/sendsetting/delete`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}

/*-----------------------------------------------------------*/
//机构（分公司）体检项目套餐维护
export const branchpackage = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/partybranchpackage/selectall`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//新增、修改、删除机构（分公司）体检套餐
export const appendbranchpackage = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/partybranchpackage/operation`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//新增和修改时对公司代码和设置的最迟体检预约时间进行校验
export const checkCompany = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/lasttimesetting/checkCompany`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}
//查询所有体检项目（不分页）
export const checkupitemmstel = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/checkupitemmst/selectallitems`, {
                params,
                timeout
            }).then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                reject(error.message);
            });
    });

}



/*
/ appHealthCheckUpOrder/ selectPartyDetail
体检机构详情
 */
export const selectPartyDetail = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/appHealthCheckUpOrder/selectPartyDetail`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error);
        });
    });
}


/*
/queryAppointmentRecord/selectCheckupLetter
体检信
 */
 export const selectCheckupLetter = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/querycenter/selectCheckupLetter`, {
            params,
            timeout
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error);
        });
    });
}

//下载pdf
export const downpdf = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/querycenter/downloadMedicalLetter`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
//日历
export const holiday = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/holidaySetting/holidaySetting`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

//日历
export const upholiday = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/holidaySetting/updateDate`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}
//关联项目详情
export const selectitem = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/partybranchpackage/selectitem`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}

//满足保单号和营销源代码回显分公司城市医院
export const getmessage = (params = {}) => {
    params = {
        ...user,
        ...params
    };
    return new Promise((resolve, reject) => {
        axios.get(`${server}/healthorder/getMessager`, {
            params,
            timeout,
        }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error.message);
        });
    });
}