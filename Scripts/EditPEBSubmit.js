// Code to insert data
function onSubmit() {
    try {
		ShowWaitDialog();
        //Get List by Title i.e. Project Datasheet
		$('input[type=button][value=Save]').attr('disabled','disabled');
        var oList = context.get_web().get_lists().getByTitle(listProjectEvidenceBite);

        this.oListItem = oList.getItemById(projectEBID);
        
        //Start EVIDENCE BITE INFO

        //Managed Meta-data Column 'Evidence Project Stage'
        if ($(".chkBoxListEPSClass:checked").length > 0) {
            var fieldEPS = oList.get_fields().getByInternalNameOrTitle("Evidence Project Stage");
            var taxFieldEPS = context.castTo(fieldEPS, SP.Taxonomy.TaxonomyField);
            var termsValueEPS = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultiEPS(), taxFieldEPS);
            taxFieldEPS.setFieldValueByValueCollection(oListItem, termsValueEPS);
        }

        //Managed Meta-data Column 'Business_x0020_Function'
        var fieldBF = oList.get_fields().getByInternalNameOrTitle("Business_x0020_Function");
        var taxFieldBF = context.castTo(fieldBF, SP.Taxonomy.TaxonomyField);
        var termValueBF = new SP.Taxonomy.TaxonomyFieldValue();
        termValueBF.set_label($("#ddlBusinessFunctions option:selected").val());
        termValueBF.set_termGuid($("#ddlBusinessFunctions option:selected").attr("id"));
        termValueBF.set_wssId(-1);
        taxFieldBF.setFieldValueByValue(oListItem, termValueBF);

        //Managed Meta-data Column 'Topic'
        var fieldTopic = oList.get_fields().getByInternalNameOrTitle("Topic");
        var taxFieldTopic = context.castTo(fieldTopic, SP.Taxonomy.TaxonomyField);
        var termValueTopic = new SP.Taxonomy.TaxonomyFieldValue();
        termValueTopic.set_label($("#ddlTopic option:selected").val());
        termValueTopic.set_termGuid($("#ddlTopic option:selected").attr("id"));
        termValueTopic.set_wssId(-1);
        taxFieldTopic.setFieldValueByValue(oListItem, termValueTopic);

        //Managed Meta-data Column 'Business_x0020_Categories'
        var fieldCategories = oList.get_fields().getByInternalNameOrTitle("Business_x0020_Categories");
        var taxFieldCategories = context.castTo(fieldCategories, SP.Taxonomy.TaxonomyField);

        if (isCategoriesEnable) {
            //Managed Meta-data Column 'Business_x0020_Categories'
            var termsValueCategories = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleCategories(), taxFieldCategories);
            taxFieldCategories.setFieldValueByValueCollection(oListItem, termsValueCategories);
        }
        else {
            taxFieldCategories.validateSetValue(oListItem, null);
        }

        //Evidence Bite Heading
        oListItem.set_item('Evidence_x0020_Bite_x0020_Headli', $("#txtHeading").val());

        //Evidence Bite Description (Who/What/When/How)
        oListItem.set_item('Evidence_x0020_Bite_x0020_Descri', $("#txtDescription").val());

        //Evidence Bite Benefits (Outcomes/Client benefits)
        oListItem.set_item('Evidence_x0020_Bite_x0020_Benefi', $("#txtBenefits").val());
        
        //this value is used in workflow
        oListItem.set_item('Updated_x0020_in', 'Project Evidence bite');


        //End EVIDENCE BITE INFO

        oListItem.update();
        context.load(oListItem);

        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
        returnValue = true;
    }
    catch (e) {
        returnValue = false;
        alert('Error while submitting the data:' + e.message + '\n' + 'stack:' + e.stack);
    }
    return returnValue;
}

function onQuerySucceeded() {
	
	if(typeof(waitDialog)!='undefined')
		waitDialog.close();
	waitDialog = null;
    returnValue = true;
    confirm("Successfully updated the 'Project Evidence Bite'."+"<br />" + "Do you want to view the updated information ?");
}

function onQueryFailed(sender, args) {
	
    returnValue = false;
    LogError(args);
	
	if(args.get_message().indexOf('creatingField')>=0)
	{
		alert('Sorry, the changes could not be saved. Please check the values in the datasheet and try again.');
	}
	else
	{
		alert('Request failed. ' + args.get_message());
	}
	$('input[type=button][value=Save]').removeAttr('disabled','');
}

function getMultiWD() {
    var termsWD = new Array();
    $(".chkBoxListWDClass:checked").each(function () {
        termsWD.push("-1;#" + $(this).val() + "|" + $(this).attr("id"));
    });
    return termsWD.join(";#");
}

function getMultiEPS() {
    var termsEPS = new Array();
    $(".chkBoxListEPSClass:checked").each(function () {
        termsEPS.push("-1;#" + $(this).val() + "|" + $(this).attr("id"));
    });
    return termsEPS.join(";#");
}

function getMultipleCategories() {
    var termsCategories = new Array();
    if ($("#ddlCategory1 option:selected").val() != 'default')
        termsCategories.push("-1;#" + $("#ddlCategory1 option:selected").val() + "|" + $("#ddlCategory1 option:selected").attr("id"));

    if ($("#ddlCategory2 option:selected").val() != 'default')
        termsCategories.push("-1;#" + $("#ddlCategory2 option:selected").val() + "|" + $("#ddlCategory2 option:selected").attr("id"));

    return termsCategories.join(";#");
}

function resetFields(form) {
    $(':input', form).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        // to reset the value attr of text inputs,
        // password inputs, fileUpload and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'file')
            this.value = "";
            // checkboxes and radios need to have their checked state cleared                
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
            // select elements need to have their 'selectedIndex' property set to -1
            // (this works for both single and multiple select elements)
        else if (tag == 'select')
            this.selectedIndex = 0;
    });
}

