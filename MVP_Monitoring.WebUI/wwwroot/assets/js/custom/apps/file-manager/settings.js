﻿"use strict";var KTAppFileManagerSettings=function(){var t;return{init:function(e){t=document.querySelector("#kt_file_manager_settings"),function(){const e=t.querySelector("#kt_file_manager_settings_submit");e.addEventListener("click",(t=>{t.preventDefault(),e.setAttribute("data-kt-indicator","on"),setTimeout((function(){toastr.options={closeButton:!0,debug:!1,newestOnTop:!1,progressBar:!1,positionClass:"toast-top-right",preventDuplicates:!1,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},toastr.success("تنظیمات مدیریت فایل ذخیره شده است"),e.removeAttribute("data-kt-indicator")}),1e3)}))}()}}}();KTUtil.onDOMContentLoaded((function(){KTAppFileManagerSettings.init()}));