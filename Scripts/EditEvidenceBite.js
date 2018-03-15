// Code to fetch master data and to insert date in "Project Datasheet" List
function loadMasterData() {

    // to display logged in User name.
    $('#txtAuthor').attr("value", user.get_title());

    //Hide Controls related to Testimonials
    $('#sector2').hide();
    $('#sector3').hide();

    //Hide Controls related to Categories
    $('#categories').hide();

    while (termSetEnumerator.moveNext()) {
        var currentTermSet = termSetEnumerator.get_current();
        var termSetName = currentTermSet.get_name();

        // Code for 'Locations' Term Set
        if (termSetName == tsNameLocations) {
            tsLocations = currentTermSet;
            getLocationsTerms(currentTermSet);
        }
            // Code for 'Sectors' Term Set
        else if (termSetName == tsNameSector) {
            tsSector = currentTermSet;
            getSectorsTermSet(currentTermSet);
        }
            // Code for 'Evidence Project Stage' Term Set
        else if (termSetName == tsNameEvidenceStage) {
            getEvidenceStagesTerms(currentTermSet);
        }
            // Code for 'Business Functions' Term Set
        else if (termSetName == tsNameBusinessFunction) {
            tsBusinessFunctions = currentTermSet;
            getBusinessFunctionsTermSet(currentTermSet);
        }
    }
    evidenceBiteID = getParameterByName('ID');
    if (evidenceBiteID)
        loadGenericEvidenceBite(evidenceBiteID);
    else
        alert('Invalid Generic Evidence Bite ID.');
}


//========================================= [ Locations (Cascading Drop downs : Region, Area and Location) ]
function getLocationsTerms(termSet) {
    locationsTerms = termSet.get_terms();
    context.load(locationsTerms);
    context.executeQueryAsync(onLocationsTermsLoaded, onLocationsTaxonomyFailed);
}

function onLocationsTermsLoaded() {
    try {
        var termsEnumerator = locationsTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlRegion.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Location Terms:' + e.message);
    }
}

function onLocationsTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    alert('Taxonomy Error while fetching Locations Terms:' + args.get_message());
}

// Code for Region Drop-down change Event to fetch Area drop down
$(document).on('change', "#ddlRegion", function () {
    hasAreas = true;
    hasLocations = true;
    $("#ddlArea").show();
    $("#ddlLocation").show();
    $("#secondHeading").show();
    $("#thirdHeading").show();

    selectedRegion = $(this).val();
    getAreasTermSet(tsLocations);
});

//Get Areas Term Set on selections
function getAreasTermSet(termSetLocations) {
    areasTermSet = termSetLocations.get_terms();
    context.load(areasTermSet);
    context.executeQueryAsync(onAreasTermSetLoaded, onAreaTermSetTaxonomyFailed);
}

function onAreasTermSetLoaded() {
    var tSetEnumerator = areasTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentAreaTermSet = tSetEnumerator.get_current();
        var termSN = currentAreaTermSet.get_name();
        if (termSN == selectedRegion) {
            tsAreas = currentAreaTermSet;
            getAreaTerms(currentAreaTermSet);
        }
    }
}

function getAreaTerms(termSet) {
    areasTerms = termSet.get_terms();
    context.load(areasTerms);
    context.executeQueryAsync(onAreaTermsLoaded, onAreaTermsTaxonomyFailed);
}

function onAreaTermsLoaded() {
    try {
        var termsEnumerator = areasTerms.getEnumerator();
        $('#ddlArea').empty();
        $('#ddlLocation').empty();
        var cntAreas = areasTerms.get_count();
        if (cntAreas > 0) {
            ddlArea.append($("<option/>").attr("value", 'default').text('Please select...'));
            ddlLocation.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlArea.append(option);
            }
            if (areaValue) {
                $("#ddlArea").val(areaValue);
                $('#ddlArea').trigger('change');
            }
        }
        else {
            $("#ddlArea").hide();
            $("#ddlLocation").hide();
            $("#secondHeading").hide();
            $("#thirdHeading").hide();

            hasAreas = false;
            hasLocations = false;

        }

    }
    catch (e) {
        alert('Error while fetching Areas Terms:' + e.message);
    }
}

function onAreaTermSetTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Area Terms Sets:' + args.get_message());
}

function onAreaTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Area Terms :' + args.get_message());
}

// Code for Area Drop-down change Event to fetch Locations
$(document).on('change', "#ddlArea", function () {
    hasAreas = true;
    hasLocations = true;
    $("#ddlLocation").show();
    $("#thirdHeading").show();
    selectedArea = $(this).val();
    getAreaLocationsTermSet(tsAreas);
});

//Get Location based on select Area
function getAreaLocationsTermSet(termSetLocations) {
    locationTermSet = termSetLocations.get_terms();
    context.load(locationTermSet);
    context.executeQueryAsync(onAreaLocationsTermSetLoaded, onAreaLocationTSTaxonomyFailed);
}

function onAreaLocationsTermSetLoaded() {
    var tSetEnumerator = locationTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentLocationTermSet = tSetEnumerator.get_current();
        var termSN = currentLocationTermSet.get_name();
        if (termSN == selectedArea) {
            tsSelectedLocation = currentLocationTermSet;
            getLocationTerms(currentLocationTermSet);
        }
    }
}

function getLocationTerms(termSet) {
    locationTerms = termSet.get_terms();
    context.load(locationTerms);
    context.executeQueryAsync(onLocationTermsLoaded, onAreaLocationTermsTaxonomyFailed);
}

function onLocationTermsLoaded() {
    try {
        var termsEnumerator = locationTerms.getEnumerator();
        $('#ddlLocation').empty();
        var cntLocations = locationTerms.get_count();
        if (cntLocations > 0) {
            ddlLocation.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlLocation.append(option);
            }
            if (locationValue) {
                $("#ddlLocation").val(locationValue);
            }
        }
        else {
            $("#ddlLocation").hide();
            $("#thirdHeading").hide();

            hasLocations = false;

        }
    }
    catch (e) {
        alert('Error while fetching Areas Terms:' + e.message);
    }
}

function onAreaLocationTSTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Area Location Terms Sets:' + args.get_message());
}

function onAreaLocationTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Area Location Terms :' + args.get_message());
}
//========================================= [ Locations (Cascading Drop downs : Region, Area and Location) ]

//========================================= [ Sector (Cascading Drop downs : Sector and Sub-Sectors) ]

function getSectorsTermSet(termSet) {
    sectorsTerms = termSet.get_terms();
    context.load(sectorsTerms);
    context.executeQueryAsync(onSectorsTermSetLoaded, onSectorsTermSetTaxonomyFailed);
}

function onSectorsTermSetLoaded() {
    try {
        var termsEnumerator = sectorsTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {

            //Sector 1
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlSector.append(option);

            //Sector 2
            var currentSector1 = termsEnumerator.get_current();
            var optionSector1 = $("<option/>");
            optionSector1.attr("value", currentSector1.get_name());
            optionSector1.attr("id", currentSector1.get_id()).text(currentSector1.get_name());
            ddlSector1.append(optionSector1);

            //Sector 3
            var currentSector2 = termsEnumerator.get_current();
            var optionSector2 = $("<option/>");
            optionSector2.attr("value", currentSector2.get_name());
            optionSector2.attr("id", currentSector2.get_id()).text(currentSector2.get_name());
            ddlSector2.append(optionSector2);
        }
    }
    catch (e) {
        alert('Error while fetching Sector Terms Sets:' + e.message);
    }
}

function onSectorsTermSetTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    alert('Taxonomy Error while fetching Sector Term Sets:' + args.get_message());
}

// Code for Sector Drop-down change Event to fetch Sub-Sectors
$(document).on('change', "#ddlSector", function () {
    selectedSector = $(this).val();
    getSectorsTS(tsSector);
});

//Get Sector Term Set on selections
function getSectorsTS(termSetSectors) {
    sectorsTermSet = termSetSectors.get_terms();
    context.load(sectorsTermSet);
    context.executeQueryAsync(onSectorTermSetLoaded, onSectorTermSetTaxonomyFailed);
}

function onSectorTermSetLoaded() {
    var tSetEnumerator = sectorsTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentSectorTermSet = tSetEnumerator.get_current();
        var termSN = currentSectorTermSet.get_name();
        if (termSN == selectedSector) {
            getSectorTerms(currentSectorTermSet);
        }
    }
}

function getSectorTerms(termSet) {
    sectorTerms = termSet.get_terms();
    context.load(sectorTerms);
    context.executeQueryAsync(onSectorTermsLoaded, onSectorTermsTaxonomyFailed);
}

function onSectorTermsLoaded() {
    try {
        var termsEnumerator = sectorTerms.getEnumerator();
        $('#ddlSubSector').empty();
        var cntSectors = sectorTerms.get_count();
        if (cntSectors > 0) {
            ddlSubSector.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlSubSector.append(option);
            }
            if (subSectorValue1)
                $("#ddlSubSector").val(subSectorValue1);
        }
        else {
            alert('No Sub Sectors for the selected Sector:' + selectedSector);
        }

    }
    catch (e) {
        alert('Error while fetching Sector Terms:' + e.message);
    }
}

function onSectorTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Sector Terms:' + args.get_message());
}

function onSectorTermSetTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Sector Terms Sets:' + args.get_message());
}

// Code for Sector1 Drop-down change Event to fetch Sub-Sectors
$(document).on('change', "#ddlSector1", function () {

    selectedSector1 = $(this).val();
    getSectors1TS(tsSector);
});
//Get Sector Term Set on selections
function getSectors1TS(termSetSectors) {
    sectorsTermSet1 = termSetSectors.get_terms();
    context.load(sectorsTermSet1);
    context.executeQueryAsync(onSector1TermSetLoaded, onSectorTermSetTaxonomyFailed);
}
function onSector1TermSetLoaded() {
    var tSetEnumerator = sectorsTermSet1.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentSectorTermSet = tSetEnumerator.get_current();
        var termSN = currentSectorTermSet.get_name();
        if (termSN == selectedSector1) {
            getSector1Terms(currentSectorTermSet);
        }
    }
}
function getSector1Terms(termSet) {
    sectorTerms1 = termSet.get_terms();
    context.load(sectorTerms1);
    context.executeQueryAsync(onSector1TermsLoaded, onSectorTermsTaxonomyFailed);
}
function onSector1TermsLoaded() {
    try {
        var termsEnumerator = sectorTerms1.getEnumerator();
        $('#ddlSubSector1').empty();
        var cntSectors = sectorTerms1.get_count();
        if (cntSectors > 0) {
            ddlSubSector1.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlSubSector1.append(option);
            }
            if (subSectorValue2)
                $("#ddlSubSector1").val(subSectorValue2);
        }
        else {
            alert('No Sub Sectors for the selected Sector:' + selectedSector1);
        }

    }
    catch (e) {
        alert('Error while fetching Sector Terms:' + e.message);
    }
}

// Code for Sector2 Drop-down change Event to fetch Sub-Sectors
$(document).on('change', "#ddlSector2", function () {

    selectedSector2 = $(this).val();
    getSectors2TS(tsSector);
});
//Get Sector Term Set on selections
function getSectors2TS(termSetSectors) {
    sectorsTermSet2 = termSetSectors.get_terms();
    context.load(sectorsTermSet2);
    context.executeQueryAsync(onSector2TermSetLoaded, onSectorTermSetTaxonomyFailed);
}
function onSector2TermSetLoaded() {
    var tSetEnumerator = sectorsTermSet2.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentSectorTermSet = tSetEnumerator.get_current();
        var termSN = currentSectorTermSet.get_name();
        if (termSN == selectedSector2) {
            getSector2Terms(currentSectorTermSet);
        }
    }
}
function getSector2Terms(termSet) {
    sectorTerms2 = termSet.get_terms();
    context.load(sectorTerms2);
    context.executeQueryAsync(onSector2TermsLoaded, onSectorTermsTaxonomyFailed);
}
function onSector2TermsLoaded() {
    try {
        var termsEnumerator = sectorTerms2.getEnumerator();
        $('#ddlSubSector2').empty();
        var cntSectors = sectorTerms2.get_count();
        if (cntSectors > 0) {
            ddlSubSector2.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlSubSector2.append(option);
            }
            if (subSectorValue3)
                $("#ddlSubSector2").val(subSectorValue3);
        }
        else {
            alert('No Sub Sectors for the selected Sector:' + selectedSector2);
        }

    }
    catch (e) {
        alert('Error while fetching Sector Terms:' + e.message);
    }
}

//========================================= [ Sector (Cascading Drop downs : Sector and Sub-Sectors) ]

//========================================= [ Evidence Project Stage ]

function getEvidenceStagesTerms(termSet) {
    epsTerms = termSet.get_terms();
    context.load(epsTerms);
    context.executeQueryAsync(onCheckBoxEPSLoad, onEPSTaxonomyFailed);
}

function onCheckBoxEPSLoad() {
    try {
        var termsEnumerator = epsTerms.getEnumerator();
        var currentEnum = 1;

        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var span = $("<span class='lblChk'/>");
            var chkDiv = $("<div class='chkBoxLabel'></div>");
            span.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            var inputCheckBox = $("<input type='checkbox' name='chkBoxListEPS' class='chkBoxListEPSClass'/>");
            inputCheckBox.attr("id", currentTerm.get_id());
            inputCheckBox.attr("value", currentTerm.get_name());
            span.text(currentTerm.get_name());
            if (currentEnum % 2 === 0) {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkEPSRight.append(chkDiv);
            }
            else {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkEPSLeft.append(chkDiv)
            }
            currentEnum = currentEnum + 1;
        }
    }
    catch (e) {
        alert('Error while loading Evidence Project Stage Terms:' + e.message);
    }
}

function onEPSTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    alert('Taxonomy Error while fetching Evidence Project Stage Terms:' + args.get_message());
}
//========================================= [ Evidence Project Stage ]

//========================================= [ Business Functions (Cascading Drop downs : Topic and Categories) ]
function getBusinessFunctionsTermSet(termSet) {
    businessTerms = termSet.get_terms();
    context.load(businessTerms);
    context.executeQueryAsync(onBusinessTermsLoaded, onBusinessTaxonomyFailed);
}

function onBusinessTermsLoaded() {
    try {
        var termsEnumerator = businessTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlBusinessFunctions.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Business Functions Terms:' + e.message);
    }
}

function onBusinessTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    alert('Taxonomy Error while fetching Business Functions Terms:' + args.get_message());
}

// Code for Region Drop-down change Event to fetch value in Topic drop down
$(document).on('change', "#ddlBusinessFunctions", function () {
    //Hide Controls related to Categories
    $('#categories').hide();
    isCategoriesEnable = false;

    selectedBusiness = $(this).val();
    getTopicTermSet(tsBusinessFunctions);
});

//Get Topics Term Set on selections
function getTopicTermSet(termSetBusinessFunctions) {
    businessFunctionTermSet = termSetBusinessFunctions.get_terms();
    context.load(businessFunctionTermSet);
    context.executeQueryAsync(onTopicTermSetLoaded, onTopicTermSetTaxonomyFailed);
}

function onTopicTermSetLoaded() {
    var tSetEnumerator = businessFunctionTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentBusinessTermSet = tSetEnumerator.get_current();
        var termSN = currentBusinessTermSet.get_name();
        if (termSN == selectedBusiness) {
            tsTopic = currentBusinessTermSet;
            getTopicsTerms(currentBusinessTermSet);
        }
    }
}

function getTopicsTerms(termSet) {
    topicTerms = termSet.get_terms();
    context.load(topicTerms);
    context.executeQueryAsync(onTopicTermsLoaded, onTopicTermsTaxonomyFailed);
}

function onTopicTermsLoaded() {
    try {
        var termsEnumerator = topicTerms.getEnumerator();
        $('#ddlTopic').empty();
        var cntTopic = topicTerms.get_count();
        if (cntTopic > 0) {
            ddlTopic.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlTopic.append(option);
            }
            if (topicValue) {
                $("#ddlTopic").val(topicValue);
                $("#ddlTopic").trigger('change');
            }
        }
        else {

            alert('No Topics for the selected Business Functions:' + selectedBusiness);
        }

    }
    catch (e) {
        alert('Error while fetching Areas Terms:' + e.message);
    }
}

function onTopicTermSetTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Topics Terms Sets:' + args.get_message());
}

function onTopicTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Topics Terms:' + args.get_message());
}

// Code for Topic Drop-down change Event to fetch values in Categories drop down
$(document).on('change', "#ddlTopic", function () {
    selectedTopic = $(this).val();
    getCategoriesTermSet(tsTopic);
});

function getCategoriesTermSet(termSet) {
    categoriesTermSet = termSet.get_terms();
    context.load(categoriesTermSet);
    context.executeQueryAsync(onCategoriesTermsSetLoaded, onCategoriesTermsSetTaxonomyFailed);
}

function onCategoriesTermsSetLoaded() {
    var tSetEnumerator = categoriesTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentCatergoryTermSet = tSetEnumerator.get_current();
        var termSN = currentCatergoryTermSet.get_name();
        if (termSN == selectedTopic) {
            tsCategory = currentCatergoryTermSet;
            getCategoryTerms(currentCatergoryTermSet);
        }
    }
}

function getCategoryTerms(termSet) {
    categoryTerms = termSet.get_terms();
    context.load(categoryTerms);
    context.executeQueryAsync(onCategoryTermsLoaded, onCategoryTermsTaxonomyFailed);
}

function onCategoryTermsLoaded() {
    try {
        var termsEnumerator = categoryTerms.getEnumerator();
        $('#ddlCategory1').empty();
        $('#ddlCategory2').empty();

        var cntCategories = categoryTerms.get_count();
        if (cntCategories > 0) {
            isCategoriesEnable = true;
            $('#categories').show();

            ddlCategory1.append($("<option/>").attr("value", 'default').text('Please select...'));
            ddlCategory2.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {

                //Category 1
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlCategory1.append(option);

                //Category 2
                var currentCategory1 = termsEnumerator.get_current();
                var optionCategory1 = $("<option/>");
                optionCategory1.attr("value", currentCategory1.get_name());
                optionCategory1.attr("id", currentCategory1.get_id()).text(currentCategory1.get_name());
                ddlCategory2.append(optionCategory1);

            }
            if (categoriesValue) {
                //Show Controls related to Categories
                $('#categories').show();
                var categoriesEnumerator = categoriesValue.getEnumerator();
                var categoryCnt = 0;
                while (categoriesEnumerator.moveNext()) {
                    var currentcategory = categoriesEnumerator.get_current();
                    if (categoryCnt == 0)
                        $("#ddlCategory1").val(currentcategory.get_label());
                    else if (categoryCnt == 1)
                        $("#ddlCategory2").val(currentcategory.get_label());
                    categoryCnt = categoryCnt + 1;
                }
            }
        }

    }
    catch (e) {
        alert('Error while fetching Categories Terms:' + e.message);
    }
}

function onCategoryTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Category Terms:' + args.get_message());
}

function onCategoriesTermsSetTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching Categories Terms Set:' + args.get_message());
}
//========================================= [ Business Functions (Cascading Drop downs : Topic and Categories) ]




//========================================= [ To Show Sectors ]
function enableSecondSector() {
    $('#sector2').show();
    isSecondSectorEnable = true;
}

function enableThirdSector() {
    $('#sector3').show();
    isThirdSectorEnable = true;
}
//========================================= [ To Show Sectors ]

//========================================= [ Get Parameter By Name ]
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
//========================================= [ Get Parameter By Name ]

//========================================= [ Load List Items by ID from the List 'Project Datasheet'  ]

function loadGenericEvidenceBite(listItemID) {
    var genericEBList = context.get_web().get_lists().getByTitle(listGenericEvidenceBite);
    listItem = genericEBList.getItemById(listItemID);
    context.load(listItem);
    context.executeQueryAsync(Function.createDelegate(this, this.onLoadListItemsSucceeded), Function.createDelegate(this, this.onLoadListItemsFailed));
}

function onLoadListItemsSucceeded() {

    
    $("#txtAuthor").val(listItem.get_item("Champion").get_lookupValue());

    //Locations
    if (!listItem.get_item("NonLocationSpecific")) {
        $('#locationInfo').show();
        isLocationSpecific = true;
        // Locations
        if (listItem.get_item('Project_x0020_Area'))
            areaValue = listItem.get_item('Project_x0020_Area').get_label();

        if (listItem.get_item('Project_x0020_Location'))
            locationValue = listItem.get_item('Project_x0020_Location').get_label();

        $("#ddlRegion").val(listItem.get_item('Project_x0020_Region').get_label());
        $("#ddlRegion").trigger('change');
    }
    else {
        $('#locationInfo').hide();
        isLocationSpecific = false;
        $("input[name=rbIsNonLocationSpecific][value='Yes']").attr('checked', 'checked');
    }

    //Sectors and Sub-sectors
    if (!listItem.get_item("NonSectorSpecific")) {
        $('#sectorInfo').show();
        isSectorSpecific = true;

        //Sector
        var mmdSector = listItem.get_item('Sector');
        var sectorEnumerator = mmdSector.getEnumerator();
        var sectorCnt = 0;
        while (sectorEnumerator.moveNext()) {
            var currentSector = sectorEnumerator.get_current();
            if (sectorCnt == 0) {
                $("#ddlSector").val(currentSector.get_label());
                $('#ddlSector').trigger('change');
            }
            else if (sectorCnt == 1) {
                $('#sector2').show();
                $("#ddlSector1").val(currentSector.get_label());
                $('#ddlSector1').trigger('change');
            }
            else if (sectorCnt == 2) {
                $('#sector3').show();
                $("#ddlSector2").val(currentSector.get_label());
                $('#ddlSector2').trigger('change');
            }

            sectorCnt = sectorCnt + 1;
        }

        //Sub-Sector
        var mmdSubSector = listItem.get_item('Subsector');
        var subSectorEnumerator = mmdSubSector.getEnumerator();
        var subSectorCnt = 0;
        while (subSectorEnumerator.moveNext()) {
            var currentSubSector = subSectorEnumerator.get_current();
            if (subSectorCnt == 0) {
                subSectorValue1 = currentSubSector.get_label();
                $('#ddlSubSector').trigger('change');
            }
            else if (subSectorCnt == 1) {
                subSectorValue2 = currentSubSector.get_label();
                $('#ddlSubSector1').trigger('change');
            }
            else if (subSectorCnt == 2) {
                subSectorValue3 = currentSubSector.get_label();
                $('#ddlSubSector2').trigger('change');
            }
            subSectorCnt = subSectorCnt + 1;
        }
    }
    else {
        $('#sectorInfo').hide();
        isSectorSpecific = false;
        $("input[name=rbIsNonSectorSpecific][value='Yes']").attr('checked', 'checked');
    }

    //EVIDENCE BITE Section
    //Evidence Project Stage
    var mmdEPS = listItem.get_item('EvidenceProjectStage');
    if (mmdEPS != null) {
        var EPSEnumerator = mmdEPS.getEnumerator();
        while (EPSEnumerator.moveNext()) {
            var currentEPS = EPSEnumerator.get_current();
            $("input[name=chkBoxListEPS][value='" + currentEPS.get_label() + "']").attr('checked', 'checked');
        }
    }
    $("#ddlBusinessFunctions").val(listItem.get_item('Business_x0020_Function').get_label());
    $('#ddlBusinessFunctions').trigger('change');
    topicValue = listItem.get_item('Topic').get_label();
    categoriesValue = listItem.get_item('Business_x0020_Categories');

    $("#txtHeading").val(listItem.get_item('Evidence_x0020_Bite_x0020_Headli'));
    $("textarea#txtDescription").val(listItem.get_item('Evidence_x0020_Bite_x0020_Descri'));
    $("textarea#txtBenefits").val(listItem.get_item('Evidence_x0020_Bite_x0020_Benefi'));

    //EVIDENCE BITE Section

}

function onLoadListItemsFailed(sender, args) {
	LogError(args);
    alert('Request failed on Load List Items. \nError: ' + args.get_message());
}
//========================================= [ Load List Items by ID from the List 'Project Datasheet'  ]