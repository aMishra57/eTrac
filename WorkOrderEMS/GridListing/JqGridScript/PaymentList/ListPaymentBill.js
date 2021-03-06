﻿var PaymentUrl = 'Payment/GetPaymentListByLocation';
var GetAccountDataUrl = 'Payment/GetCompanyAccountDetails/'; 
var MakePaymentUrl = 'Payment/MakePaymentData/';
var POFacility = 'Payment/GetAllPOFacilityByPOId/';
var PODetail = 'Payment/GetAllPODetailByPOId/';
var miscDetails = 'Miscellaneous/GetListMiscellaneousListByMiscId';
var MiscNumberDetail = 'Payment/GetMiscellaneousNumber/';
var CostCodeId; var id;
var vehcileApprovalStatus = '';
var IsCancel = false;
var BillTypeDll = '<select id="BillTypeDll">'
        + '<option value="0" >Bill Type</option>'
        + '<option value="ManualBill" >ManualBill</option>'
        + '<option value="PO" >PO</option>'
        + '<option value="MISC" >MISC</option></select>';
$(function () {
    $("#tbl_PaymentList").jqGrid({
        url: $_HostPrefix + PaymentUrl + '?LocationId=' + $_locationId,
        datatype: 'json',
        type: 'GET',
        height: 400,
        width: 650,
        autowidth: true,
        colNames: ['Bill No', 'Location Name', 'Vendor Name/Employee Name', 'Operating Company', 'Bill Type', 'Bill Amount', 'Bill Date', 'Grace Period', 'Payment Mode', 'Status', 'VendorId', 'OperatingCompanyId', 'LocationId', 'LLBL_ID', 'Action'],
        colModel: [{ name: 'BillNo', width: 20, sortable: true },
        { name: 'LocationName', width: 40, sortable: false },
        { name: 'VendorName', width: 50, sortable: true },
        { name: 'OperatingCompany', width: 50, sortable: true },
        { name: 'BillType', width: 30, sortable: false },
        { name: 'BillAmount', width: 20, sortable: true },
        { name: 'BillDate', width: 30, sortable: true },
        { name: 'GracePeriod', width: 10, sortable: true },
        { name: 'PaymentMode', width: 20, sortable: true },
        { name: 'Status', width: 20, sortable: true, hidden:true },
        { name: 'VendorId', width: 20, sortable: true, hidden: true },
        { name: 'OperatingCompanyId', width: 20, sortable: true, hidden: true },
        { name: 'LocationId', width: 20, sortable: true, hidden: true },
        { name: 'LLBL_ID', width: 20, sortable: true, hidden: true },
        { name: 'act', index: 'act', width: 50, sortable: false }], 
        rownum: 10,
        rowList: [10, 20, 30],
        scrollOffset: 0,
        pager: '#divPaymentListPager',
        sortname: 'BillId',
        viewrecords: true,
        gridview: true,
        loadonce: false,
        multiSort: true,
        rownumbers: true,
        emptyrecords: "No records to display",
        shrinkToFit: true,
        sortorder: 'asc',
        gridComplete: function () {
            var ids = jQuery("#tbl_PaymentList").jqGrid('getDataIDs');
            jQuery('#tbl_PaymentList').addClass('order-table');
            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                rowData = $('#tbl_PaymentList').jqGrid('getRowData', cl);
                bi = '<div><a href="javascript:void(0)" id="PayBill" title="view" BId="' + cl + '" style=" float: left;margin-right: 6px;cursor:pointer;"><button class="btn btn-success" style="border-radius:25px;width:80px;">Pay</button></a>'
                ci = '<a href="javascript:void(0)"  title="view" id="CancelBill" cid="' + cl + '" style=" float: left;cursor:pointer;"><button class="btn btn-primary" style="border-radius:25px;width:80px;">Cancel</button></a></div>';
                jQuery("#tbl_PaymentList").jqGrid('setRowData', ids[i], { act: bi + ci }); ///+ qrc 

                if (rowData['BillType'] === "PO") {
                    $('#tbl_PaymentList').jqGrid('setCell', cl, 'BillType', '', 'CSSClass');
                    //$('#tbl_PaymentList').jqGrid('setRowData', cl, { BillType:});
                }
            }
            if ($("#tbl_PaymentList").getGridParam("records") <= 20) {
                $("#divPaymentListPager").hide();
            }
            else {
                $("#divPaymentListPager").show();
            }
            if ($('#tbl_PaymentList').getGridParam('records') === 0) {
                $('#tbl_PaymentList tbody').append("<div style='padding: 6px; font-size: 12px;'>No records found.</div>");
            }
        },
        caption: '<div class="header_search">' + BillTypeDll + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><input type="text" class="inputSearch light-table-filter" id="searchPaymentBilltext" placeholder="Vendor Name"  data-table="order-table" /></span></div>',
        onCellSelect: function (rowid, iCol, id) {
            var rowData = $(this).jqGrid("getRowData", rowid);
            //var rid = jQuery('#tbl_CostCodeList').jqGrid("getGridParam", "selrow");           
            var rid = $('#tbl_PaymentList').jqGrid('getCell', rowid, iCol);
            if (iCol == 5 && id == "PO") { //You clicked on admin block
                var row = jQuery('#tbl_PaymentList').jqGrid("getRowData", rowid);
                $.ajax({
                    type: "post",
                    url: $_HostPrefix + PODetail + '?POId=' + rowData.BillNo,
                    datatype: 'json',
                    type: 'GET',
                    success: function (result) {
                        if (result.PONumber != null && result.PONumber != "" && result.PONumber != undefined) {
                            if (result.POType == 1) {
                                result.POType = "Normal PO";
                            }
                            else if (result.POType == 2) {
                                result.POType = "Reccuring PO";
                            }
                            else if (result.POType == 2) {
                                result.POType = "Emeregency PO";
                            }
                            else {
                                result.POType = "Manual PO";
                            }
                            $("#lblPOId").html(result.PONumber);
                            $("#lblPOType").html(result.POType);
                            $("#lblCompanyName").html(rowData.VendorName);
                            $("#lblLocationName").html(rowData.LocationName);
                            $("#lblPODate").html(result.IssueDateDisplay);
                            $("#lblDeliveryDate").html(result.DeliveryDateDisplay);
                            $('#POrecords_table').html('');
                            var arrData = [];
                            var thHTML = '';
                            var GrandTotal;
                            thHTML += '<tr style="background-color:#0792bc;"><th>Cost Code</th><th>Description</th><th>Unit Price</th><th>Quantity</th><th>Total</th><th>Tax</th></tr>';
                            $('#POrecords_table').append(thHTML);
                            if (result.NewPOTypeDetails.rows.length > 0) {
                                for (i = 0; i < result.NewPOTypeDetails.rows.length; i++) {
                                    DataLists = result.NewPOTypeDetails.rows;
                                    GrandTotal = result.NewPOTypeDetails.rows[i].TotalPrice
                                    var trHTML = '';
                                    trHTML +=
                                       '<tr><td>' + result.NewPOTypeDetails.rows[i].CostCodeName +
                                       '</td><td>' + result.NewPOTypeDetails.rows[i].COM_Facility_Desc +
                                       '</td><td>' + result.NewPOTypeDetails.rows[i].UnitPrice +
                                       '</td><td>' + result.NewPOTypeDetails.rows[i].Quantity +
                                       '</td><td>' + result.NewPOTypeDetails.rows[i].Total +
                                       '</td><td>' + result.NewPOTypeDetails.rows[i].Tax +
                                       '</td></tr>';
                                    $('#POrecords_table').append(trHTML);
                                }
                            }
                            $('#lblTotal').html(GrandTotal);

                            $("#lblPOStatus").html(result.POStatus);
                            $('.modal-title').text("PO Details");
                            $("#myModalForPODetails").modal('show');
                        }
                        else {
                            toastr.success(result)
                        }
                    }
                });
            }
            else if (iCol == 5 && id == "MIS")
            {
                debugger
                var getMiscData;
                $.ajax({
                    url: $_HostPrefix + MiscNumberDetail + '?MiscId=' + rowData.BillNo,
                    datatype: 'json',
                    type: 'GET',
                    success: function (result) {
                        if(result != null)
                        {
                            getMiscData = result;
                        }
                    }
                })
                $.ajax({
                    url: $_HostPrefix + miscDetails + '?MiscId=' + getMiscData,
                    datatype: 'json',
                    type: 'GET',
                    success: function (result) {
                    }
                })
            }
        }
    });
    if ($("#tbl_PaymentList").getGridParam("records") > 20) {
        jQuery("#tbl_PaymentList").jqGrid('navGrid', '#divPaymentListPager', { edit: false, add: false, del: false, search: false, edittext: "Edit" });
    }
});
var timeoutHnd;
var flAuto = true;
function doSearch(ev) {
    if (timeoutHnd)
        clearTimeout(timeoutHnd)
    timeoutHnd = setTimeout(gridReload, 500)
}

function gridReload() {

    jQuery("#tbl_PaymentList").jqGrid('setGridParam', { url: $_HostPrefix + GetListBill + "?LocationId=" + $_locationId, page: 1 }).trigger("reloadGrid");
}
function RejectBillAfterCommentBill() {
    callAjaxbill()
}
function ApproveBill() {
    callAjaxbill()
}

$("#PayBill").live("click", function (event) {
    id = $(this).attr("BId");
    callAccountDetailsVendor();
    IsCancel = false;
    $("#myModelPayBill").modal('show');
});
function callAccountDetailsVendor()
{
    var data = jQuery("#tbl_PaymentList").getRowData(id); 
    if (data.PaymentMode == "MISC") {
        $('.WhenMisc').show();
        $('.WhenWired').hide();
        $('.WhenCard').hide();
        $('.whenCheque').hide()
    }
    if (data.PaymentMode == "Wired" || data.PaymentMode == "Card" || data.PaymentMode == "Cheque") {
        $.ajax({
            url: $_HostPrefix + GetAccountDataUrl,
            type: 'POST',
            datatype: 'application/json',
            contentType: 'application/json',
            data: JSON.stringify({ VendorId: data.VendorId, OperatingCompanyId: data.OperatingCompanyId }),
            success: function (result) {

                if (data.PaymentMode == "Wired") {
                    $('.WhenMisc').hide();
                    $('.WhenWired').show();
                    $('.WhenCard').hide();
                    $('.whenCheque').hide();
                    $('#dvOptionsWired').html("");
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].PaymentMode == 2)
                        {
                            $('#hr2').show();
                            $('#dvOptionsWired').append($('<input type="radio" name="CARDNo" nametype ="Card" OperatorCADId ="' + result[i].OpeartorCAD_Id + '" AccountAccountId ="' + result[i].CompanyAccountId + '" id="AccountNo_' + result[i].CompanyAccountId + '" value="' + result[i].AccountNo + '" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result[i].AccountNo + '</input><br /><br />'));
                        }
                        if (result[i].PaymentMode == 1) {
                            $('.WhenCard').show(); 
                            $('#hr1').show()
                            $('#dvOptions').html("");
                            $('#dvOptions').append($('<input type="radio" name="CARDNo" nametype ="Account" OperatorCADId ="' + result[i].OpeartorCAD_Id + '"  CardId="' + result[i].CompanyAccountId + '" id = "CARDNo_' + result[i].CARDNo + '" value="' + result[i].CARDNo + '" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result[i].CARDNo + '</input><br /><br />'));
                        }
                        if (result[i].PaymentMode == 4)
                        {
                            $('#CompanyAccountId').val(result[0].CompanyAccountId);
                            $('.whenCheque').show();
                        }
                    }
                }
                else if (data.PaymentMode == "Card") {
                    $('.WhenMisc').hide();
                    $('.WhenWired').hide();
                    $('.WhenCard').show();
                    $('.whenCheque').hide();
                    $('#dvOptions').html("");
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].PaymentMode == 1) {
                            $('#hr1').show();
                            $('#dvOptions').append($('<input type="radio" name="CARDNo" nametype ="Card" OperatorCADId ="' + result[i].OpeartorCAD_Id + '" CardId ="' + result[i].CompanyAccountId + '" id = "CARDNo_' + result[i].CARDNo + '" value="' + result[i].CARDNo + '" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result[i].CARDNo + '</input><br /><br />'));

                        } if (result[i].PaymentMode == 2) {
                            $('.WhenWired').show();
                            $('#hr2').show();
                            $('#dvOptionsWired').html("");
                            $('#dvOptionsWired').append($('<input type="radio" nametype ="Account" OperatorCADId ="' + result[i].OpeartorCAD_Id + '" name="CARDNo" AccountAccountId="' + result[i].CompanyAccountId + '" id="AccountNo_' + result[i].CompanyAccountId + '" value="' + result[i].AccountNo + '" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result[i].AccountNo + '</input><br /><br />'));

                        }
                        if(result[i].PaymentMode == 4)
                        {
                            $('#CompanyAccountId').val(result[0].CompanyAccountId);
                            $('.whenCheque').show();
                        }
                    }
                }
                else if (data.PaymentMode == "Cheque") {
                    $('#CompanyAccountId').val(result[0].CompanyAccountId);
                    $('.WhenMisc').hide();
                    $('.WhenWired').hide();
                    $('.WhenCard').hide();
                    $('.whenCheque').show();
                }                
            },
            error: function () { alert(" Something went wrong..") },
        });
    }
    $("#lblVendorNameFrom").html(data.OperatingCompany);
    $("#lblPaymentModeFrom").html(data.PaymentMode);
    $("#lblVendorNameTo").html(data.VendorName);
    $("#lblPaymentModeTo").html(data.PaymentMode);
}

$("#CancelBill").live("click", function (event) {
    id = $(this).attr("cid");
    IsCancel = true;
    callAccountDetailsVendor();
    $('#myModelCancelBill').modal('show');
});
function PayAction()
{
    if ($('.form').valid()) {
        callAjaxPayment();
        $("#myModelPayBill").modal('hide');
    }
    else {
        return false;

    }
}
function CancelAction()
{
    if ($('.form').valid()) {
        callAjaxPayment();
        $('#myModelCancelBill').modal('hide');
    }
    else {
        return false;
    }
}
function callAjaxPayment() {      //$("#ApproveBill").live("click", function (event) {
 debugger
    var GridData = $('#tbl_PaymentList').getRowData(id);
    var obj = new Object();
    obj.Comment = $("#CommentPay").val();
    obj.ChequeNo = $("#ChequeNo").val();
    obj.AccNo = $("#AccNo").val();         
    var Account = $("#dvOptionsWired input[type='radio']").attr("id");
    obj.AccountNo = $('input[nametype=Account]:checked').val();
    obj.CARDNo = $('input[nametype=Card]:checked').val();
    //obj.AccountNo = $('#' + Account).val();
    if (obj.CARDNo != null)
    {
        var Card = $('input[nametype=Card]:checked').attr("CardId");
        var OperatorCad = $('input[nametype=Card]:checked').attr("OperatorCADId");
        obj.OpeartorCAD_Id = OperatorCad;
        obj.CompanyAccountId = Card;
    }
    else if (obj.AccountNo != null)
    {
        var Acc = $('input[nametype=Account]:checked').attr("AccountAccountId");
        var OperatorCad = $('input[nametype=Account]:checked').attr("OperatorCADId");
        obj.CompanyAccountId = Acc;
        obj.OpeartorCAD_Id = OperatorCad;
    }
    else
    { obj.CompanyAccountId = $('#CompanyAccountId').val(); }
    var Card = $("#dvOptions input[type='radio']").attr("id");
    //obj.CARDNo = $('#' + Card).val();
   
    obj.IsCancel = IsCancel;
    $.ajax({
        url: $_HostPrefix + MakePaymentUrl,
        type: 'POST',
        datatype: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify({ objPaymentModel: obj, ObjData: GridData }),
        beforeSend: function () {
            new fn_showMaskloader('Please wait...');
        },
        success: function (result) {
            toastr.success(result);
            jQuery("#tbl_PaymentList").trigger("reloadGrid");
            jQuery("#tbl_PaymentPaidList").trigger("reloadGrid");
        },
        error: function () { alert(" Something went wrong..") },
        complete: function () {
            fn_hideMaskloader();
        }
    });
}

$("#viewBill").live("click", function (event) {
    id = $(this).attr("vid");

    var rowData = jQuery("#tbl_BillList").getRowData(id);
    if (rowData.Status != "W") {
        $('#ApproveBill').hide();
        $('#RejectBill').hide();
    }
    else {
        $('#ApproveBill').show();
        $('#RejectBill').show();
    }
    var BillId = rowData['BillId'];
    var VendorName = rowData['VendorName'];
    var VendorType = rowData['VendorType'];
    var BillDate = rowData['BillDate'];
    var BillAmount = rowData['BillAmount'];
    var InvoiceDate = rowData['InvoiceDate'];
    var Status = rowData['Status'];
    var Comment = rowData['Comment'];
    $("#lblBillId").html(BillId);
    $("#lblVendorName").html(VendorName);
    $("#lblVendorType").html(VendorType);
    $("#lblBillDate").html(BillDate);
    $("#lblBillAmount").html(BillAmount);
    $("#lblInvoiceDate").html(InvoiceDate);
    $("#lblStatus").html(Status);
    $("#lblComment").html(Comment);
    var BillImage = rowData['BillImage'];

    $("#lblBillImage").html(BillImage);
    $('div #lblBillImage img').attr('width', '100px');
    $('div #lblBillImage img').attr('height', '100px');
    if (BillImage == '' || BillImage == null || BillImage == "") {
        $("#labelBillImage").hide();
        $("#lblBillImage").hide();
    }
    $('.modal-title').text("Bill Details");
    $("#myModalForBillData").modal('show');
});


//#region Image
function imageFormat(cellvalue, options, rowObject) {
    if (cellvalue == "")
    { return ""; }
    else {
        return '<img src="' + cellvalue + '" class="gridimage" id="driverImage" onclick="EnlargeImageView(this);"/>';
    }
}
//#endregion

