/**----------------------
 * class chung để get dữ liệu
 * CreateBy: VVLONG (26/12/2020)
 * */
class BaseJS {
    constructor() {
        var url = this.getURL();
        this.loadData(url);
        this.initEvents(url);
    }
    getURL() {
        return null;
    }
    loadData(URL) {
        var columns = $('table thead th');
        $.ajax({
            url: URL,
            method: "GET",
        }).done(function (res) {
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`);
                /*var dateOfBirth = obj.DateOfBirth;
                dateOfBirth = formatDate(dateOfBirth); */
                $.each(columns, function (index, col) {
                    var fieldName = $(col).attr('fieldname');
                    var td = $(`<td></td>`);
                    var value = obj[fieldName];
                    var formatType = $(col).attr('formatType');
                    switch (formatType) {
                        case "Date":
                            value = formatDate(value);
                            break;
                        case "Money":
                            value = formatMoney(value);
                            break;
                        default: break
                    }
                    /*if (fieldName == 'DateOfBirth') value = dateOfBirth;*/
                    if (index == 0) $(td).attr('field', 'code');
                    $(td).append(value);
                    $(tr).append(td);
                })
                $('table tbody').append(tr);
            })
        }).fail(function (res) {

        })
    }
    /*===========================================
     * Hàm các sự kiện với button, input
     * Create by VVLONG (03/01/2021)
     */
    initEvents(URL) {
        var me = this;
        //tìm kiếm với input filter
        $("#filterTable").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("tbody tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        //hiển thị dialog với button thêm khách hàng=======
        $(".btn-insert").click(function(){
            dialogDetail.dialog('open');
        })

        

        //không cho phép các input required được trống=====
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'không được phép để trống');
                $(this).attr('validate', "false");
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', "true");
            }
        })

        //validates input email
        $('input[type="email"]').blur(function () {
            var emailVal = $(this).val();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
            if (!regex.test(emailVal)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'email này không hợp lệ');
                $(this).attr('validate', "false");
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', "true");
            }
        })

        //lưu dữ liệu với button Save trong dialog=============
        $('#btnSave').click(function () {
            //validates dữ liệu
            var inputRequired = $('input[required], input[type="email"]');
            $.each(inputRequired, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length>0) {
                alert('Dữ liệu bạn nhập vào không đúng!');
                inputNotValids[0].focus();
                return;
            }
            
            //thu thập dữ liệu và đẩy lên server
            var customer = {
                "CustomerCode": $('#CustomerCode').val(),
                "FullName": $('#FullName').val(),
                "MemberCardCode": $('MemberCardCode').val(),
                "DateOfBirth": $('#DateOfBirth').val(),
                /*"gender": $('#Gender').val(),*/
                "Email": $('#Email').val(),
                "PhoneNumber": $('#PhoneNumber').val(),
            }
/*            var testDate = document.getElementById('DateOfBirth').Value;*/
            var employee = {
                "EmployeeCode": $('#EmployeeCode').val(),
                "FullName": $('#FullName').val(),
                "PhoneNumber": $('#PhoneNumber').val(),
                "IdentityNumber": $('#IdentityNumber').val(),
                /*"DateOfBirth": document.getElementById('DateOfBirth').Value*/
            }

            $.ajax({
                url: URL,
                method: "POST",
                data: JSON.stringify(employee),
                contentType: 'application/json',
            }).done(function (res) {
                //thông báo cho client
                alert("Thêm dữ liệu thành công");
            //tắt dialog
            //refresh lại dữ liệu và
            }).fail(function (res) {
                alert("Thêm dữ liệu không thành công");
            })
            
        })

        //refesh lại dữ liệu với button refresh===============
        $('#btn-refresh').click(function () {
            me.loadData(URL);
        })

        //hiện thị thông tin khách hàng khi dblclick vào row==
        $('table tbody').on('dblclick', 'tr', function () {
            var code = $(this).find('td[field="code"]').text();
            var id = '';
            $.ajax({
                url: URL + "/" + code,
                method: "GET",
            }).done(function (res) {
                var data = res[0];
                id = data.EmployeeID;
                var properties = Object.keys(data);
                $(properties).each(function (index, property) {
                    var value = 'input[name=' + property + ']';
                    var type = $(dialogDetail).find(value).attr('type');
                    if (type == "date") {
                        var date = formatDateInput(data[property]);
                        $(dialogDetail).find(value).attr('value', date);
                    }
                    else {
                        $(dialogDetail).find(value).attr('value', data[property]);
                    }
                })
                dialogDetail.dialog('open');
                $(properties).each(function (index, property) {
                   /* var employee = {
                        "EmployeeCode": $('#EmployeeCode').val(),
                        "FullName": $('#FullName').val(),
                        "PhoneNumber": $('#PhoneNumber').val(),
                        "IdentityNumber": $('#IdentityNumber').val(),
                    }
                    $.ajax({
                        url: URL + '/' + id,
                        method: "PUT",
                        data: JSON.stringify(employee),
                        contentType: 'application/json',
                    }).done(function (res) {
                        //thông báo cho client
                        alert("Update dữ liệu thành công");
                        //tắt dialog
                        //refresh lại dữ liệu và
                    }).fail(function (res) {
                        alert("Update dữ liệu không thành công");
                    })*/

                })
            }).fail(function (res) {

            })
        })

        //xóa dữ liệu với button delete
        $(".btn-delete").click(function () {
            dialogDelete.dialog("open");
        })

        $("#btnDelete").click(function () {
            var codeDelete = $("#codeDelete").val();
            if (codeDelete == null) {
                alert('Bạn chưa nhập dữ liệu');
                $("codeDelete").focus();
            } else {
                $.ajax({
                    url: URL + '/' + codeDelete,
                    method: "Delete",
                }).done(function (res) {
                    if (res == true) alert("Dữ liệu đã được xóa");
                    else alert("Không tìm thấy mã để xóa");
                }).fail(function (res) {

                })
            }
        })

        //đóng dialog với button hủy trong dialog==========
        $("#btnCancel").click(function () {
            dialogDetail.dialog('close');
        })
        $("#btnCancelDelete").click(function () {
            dialogDelete.dialog('close');
        })
    }
    
}