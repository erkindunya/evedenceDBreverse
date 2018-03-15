//========================================================= [ CRM Opportunity Author ]
function PeoplePickerCRMAuth() {
    var searchString = '';
    var dialogOptions = 'resizable:yes; status:no; scroll:no; help:no; center:yes; dialogWidth :575px; dialogHeight :500px;';
    var dialogURL = '/_layouts/picker.aspx';
    dialogURL += '?MultiSelect=False';
    dialogURL += '&CustomProperty=User,SecGroup,SPGroup;;15;;;False';
    dialogURL += '&EntitySeparator=;';
    dialogURL += '&DialogTitle=Select People and Groups';
    dialogURL += '&DialogImage=/_layouts/images/ppeople.gif';
    dialogURL += '&PickerDialogType=Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c';
    dialogURL += '&DefaultSearch=' + escapeProperly(searchString);

    //commonShowModalDialog(dialogURL, dialogOptions, DelegatePeoplePickerCRMCallback);
	ShowPeoplePicker('Select People and Groups',dialogURL,DelegatePeoplePickerCRMCallback);
}

function DelegatePeoplePickerCRMCallback(dOption,searchResult) {

    var xmlDoc = $.parseXML(searchResult);
    var $xml = $(xmlDoc);
    var fqn = $xml.find('Entity').attr('DisplayText');

    // To store the User ID value in variable to insert the value in People picker Column
    setCRMUserId($xml.find('Entity').attr('Key'));

    //Below code is for People Picker Multi select
    /*
    if ($("#ppCRMAuthor").val() != null) {
        if ($("#ppCRMAuthor").val() != '') {
            var contactPerson = $("#ppCRMAuthor").val();
            $("#ppCRMAuthor").val(contactPerson + "; " + fqn);
        }
        else {
            $("#ppCRMAuthor").val(fqn);
        }
        $("#ppCRMAuthor").focus();
    }
    */
    if ($("#ppCRMAuthor").val() != null) {
        $("#ppCRMAuthor").val(fqn);
        $("#ppCRMAuthor").focus();
    }
    
    return;
}

function setCRMUserId(loginName) {
    this.peoplePickerUser = context.get_web().ensureUser(loginName);
    context.load(this.peoplePickerUser);
    context.executeQueryAsync(
         Function.createDelegate(this, function () { crmAuthorID = this.peoplePickerUser.get_id(); }),
         Function.createDelegate(this, function () { alert('Query failed while setting the CRM User ID. Error: ' + args.get_message());})
    );
}

//========================================================= [ CRM Opportunity Author ]

//========================================================= [ Bid Lead ]
function PeoplePickerBidLead() {
    var searchString = '';
    var dialogOptions = 'resizable:yes; status:no; scroll:no; help:no; center:yes; dialogWidth :575px; dialogHeight :500px;';
    var dialogURL = '/_layouts/picker.aspx';
    dialogURL += '?MultiSelect=False';
    dialogURL += '&CustomProperty=User,SecGroup,SPGroup;;15;;;False';
    dialogURL += '&EntitySeparator=;';
    dialogURL += '&DialogTitle=Select People and Groups';
    dialogURL += '&DialogImage=/_layouts/images/ppeople.gif';
    dialogURL += '&PickerDialogType=Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c';
    dialogURL += '&DefaultSearch=' + escapeProperly(searchString);

    //commonShowModalDialog(dialogURL, dialogOptions, DelegatePeoplePickerCallback);
	ShowPeoplePicker('Select People and Groups',dialogURL,DelegatePeoplePickerCallback);
}

function DelegatePeoplePickerCallback(dOption,searchResult) {

    var xmlDoc = $.parseXML(searchResult);
    var $xml = $(xmlDoc);
    var fqn = $xml.find('Entity').attr('DisplayText');
    // To store the User ID value in variable to insert the value in People picker Column
    setBidLeadUserId($xml.find('Entity').attr('Key'));

    if ($("#ppBidLead").val() != null) {
        $("#ppBidLead").val(fqn);
        $("#ppBidLead").focus();
    }
    $("#errorBidLead").hide();
    return;
}

function setBidLeadUserId(loginName) {
    this.peoplePickerUser = context.get_web().ensureUser(loginName);
    context.load(this.peoplePickerUser);
    context.executeQueryAsync(
         Function.createDelegate(this, function () { bidLeadID = this.peoplePickerUser.get_id(); }),
         Function.createDelegate(this, function () { alert('Query failed while setting the CRM User ID. Error: ' + args.get_message()); })
    );
}

//========================================================= [ Bid Lead ]

//========================================================= [  QS / Commercial Manager ]

function PeoplePickerQSManager() {
    var searchString = '';
    var dialogOptions = 'resizable:yes; status:no; scroll:no; help:no; center:yes; dialogWidth :575px; dialogHeight :500px;';
    var dialogURL = '/_layouts/picker.aspx';
    dialogURL += '?MultiSelect=False';
    dialogURL += '&CustomProperty=User,SecGroup,SPGroup;;15;;;False';
    dialogURL += '&EntitySeparator=;';
    dialogURL += '&DialogTitle=Select People and Groups';
    dialogURL += '&DialogImage=/_layouts/images/ppeople.gif';
    dialogURL += '&PickerDialogType=Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c';
    dialogURL += '&DefaultSearch=' + escapeProperly(searchString);

    //commonShowModalDialog(dialogURL, dialogOptions, DelegatePeoplePickerQSCallback);
	ShowPeoplePicker('Select People and Groups',dialogURL,DelegatePeoplePickerQSCallback);
}

function DelegatePeoplePickerQSCallback(dOption,searchResult) {

    var xmlDoc = $.parseXML(searchResult);
    var $xml = $(xmlDoc);
    var fqn = $xml.find('Entity').attr('DisplayText');
    // To store the User ID value in variable to insert the value in People picker Column
    setQSManagerUserId($xml.find('Entity').attr('Key'));

    if ($("#ppCommercialManager").val() != null) {
        $("#ppCommercialManager").val(fqn);
        $("#ppCommercialManager").focus();
    }
    $("#errorCommercialManager").hide();
    return;
}

function setQSManagerUserId(loginName) {
    this.peoplePickerUser = context.get_web().ensureUser(loginName);
    context.load(this.peoplePickerUser);
    context.executeQueryAsync(
         Function.createDelegate(this, function () { commercialManagerID = this.peoplePickerUser.get_id(); }),
         Function.createDelegate(this, function () { alert('Query failed while setting the CRM User ID. Error: ' + args.get_message()); })
    );
}

//========================================================= [  QS / Commercial Manager ]

//========================================================= [  Project / Contracts Manager ]

function PeoplePickerProjectManager() {
    var searchString = '';
    var dialogOptions = 'resizable:yes; status:no; scroll:no; help:no; center:yes; dialogWidth :575px; dialogHeight :500px;';
    var dialogURL = '/_layouts/picker.aspx';
    dialogURL += '?MultiSelect=False';
    dialogURL += '&CustomProperty=User,SecGroup,SPGroup;;15;;;False';
    dialogURL += '&EntitySeparator=;';
    dialogURL += '&DialogTitle=Select People and Groups';
    dialogURL += '&DialogImage=/_layouts/images/ppeople.gif';
    dialogURL += '&PickerDialogType=Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c';
    dialogURL += '&DefaultSearch=' + escapeProperly(searchString);

    //commonShowModalDialog(dialogURL, dialogOptions, DelegatePeoplePickerPMCallback);
	ShowPeoplePicker('Select People and Groups',dialogURL,DelegatePeoplePickerPMCallback);
}

function DelegatePeoplePickerPMCallback(dOption,searchResult) {

    var xmlDoc = $.parseXML(searchResult);
    var $xml = $(xmlDoc);
    var fqn = $xml.find('Entity').attr('DisplayText');
    // To store the User ID value in variable to insert the value in People picker Column
    setPMUserId($xml.find('Entity').attr('Key'));

    if ($("#ppContractsManager").val() != null) {
        $("#ppContractsManager").val(fqn);
        $("#ppContractsManager").focus();
    }
    $("#errorContractsManager").hide();
    return;
}

function setPMUserId(loginName) {
    this.peoplePickerUser = context.get_web().ensureUser(loginName);
    context.load(this.peoplePickerUser);
    context.executeQueryAsync(
         Function.createDelegate(this, function () { contractsManagerID = this.peoplePickerUser.get_id(); }),
         Function.createDelegate(this, function () { alert('Query failed while setting the CRM User ID. Error: ' + args.get_message()); })
    );
}

//========================================================= [  Project / Contracts Manager ]

//========================================================= [  Design Manager ]

function PeoplePickerDesignManager() {
    var searchString = '';
    var dialogOptions = 'resizable:yes; status:no; scroll:no; help:no; center:yes; dialogWidth :575px; dialogHeight :500px;';
    var dialogURL = '/_layouts/picker.aspx';
    dialogURL += '?MultiSelect=False';
    dialogURL += '&CustomProperty=User,SecGroup,SPGroup;;15;;;False';
    dialogURL += '&EntitySeparator=;';
    dialogURL += '&DialogTitle=Select People and Groups';
    dialogURL += '&DialogImage=/_layouts/images/ppeople.gif';
    dialogURL += '&PickerDialogType=Microsoft.SharePoint.WebControls.PeoplePickerDialog, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c';
    dialogURL += '&DefaultSearch=' + escapeProperly(searchString);

    //commonShowModalDialog(dialogURL, dialogOptions, DelegatePeoplePickerDMCallback);
	ShowPeoplePicker('Select People and Groups',dialogURL,DelegatePeoplePickerDMCallback);
}

function DelegatePeoplePickerDMCallback(searchResult) {

    var xmlDoc = $.parseXML(searchResult);
    var $xml = $(xmlDoc);
    var fqn = $xml.find('Entity').attr('DisplayText');
    // To store the User ID value in variable to insert the value in People picker Column
    setDMUserId($xml.find('Entity').attr('Key'));

    if ($("#ppDesignManager").val() != null) {
        $("#ppDesignManager").val(fqn);
        $("#ppDesignManager").focus();
    }
    $("#errorDesignManager").hide();
    return;
}

function setDMUserId(loginName) {
    this.peoplePickerUser = context.get_web().ensureUser(loginName);
    context.load(this.peoplePickerUser);
    context.executeQueryAsync(
         Function.createDelegate(this, function () { designManagerID = this.peoplePickerUser.get_id(); }),
         Function.createDelegate(this, function () { alert('Query failed while setting the CRM User ID. Error: ' + args.get_message()); })
    );
}

function ShowPeoplePicker(title,url,CallBackFunction){
var options = {
    title: title,
    width: 600,
    height: 600,
    url: url,
	dialogReturnValueCallback:CallBackFunction
	};

SP.UI.ModalDialog.showModalDialog(options);


}
//========================================================= [  Design Manager ]