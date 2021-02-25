$(function(){
    var tableReport, tableBankAccount;
    var selectedReport = null;
    var bankAccount = Array();
    var selectedBankAccount = null;
    var allData = Array();
    var filteredData = Array();
    var timerNotifModal;

    ShowNotifModalEntry('Welcome! This a demo website, all activity from this website will not saved.', 'notif-content-main-page');

    tableReport = $('#table-report-employee').DataTable({
        searching: true, paging: false, dataSrc: "", select: 'single',
        scrollY: "69vh", scrollCollapse: true, ordering: true,
        order:[], dom: '<"row"<"col-sm-6"f><"col-sm-6 text-right"B>><"row mt-2"<"col-sm-12"ti>>',
        columns:[
            {data: "name"}, {data: "genderName"}, {data: "positionName"}, {data: "placementName"}, {data: "email"},
            {data: "statusName"}
        ],
        buttons: {
            buttons:[
                { className: 'btn btn-success border border-dark btn-dtb-costume', text: 'New', action:
                    function(){
                        bankAccount = Array();
                        tableBankAccount.clear().rows.add(bankAccount).draw().columns.adjust();

                        ClearFormEntry();
                        HideNotifModalEntry('notif-content-main-page');
                        tableReport.rows().deselect();
                        $('#tab-profile').tab('show');
                        $('#modal-entry').modal({backdrop: 'static', keyboard: false}, "show");
                    }
                },
                { className: 'btn btn-light border border-dark btn-dtb-costume', text: 'Edit', action:
                    function(){
                        if(selectedReport == null)
                            ShowNotifModalEntry('You need to select data employee first.', 'notif-content-main-page', true);
                        else
                        {
                            HideNotifModalEntry('notif-content-main-page');
                            $('#tab-profile').tab('show');
                            $.each(allData, function(index, value){
                                if(value.id == selectedReport.id)
                                {
                                    $("#input-idcard-number").val(value.idCard);
                                    $("#select-position").val(value.position);
                                    $("#select-status").val(value.status);
                                    $("#select-placement").val(value.placement);
                                    $("#input-name").val(value.name);
                                    $("#select-gender").val(value.gender);
                                    $('#input-phone-number').val(value.phoneNumber);
                                    $("#input-email").val(value.email);
                                    $("#textarea-address").val(value.address);
                                    $("#textarea-notes").val(value.notes);

                                    $('#modal-entry').modal({backdrop: 'static', keyboard: false}, "show");
                                    bankAccount = allData[index].dataBankAccount.slice();
                                    tableBankAccount.clear().rows.add(bankAccount).draw().columns.adjust();
                                    return false;
                                }
                                else
                                    return true;
                            });
                        }
                        
                    }
                },
                { extend: 'excel', className: 'btn btn-light border border-dark', text: 'Export To Excel' },
            ]
        }
    });
    $("#table-report-employee_filter").css("text-align", "left");

    tableReport.on('select', function ( e, dt, type, indexes ) {
        data = tableReport.rows(indexes).data();
        selectedReport = data[0];
    });

    tableReport.on('deselect', function ( e, dt, type, indexes ) {
        selectedReport = null;
    });

    tableBankAccount = $('#table-bank-account').DataTable({
        searching: false, paging: false, dataSrc: "", select: 'single',
        ordering: true, order:[], dom: 'Bt',
        columns:[{data: "bankUserName"}, {data: "bankUserNumber"}, {data: "bankName"}, {data: "bankCode"}],
        buttons: {
            buttons:[
                { className: 'btn btn-success border border-dark btn-dtb-costume', text: 'Add', action:
                    function(){
                        if(bankAccount.length < 2)
                        {
                            tableBankAccount.rows().deselect();
                            ResetErrorFormEntry();
                            ResetErrorFormBankAccount();
                            HideNotifModalEntry('alert-info-form');
                            ClearFormBankAccount();
                            $('#modal-entry').modal("toggle");
    
                            $('#modal-add-bank-title').html("<h5>Employee Manager - Add Bank Account</h5>");
                            $('#modal-add-bank').modal({backdrop: 'static', keyboard: false}, "show");
                        }
                        else
                            ShowNotifModalEntry("Maximum amount of Bank Account is 2.", "alert-info-form", true);
                    }
                },
                { className: 'btn btn-light border border-dark btn-dtb-costume', text: 'Edit', action:
                    function(){
                        if(selectedBankAccount == null)
                            ShowNotifModalEntry("You need to select data bank account first.", "alert-info-form", true);
                        else
                        {
                            ResetErrorFormEntry();
                            ResetErrorFormBankAccount();
                            HideNotifModalEntry('alert-info-form');
                            ClearFormBankAccount();

                            $('#modal-entry').modal("toggle");
                            $('#modal-add-bank-title').html("<h5>Employee Manager - Edit Bank Account</h5>");
                            $('#modal-add-bank').modal({backdrop: 'static', keyboard: false}, "show");

                            $("#input-bank-name").val(selectedBankAccount.bankName);
                            $("#input-bank-code").val(selectedBankAccount.bankCode);
                            $("#input-bank-username").val(selectedBankAccount.bankUserName);
                            $("#input-bank-account-number").val(selectedBankAccount.bankUserNumber);
                        }
                    }
                },
                { className: 'btn btn-light border border-dark btn-dtb-costume', text: 'Delete', action:
                    function(){
                        if(selectedBankAccount == null)
                            ShowNotifModalEntry("You need to select data bank account first.", 'alert-info-form', true);
                        else
                        {
                            $.each(bankAccount, function(index, value){
                                if(value.id == selectedBankAccount.id)
                                {
                                    bankAccount.splice(index, 1);
                                    selectedBankAccount = null;
                                    tableBankAccount.clear().rows.add(bankAccount).draw().columns.adjust();
                                    ShowNotifModalEntry("Data has been deleted. Click save or cancel to save or revert the changes.", 'alert-info-form');
                                    return false;
                                }
                                else
                                    return true;
                            });
                        }
                    }
                }
            ]
        }
    });

    tableBankAccount.on('select', function ( e, dt, type, indexes ) {
        data = tableBankAccount.rows(indexes).data();
        selectedBankAccount = data[0];
    });

    tableBankAccount.on('deselect', function ( e, dt, type, indexes ) {
        selectedBankAccount = null;
    });

    $('#btn-modal-add-bank-close').click(function(){
        tableBankAccount.rows().deselect();
        $('#modal-entry').modal("show");
        $('#modal-add-bank').modal("hide");
    });

    $('#btn-modal-add-bank-save').click(function(){
        let valForm = {
            bankName: isInputValueValid("Bank Name", $("#input-bank-name").val().trim(), "message-input-bank-name", false, 64), 
            bankCode: isInputValueValid("Bank Code", $("#input-bank-code").val().trim(), "message-input-bank-code", false, 8), 
            bankUserName: isInputValueValid("Bank Account Name", $("#input-bank-username").val().trim(), "message-input-bank-username", false, 64), 
            bankUserNumber: isInputValueValid("Bank Account Number", $("#input-bank-account-number").val().trim(), "message-input-bank-account-number", false, 32)
        }

        if(valForm.bankName === false || valForm.bankCode === false)
            return;
        else if(valForm.bankUserNumber === false || valForm.bankUserNumber === false)
            return;
        else
        {
            if(selectedBankAccount == null)
            {
                let index = bankAccount.length;
                valForm["id"] = index + 1;
                bankAccount[index] = valForm;
            }
            else
            {
                valForm["id"] = selectedBankAccount.id;
                $.each(bankAccount, function(index, value){
                    if(value.id == selectedBankAccount.id)
                    {
                        bankAccount[index] = valForm;
                        return false;
                    }
                    else
                        return true;
                });
            }
            selectedBankAccount = null;
            tableBankAccount.clear().rows.add(bankAccount).draw().columns.adjust();
            $("#btn-modal-add-bank-close").trigger( "click" );
        }
    });

    $('#btn-modal-entry-save').click(function(){
        let valForm = {
            // Main Form
            idCard: isInputValueValid("ID Card Number", $("#input-idcard-number").val().trim(), "message-input-idcard-number", true, 32),
            position: isSelectedValueValid("Position", $("#select-position").val(), "message-select-position"),
            positionName: $("#select-position").find('option:selected').text(),
            placement: isSelectedValueValid("Placement", $("#select-placement").val(), "message-select-placement"),
            placementName: $("#select-placement").find('option:selected').text(),
            status: $("#select-status").val(),
            statusName: $("#select-status").find('option:selected').text(),

            // Profile
            name: isInputValueValid("Full Name", $("#input-name").val().trim(), "message-input-name", false, 64), 
            gender: isSelectedValueValid("Gender", $("#select-gender").val(), "message-select-gender"),
            genderName: $("#select-gender").find('option:selected').text(),
            phoneNumber: isInputValueValid("Phone Number", $('#input-phone-number').val().trim(), "message-input-phone-number", true, 32),
            email: isEmailValid("Email", $("#input-email").val().trim(), "message-input-email"), 
            address: $("#textarea-address").val().trim(),

            // Others
            notes: $("#textarea-notes").val().trim()
        }

        if(valForm.idCard === false || valForm.position === false || valForm.position === false || valForm.placement === false)
            ShowNotifModalEntry("Please recheck ID Card / Position / Placement field.", "alert-info-form", true);
        else if(valForm.name === false || valForm.gender === false || valForm.phoneNumber === false)
            ShowNotifModalEntry("Please recheck Full Name / Gender / Phone Number field.", "alert-info-form", true);
        else if(valForm.email === false)
            ShowNotifModalEntry("Please recheck email field.", "alert-info-form", true);
        else
        {
            waitingDialog.show("Storing data...", {onHide:function(){
                $('#modal-entry').modal("hide");
                if(selectedReport == null)
                    ShowNotifModalEntry('Data has been saved.', 'notif-content-main-page');
                else
                {
                    selectedReport = null;
                    ShowNotifModalEntry('Data has been changed.', 'notif-content-main-page');
                }
                ClearFormBankAccount();
                ClearFormEntry();

                bankAccount = Array();

                tableReport.clear().rows.add(allData).draw().columns.adjust();
                tableBankAccount.clear().rows.add(bankAccount).draw().columns.adjust();
            }});

            valForm["dataBankAccount"] = bankAccount.slice();

            if(selectedReport == null)
            {
                valForm["id"] = allData.length;

                let index = allData.length;
                allData[index] = valForm;
            }
            else
            {
                valForm["id"] = selectedReport.id;
                $.each(allData, function(index, value){
                    if(value.id == selectedReport.id)
                    {
                        selectedReport.id = index;
                        allData[index] = valForm;
                        bankAccount = allData[index].dataBankAccount;
                    }
                });
            }

            setTimeout(function(){
                waitingDialog.hide();
            }, 1000);
        }
    });

    $('#modal-entry').on('hidden.bs.modal', function (event) {
        ResetErrorFormEntry();
    })

    function HideNotifModalEntry(notifid)
    {
        clearTimeout(timerNotifModal);
        $('#'+notifid).removeClass("show");
    }

    function ShowNotifModalEntry(message, notifid, isError = false)
    {
        clearTimeout(timerNotifModal);
        $('.alert').removeClass("show");

        if(isError)
            $('#'+notifid).addClass("show").removeClass("alert-success").addClass("alert-danger").html('<i class="fas fa-exclamation-circle"></i> '+message);
        else
            $('#'+notifid).addClass("show").removeClass("alert-danger").addClass("alert-success").html('<i class="fas fa-check-circle"></i> '+message);

        timerNotifModal = setTimeout(function(){
            $('#'+notifid).removeClass("show");
        }, 4500);
    }

    function isInputValueValid(valueName, value, idMsgElement, numberOnly = false, maxLength = 999999, minLength = 1) {
        if(value.length >= minLength)
        {
            if(value.length <= maxLength)
            {
                if(numberOnly)
                {
                    if(/[^\d{\.}]+/.test(value))
                    {
                        $("#"+idMsgElement).html("- "+valueName+" must be number only.");
                        return false;
                    }
                    else
                    {
                        $("#"+idMsgElement).html("");
                        return value;
                    }
                }
                else
                {
                    $("#"+idMsgElement).html("");
                    return value;
                }
            }
            else
                $("#"+idMsgElement).html("- Max length of "+valueName+" is "+maxLength);
        }
        else
            $("#"+idMsgElement).html("- "+valueName+" must be filled.");

        return false;
    }

    function isSelectedValueValid(valueName, value, idMsgElement)
    {
        if(value == 0 || value == "")
        {
            $("#"+idMsgElement).html("- "+valueName+" must be selected.");
            return false;
        }
        else
        {
            $("#"+idMsgElement).html("");
            return value;
        }
    }

    function isEmailValid(valueName, value, idMsgElement)
    {
        if(value.length != 0)
        {
            if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/.test(value) == false)
            {
                $("#"+idMsgElement).html("- "+valueName+" not valid.");
                return false;
            }
            else
            {
                $("#"+idMsgElement).html("");
                return value;
            }
        }
        return value;
    }

    function ClearFormEntry()
    {
        $("#input-idcard-number").val("");
        $("#select-status").val("1");
        $("#select-position").val("0");
        $("#select-placement").val("0");
        $("#input-name").val("");
        $("#select-gender").val("0");
        $('#input-phone-number').val("");
        $("#input-email").val("");
        $("#textarea-address").val("");
        $("#textarea-notes").val("");
    }

    function ClearFormBankAccount()
    {
        $("#input-bank-name").val("");
        $("#input-bank-code").val("");
        $("#input-bank-username").val("");
        $("#input-bank-account-number").val("");
    }

    function ResetErrorFormEntry()
    {
        $("#message-input-idcard-number").html("");
        $("#message-select-position").html("");
        $("#message-select-placement").html("");
        $("#message-input-name").html("");
        $("#message-select-gender").html("");
        $("#message-input-phone-number").html("");
    }

    function ResetErrorFormBankAccount()
    {
        $("#message-input-bank-name").html("");
        $("#message-input-bank-code").html("");
        $("#message-input-bank-username").html("");
        $("#message-input-bank-account-number").html("");
    }
});