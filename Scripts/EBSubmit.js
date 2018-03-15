// Code to insert data
function onSubmit() {

    try {
	$('input[type=button][value=Save]').attr('disabled','disabled');
        //Get List by Title i.e. 'Generic Evidence Bite'
        var oList = context.get_web().get_lists().getByTitle(listEvidenceBite);

        var itemCreateInfo = new SP.ListItemCreationInformation();
        this.oListItem = oList.addItem(itemCreateInfo);

        //Scheme/Project Title
        oListItem.set_item('Title', $("#txtHeading").val());

        //Non-Location Specific
        if ($("input:radio[name='rbIsNonLocationSpecific']:checked").val() == "Yes")
            oListItem.set_item('NonLocationSpecific', "1");
        else
            oListItem.set_item('NonLocationSpecific', "0");

        if (isLocationSpecific) {
            //Managed Meta-data Column 'Project Region'
            var fieldRegion = oList.get_fields().getByInternalNameOrTitle("Project Region");
            var taxFieldRegion = context.castTo(fieldRegion, SP.Taxonomy.TaxonomyField);
            var termValueRegion = new SP.Taxonomy.TaxonomyFieldValue();
            termValueRegion.set_label($("#ddlRegion option:selected").val());
            termValueRegion.set_termGuid($("#ddlRegion option:selected").attr("id"));
            termValueRegion.set_wssId(-1);
            taxFieldRegion.setFieldValueByValue(oListItem, termValueRegion);

            if (hasAreas) {
                //Managed Meta-data Column 'Project Area'
                var fieldArea = oList.get_fields().getByInternalNameOrTitle("Project Area");
                var taxFieldArea = context.castTo(fieldArea, SP.Taxonomy.TaxonomyField);
                var termValueArea = new SP.Taxonomy.TaxonomyFieldValue();
                termValueArea.set_label($("#ddlArea option:selected").val());
                termValueArea.set_termGuid($("#ddlArea option:selected").attr("id"));
                termValueArea.set_wssId(-1);
                taxFieldArea.setFieldValueByValue(oListItem, termValueArea);
            }
            if (hasLocations) {
                //Managed Meta-data Column 'Project_x0020_Location'
                var fieldLocation = oList.get_fields().getByInternalNameOrTitle("Project Location");
                var taxFieldLocation = context.castTo(fieldLocation, SP.Taxonomy.TaxonomyField);
                var termValueLocation = new SP.Taxonomy.TaxonomyFieldValue();
                termValueLocation.set_label($("#ddlLocation option:selected").val());
                termValueLocation.set_termGuid($("#ddlLocation option:selected").attr("id"));
                termValueLocation.set_wssId(-1);
                taxFieldLocation.setFieldValueByValue(oListItem, termValueLocation);
            }
        }

        //Non-Sector Specific
        if ($("input:radio[name='rbIsNonSectorSpecific']:checked").val() == "Yes")
            oListItem.set_item('NonSectorSpecific', "1");
        else
            oListItem.set_item('NonSectorSpecific', "0");

        if (isSectorSpecific) {
            //Managed Meta-data Column 'Sector'
            var fieldSector = oList.get_fields().getByInternalNameOrTitle("Sector");
            var taxFieldSector = context.castTo(fieldSector, SP.Taxonomy.TaxonomyField);
            var termsValueSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSectors(), taxFieldSector);
            taxFieldSector.setFieldValueByValueCollection(oListItem, termsValueSector);

            //Managed Meta-data Column 'Sub-SubSector'
            var fieldSubSector = oList.get_fields().getByInternalNameOrTitle("Subsector");
            var taxFieldSubSector = context.castTo(fieldSubSector, SP.Taxonomy.TaxonomyField);
            var termsValueSubSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSubSectors(), taxFieldSubSector);
            taxFieldSubSector.setFieldValueByValueCollection(oListItem, termsValueSubSector);
        }

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

        if (isCategoriesEnable) {
            //Managed Meta-data Column 'Business_x0020_Categories'
            var fieldCategories = oList.get_fields().getByInternalNameOrTitle("Business_x0020_Categories");
            var taxFieldCategories = context.castTo(fieldCategories, SP.Taxonomy.TaxonomyField);
            var termsValueCategories = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleCategories(), taxFieldCategories);
            taxFieldCategories.setFieldValueByValueCollection(oListItem, termsValueCategories);
        }

        //Evidence Bite Heading
        oListItem.set_item('Evidence_x0020_Bite_x0020_Headli', $("#txtHeading").val());

        //Evidence Bite Description (Who/What/When/How)
        oListItem.set_item('Evidence_x0020_Bite_x0020_Descri', $("#txtDescription").val());

        //Evidence Bite Benefits (Outcomes/Client benefits)
        if ($("#txtBenefits").val())
            oListItem.set_item('Evidence_x0020_Bite_x0020_Benefi', $("#txtBenefits").val());


        oListItem.update();
        context.load(oListItem);

        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    }
    catch (e) {
        alert('Error while submitting the data:' + e.message + 'stack:' + e.stack);
    }
}

function onQuerySucceeded() {

    successMessage = "Successfully submitted the 'Generic Evidence Bite' and your Reference ID : " + oListItem.get_id() + ".<br />" + "Click on 'OK' to add another 'Generic Evidence Bite'.";
    confirm(successMessage);
}

function onQueryFailed(sender, args) {
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

//get Scope of Kier Involvement
function getMultiScopeKI() {
    var termsWD = new Array();
    $(".chkBoxListScopeKIClass:checked").each(function () {
        termsWD.push("-1;#" + $(this).val() + "|" + $(this).attr("id"));
    });
    return termsWD.join(";#");
}

function getMultipleSectors() {
    var termsSectors = new Array();
    if (isSectorSpecific) {
        termsSectors.push("-1;#" + $("#ddlSector option:selected").val() + "|" + $("#ddlSector option:selected").attr("id"));
    }
    if (isSecondSectorEnable && $("#ddlSector1 option:selected").val() != 'default')
        termsSectors.push("-1;#" + $("#ddlSector1 option:selected").val() + "|" + $("#ddlSector1 option:selected").attr("id"));
    if (isThirdSectorEnable && $("#ddlSector2 option:selected").val() != 'default')
        termsSectors.push("-1;#" + $("#ddlSector2 option:selected").val() + "|" + $("#ddlSector2 option:selected").attr("id"));
    return termsSectors.join(";#");
}

function getMultipleSubSectors() {
    var termsSubSectors = new Array();
    if (isSectorSpecific) {
        termsSubSectors.push("-1;#" + $("#ddlSubSector option:selected").val() + "|" + $("#ddlSubSector option:selected").attr("id"));
    }

    if (isSecondSectorEnable && $("#ddlSubSector1 option:selected").val() != 'default')
        termsSubSectors.push("-1;#" + $("#ddlSubSector1 option:selected").val() + "|" + $("#ddlSubSector1 option:selected").attr("id"));
    if (isThirdSectorEnable && $("#ddlSubSector2 option:selected").val() != 'default')
        termsSubSectors.push("-1;#" + $("#ddlSubSector2 option:selected").val() + "|" + $("#ddlSubSector2 option:selected").attr("id"));
    return termsSubSectors.join(";#");
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


