$(document).ready(function () {
    dialogDetail = $('.customer-dialog').dialog({
        autoOpen: false,
        modal: true,
        title: "THÔNG TIN KHÁCH HÀNG",
        width: 'auto',
        position: { my: "center", at: "center", of: window },
        resizable: false,
    });
    new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }
    getURL() {
        return "http://localhost:50144/api/Customer";
    }

}
/**--------------------------------
 * Hàm định dạng tiền nợ
 * @param {any} debitAmount tham số bất kì
 * CreateBy VVLONG (26/12/2020)
 */
function formatDebitAmount(debitAmount) {
    if (debitAmount == null) return "";
    else return debitAmount;
}