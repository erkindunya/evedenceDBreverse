// Code to fetch master data and to insert date in "Project Datasheet" List
var testimonialsControl =''
function loadMasterData() {

    // to display logged in User name.
    //$('#txtAuthor').attr("value", user.get_title());

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

    //Hide Controls related to Categories
    $('#categories').hide();

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
    projectDatasheetID = getParameterByName('ID');
    if (projectDatasheetID)
	{
        loadProjectDatasheet(projectDatasheetID);
		testimonialsControl='AllfilesOfTestimonial1'
		BindProjectDocuments(projectDatasheetID,'Testimonial 1');
		testimonialsControl='AllfilesOfTestimonial2'
		BindProjectDocuments(projectDatasheetID,'Testimonial 2');
		testimonialsControl='AllfilesOfTestimonial3'
		BindProjectDocuments(projectDatasheetID,'Testimonial 3');
		testimonialsControl='AllfilesOfTestimonial4'
		BindProjectDocuments(projectDatasheetID,'Testimonial 4');
		testimonialsControl='AllfilesOfTestimonial5'
		BindProjectDocuments(projectDatasheetID,'Testimonial 5');
	}
    else
        alert('Invalid Project Datasheet ID.');
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
    alert('Taxonomy Error while fetching Project Stage Terms:' + args.get_message());
}
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
    alert('Taxonomy Error while fetching Delivery Regions Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching FOPS Term Sets:' + args.get_message());
}

// Code for ddlProcurement Drop-down change Event to fetch FOP
$(document).on('change', "#ddlProcurement", function () {
    selectedFOP = $(this).val();
    getFOPTS(tsFOPS);
});

//Get FOP Term Set on selections
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
            if (procurementSubTypeValue)
                $("#ddlSubProcurement").val(procurementSubTypeValue);
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
    alert('Taxonomy Error while fetching Form of Contract Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching Design Stages Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching Works Description Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching Scope of Services Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching BREEAM / DREAM Rating Terms:' + args.get_message());
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
    alert('Taxonomy Error while fetching EPC rating Terms:' + args.get_message());
}
//========================================= [ EPC rating ]

//========================================= [ Controls Events ]
$(document).on('change paste', "#txtCompletionValue", function () {
    if ($("#txtCompletionValue").val() > $("#txtAwardValue").val()) {
        $('#valueCheck').show();
    }
    else {
        $('#valueCheck').hide();
    }
});
//========================================= [ Controls Events ]

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

//========================================= [ Load List Items by ID from the List 'Project Datasheet'  ]

function loadProjectDatasheet(listItemID) {
    var projectDataSheetList = context.get_web().get_lists().getByTitle(listProjectDatasheet);
    listItem = projectDataSheetList.getItemById(listItemID);
    context.load(listItem);
    context.executeQueryAsync(Function.createDelegate(this, this.onLoadListItemsSucceeded), Function.createDelegate(this, this.onLoadListItemsFailed));
}

function onLoadListItemsSucceeded() {

    $(".projectAuthor :input").attr("disabled", true);
    $(".projectInfo :input").attr("disabled", true);
    $(".valuesInfo :input").attr("disabled", true);
    $(".projectDesc :input").attr("disabled", true);
    $(".teamInfo :input").attr("disabled", true);
    $(".projectData :input").attr("disabled", true);
    $(".testimonials :input").attr("disabled", true);
    $(".awards :input").attr("disabled", true);
    $(".formButtons :input").attr("disabled", false);

    $("#txtAuthor").val(listItem.get_item("Champion").get_lookupValue());
    if (listItem.get_item('CRM_x0020_Opportunity_x0020_Auth0'))
        $("#ppCRMAuthor").val(listItem.get_item('CRM_x0020_Opportunity_x0020_Auth0').get_lookupValue());

    $("#ddlStageOfProject").val(listItem.get_item("Stage_x0020_of_x0020_Project").get_label());

    $("#txtTitle").val(listItem.get_item("Title"));
	
	//Added on 10-04-2015 to show PD title on Edit form
	$('#PDTitle').text(listItem.get_item("Title"));
	//Added on 10-04-2015 to show PD title on Edit form
	
    if (listItem.get_item("Otherwise_x0020_known_x0020_as"))
        $("#txtOtherwise").val(listItem.get_item("Otherwise_x0020_known_x0020_as"));

    $("#txtContractNumber").val(listItem.get_item("Contract_x0020_Number"));
    $("#txtClient").val(listItem.get_item("Client"));
	if(listItem.get_item("Kier_x0020_Delivery_x0020_Region"))
		$("#ddlDeliveryRegion").val(listItem.get_item("Kier_x0020_Delivery_x0020_Region").get_label());
	
	//External JV
	var isExternal=listItem.get_item("IsExternalJV");
	if(isExternal==1)
		$("#ddlExternalJV").val('Yes');
	else if(isExternal==0)
		$("#ddlExternalJV").val('No');
 
	 if (listItem.get_item("External_x0020_JV"))
	 {
		$("#txtExternal").val(listItem.get_item("External_x0020_JV"));
		$('#externalDiv').show();
	 }
	 
    if (listItem.get_item("Internal_x0020_JV"))
        $("#ddlInternalJV").val(listItem.get_item("Internal_x0020_JV"));

    // Locations
    if (listItem.get_item('Project_x0020_Area')) {
        areaValue = listItem.get_item('Project_x0020_Area').get_label();
    }

    if (listItem.get_item('Project_x0020_Location'))
        locationValue = listItem.get_item('Project_x0020_Location').get_label();
	if(listItem.get_item('Project_x0020_Region'))
	{
		$("#ddlRegion").val(listItem.get_item('Project_x0020_Region').get_label());
		$("#ddlRegion").trigger('change');
	}


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

    // Form of Procurement and Form of Procurement Subtype
    var mmdFoP = listItem.get_item('Form_x0020_of_x0020_Procurement');
    if (mmdFoP != null) {
        var FoPEnumerator = mmdFoP.getEnumerator();
        while (FoPEnumerator.moveNext()) {
            var currentFoP = FoPEnumerator.get_current();
            $("#ddlProcurement").val(currentFoP.get_label());
        }
        if (listItem.get_item('FormofProcurementSubType'))
            procurementSubTypeValue = listItem.get_item('FormofProcurementSubType').get_label();
        $('#ddlProcurement').trigger('change');
    }
	
	if(listItem.get_item('Other_x0020_of_x0020_Form_x0020_'))
	{
		$('.OtherTxt').show();
		$('#txtFormOfProcurementOther').val(listItem.get_item('Other_x0020_of_x0020_Form_x0020_'));
	}
	
    //Form of Contract
    if (listItem.get_item('Form_x0020_of_x0020_Contract') != null)
        $("#ddlContract").val(listItem.get_item('Form_x0020_of_x0020_Contract').get_label());

    //Design Stage at Appointment
    if (listItem.get_item('Design_x0020_Stage_x0020_at_x002') != null)
        $("#ddlAppointment").val(listItem.get_item('Design_x0020_Stage_x0020_at_x002').get_label());

    var awardValue = listItem.get_item("Value_x0020_at_x0020_award");
    var completionValue = listItem.get_item("Value_x0020_at_x0020_completion");
    //Value (at contract award)
    $("#txtAwardValue").val(awardValue);

    //Value (at contract completion)
	 $("#txtCompletionValue").val(completionValue);
    if (completionValue) {
       

        if (awardValue-completionValue <0 ) {
            $('#valueCheck').show();
            if (listItem.get_item("Agreed_x0020_cost_x0020_variance"))
                $("input[name=rbAgreedCostVariance][value='Yes']").attr('checked', 'checked');
            //Reason for agreed change
            $("textarea#txtReasonForAgreed").val(listItem.get_item("Reason_x0020_for_x0020_agreed_x0"));
        }
    }
	
    //Planned start on site date
    $("#dtPlannedStartDate").datepicker("setDate", new Date(Date.parse(listItem.get_item('Planned_x0020_start_x0020_on_x00'))));

    //Planned completion date
    if (listItem.get_item('Planned_x0020_completion_x0020_d') != null)
        $("#dtPlannedCompletionDate").datepicker("setDate", new Date(Date.parse(listItem.get_item('Planned_x0020_completion_x0020_d'))));

    //Actual start on site date
    if (listItem.get_item('Actual_x0020_start_x0020_on_x002') != null)
        $("#dtActualStartDate").datepicker("setDate", new Date(Date.parse(listItem.get_item('Actual_x0020_start_x0020_on_x002'))));

    //Actual completion on site date
    if (listItem.get_item('Actual_x0020_completion_x0020_da') != null)
        $("#dtActualCompletionDate").datepicker("setDate", new Date(Date.parse(listItem.get_item('Actual_x0020_completion_x0020_da'))));

    //Pre-Construction duration
    if (listItem.get_item('Pre_x002d_Construction_x0020_Dur') != null)
        $("#txtPreConstructionduration").val(listItem.get_item('Pre_x002d_Construction_x0020_Dur'));

    if (listItem.get_item('Reason_x0020_for_x0020_extension') != null) {
        $('#extensionCheck').show();
        if (listItem.get_item("Extension_x0020_of_x0020_time_x0"))
            $("input[name=rbAgreedExtension][value='Yes']").attr('checked', 'checked');
        //Reason for agreed change
        $("textarea#txtReasonForExtension").val(listItem.get_item("Reason_x0020_for_x0020_extension"));
    }

    $("textarea#txtProjectDescription").val(listItem.get_item("Project_x0020_Description"));

    //Work Description
    var mmdWD = listItem.get_item('Work_x0020_Description');
    if (mmdWD != null) {
        var WDEnumerator = mmdWD.getEnumerator();
        while (WDEnumerator.moveNext()) {
            var currentWD = WDEnumerator.get_current();
            $("input[name=chkBoxListWD][value='" + currentWD.get_label() + "']").attr('checked', 'checked');
        }
    }

    //Bid Lead
    if (listItem.get_item('Bid_x0020_Lead') != null)
        $("#ppBidLead").val(listItem.get_item("Bid_x0020_Lead").get_lookupValue());

    //QS / Commercial Manager
    if (listItem.get_item('QS_x0020__x002F__x0020_Commercia') != null)
        $("#ppCommercialManager").val(listItem.get_item("QS_x0020__x002F__x0020_Commercia").get_lookupValue());

    //Project / Contracts Manager
    if (listItem.get_item('Project_x0020__x002F__x0020_Cont') != null)
        $("#ppContractsManager").val(listItem.get_item("Project_x0020__x002F__x0020_Cont").get_lookupValue());

    //Design Manager
    if (listItem.get_item('Design_x0020_Manager') != null)
        $("#ppDesignManager").val(listItem.get_item("Design_x0020_Manager").get_lookupValue());

    //'Scope of Kier Involvement'
    var mmdSKI = listItem.get_item('Scope_x0020_of_x0020_Kier_x0020_');
    if (mmdSKI!=null) {
        var SKIEnumerator = mmdSKI.getEnumerator();
        while (SKIEnumerator.moveNext()) {
            var currentSKI = SKIEnumerator.get_current();
            $("input[name=chkBoxListScopeKI][value='" + currentSKI.get_label() + "']").attr('checked', 'checked');
        }
    }

    //Architect
    if (listItem.get_item('Architect'))
        $("#txtArchitect").val(listItem.get_item('Architect'));
    if (listItem.get_item('Architect_x0020_Novated'))
        $('#chkArchitectN').prop('checked', true);
    if (listItem.get_item('Architect_x0020__x0020_Client_x0'))
        $('#chkArchitectCT').prop('checked', true);
	if (listItem.get_item('Architect_x0020_Not_x0020_applic'))
        $('#chkArchitectNA').prop('checked', true);

    //Acoustician
    if (listItem.get_item('Acoustician'))
        $("#txtAcoustician").val(listItem.get_item('Acoustician'));
    if (listItem.get_item('Acoustician_x0020_Novated'))
        $('#chkAcousticianN').prop('checked', true);
    if (listItem.get_item('Acoustician_x0020__x0020_Client_'))
        $('#chkAcousticianCT').prop('checked', true);
	if (listItem.get_item('Structural_x0020__x0026__x0020_C2'))
        $('#chkAcousticianNA').prop('checked', true);

    //Structural & Civil Eng
    if (listItem.get_item('Structural_x0020__x0026__x0020_C1'))
        $("#txtStructural").val(listItem.get_item('Structural_x0020__x0026__x0020_C1'));
    if (listItem.get_item('Structural_x0020__x0026__x0020_C0'))
        $('#chkStructuralN').prop('checked', true);
    if (listItem.get_item('Structural_x0020__x0026__x0020_C'))
        $('#chkStructuralCT').prop('checked', true);
	if (listItem.get_item('Structural_x0020__x0026__x0020_C2'))
        $('#chkStructuralNA').prop('checked', true);

    //FF+E
    if (listItem.get_item('FF_x002B_E'))
        $("#txtFFE").val(listItem.get_item('FF_x002B_E'));
    if (listItem.get_item('FF_x002B_E_x0020_Novated'))
        $('#chkFFEN').prop('checked', true);
    if (listItem.get_item('FF_x002B_E_x0020__x0020_Client_x'))
        $('#chkFFECT').prop('checked', true);
	if (listItem.get_item('FF_x002B_E_x0020_Not_x0020_appli'))
        $('#chkFFENA').prop('checked', true);

    //M+E Engineering
    if (listItem.get_item('M_x002B_E_x0020_Engineering'))
        $("#txtME").val(listItem.get_item('M_x002B_E_x0020_Engineering'));
    if (listItem.get_item('M_x002B_E_x0020_Engineering_x0020'))
        $('#chkMEN').prop('checked', true);
    if (listItem.get_item('M_x002B_E_x0020_Engineering_x002'))
        $('#chkMECT').prop('checked', true);
	if (listItem.get_item('M_x002B_E_x0020_Engineering_x0021'))
        $('#chkMENA').prop('checked', true);

    //ICT
    if (listItem.get_item('ICT'))
        $("#txtICT").val(listItem.get_item('ICT'));
    if (listItem.get_item('ICT_x0020_Novated'))
        $('#chkICTN').prop('checked', true);
    if (listItem.get_item('ICT_x0020__x0020_Client_x0020_Te'))
        $('#chkICTCT').prop('checked', true);
	if (listItem.get_item('ICT_x0020_Not_x0020_applicable'))
        $('#chkICTNA').prop('checked', true);

    //Cost Advisors
    if (listItem.get_item('Cost_x0020_Advisiors'))
        $("#txtCostAdvisiors").val(listItem.get_item('Cost_x0020_Advisiors'));
    if (listItem.get_item('Cost_x0020_Advisiors_x0020_Novat'))
        $('#chkCostAdvisiorsN').prop('checked', true);
    if (listItem.get_item('Cost_x0020_Advisiors_x0020__x002'))
        $('#chkCostAdvisiorsCT').prop('checked', true);
	if (listItem.get_item('Cost_x0020_Advisors_x0020_Not_x0'))
        $('#chkCostAdvisiorsNA').prop('checked', true);

    //Planning Consultant
    if (listItem.get_item('Planning_x0020_Consultant'))
        $("#txtPlanningConsultant").val(listItem.get_item('Planning_x0020_Consultant'));
    if (listItem.get_item('Planning_x0020_Consultant_x0020_0'))
        $('#chkPlanningConsultantN').prop('checked', true);
    if (listItem.get_item('Planning_x0020_Consultant_x0020_'))
        $('#chkPlanningConsultantCT').prop('checked', true);
    if (listItem.get_item('Planning_x0020_Consultant_x0020_1'))
        $('#chkPlanningConsultantNA').prop('checked', true);
    //M+E Installers
    if (listItem.get_item('M_x002B_E_x0020_Installers'))
        $("#txtMEInstallers").val(listItem.get_item('M_x002B_E_x0020_Installers'));
    if (listItem.get_item('M_x002B_E_x0020_Installers_x00200'))
        $('#chkMEInstallersN').prop('checked', true);
    if (listItem.get_item('M_x002B_E_x0020_Installers_x0020'))
        $('#chkMEInstallersCT').prop('checked', true);
	if (listItem.get_item('M_x002B_E_x0020_Installers_x00201'))
        $('#chkMEInstallersNA').prop('checked', true);

    //Environmental
    if (listItem.get_item('Environmental'))
        $("#txtEnvironmental").val(listItem.get_item('Environmental'));
    if (listItem.get_item('Environmental_x0020_Novated'))
        $('#chkEnvironmentalN').prop('checked', true);
    if (listItem.get_item('Environmental_x0020__x0020_Clien'))
        $('#chkEnvironmentalCT').prop('checked', true);
	if (listItem.get_item('Environmental_x0020_Not_x0020_ap'))
        $('#chkEnvironmentalNA').prop('checked', true);

    //Project Management
    if (listItem.get_item('Project_x0020_Management'))
        $("#txtProjectManagement").val(listItem.get_item('Project_x0020_Management'));
    if (listItem.get_item('Project_x0020_Management_x0020_N'))
        $('#chkProjectManagementN').prop('checked', true);
    if (listItem.get_item('Project_x0020_Management_x0020__'))
        $('#chkProjectManagementCT').prop('checked', true);
	 if (listItem.get_item('Project_x0020_Management_x0020_N0'))
        $('#chkProjectManagementNA').prop('checked', true);

    //Landscape
    if (listItem.get_item('Landscape'))
        $("#txtLandscape").val(listItem.get_item('Landscape'));
    if (listItem.get_item('Landscape_x0020_Novated'))
        $('#chkLandscapeN').prop('checked', true);
    if (listItem.get_item('Landscape_x0020__x0020_Client_x0'))
        $('#chkLandscapeCT').prop('checked', true);
	if (listItem.get_item('Landscape_x0020_Not_x0020_applic'))
        $('#chkLandscapeNA').prop('checked', true);
		
	//Specialist adviser
    if (listItem.get_item('Specialist_x0020_adviser'))
        $("#txtSpcialList").val(listItem.get_item('Specialist_x0020_adviser'));
    if (listItem.get_item('Specialist_x0020_adviser_x0020_N0'))
        $('#chkSpcialListN').prop('checked', true);
    if (listItem.get_item('Specialist_x0020_adviser_x0020_C'))
        $('#chkSpcialListCT').prop('checked', true);
	if (listItem.get_item('Specialist_x0020_adviser_x0020_N0'))
        $('#chkSpcialListNA').prop('checked', true);

    //Building area
    $("#txtBuildingArea").val(listItem.get_item('Building_x0020_Area'));

    //Health & Safety data (AIR)
    $("#txtHealthData").val(listItem.get_item('Health_x0020__x0026__x0020_Safet'));

    //Accident free man hours
    $("#txtAccidentFreeHours").val(listItem.get_item('Accident_x0020_free_x0020_man_x0'));

    //Considerate Constructors Score
    $("#txtConstructorsScore").val(listItem.get_item('Considerate_x0020_constructors_x'));

    //CCS Scheme
    if (listItem.get_item("CCS_x0020_Scheme"))
        $("input[name=rbCCSScheme][value='Yes']").attr('checked', 'checked');
	else
		$("input[name=rbCCSScheme][value='No']").attr('checked', 'checked');
		
    //Cost predictability
    $("#txtCostPredictability").val(listItem.get_item('Cost_x0020_Predictability'));

    //Time predictability
    $("#txtTimePredictability").val(listItem.get_item('Time_x0020_Predictability'));

    //Defects
    $("#txtDefects").val(listItem.get_item('Defects'));

    //Client satisfaction - Product
    $("#txtCSProduct").val(listItem.get_item('Client_x0020_Satisfaction_x0020_'));

    //Client satisfaction - Services
    $("#txtCSService").val(listItem.get_item('Client_x0020_Satisfaction_x0020_0'));

    //Pre-Construction BREEAM/DREAM rating
    if (listItem.get_item('Pre_x002d_Construction_x0020_BRE0') != null)
        $("#ddlPreConstructionRating").val(listItem.get_item('Pre_x002d_Construction_x0020_BRE0').get_label());

    //Pre-Construction BREEAM/DREAM rating Score
    $("#txtPreConstructionScore").val(listItem.get_item('Pre_x002d_Construction_x0020_BRE'));

    //Handover BREEAM/DREAM rating
    if (listItem.get_item('Handover_x0020_BREEAM_x002F_DREA0') != null)
        $("#ddlHandoverRating").val(listItem.get_item('Handover_x0020_BREEAM_x002F_DREA0').get_label());

    //Pre-Construction BREEAM/DREAM rating Score
    $("#txtHandoverScore").val(listItem.get_item('Handover_x0020_BREEAM_x002F_DREA'));
	
	 //CEEQUAL  rating
    if (listItem.get_item('CEEQUAL_x0020_Rating') != null)
        $("#ddlCEEQUALRating").val(listItem.get_item('CEEQUAL_x0020_Rating').get_label());

    //CEEQUAL rating Score
    $("#txtCEEQUALScore").val(listItem.get_item('CEEQUAL_x0020_Score'));
	
    //Local spend - < 20 Miles
    $("#txt20miles").val(listItem.get_item('Local_x0020_spend_x0020_within_x'));

    //Local spend - > 20 Miles
    $("#txt40miles").val(listItem.get_item('Local_x0020_spend_x0020_within_x0'));

    //Kier apprentices employed
    $("#txtKIERApprentices").val(listItem.get_item('Kier_x0020_Apprentices_x0020_Emp'));

    //Supply Chain Apprentices
    $("#txtSupplyChainApprentices").val(listItem.get_item('Supply_x0020_chain_x0020_Apprent'));

    //EPC rating
    if (listItem.get_item('EPC_x0020_Rating') != null)
        $("#ddlEPCRating").val(listItem.get_item('EPC_x0020_Rating').get_label());

    //===================================== [ TESTIMONIALS ]

    if (listItem.get_item("Client_x0020_Reference_x0020_ava"))
        $("input[name=rbClientReference1][value='Yes']").attr('checked', 'checked');

    //First set of Testimonials
    $("textarea#txtTestimonials1").val(listItem.get_item('Testimonial1'));
    $("#txtSource1").val(listItem.get_item('Source_x0020_1'));

    //Second set of Testimonials
    var testimonials2 = listItem.get_item('Testimonial2');
    var source2 = listItem.get_item('Source_x0020_2');

    if (testimonials2 || source2) {
        $('#secondTestimonals').show();
        $("textarea#txtTestimonials2").val(testimonials2);
        $("textarea#txtSource2").val(source2);
    }

    //Third set of Testimonials
    var testimonials3 = listItem.get_item('Testimonial_x0020_3');
    var source3 = listItem.get_item('Source_x0020_3');

    if (testimonials3 || source3) {
        $('#thirdTestimonals').show();
        $("textarea#txtTestimonials3").val(testimonials3);
        $("textarea#txtSource3").val(source3);
    }

    //Fourth set of Testimonials
    var testimonials4 = listItem.get_item('Testimonial4');
    var source4 = listItem.get_item('Source_x0020_4');

    if (testimonials4 || source4) {
        $('#fourthTestimonals').show();
        $("textarea#txtTestimonials4").val(testimonials4);
        $("textarea#txtSource4").val(source4);
    }

    //Fifth set of Testimonials
    var testimonials5 = listItem.get_item('Testimonial5');
    var source5 = listItem.get_item('Source_x0020_5');

    if (testimonials5 || source5) {
        $('#fifthTestimonals').show();
        $("textarea#txtTestimonials5").val(testimonials5);
        $("textarea#txtSource5").val(source5);
    }

    //===================================== [ TESTIMONIALS ]

    //===================================== [ AWARDS ]
    $("textarea#txtAwards1").val(listItem.get_item('Award_x0020_1'));
    var awards2 = listItem.get_item('Award_x0020_2');
    var awards3 = listItem.get_item('Award_x0020_3');
    var awards4 = listItem.get_item('Award_x0020_4');
    var awards5 = listItem.get_item('Award_x0020_5');
    if (awards2) {
        $('#secondAward').show();
        $("textarea#txtAwards2").val(awards2);
    }
    if (awards3) {
        $('#thirdAward').show();
        $("textarea#txtAwards3").val(awards3);
    }
    if (awards4) {
        $('#fourthAward').show();
        $("textarea#txtAwards4").val(awards4);
    }
    if (awards5) {
        $('#fifthAward').show();
        $("textarea#txtAwards5").val(awards5);
    }
	
	// $('#txtImageLibLink').val(listItem.get_item('Kier_x0020_album_x0020_link'));
	if(listItem.get_item('Kier_x0020_album_x0020_link'))
	{
		$('#txtImageLibLink').text(listItem.get_item('Kier_x0020_album_x0020_link'));
		$('#txtImageLibLink').attr('href',listItem.get_item('Kier_x0020_album_x0020_link'));
	}
    //===================================== [ AWARDS ]
	
	//Funding Sector
    var mmdFundingSector = listItem.get_item('Funding_x0020_Sector');
    var FundingSectorEnumerator = mmdFundingSector.getEnumerator();
    var FundingSectorCnt=0;
    while (FundingSectorEnumerator.moveNext()) {
        var currentSubSector = FundingSectorEnumerator.get_current();
		 var fundingSectorValue1 = currentSubSector.get_label();
        if (FundingSectorCnt == 0) {
           
			$('select.ddlFundingSector').first().val(fundingSectorValue1);
            
        }
        else  { 
			var fundingDdl=$('.FundingSector').first().clone();
			fundingDdl.find('select').val(fundingSectorValue1);
			fundingDdl.find('.addMore').hide();
			$('div.FundingSectorMain').append(fundingDdl);
        }
       
        FundingSectorCnt = FundingSectorCnt + 1;
    }
}

function onLoadListItemsFailed(sender, args) {
	LogError(args);
    alert('Request failed on Load List Items. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}
//========================================= [ Load List Items by ID from the List 'Project Datasheet'  ]

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

//========================================= [ Confirmation for Redirect to add Project Evidence Datasheet ]

function formRedirect() {
    var successMessage = "Do you want to Add 'Project Evidence Bite'?";
    confirm(successMessage);
}
//========================================= [ Confirmation for Redirect to add Project Evidence Datasheet ]
// getting and biding all project documents.
function BindProjectDocuments(projectDSID,TestimonialType) {				
	//var url= _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Testimonial%20documents')/items?$select=File,Title,ProjectDatasheetIDId&$expand=File&$filter=ProjectDatasheetID eq '"+projectDSID+"'";
	var url= _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfolderbyserverrelativeurl('Testimonial%20documents/"+projectDatasheetID+"/"+TestimonialType+"')/files"
		$.ajax({
			url: url,
			contentType: "application/json;odata=verbose",
			async:false,
			  headers: {
						"Accept": "application/json; odata=verbose"
					},
			success: onBindProjectDocumentsSucess,
			error: onBindProjectDocumentsError
		});	
}
function PageRefresh(){
	window.location.href=window.location.href;
}		
function onBindProjectDocumentsSucess(data, request) {
			var liform='';
			var items = data.d.results;		
			if(items.length<=0)
			{
				var file='<tr><td class="Nodata">No files found.</td></tr>'
				$('#'+testimonialsControl +'').append(file);
			}
			else
			{
				for (var i = 0; i < items.length; i++) {
				
					var Path=items[i].ServerRelativeUrl;
					var ClassName='odd';
					
					
					if(i%2!=0 && i!=0)
					{
						ClassName='even';
					}
					if(typeof(items[i].Name)!='undefined')
					{
						var file='<tr><td class=\''+ClassName+'\'><a href=\''+Path+'\' target="_blank" class="projectdsLink">'+ items[i].Name  + '</a> </td></tr>'
						$('#'+testimonialsControl +'').append(file);
					}
				}
			}			
			
}
function onBindProjectDocumentsError(error) {
	alert("error");
}

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
