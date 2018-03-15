// Code to fetch master data and to insert date in "Project Datasheet" List
function loadMasterData() {

    // to display logged in User name.
    $('#txtAuthor').attr("value", user.get_title());

    //Hide Controls related to Project Value and Planned Dates
    $('#valueCheck').hide();
    $('#extensionCheck').hide();

    //Hide Controls related to Testimonials
    $('#secondTestimonals').hide();
    $('#thirdTestimonals').hide();
    $('#fourthTestimonals').hide();
    $('#fifthTestimonals').hide();

    //Hide Controls related to Awards
    $('#secondAward').hide();
    $('#thirdAward').hide();
    $('#fourthAward').hide();
    $('#fifthAward').hide();

    //Hide Controls related to Testimonials
    $('#sector2').hide();
    $('#sector3').hide();


    // Get string array of possible choices (but NOT fill-in choices)
    internalJVChoices = internalJVField.get_choices();
    for (var cnt = 0; cnt < internalJVChoices.length; cnt++) {
        var option = $("<option/>");
        option.attr("value", internalJVChoices[cnt]);
        option.attr("id", 'ddlInternalJV' + cnt).text(internalJVChoices[cnt]);
        ddlInternalJV.append(option);
    }

    while (termSetEnumerator.moveNext()) {
        var currentTermSet = termSetEnumerator.get_current();
        var termSetName = currentTermSet.get_name();

        // Code for 'Project Stage' Term Set
        if (termSetName == tsNameProjectStage) {
            getPSTerms(currentTermSet);
        }
            // Code for 'Delivery Regions' Term Set
        else if (termSetName == tsNameDeliveryRegion) {
            getDRTerms(currentTermSet);
        }
            // Code for 'Locations' Term Set
        else if (termSetName == tsNameLocations) {
            tsLocations = currentTermSet;
            getLocationsTerms(currentTermSet);
        }
            // Code for 'Sectors' Term Set
        else if (termSetName == tsNameSector) {
            tsSector = currentTermSet;
            getSectorsTermSet(currentTermSet);
        }
            //Form of Procurement
        else if (termSetName == tsNameFOP) {
            tsFOPS = currentTermSet;
            getFOPSTermSet(currentTermSet);
        }
            // Code for 'Form of Contract' Term Set
        else if (termSetName == tsNameFOC) {
            getFOCTerms(currentTermSet);
        }
            // Code for 'Design Stages' Term Set
        else if (termSetName == tsNameDS) {
            getDSTerms(currentTermSet);
        }
            // Code for 'Works Description' Term Set
        else if (termSetName == tsNameWD) {
            getWDTerms(currentTermSet);
        }
            // Code for 'Scope of Services' Term Set
        else if (termSetName == tsNameScopeKI) {
            getScopeKITerms(currentTermSet);
        }
            // Code for 'BREEAM/ DREAM Rating' Term Set
        else if (termSetName == tsNameBREEAM) {
            getBREEAMTerms(currentTermSet);
        }
			// Code for 'CEEQUAL' Term Set
		else if (termSetName == tsCEEQUALRating) {
            getCEEQUALTerms(currentTermSet);
        }
            //Code for 'EPC rating' Term Set
        else if (termSetName == tsNameEPCRating) {
            getEPCRatingTerms(currentTermSet);
        }
		else if (termSetName == tsNameFundingSector) {		
            getFundingSectorTerms(currentTermSet);
        }
    }
}

//========================================= [ Project Stage ]
function getPSTerms(termSet) {
    psTerms = termSet.get_terms();
    context.load(psTerms);
    context.executeQueryAsync(onPSTermsLoaded, onPSTaxonomyFailed);
}

function onPSTermsLoaded() {
    try {
        var termsEnumerator = psTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlStageOfProject.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Project Stage Terms:' + e.message);
    }

}

function onPSTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching Project Stage Terms:' + args.get_message());
}

// Code for 'Stage of Project' Drop-down change Event to stored the selected value
$(document).on('change', "#ddlStageOfProject", function () {
    selectedSoP = $(this).val();
    if (selectedSoP == construction || selectedSoP == postHandover) {
        $("#asteriskFOP").show();
        $("#asteriskFOC").show();
        $("#asteriskDSA").show();
		$("#asteriskPreConDur").show();
		$("#asteriskDM").show();
		$(".asteriskDesignSC").show();
        if (selectedSoP == postHandover) {
            $("#asteriskCCValue").show();
            $("#asteriskACDate").show();
            $("#asteriskClientReferences").show();
			$(".asteriskProjectData").show();
        }
        else {
            $("#asteriskCCValue").hide();
            $("#asteriskACDate").hide();
            $("#asteriskClientReferences").hide();
			$(".asteriskProjectData").hide();
        }
        $("#asteriskPCDate").show();
        $("#asteriskASDate").show();

        $("#asteriskPD").show();
        $("#asteriskWD").show();
        $("#asteriskQS").show();
        $("#asteriskPCM").show();
        $("#asteriskKI").show();
    }
    else {
        // $("#asteriskFOP").hide();
        // $("#asteriskFOC").hide();
        // $("#asteriskDSA").hide();
		$(".asteriskProjectData").hide();
		$(".asteriskDesignSC").hide();
		$("#asteriskDM").hide();
		$("#asteriskPreConDur").hide();
        $("#asteriskCCValue").hide();
        $("#asteriskPCDate").hide();
        $("#asteriskASDate").hide();
        $("#asteriskACDate").hide();
        $("#asteriskPD").hide();
        $("#asteriskWD").hide();
        $("#asteriskQS").hide();
        $("#asteriskPCM").hide();
        $("#asteriskKI").hide();
        $("#asteriskClientReferences").hide();
    }
});

//========================================= [ Project Stage ]


//========================================= [ Delivery Regions ]
function getDRTerms(termSet) {
    drTerms = termSet.get_terms();
    context.load(drTerms);
    context.executeQueryAsync(onDRTermsLoaded, onDRTaxonomyFailed);
}

function onDRTermsLoaded() {
    try {
        var termsEnumerator = drTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlDeliveryRegion.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Delivery Regions Terms:' + e.message);
    }
}

function onDRTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching Delivery Regions Terms:' + args.get_message());
}
//========================================= [ Delivery Regions ]


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
    //alert('Taxonomy Error while fetching Locations Terms:' + args.get_message());
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
    //alert('Taxonomy Error while fetching Sector Term Sets:' + args.get_message());
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

//========================================= [ Form of Procurement (Cascading Drop downs) ]

function getFOPSTermSet(termSet) {
    FOPSTerms = termSet.get_terms();
    context.load(FOPSTerms);
    context.executeQueryAsync(onFOPSTermSetLoaded, onFOPSTermSetTaxonomyFailed);
}

function onFOPSTermSetLoaded() {
    try {
        var termsEnumerator = FOPSTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlProcurement.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching FOPS Terms Sets:' + e.message);
    }
}

function onFOPSTermSetTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching FOPS Term Sets:' + args.get_message());
}

// Code for ddlProcurement Drop-down change Event to fetch FOP
$(document).on('change', "#ddlProcurement", function () {
    selectedFOP = $(this).val();
    getFOPTS(tsFOPS);
});

//Get Sector Term Set on selections
function getFOPTS(termSetSectors) {
    FOPTermSet = termSetSectors.get_terms();
    context.load(FOPTermSet);
    context.executeQueryAsync(onFOPTermSetLoaded, onFOPTermSetTaxonomyFailed);
}

function onFOPTermSetLoaded() {
    var tSetEnumerator = FOPTermSet.getEnumerator();

    while (tSetEnumerator.moveNext()) {
        var currentFOPTermSet = tSetEnumerator.get_current();
        var termSN = currentFOPTermSet.get_name();
        if (termSN == selectedFOP) {
            getFOPTerms(currentFOPTermSet);
        }
    }
}

function getFOPTerms(termSet) {
    FOPTerms = termSet.get_terms();
    context.load(FOPTerms);
    context.executeQueryAsync(onFOPTermsLoaded, onFOPTermsTaxonomyFailed);
}

function onFOPTermsLoaded() {
    try {
        var termsEnumerator = FOPTerms.getEnumerator();
        $('#ddlSubProcurement').empty();
        var cntProcurement = FOPTerms.get_count();
        if (cntProcurement > 0) {
            ddlSubProcurement.append($("<option/>").attr("value", 'default').text('Please select...'));
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var option = $("<option/>");
                option.attr("value", currentTerm.get_name());
                option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
                ddlSubProcurement.append(option);
            }
        }
        else {
            alert('No Areas for the selected Procurement:' + selectedFOP);
        }

    }
    catch (e) {
        alert('Error while fetching Sector Terms:' + e.message);
    }
}

function onFOPTermsTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching FOP Terms:' + args.get_message());
}

function onFOPTermSetTaxonomyFailed(sender, args) {
	LogError(args);
    alert('Taxonomy Error while fetching FOP Terms Set:' + args.get_message());
}

//========================================= [ Form of Procurement (Cascading Drop downs) ]

//========================================= [ Form of Contract ]

function getFOCTerms(termSet) {
    FOCTerms = termSet.get_terms();
    context.load(FOCTerms);
    context.executeQueryAsync(onFOCTermsLoaded, onFOCTaxonomyFailed);
}

function onFOCTermsLoaded() {
    try {
        var termsEnumerator = FOCTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlContract.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Form of Contract Terms:' + e.message);
    }

}

function onFOCTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching Form of Contract Terms:' + args.get_message());
}

//========================================= [ Form of Contract ]

//========================================= [ Design Stages ]

function getDSTerms(termSet) {
    dsTerms = termSet.get_terms();
    context.load(dsTerms);
    context.executeQueryAsync(onDSTermsLoaded, onDSTaxonomyFailed);
}

function onDSTermsLoaded() {
    try {
        var termsEnumerator = dsTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlAppointment.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching Design Stages Terms:' + e.message);
    }

}

function onDSTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching Design Stages Terms:' + args.get_message());
}

//========================================= [ Design Stages ]

//========================================= [ Works Description ]

function getWDTerms(termSet) {
    wdTerms = termSet.get_terms();
    context.load(wdTerms);
    context.executeQueryAsync(onCheckBoxWDLoad, onWDTaxonomyFailed);
}

function onCheckBoxWDLoad() {
    try {
        var termsEnumerator = wdTerms.getEnumerator();
        var currentEnum = 1;
        // var enumCnt = wdTerms.get_count();

        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var span = $("<span class='lblChk'/>");
            var chkDiv = $("<div class='chkBoxLabel'></div>");
            span.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            var inputCheckBox = $("<input type='checkbox' name='chkBoxListWD' class='chkBoxListWDClass'/>");
            inputCheckBox.attr("id", currentTerm.get_id());
            inputCheckBox.attr("value", currentTerm.get_name());
            span.text(currentTerm.get_name());//chkKIRight
            if (currentEnum % 2 === 0) {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkWDRight.append(chkDiv);

            }
            else {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkWDLeft.append(chkDiv)
            }
            currentEnum = currentEnum + 1;
        }
    }
    catch (e) {
        alert('Error while loading Works Description Terms:' + e.message);
    }
}

function onWDTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching Works Description Terms:' + args.get_message());
}
//========================================= [ Works Description ]

//========================================= [ Scope of Services ]

function getScopeKITerms(termSet) {
    scopeKITerms = termSet.get_terms();
    context.load(scopeKITerms);
    context.executeQueryAsync(onCheckBoxScopeKILoad, onScopeKITaxonomyFailed);
}

function onCheckBoxScopeKILoad() {
    try {
        var termsEnumerator = scopeKITerms.getEnumerator();
        var currentEnum = 1;
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var span = $("<span class='lblChk'/>");
            var chkDiv = $("<div class='chkBoxLabel'></div>");
            span.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            var inputCheckBox = $("<input type='checkbox' name='chkBoxListScopeKI' class='chkBoxListScopeKIClass' />");
            inputCheckBox.attr("id", currentTerm.get_id());
            inputCheckBox.attr("value", currentTerm.get_name());
            span.text(currentTerm.get_name());//chkKIRight
            if (currentEnum % 2 === 0) {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkKIRight.append(chkDiv);

            }
            else {
                chkDiv.append(inputCheckBox);
                chkDiv.append(span);
                chkKILeft.append(chkDiv)
            }
            currentEnum = currentEnum + 1;
        }
    }
    catch (e) {
        alert('Error while loading Scope of Services Terms:' + e.message);
    }
}

function onScopeKITaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    // alert('Taxonomy Error while fetching Scope of Services Terms:' + args.get_message());
}

//========================================= [ Scope of Services ]

//========================================= [ BREEAM/ DREAM Rating for Pre-Construction BREEAM/DREAM rating and Handover BREEAM/DREAM rating ]

function getBREEAMTerms(termSet) {
    breeamTerms = termSet.get_terms();
    context.load(breeamTerms);
    context.executeQueryAsync(onBREEAMTermsLoaded, onBREEAMTaxonomyFailed);
}

function onBREEAMTermsLoaded() {
    try {
        var termsEnumerator = breeamTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {

            //Pre-Construction BREEAM/DREAM rating
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlPreConstructionRating.append(option);

            //Handover BREEAM/DREAM rating
            var currentTermHandover = termsEnumerator.get_current();
            var optionHandover = $("<option/>");
            optionHandover.attr("value", currentTermHandover.get_name());
            optionHandover.attr("id", currentTermHandover.get_id()).text(currentTermHandover.get_name());
            ddlHandoverRating.append(optionHandover);
			
        }
    }
    catch (e) {
        alert('Error while fetching BREEAM / DREAM Rating Terms:' + e.message);
    }

}

function onBREEAMTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching BREEAM / DREAM Rating Terms:' + args.get_message());
}

//========================================= [ BREEAM/ DREAM Rating for Pre-Construction BREEAM/DREAM rating and Handover BREEAM/DREAM rating ]

//========================================= [ EPC rating ]
function getEPCRatingTerms(termSet) {
    EPCRatingTerms = termSet.get_terms();
    context.load(EPCRatingTerms);
    context.executeQueryAsync(onEPCRatingTermsLoaded, onEPCRatingTaxonomyFailed);
}

function onEPCRatingTermsLoaded() {
    try {
        var termsEnumerator = EPCRatingTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlEPCRating.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching EPC rating Terms:' + e.message);
    }

}

function onEPCRatingTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching EPC rating Terms:' + args.get_message());
}
//========================================= [ EPC rating ]


//========================================= [ Controls Events ]
$(document).on('change paste', "#txtCompletionValue", function () {
	if ($("#txtAwardValue").val()-$("#txtCompletionValue").val()<0) {
        $('#valueCheck').show();
    }
    else {
        $('#valueCheck').hide();
    }
});
$(document).on('change paste', "#txtAwardValue", function () {
	if ($("#txtAwardValue").val()-$("#txtCompletionValue").val()<0) {
        $('#valueCheck').show();
    }
    else {
        $('#valueCheck').hide();
    }
});

//========================================= [ Controls Events ]

//========================================= [ To Show Testimonials ]
function enableSecondTestimonials() {
    $('#secondTestimonals').show();
    isSecondTestimonialEnable = true;
}

function enableThirdTestimonials() {
    $('#thirdTestimonals').show();
    isThirdTestimonialEnable = true;
}

function enableFourthTestimonials() {
    $('#fourthTestimonals').show();
    isFourthTestimonialEnable = true;
}

function enableFifthTestimonials() {
    $('#fifthTestimonals').show();
    isFifthTestimonialEnable = true;
}
//========================================= [ To Show Testimonials ]

//========================================= [ To Show Awards ]
function enableSecondAward() {
    $('#secondAward').show();
    isSecondAwardEnable = true;
}

function enableThirdAward() {
    $('#thirdAward').show();
    isThirdAwardEnable = true;
}

function enableFourthAward() {
    $('#fourthAward').show();
    isFourthAwardEnable = true;
}

function enableFifthAward() {
    $('#fifthAward').show();
    isFifthAwardEnable = true;
}
//========================================= [ To Show Awards ]

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

//========================================= [ Funding Sector ]
function getFundingSectorTerms(termSet) {
    FundingSectorTerms = termSet.get_terms();
    context.load(FundingSectorTerms);
    context.executeQueryAsync(onFundingSectorTermsLoaded, onFundingSectorTaxonomyFailed);
}

function onFundingSectorTermsLoaded() {
    try {
        var termsEnumerator = FundingSectorTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {
            var currentTerm = termsEnumerator.get_current();
            var option = $("<option/>");
            option.attr("value", currentTerm.get_name());
            option.attr("id", currentTerm.get_id()).text(currentTerm.get_name());
            ddlFundingSector.append(option);
        }
    }
    catch (e) {
        alert('Error while fetching EPC rating Terms:' + e.message);
    }

}

function onFundingSectorTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching EPC rating Terms:' + args.get_message());
}
//========================================= [ Funding Sector ]


//========================================= [ CEEQUAL Term set for CEEQUAL rating ]

function getCEEQUALTerms(termSet) {
    CEEQUALTerms = termSet.get_terms();
    context.load(CEEQUALTerms);
    context.executeQueryAsync(onCEEQUALTermsLoaded, onCEEQUALTaxonomyFailed);
}

function onCEEQUALTermsLoaded() {
    try {
        var termsEnumerator = CEEQUALTerms.getEnumerator();
        while (termsEnumerator.moveNext()) {       
			
			
			//CEEQUAL rating
            var currentTermHandover = termsEnumerator.get_current();
            var optionCEEQUAL = $("<option/>");
            optionCEEQUAL.attr("value", currentTermHandover.get_name());
            optionCEEQUAL.attr("id", currentTermHandover.get_id()).text(currentTermHandover.get_name());
            ddlCEEQUALRating.append(optionCEEQUAL);
			
			
        }
    }
    catch (e) {
        alert('Error while fetching BREEAM / DREAM Rating Terms:' + e.message);
    }

}

function onCEEQUALTaxonomyFailed(sender, args) {
	window.location.href=window.location.href;
	LogError(args);
    //alert('Taxonomy Error while fetching BREEAM / DREAM Rating Terms:' + args.get_message());
}

//========================================= [ CEEQUAL Term set for CEEQUAL rating ]
