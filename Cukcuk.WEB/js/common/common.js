/**----------------------------
 *Hàm trả về dữ liệu */
/*function loadData() {
    $.ajax({
        url: "http://api.manhnv.net/api/customers",
        method: "GET",
    }).done(function (res) {
        var data = res;
        $.each(data, function (index, item) {
            var dateOfBirth = item.DateOfBirth;
            var debitAmount = item.DebitAmount;
            dateOfBirth = formatDate(dateOfBirth);
            debitAmount = formatDebitAmount(debitAmount);
            var tr = $(`<tr>
                        <td>`+ item.CustomerCode + `</td>
                        <td>`+ item.FullName + `</td>
                        <td>`+ item.GenderName + `</td>
                        <td>`+ dateOfBirth + `</td>
                        <td>`+ item.CustomerGroupName + `</td>
                        <td>`+ item.PhoneNumber + `</td>
                        <td>`+ item.Email + `</td>
                        <td title="`+ item.Address + `">` + item.Address + `</td>
                        <td>`+ debitAmount + `</td>
                        <td>`+ item.MemberCardCode + `</td>
                    </tr>`);
            $('table tbody').append(tr);
        })
    }).fail(function (res) {

    })
}*/

/** -----------------------------------
 * Hàm định dạng ngày tháng
 * @param {any} date tham số bất kì
 * CreateBy: VVLONG (26/12/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime()) || date.getFullYear()=="0001") {
        return "";
    } else {
        var day = date.getDate(date),
            month = date.getMonth(date) + 1,
            year = date.getFullYear(date);
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}

function formatDateInput(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime()) || date.getFullYear() == "0001") {
        return "";
    } else {
        var day = date.getDate(date),
            month = date.getMonth(date) + 1,
            year = date.getFullYear(date);
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return year + '-' + month + '-' + day;
    }
}

function formatMoney(money) {
    /*moneyStr = money + '';*/
    var moneyValid = money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return moneyValid;
}