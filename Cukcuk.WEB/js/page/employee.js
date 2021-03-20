$(document).ready(function () {
    dialogDetail = $('.dialog-employee').dialog({
        autoOpen: false,
        modal: true,
        title: "THÔNG TIN NHÂN VIÊN",
        width: 'auto',
        position: { my: "center", at: "center", of: window },
        resizable: false,
    });
    dialogDelete = $('.dialog-delete').dialog({
        autoOpen: false,
        modal: true,
        title: "XÓA NHÂN VIÊN",
        width: 'auto',
        position: { my: "center", at: "center", of: window },
        resizable: false,
    })
    new CustomerJS();
})

class CustomerJS extends BaseJS {
    constructor() {
        super();
    }
    getURL() {
        return "http://localhost:50144/api/Employee";
    }

}