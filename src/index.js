import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import './style/css/datePicker.css'
import "./style/css/common.css"
import "./style/css/style.css"
import "./style/css/zyy.css"

import App from './components/App'
import NotFoundPage from './components/notFoundPage/NotFoundPage'
import ProjectMaintain from './components/admin/projectMaintain/ProjectMaintain'
import ClassMaintain from './components/admin/classMaintain/classMaintain.js'
import MechanismMaintain from './components/admin/mechanismMaintain/MechanismMaintain.js'
import AppointmentManage from './components/appointmentManage/AppointmentManage.js'
import AppointmentExamination from './components/appointmentExamination/AppointmentExamination/AppointmentExamination.js'
import Sendset from './components/admin/sendset/sendset.js'
import AddMechanism from './components/admin/mechanismMaintain/addMechanism/AddMechanism.js'
import EditMechanism from './components/admin/mechanismMaintain/editMechanism/EditMechanism.js'
import MechanismDetail from './components/admin/mechanismMaintain/mechanismDetail/MechanismDetail.js'
import ConstantMaintenance from './components/admin/constantMaintenance/constantMaintenance.js'
import MechanismPackage from './components/admin/mechanismPackage/mechanismPackage.js'
import TheLatestTime from './components/admin/thelatestTime/thelatestTime.js'
import FenmechanismPackage from './components/admin/fenmechanismPackage/fenmechanismPackage.js'
import Datascan from './components/report/datascan/datascan.js'
import Checkout from './components/report/checkout/checkout.js'
import Monthlyreport from './components/report/monthlyreport/monthlyreport.js'
import ReservationRecordQuery from './components/recordQuery/reservationRecordQuery/reservationRecordQuery.js'
import ReservationRecord from './components/recordQuery/reservationRecord/reservationRecord.js'
import Testtime from './components/appointmentExamination/testtime/testtime.js'
import Testorder from './components/appointmentExamination/testorder/testorder.js'
import Testinfo from './components/appointmentExamination/testinfo/testinfo.js'
import Detail from './components/appointmentExamination/detail/detail.js'
import CancelDetail from './components/appointmentManage/CancelDetail.js'
import EditUnsendHospital from './components/appointmentManage/EditUnsendHospital.js'
import UnsendHospitalDetail from './components/appointmentManage/UnsendHospitalDetail.js'
import AddRegister from './components/appointmentManage/AddRegister.js'
import EditRegister from './components/appointmentManage/EditRegister.js'
import RegisterDetail from './components/appointmentManage/RegisterDetail.js'
import Login from './components/login/Login.js'
import UserMaintain from './components/admin/userMaintain/UserMaintain'
import UesrJurisdiction from './components/admin/uesrJurisdiction/UesrJurisdiction'
import Holiday from './components/admin/holiday/holiday'
import Settime from './components/admin/settime/settime'


ReactDOM.render(
    (<HashRouter>
        {localStorage.getItem('isLogin') !== 'true' ?
        <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
        </Switch>
        :
        <App>
            
            {localStorage.getItem('powercode') !== '0016'?
            <Switch>
            <Route exact path="/" component={AppointmentExamination} />
            <Route path="/admin/projectMaintain" component={ProjectMaintain} />
            <Route path="/admin/classMaintain" component={ClassMaintain} />
            <Route exact path="/admin/mechanismMaintain" component={MechanismMaintain} />
            <Route path="/admin/mechanismPackage" component={MechanismPackage} />
            <Route exact path="/admin/constantMaintenance" component={ConstantMaintenance} />
            <Route exact path="/admin/fenmeweihu" component={FenmechanismPackage} />
            <Route path="/admin/sendset" component={Sendset} />
            <Route path="/admin/holiday" component={Holiday} />
            <Route path="/admin/settime" component={Settime} />
            <Route path="/appointmentManage" exact component={AppointmentManage} />
            <Route path="/appointmentManage/tab/:tab?" component={AppointmentManage} />
            <Route path="/appointmentExamination" exact component={AppointmentExamination} />
            <Route path="/appointmentExamination/testtime" component={Testtime} />
            <Route path="/appointmentExamination/testorder/:orderType" component={Testorder} />
            <Route path="/appointmentExamination/testinfo/:id" component={Testinfo} />
            <Route path="/appointmentExamination/detail/:id" component={Detail} />
            <Route path="/admin/addMechanism" component={AddMechanism} />
            <Route path="/admin/editMechanism/:id" component={EditMechanism} />
            <Route path="/admin/mechanismDetail/:id" component={MechanismDetail} />
            <Route path="/admin/TheLatestTime" component={TheLatestTime} />
            <Route path="/report/datascan" component={Datascan} />
            <Route path="/report/checkout" component={Checkout} />
            <Route path="/report/monthlyreport" component={Monthlyreport} />
            <Route path="/recordQuery/reservationRecordQuery" component={ReservationRecordQuery} />
            <Route path="/recordQuery/reservationRecord/:id" component={ReservationRecord} />
            <Route path="/appointmentManage/cancelDetail/:id" component={CancelDetail} />
            <Route path="/appointmentManage/editUnsendHospital/:id" component={EditUnsendHospital} />
            <Route path="/appointmentManage/unsendHospitalDetail/:id" component={UnsendHospitalDetail} />
            <Route path="/appointmentManage/addRegister/" component={AddRegister} />
            <Route path="/appointmentManage/editRegister/:id" component={EditRegister} />
            <Route path="/appointmentManage/registerDetail/:id" component={RegisterDetail} />
            <Route path="/login" render={()=><Redirect to="/"/>} />
            <Route path="/admin/userMaintain" component={UserMaintain} />
            <Route path="/admin/uesrJurisdiction" component={UesrJurisdiction} />
            <Route path="/notFoundPage" component={NotFoundPage} />
            <Redirect to="/notFoundPage" />
            </Switch>
            :
            <Switch>
            <Route exact path="/" component={UserMaintain} />
            <Route path="/admin/userMaintain" component={UserMaintain} />
            <Route path="/admin/uesrJurisdiction" component={UesrJurisdiction} />
            <Route path="/login" render={()=><Redirect to="/admin/userMaintain"/>} />
            <Route path="/notFoundPage" component={NotFoundPage} />
            <Redirect to="/notFoundPage" />
            </Switch>
        }
          
        </App>}
  </HashRouter>),
    document.getElementById('root')
);
registerServiceWorker();