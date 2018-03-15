// Code to insert data
var isDarftValue='';
function onSubmit(isDarft) {

    try {
	isDarftValue=isDarft;
	if('true'==isDarft)
			{
				if(ValidateForDraft())
				{
					updateProjectDatasheet();
				}
				else
				{
					return false;
				}
			}
			else
			{
				if(ValidateForm())
				{
					updateProjectDatasheet();
				}
				else
				{
					return false;
				}
			}
    }
    catch (e) {
        alert('Error while submitting the data:' + e.message + 'stack:' + e.stack);
    }
}
function updateProjectDatasheet(){
			ShowWaitDialog()
			$('input[type=button][value=Submit]').attr('disabled','disabled');
			$('input[type=button][value="Save Draft"]').attr('disabled','disabled');
			$('input[type=reset]').attr('disabled','disabled');
			
			//Get List by Title i.e. Project Datasheet
			var oList = context.get_web().get_lists().getByTitle(listProjectDatasheet);

			this.oListItem = oList.getItemById(projectDatasheetID);
			//Added on 10-04-2015 to is draft or not in work flow
				if('true'==isDarftValue)
				{
					oListItem.set_item('IsDraft', '1');
				}
				else
				{
					oListItem.set_item('IsDraft', '0');
				}
			//Added on 10-04-2015 to is draft or not in work flow
				
			//CRM_x0020_Opportunity_x0020_Auth
			if (crmAuthorID)
				oListItem.set_item('CRM_x0020_Opportunity_x0020_Auth0', crmAuthorID);

			//Managed Meta-data Column 'Stage of Project'
			var fieldSP = oList.get_fields().getByInternalNameOrTitle("Stage of Project");
			var taxFieldSP = context.castTo(fieldSP, SP.Taxonomy.TaxonomyField);
			var termValueSP = new SP.Taxonomy.TaxonomyFieldValue();
			termValueSP.set_label($("#ddlStageOfProject option:selected").val());
			termValueSP.set_termGuid($("#ddlStageOfProject option:selected").attr("id"));
			termValueSP.set_wssId(-1);
			taxFieldSP.setFieldValueByValue(oListItem, termValueSP);

			//Scheme/Project Title
			oListItem.set_item('Title', $("#txtTitle").val());

			//Otherwise known as
			oListItem.set_item('Otherwise_x0020_known_x0020_as', $("#txtOtherwise").val());

			//contract number
			oListItem.set_item('Contract_x0020_Number', $("#txtContractNumber").val());

			//Client
			oListItem.set_item('Client', $("#txtClient").val());

			//Managed Meta-data Column 'Kier delivery region'
			if ($("#ddlDeliveryRegion option:selected").val() != 'default') {
				var fieldDR = oList.get_fields().getByInternalNameOrTitle("Kier Delivery Region");
				var taxFieldDR = context.castTo(fieldDR, SP.Taxonomy.TaxonomyField);
				var termValueDR = new SP.Taxonomy.TaxonomyFieldValue();
				termValueDR.set_label($("#ddlDeliveryRegion option:selected").val());
				termValueDR.set_termGuid($("#ddlDeliveryRegion option:selected").attr("id"));
				termValueDR.set_wssId(-1);
				taxFieldDR.setFieldValueByValue(oListItem, termValueDR);
			}
			//External JV added on 13-04-2015
				if ($("#ddlExternalJV option:selected").val() != 'default') {
					if($("#ddlExternalJV option:selected").val()=='Yes')
						{
							oListItem.set_item('IsExternalJV', 1);
							oListItem.set_item('External_x0020_JV', $('#txtExternal').val());
						}
					else
						{
							oListItem.set_item('IsExternalJV', 0);
							oListItem.set_item('External_x0020_JV', '');
						}
				}
			//Internal JV
			if ($("#ddlInternalJV option:selected").val() != 'default') {
				oListItem.set_item('Internal_x0020_JV', $("#ddlInternalJV option:selected").val());
			}
			//Managed Meta-data Column 'Project Region'
			if ($("#ddlRegion option:selected").val() != 'default') {
				var fieldRegion = oList.get_fields().getByInternalNameOrTitle("Project Region");
				var taxFieldRegion = context.castTo(fieldRegion, SP.Taxonomy.TaxonomyField);
				var termValueRegion = new SP.Taxonomy.TaxonomyFieldValue();
				termValueRegion.set_label($("#ddlRegion option:selected").val());
				termValueRegion.set_termGuid($("#ddlRegion option:selected").attr("id"));
				termValueRegion.set_wssId(-1);
				taxFieldRegion.setFieldValueByValue(oListItem, termValueRegion);
			}
			//Managed Meta-data Column 'Project Area'
			
			var fieldArea = oList.get_fields().getByInternalNameOrTitle("Project Area");
			var taxFieldArea = context.castTo(fieldArea, SP.Taxonomy.TaxonomyField);
			var termValueArea = new SP.Taxonomy.TaxonomyFieldValue();

			//Managed Meta-data Column 'Project_x0020_Location'
			var fieldLocation = oList.get_fields().getByInternalNameOrTitle("Project Location");
			var taxFieldLocation = context.castTo(fieldLocation, SP.Taxonomy.TaxonomyField);
			var termValueLocation = new SP.Taxonomy.TaxonomyFieldValue();

			if (hasAreas) {
				//Managed Meta-data Column 'Project Area'
				if ($("#ddlArea option:selected").val() != 'default') {
					termValueArea.set_label($("#ddlArea option:selected").val());
					termValueArea.set_termGuid($("#ddlArea option:selected").attr("id"));
					termValueArea.set_wssId(-1);
					taxFieldArea.setFieldValueByValue(oListItem, termValueArea);
				}
			}
			else
				taxFieldArea.validateSetValue(oListItem, null);

			if (hasLocations) {
				//Managed Meta-data Column 'Project_x0020_Location'
				if ($("#ddlLocation option:selected").val() != 'default') {
					termValueLocation.set_label($("#ddlLocation option:selected").val());
					termValueLocation.set_termGuid($("#ddlLocation option:selected").attr("id"));
					termValueLocation.set_wssId(-1);
					taxFieldLocation.setFieldValueByValue(oListItem, termValueLocation);
				}
			}
			else
				taxFieldLocation.validateSetValue(oListItem, null);

			//Managed Meta-data Column 'Sector'
			if($("#ddlSector option:selected").val() != 'default')
				{
					if($("#ddlSector option:selected").val() != 'default' || $("#ddlSector1 option:selected").val() != 'default' ||$("#ddlSector2 option:selected").val() != 'default')
					{
						var fieldSector = oList.get_fields().getByInternalNameOrTitle("Sector");
						var taxFieldSector = context.castTo(fieldSector, SP.Taxonomy.TaxonomyField);
						var termsValueSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSectors(), taxFieldSector);
						taxFieldSector.setFieldValueByValueCollection(oListItem, termsValueSector);
					}
				}

			//Managed Meta-data Column 'Sub-SubSector'
			if($("#ddlSubSector option:selected").val())
			{
				if($("#ddlSubSector option:selected").val() != 'default' || $("#ddlSubSector1 option:selected").val() != 'default' ||$("#ddlSubSector2 option:selected").val() != 'default')
				{
					var fieldSubSector = oList.get_fields().getByInternalNameOrTitle("Subsector");
					var taxFieldSubSector = context.castTo(fieldSubSector, SP.Taxonomy.TaxonomyField);
					var termsValueSubSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSubSectors(), taxFieldSubSector);
					taxFieldSubSector.setFieldValueByValueCollection(oListItem, termsValueSubSector);
				}
			}
			//Managed Meta-data Column 'Form of Procurement'
			if ($("#ddlProcurement option:selected").val() != 'default') {
			var fieldFoP = oList.get_fields().getByInternalNameOrTitle("Form of Procurement");
			var taxFieldFoP = context.castTo(fieldFoP, SP.Taxonomy.TaxonomyField);
			var termValueFoP = new SP.Taxonomy.TaxonomyFieldValue();
			termValueFoP.set_label($("#ddlProcurement option:selected").val());
			termValueFoP.set_termGuid($("#ddlProcurement option:selected").attr("id"));
			termValueFoP.set_wssId(-1);
			taxFieldFoP.setFieldValueByValue(oListItem, termValueFoP);
			}

			//Managed Meta-data Column 'Form of Procurement Subtype'
			if ($("#ddlSubProcurement option:selected").val() != 'default') {
				var fieldFopSubtype = oList.get_fields().getByInternalNameOrTitle("FormofProcurementSubType");
				var taxFieldFopSubtype = context.castTo(fieldFopSubtype, SP.Taxonomy.TaxonomyField);
				var termValueFopSubtype = new SP.Taxonomy.TaxonomyFieldValue();
				termValueFopSubtype.set_label($("#ddlSubProcurement option:selected").val());
				termValueFopSubtype.set_termGuid($("#ddlSubProcurement option:selected").attr("id"));
				termValueFopSubtype.set_wssId(-1);
				taxFieldFopSubtype.setFieldValueByValue(oListItem, termValueFopSubtype);
			}
			if($("#txtFormOfProcurementOther").val())
					oListItem.set_item('Other_x0020_of_x0020_Form_x0020_', $("#txtFormOfProcurementOther").val());
			else
				oListItem.set_item('Other_x0020_of_x0020_Form_x0020_', '');

			//Managed Meta-data Column 'Form of Contract'
			if ($("#ddlContract option:selected").val() != 'default') {
				var fieldFoC = oList.get_fields().getByInternalNameOrTitle("Form of Contract");
				var taxFieldFoC = context.castTo(fieldFoC, SP.Taxonomy.TaxonomyField);
				var termValueFoC = new SP.Taxonomy.TaxonomyFieldValue();
				termValueFoC.set_label($("#ddlContract option:selected").val());
				termValueFoC.set_termGuid($("#ddlContract option:selected").attr("id"));
				termValueFoC.set_wssId(-1);
				taxFieldFoC.setFieldValueByValue(oListItem, termValueFoC);
			}

			//Managed Meta-data Column 'Design Stage at Appointment'
			if ($("#ddlAppointment option:selected").val() != 'default') {
				var fieldDSA = oList.get_fields().getByInternalNameOrTitle("Design Stage at Appointment");
				var taxFieldDSA = context.castTo(fieldDSA, SP.Taxonomy.TaxonomyField);
				var termValueDSA = new SP.Taxonomy.TaxonomyFieldValue();
				termValueDSA.set_label($("#ddlAppointment option:selected").val());
				termValueDSA.set_termGuid($("#ddlAppointment option:selected").attr("id"));
				termValueDSA.set_wssId(-1);
				taxFieldDSA.setFieldValueByValue(oListItem, termValueDSA);
			}

			//Value (at contract award)
			oListItem.set_item('Value_x0020_at_x0020_award', $("#txtAwardValue").val());

			//Value (at contract completion)
			if ($("#txtCompletionValue").val().length > 0) {
				oListItem.set_item('Value_x0020_at_x0020_completion', $("#txtCompletionValue").val());

//				if ($("#txtCompletionValue").val() > $("#txtAwardValue").val()) {
				if ($("#txtAwardValue").val()-$("#txtCompletionValue").val()<0) {

					//Extension of time given??
					if ($("input:radio[name='rbAgreedCostVariance']:checked").val() == "Yes")
						oListItem.set_item('Agreed_x0020_cost_x0020_variance', "1");
					else
						oListItem.set_item('Agreed_x0020_cost_x0020_variance', "0");
					//Reason for agreed change
					oListItem.set_item('Reason_x0020_for_x0020_agreed_x0', $("textarea#txtReasonForAgreed").val());
				}
				else {
					oListItem.set_item('Reason_x0020_for_x0020_agreed_x0', null);
				}
			}

			//Planned start on site date
			if($('#dtPlannedStartDate').val()!='')
			{
				oListItem.set_item('Planned_x0020_start_x0020_on_x00', $('#dtPlannedStartDate').datepicker('option', 'dateFormat', 'yy/mm/dd').val());
			}
			//Planned completion date
			if ($("#dtPlannedCompletionDate").val().length > 0) {
				oListItem.set_item('Planned_x0020_completion_x0020_d', $('#dtPlannedCompletionDate').datepicker('option', 'dateFormat', 'yy/mm/dd').val());
			}

			//Actual start on site date
			if ($("#dtActualStartDate").val().length > 0) {
				oListItem.set_item('Actual_x0020_start_x0020_on_x002', $('#dtActualStartDate').datepicker('option', 'dateFormat', 'yy/mm/dd').val());
			}
			
			//Actual completion on site date
			if ($("#dtActualCompletionDate").val().length > 0) {
				oListItem.set_item('Actual_x0020_completion_x0020_da', $('#dtActualCompletionDate').datepicker('option', 'dateFormat', 'yy/mm/dd').val());
					
							var d1 = $('#dtPlannedStartDate').datepicker('getDate');
							var d2 = $('#dtPlannedCompletionDate').datepicker('getDate');
							var d3 = $('#dtActualStartDate').datepicker('getDate');
							var d4 = $('#dtActualCompletionDate').datepicker('getDate');


							if (d1 && d2 && d3 && d4) {
								diffPlanned = Math.floor((d2.getTime() - d1.getTime()) / 86400000); // ms per day
								diffActual = Math.floor((d4.getTime() - d3.getTime()) / 86400000); // ms per day

					
							if (diffActual > diffPlanned) {
								//Extension of time given??
								if ($("input:radio[name='rbAgreedExtension']:checked").val() == "Yes")
									oListItem.set_item('Extension_x0020_of_x0020_time_x0', "1");
								else
									oListItem.set_item('Extension_x0020_of_x0020_time_x0', "0");
								//Reason for extension of time / delay
								oListItem.set_item('Reason_x0020_for_x0020_extension', $("textarea#txtReasonForExtension").val());
							}
							else
							{
								oListItem.set_item('Reason_x0020_for_x0020_extension', '');
							}
						}
			}
			oListItem.set_item('Pre_x002d_Construction_x0020_Dur', $("#txtPreConstructionduration").val());           

			//Project Description(Project drivers and outputs)
			oListItem.set_item('Project_x0020_Description', $("textarea#txtProjectDescription").val());


			//Managed Meta-data Column 'Work Description'
			if ($(".chkBoxListWDClass:checked").length > 0) {
				var fieldWD = oList.get_fields().getByInternalNameOrTitle("Work Description");
				var taxFieldWD = context.castTo(fieldWD, SP.Taxonomy.TaxonomyField);
				var termsValueWD = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultiWD(), taxFieldWD);
				taxFieldWD.setFieldValueByValueCollection(oListItem, termsValueWD);
			}

			//Bid Lead
			if (bidLeadID)
				oListItem.set_item('Bid_x0020_Lead', bidLeadID);

			//QS / Commercial Manager
			if (commercialManagerID)
				oListItem.set_item('QS_x0020__x002F__x0020_Commercia', commercialManagerID);

			//Project / Contracts Manager
			if (contractsManagerID)
				oListItem.set_item('Project_x0020__x002F__x0020_Cont', contractsManagerID);

			//Design Manager
			if (designManagerID)
				oListItem.set_item('Design_x0020_Manager', designManagerID);

			//Managed Meta-data Column 'Scope of Kier Involvement'
			if ($(".chkBoxListScopeKIClass:checked").length > 0) {
				var fieldScopeKI = oList.get_fields().getByInternalNameOrTitle("Scope of Kier Involvement");
				var taxFieldScopeKI = context.castTo(fieldScopeKI, SP.Taxonomy.TaxonomyField);
				var termsValueScopeKI = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultiScopeKI(), taxFieldScopeKI);
				taxFieldScopeKI.setFieldValueByValueCollection(oListItem, termsValueScopeKI);
			}

			//Architect
			oListItem.set_item('Architect', $("#txtArchitect").val());
			if ($("#chkArchitectN").is(':checked'))
				oListItem.set_item('Architect_x0020_Novated', '1');
			else
				oListItem.set_item('Architect_x0020_Novated', '0');
			if ($("#chkArchitectCT").is(':checked'))
				oListItem.set_item('Architect_x0020__x0020_Client_x0', '1');
			else
				oListItem.set_item('Architect_x0020__x0020_Client_x0', '0');
			if ($("#chkArchitectNA").is(':checked'))
				oListItem.set_item('Architect_x0020_Not_x0020_applic', '1');
			else
				oListItem.set_item('Architect_x0020_Not_x0020_applic', '0');

			//Acoustician
			oListItem.set_item('Acoustician', $("#txtAcoustician").val());
			if ($("#chkAcousticianN").is(':checked'))
				oListItem.set_item('Acoustician_x0020_Novated', '1');
			else
				oListItem.set_item('Acoustician_x0020_Novated', '0');
			if ($("#chkAcousticianCT").is(':checked'))
				oListItem.set_item('Acoustician_x0020__x0020_Client_', '1');
			else
				oListItem.set_item('Acoustician_x0020__x0020_Client_', '0');
			if ($("#chkAcousticianNA").is(':checked'))
				oListItem.set_item('Acoustician_x0020_Not_x0020_appl', '1');
			else
				oListItem.set_item('Acoustician_x0020_Not_x0020_appl', '0');

			//Structural & Civil Eng
			oListItem.set_item('Structural_x0020__x0026__x0020_C1', $("#txtStructural").val());
			if ($("#chkStructuralN").is(':checked'))
				oListItem.set_item('Structural_x0020__x0026__x0020_C0', '1');
			else
				oListItem.set_item('Structural_x0020__x0026__x0020_C0', '0');
			if ($("#chkStructuralCT").is(':checked'))
				oListItem.set_item('Structural_x0020__x0026__x0020_C', '1');
			else
				oListItem.set_item('Structural_x0020__x0026__x0020_C', '0');
			if ($("#chkStructuralNA").is(':checked'))
				oListItem.set_item('Structural_x0020__x0026__x0020_C2', '1');
			else
				oListItem.set_item('Structural_x0020__x0026__x0020_C2', '0');

			//FF+E
			oListItem.set_item('FF_x002B_E', $("#txtFFE").val());
			if ($("#chkFFEN").is(':checked'))
				oListItem.set_item('FF_x002B_E_x0020_Novated', '1');
			else
				oListItem.set_item('FF_x002B_E_x0020_Novated', '0');
			if ($("#chkFFECT").is(':checked'))
				oListItem.set_item('FF_x002B_E_x0020__x0020_Client_x', '1');
			else
				oListItem.set_item('FF_x002B_E_x0020__x0020_Client_x', '0');
			if ($("#chkFFENA").is(':checked'))
				oListItem.set_item('FF_x002B_E_x0020_Not_x0020_appli', '1');
			else
				oListItem.set_item('FF_x002B_E_x0020_Not_x0020_appli', '0');

			//M+E Engineering
			oListItem.set_item('M_x002B_E_x0020_Engineering', $("#txtME").val());
			if ($("#chkMEN").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Engineering_x0020', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Engineering_x0020', '0');
			if ($("#chkMECT").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Engineering_x002', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Engineering_x002', '0');
			if ($("#chkMENA").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Engineering_x0021', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Engineering_x0021', '0');

			//ICT
			oListItem.set_item('ICT', $("#txtICT").val());
			if ($("#chkICTN").is(':checked'))
				oListItem.set_item('ICT_x0020_Novated', '1');
			else
				oListItem.set_item('ICT_x0020_Novated', '0');
			if ($("#chkICTCT").is(':checked'))
				oListItem.set_item('ICT_x0020__x0020_Client_x0020_Te', '1');
			else
				oListItem.set_item('ICT_x0020__x0020_Client_x0020_Te', '0');
			if ($("#chkICTNA").is(':checked'))
				oListItem.set_item('ICT_x0020_Not_x0020_applicable', '1');
			else
				oListItem.set_item('ICT_x0020_Not_x0020_applicable', '0');

			//Cost Advisors
			oListItem.set_item('Cost_x0020_Advisiors', $("#txtCostAdvisiors").val());
			if ($("#chkCostAdvisiorsN").is(':checked'))
				oListItem.set_item('Cost_x0020_Advisiors_x0020_Novat', '1');
			else
				oListItem.set_item('Cost_x0020_Advisiors_x0020_Novat', '0');
			if ($("#chkCostAdvisiorsCT").is(':checked'))
				oListItem.set_item('Cost_x0020_Advisiors_x0020__x002', '1');
			else
				oListItem.set_item('Cost_x0020_Advisiors_x0020__x002', '0');
			if ($("#chkCostAdvisiorsNA").is(':checked'))
				oListItem.set_item('Cost_x0020_Advisors_x0020_Not_x0', '1');
			else
				oListItem.set_item('Cost_x0020_Advisors_x0020_Not_x0', '0');

			//Planning Consultant
			oListItem.set_item('Planning_x0020_Consultant', $("#txtPlanningConsultant").val());
			if ($("#chkPlanningConsultantN").is(':checked'))
				oListItem.set_item('Planning_x0020_Consultant_x0020_0', '1');
			else
				oListItem.set_item('Planning_x0020_Consultant_x0020_0', '0');
			if ($("#chkPlanningConsultantCT").is(':checked'))
				oListItem.set_item('Planning_x0020_Consultant_x0020_', '1');
			else
				oListItem.set_item('Planning_x0020_Consultant_x0020_', '0');
			if ($("#chkPlanningConsultantNA").is(':checked'))
				oListItem.set_item('Planning_x0020_Consultant_x0020_1', '1');
			else
				oListItem.set_item('Planning_x0020_Consultant_x0020_1', '0');


			//M+E Installers
			oListItem.set_item('M_x002B_E_x0020_Installers', $("#txtMEInstallers").val());
			if ($("#chkMEInstallersN").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Installers_x00200', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Installers_x00200', '0');
			if ($("#chkMEInstallersCT").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Installers_x0020', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Installers_x0020', '0');
			if ($("#chkMEInstallersNA").is(':checked'))
				oListItem.set_item('M_x002B_E_x0020_Installers_x00201', '1');
			else
				oListItem.set_item('M_x002B_E_x0020_Installers_x00201', '0');

			//Environmental
			oListItem.set_item('Environmental', $("#txtEnvironmental").val());
			if ($("#chkEnvironmentalN").is(':checked'))
				oListItem.set_item('Environmental_x0020_Novated', '1');
			else
				oListItem.set_item('Environmental_x0020_Novated', '0');
			if ($("#chkEnvironmentalCT").is(':checked'))
				oListItem.set_item('Environmental_x0020__x0020_Clien', '1');
			else
				oListItem.set_item('Environmental_x0020__x0020_Clien', '0');
			if ($("#chkEnvironmentalNA").is(':checked'))
				oListItem.set_item('Environmental_x0020_Not_x0020_ap', '1');
			else
				oListItem.set_item('Environmental_x0020_Not_x0020_ap', '0');

			//Project Management
			oListItem.set_item('Project_x0020_Management', $("#txtProjectManagement").val());
			if ($("#chkProjectManagementN").is(':checked'))
				oListItem.set_item('Project_x0020_Management_x0020_N', '1');
			else
				oListItem.set_item('Project_x0020_Management_x0020_N', '0');
			if ($("#chkProjectManagementCT").is(':checked'))
				oListItem.set_item('Project_x0020_Management_x0020__', '1');
			else
				oListItem.set_item('Project_x0020_Management_x0020__', '0');
			if ($("#chkProjectManagementNA").is(':checked'))
				oListItem.set_item('Project_x0020_Management_x0020_N0', '1');
			else
				oListItem.set_item('Project_x0020_Management_x0020_N0', '0');


			//Landscape
			oListItem.set_item('Landscape', $("#txtLandscape").val());
			if ($("#chkLandscapeN").is(':checked'))
				oListItem.set_item('Landscape_x0020_Novated', '1');
			else
				oListItem.set_item('Landscape_x0020_Novated', '0');
			if ($("#chkLandscapeCT").is(':checked'))
				oListItem.set_item('Landscape_x0020__x0020_Client_x0', '1');
			else
				oListItem.set_item('Landscape_x0020__x0020_Client_x0', '0');
			if ($("#chkLandscapeNA").is(':checked'))
				oListItem.set_item('Landscape_x0020_Not_x0020_applic', '1');
			else
				oListItem.set_item('Landscape_x0020_Not_x0020_applic', '0');
				
			//Specialist adviser 
			oListItem.set_item('Specialist_x0020_adviser', $("#txtSpcialList").val());
			if ($("#chkSpcialListN").is(':checked'))
				oListItem.set_item('Specialist_x0020_adviser_x0020_N0', '1');
			else
				oListItem.set_item('Specialist_x0020_adviser_x0020_N0', '0');
			if ($("#chkSpcialListCT").is(':checked'))
				oListItem.set_item('Specialist_x0020_adviser_x0020_C', '1');
			else
				oListItem.set_item('Specialist_x0020_adviser_x0020_C', '0');
			if ($("#chkSpcialListNA").is(':checked'))
				oListItem.set_item('Specialist_x0020_adviser_x0020_N0', '1');
			else
				oListItem.set_item('Specialist_x0020_adviser_x0020_N0', '0');

			//Building area
			oListItem.set_item('Building_x0020_Area', $("#txtBuildingArea").val());

			//Health & Safety data (AIR)
			oListItem.set_item('Health_x0020__x0026__x0020_Safet', $("#txtHealthData").val());

			//Accident free man hours
			oListItem.set_item('Accident_x0020_free_x0020_man_x0', $("#txtAccidentFreeHours").val());

			//Considerate Constructors Score
			oListItem.set_item('Considerate_x0020_constructors_x', $("#txtConstructorsScore").val());

			//CCS Scheme
			if ($("input:radio[name='rbCCSScheme']:checked").val() == "Yes")
				oListItem.set_item('CCS_x0020_Scheme', "1");
			else
				oListItem.set_item('CCS_x0020_Scheme', "0");

			//Cost predictability
			oListItem.set_item('Cost_x0020_Predictability', $("#txtCostPredictability").val());

			//Time predictability
			oListItem.set_item('Time_x0020_Predictability', $("#txtTimePredictability").val());

			//Defects
			oListItem.set_item('Defects', $("#txtDefects").val());
			

			//Client satisfaction - Product 
			oListItem.set_item('Client_x0020_Satisfaction_x0020_', $("#txtCSProduct").val());

			//Client satisfaction - Services 
			oListItem.set_item('Client_x0020_Satisfaction_x0020_0', $("#txtCSService").val());

			//Managed Meta-data Column 'Pre-Construction BREEAM/DREAM rating'
			if ($("#ddlPreConstructionRating option:selected").val() != 'default') {
				var fieldPSRating = oList.get_fields().getByInternalNameOrTitle("Pre-Construction BREEAM/DREAM");
				var taxFieldPSRating = context.castTo(fieldPSRating, SP.Taxonomy.TaxonomyField);
				var termValuePSRating = new SP.Taxonomy.TaxonomyFieldValue();
				termValuePSRating.set_label($("#ddlPreConstructionRating option:selected").val());
				termValuePSRating.set_termGuid($("#ddlPreConstructionRating option:selected").attr("id"));
				termValuePSRating.set_wssId(-1);
				taxFieldPSRating.setFieldValueByValue(oListItem, termValuePSRating);
			}

			//Pre-Construction BREEAM/DREAM rating Score
			oListItem.set_item('Pre_x002d_Construction_x0020_BRE', $("#txtPreConstructionScore").val());

			//Managed Meta-data Column 'Handover BREEAM/DREAM rating'
			if ($("#ddlHandoverRating option:selected").val() != 'default') {
				var fieldHandOverRating = oList.get_fields().getByInternalNameOrTitle("Handover BREEAM/DREAM");
				var taxFieldHandOverRating = context.castTo(fieldHandOverRating, SP.Taxonomy.TaxonomyField);
				var termValueHandOverRating = new SP.Taxonomy.TaxonomyFieldValue();
				termValueHandOverRating.set_label($("#ddlHandoverRating option:selected").val());
				termValueHandOverRating.set_termGuid($("#ddlHandoverRating option:selected").attr("id"));
				termValueHandOverRating.set_wssId(-1);
				taxFieldHandOverRating.setFieldValueByValue(oListItem, termValueHandOverRating);
			}

			//Handover BREEAM/DREAM rating Score
			oListItem.set_item('Handover_x0020_BREEAM_x002F_DREA', $("#txtHandoverScore").val());
			
			//Managed Meta-data Column 'CEEQUAL  rating'
			 if ($("#ddlCEEQUALRating option:selected").val() != 'default') {
				var fieldCEEQUALRating = oList.get_fields().getByInternalNameOrTitle("CEEQUAL Rating");
				var taxFieldCEEQUALRating = context.castTo(fieldCEEQUALRating, SP.Taxonomy.TaxonomyField);
				var termValueCEEQUALRating = new SP.Taxonomy.TaxonomyFieldValue();
				termValueCEEQUALRating.set_label($("#ddlCEEQUALRating option:selected").val());
				termValueCEEQUALRating.set_termGuid($("#ddlCEEQUALRating option:selected").attr("id"));
				termValueCEEQUALRating.set_wssId(-1);
				taxFieldCEEQUALRating.setFieldValueByValue(oListItem, termValueCEEQUALRating);
			}
				
			//Handover BREEAM/DREAM rating Score
			oListItem.set_item('CEEQUAL_x0020_Score', $("#txtCEEQUALScore").val());		
			
			//Local spend - < 20 Miles
			oListItem.set_item('Local_x0020_spend_x0020_within_x', $("#txt20miles").val());

			//Local spend - > 20 Miles
			oListItem.set_item('Local_x0020_spend_x0020_within_x0', $("#txt40miles").val());

			//Kier apprentices employed
			oListItem.set_item('Kier_x0020_Apprentices_x0020_Emp', $("#txtKIERApprentices").val());

			//Supply Chain Apprentices
			oListItem.set_item('Supply_x0020_chain_x0020_Apprent', $("#txtSupplyChainApprentices").val());

			//Managed Meta-data Column 'EPC rating'
			if ($("#ddlEPCRating option:selected").val() != 'default') {
				var fieldEPCRating = oList.get_fields().getByInternalNameOrTitle("EPC Rating");
				var taxFieldEPCRating = context.castTo(fieldEPCRating, SP.Taxonomy.TaxonomyField);
				var termValueEPCRating = new SP.Taxonomy.TaxonomyFieldValue();
				termValueEPCRating.set_label($("#ddlEPCRating option:selected").val());
				termValueEPCRating.set_termGuid($("#ddlEPCRating option:selected").attr("id"));
				termValueEPCRating.set_wssId(-1);
				taxFieldEPCRating.setFieldValueByValue(oListItem, termValueEPCRating);
			}

			//Start TESTIMONIALS
			if ($("input:radio[name='rbClientReference1']:checked").val() == "Yes")
				oListItem.set_item('Client_x0020_Reference_x0020_ava', "1");
			else
				oListItem.set_item('Client_x0020_Reference_x0020_ava', "0");

			oListItem.set_item('Testimonial1', $("textarea#txtTestimonials1").val());
			oListItem.set_item('Source_x0020_1', $("textarea#txtSource1").val());

			if (isSecondTestimonialEnable) {
				oListItem.set_item('Testimonial2', $("textarea#txtTestimonials2").val());
				oListItem.set_item('Source_x0020_2', $("textarea#txtSource2").val());
			}

			if (isThirdTestimonialEnable) {
				oListItem.set_item('Testimonial_x0020_3', $("textarea#txtTestimonials3").val());
				oListItem.set_item('Source_x0020_3', $("textarea#txtSource3").val());
			}

			if (isFourthTestimonialEnable) {
				oListItem.set_item('Testimonial4', $("textarea#txtTestimonials4").val());
				oListItem.set_item('Source_x0020_4', $("textarea#txtSource4").val());
			}

			if (isFifthTestimonialEnable) {
				oListItem.set_item('Testimonial5', $("textarea#txtTestimonials5").val());
				oListItem.set_item('Source_x0020_5', $("textarea#txtSource5").val());
			}

			//End TESTIMONIALS

			//Start AWARDS
			oListItem.set_item('Award_x0020_1', $("textarea#txtAwards1").val());
			if (isSecondAwardEnable)
				oListItem.set_item('Award_x0020_2', $("textarea#txtAwards2").val());
			if (isThirdAwardEnable)
				oListItem.set_item('Award_x0020_3', $("textarea#txtAwards3").val());
			if (isFourthAwardEnable)
				oListItem.set_item('Award_x0020_4', $("textarea#txtAwards4").val());
			if (isFifthAwardEnable)
				oListItem.set_item('Award_x0020_5', $("textarea#txtAwards5").val());
			//End AWARDS			
			if($("#txtImageLibLink").val())
					oListItem.set_item('Kier_x0020_album_x0020_link', $("#txtImageLibLink").val());
			//Managed Meta-data Column 'Funding Sector'	
			if($('select.ddlFundingSector option:selected').val()!='default') {
								
					var fieldFundingSector = oList.get_fields().getByInternalNameOrTitle("Funding Sector");
					var taxFieldFundingSector = context.castTo(fieldFundingSector, SP.Taxonomy.TaxonomyField);
					var termsValueFundingSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleFundingSectors(), taxFieldFundingSector);
					taxFieldFundingSector.setFieldValueByValueCollection(oListItem, termsValueFundingSector);	
				}			
			
			oListItem.update();
			context.load(oListItem);

			context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceeded() {
    //Below function will update all the information related to 'Project Datasheet' in 'Project Evidence Bite' List
    //NOTE: Event Receivers is not working as we are using Taxonomy Fields. Not able to read the Taxonomy Fields using Sandbox Solutions as it will use 'Taxonomy' dll. 
    updatePEDItems();

    createdListItemID = oListItem.get_id();	
	var selectedFiles=0;
	var currentUploadedFile=0;
	var fileInput = jQuery('#getFileTestimonal1');
	var fileInput2 = jQuery('#getFileTestimonal2');
	var fileInput3 = jQuery('#getFileTestimonal3');
	var fileInput4 = jQuery('#getFileTestimonal4');
	var fileInput5 = jQuery('#getFileTestimonal5');
	if(typeof(fileInput[0].files[0])!='undefined')
	{
		selectedFiles++;
	}
	if(typeof(fileInput2[0].files[0])!='undefined')
	{
		selectedFiles++;
	}
	if(typeof(fileInput3[0].files[0])!='undefined')
	{
		selectedFiles++;
	}
	if(typeof(fileInput4[0].files[0])!='undefined')
	{
		selectedFiles++;
	}
	if(typeof(fileInput5[0].files[0])!='undefined')
	{
		selectedFiles++;
	}
	
	$('#SelectedFileCount').val(selectedFiles);
	$.when(currentUploadedFile=uploadFile(fileInput,'Testimonial 1')).then(
			$.when(currentUploadedFile=uploadFile(fileInput2,'Testimonial 2')).then(
				$.when(currentUploadedFile=uploadFile(fileInput3,'Testimonial 3')).then(
					$.when(currentUploadedFile=uploadFile(fileInput4,'Testimonial 4')).then(
						$.when(uploadFile(fileInput5,'Testimonial 5')).then(function(){	
						
							})					
						)				
					)
				)	
	);
	
	 if(selectedFiles==0)
	 {	
		if(typeof(waitDialog)!='undefined')
			{
				waitDialog.close();
				waitDialog = null;						
			}
		
		 successMessage = "Successfully submitted the 'Project Datasheet' and your Reference ID : " + createdListItemID + ".<br /> " + "Click on 'Yes' to Add Project Evidence Bite.";
		 confirm(successMessage);
	 }
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
	$('input[type=button][value=Submit]').removeAttr('disabled');
	$('input[type=button][value="Save Draft"]').removeAttr('disabled');
	$('input[type=reset]').removeAttr('disabled');
	if(typeof(waitDialog)!='undefined')
	waitDialog.close();
	waitDialog = null;
}

function getMultiWD() {
    var termsWD = new Array();
    $(".chkBoxListWDClass:checked").each(function () {
        termsWD.push("-1;#" + $(this).val() + "|" + $(this).attr("id"));
    });
    return termsWD.join(";#");
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
    termsSectors.push("-1;#" + $("#ddlSector option:selected").val() + "|" + $("#ddlSector option:selected").attr("id"));
    if (isSecondSectorEnable && $("#ddlSector1 option:selected").val() != 'default')
        termsSectors.push("-1;#" + $("#ddlSector1 option:selected").val() + "|" + $("#ddlSector1 option:selected").attr("id"));
    if (isThirdSectorEnable && $("#ddlSector2 option:selected").val() != 'default')
        termsSectors.push("-1;#" + $("#ddlSector2 option:selected").val() + "|" + $("#ddlSector2 option:selected").attr("id"));
    return termsSectors.join(";#");
}

function getMultipleSubSectors() {
    var termsSubSectors = new Array();
    termsSubSectors.push("-1;#" + $("#ddlSubSector option:selected").val() + "|" + $("#ddlSubSector option:selected").attr("id"));
    if (isSecondSectorEnable && $("#ddlSubSector1 option:selected").val() != 'default')
        termsSubSectors.push("-1;#" + $("#ddlSubSector1 option:selected").val() + "|" + $("#ddlSubSector1 option:selected").attr("id"));
    if (isThirdSectorEnable && $("#ddlSubSector2 option:selected").val() != 'default')
        termsSubSectors.push("-1;#" + $("#ddlSubSector2 option:selected").val() + "|" + $("#ddlSubSector2 option:selected").attr("id"));
    return termsSubSectors.join(";#");
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

//Below function will update all the information related to 'Project Datasheet' in 'Project Evidence Bite' List
//NOTE: Event Receivers is not working as we are using Taxonomy Fields. Not able to read the Taxonomy Fields using Sandbox Solutions as it will use 'Taxonomy' dll. 
function updatePEDItems() {
    try {
        oPEBList = context.get_web().get_lists().getByTitle(listProjectEvidenceBite);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><Query><ViewFields><FieldRef Name='ID' /><FieldRef Name='_ModerationStatus' /></ViewFields><Where><Eq><FieldRef Name='ProjectDatasheetID' /><Value Type='Lookup'>" + projectDatasheetID + "</Value></Eq></Where></Query></View>");
        this.oPEBItems = oPEBList.getItems(camlQuery);

        context.load(oPEBItems, 'Include(Id,_ModerationStatus)');
        context.executeQueryAsync(Function.createDelegate(this, this.onUpdatePEDItemsSucceeded), Function.createDelegate(this, this.onUpdatePEDItemsFailed));

    } catch (e) {
        alert('Error while updating the data:' + e.message + 'stack:' + e.stack);
    }
}

function onUpdatePEDItemsSucceeded() {
    try {
	
        var itemsCount = 1, itemsList = [];
        var listItemEnumerator = oPEBItems.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var oListPEDItem = listItemEnumerator.get_current();
		
			var preApprovalStatus=oListPEDItem.get_item('_ModerationStatus');
			
			 oListPEDItem.set_item('Pre_x002d_Approval_x0020_Status', preApprovalStatus);
            //CRM_x0020_Opportunity_x0020_Auth
            if (crmAuthorID)
                oListPEDItem.set_item('CRM_x0020_Opportunity_x0020_Auth', crmAuthorID);

            //Managed Meta-data Column 'Stage of Project'
            var fieldSP = oPEBList.get_fields().getByInternalNameOrTitle("Stage of Project");
            var taxFieldSP = context.castTo(fieldSP, SP.Taxonomy.TaxonomyField);
            var termValueSP = new SP.Taxonomy.TaxonomyFieldValue();
            termValueSP.set_label($("#ddlStageOfProject option:selected").val());
            termValueSP.set_termGuid($("#ddlStageOfProject option:selected").attr("id"));
            termValueSP.set_wssId(-1);
            taxFieldSP.setFieldValueByValue(oListPEDItem, termValueSP);

            //Scheme/Project Title
            oListPEDItem.set_item('Title', $("#txtTitle").val());

            //Otherwise known as
            oListPEDItem.set_item('Otherwise_x0020_known_x0020_as', $("#txtOtherwise").val());

            //contract number
            oListPEDItem.set_item('Contract_x0020_Number', $("#txtContractNumber").val());

            //Client
            oListPEDItem.set_item('Client', $("#txtClient").val());

            //Managed Meta-data Column 'Kier delivery region'
            var fieldDR = oPEBList.get_fields().getByInternalNameOrTitle("Kier Delivery Region");
            var taxFieldDR = context.castTo(fieldDR, SP.Taxonomy.TaxonomyField);
            var termValueDR = new SP.Taxonomy.TaxonomyFieldValue();
            termValueDR.set_label($("#ddlDeliveryRegion option:selected").val());
            termValueDR.set_termGuid($("#ddlDeliveryRegion option:selected").attr("id"));
            termValueDR.set_wssId(-1);
            taxFieldDR.setFieldValueByValue(oListPEDItem, termValueDR);
			
            //Internal JV
            oListPEDItem.set_item('Internal_x0020_JV', $("#ddlInternalJV option:selected").val());

            //Managed Meta-data Column 'Project Region'
            var fieldRegion = oPEBList.get_fields().getByInternalNameOrTitle("Project Region");
            var taxFieldRegion = context.castTo(fieldRegion, SP.Taxonomy.TaxonomyField);
            var termValueRegion = new SP.Taxonomy.TaxonomyFieldValue();
            termValueRegion.set_label($("#ddlRegion option:selected").val());
            termValueRegion.set_termGuid($("#ddlRegion option:selected").attr("id"));
            termValueRegion.set_wssId(-1);
            taxFieldRegion.setFieldValueByValue(oListPEDItem, termValueRegion);

            if (hasAreas) {
                //Managed Meta-data Column 'Project Area'
                var fieldArea = oPEBList.get_fields().getByInternalNameOrTitle("Project Area");
                var taxFieldArea = context.castTo(fieldArea, SP.Taxonomy.TaxonomyField);
                var termValueArea = new SP.Taxonomy.TaxonomyFieldValue();
                termValueArea.set_label($("#ddlArea option:selected").val());
                termValueArea.set_termGuid($("#ddlArea option:selected").attr("id"));
                termValueArea.set_wssId(-1);
                taxFieldArea.setFieldValueByValue(oListPEDItem, termValueArea);
            }
            if (hasLocations) {
                //Managed Meta-data Column 'Project_x0020_Location'
                var fieldLocation = oPEBList.get_fields().getByInternalNameOrTitle("Project Location");
                var taxFieldLocation = context.castTo(fieldLocation, SP.Taxonomy.TaxonomyField);
                var termValueLocation = new SP.Taxonomy.TaxonomyFieldValue();
                termValueLocation.set_label($("#ddlLocation option:selected").val());
                termValueLocation.set_termGuid($("#ddlLocation option:selected").attr("id"));
                termValueLocation.set_wssId(-1);
                taxFieldLocation.setFieldValueByValue(oListPEDItem, termValueLocation);
            }

            //Managed Meta-data Column 'Sector'
            var fieldSector = oPEBList.get_fields().getByInternalNameOrTitle("Sector");
            var taxFieldSector = context.castTo(fieldSector, SP.Taxonomy.TaxonomyField);
            var termsValueSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSectors(), taxFieldSector);
            taxFieldSector.setFieldValueByValueCollection(oListPEDItem, termsValueSector);

            //Managed Meta-data Column 'Sub-SubSector'
            var fieldSubSector = oPEBList.get_fields().getByInternalNameOrTitle("Subsector");
            var taxFieldSubSector = context.castTo(fieldSubSector, SP.Taxonomy.TaxonomyField);
            var termsValueSubSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleSubSectors(), taxFieldSubSector);
            taxFieldSubSector.setFieldValueByValueCollection(oListPEDItem, termsValueSubSector);


            //Managed Meta-data Column 'Form of Procurement'
            if ($("#ddlProcurement option:selected").val() != 'default') {
                var fieldFoP = oPEBList.get_fields().getByInternalNameOrTitle("Form of Procurement");
                var taxFieldFoP = context.castTo(fieldFoP, SP.Taxonomy.TaxonomyField);
                var termValueFoP = new SP.Taxonomy.TaxonomyFieldValue();
                termValueFoP.set_label($("#ddlProcurement option:selected").val());
                termValueFoP.set_termGuid($("#ddlProcurement option:selected").attr("id"));
                termValueFoP.set_wssId(-1);
                taxFieldFoP.setFieldValueByValue(oListPEDItem, termValueFoP);
            }

            //Managed Meta-data Column 'Form of Procurement Subtype'
            if ($("#ddlSubProcurement option:selected").val() != 'default') {
                var fieldFopSubtype = oPEBList.get_fields().getByInternalNameOrTitle("FormofProcurementSubType");
                var taxFieldFopSubtype = context.castTo(fieldFopSubtype, SP.Taxonomy.TaxonomyField);
                var termValueFopSubtype = new SP.Taxonomy.TaxonomyFieldValue();
                termValueFopSubtype.set_label($("#ddlSubProcurement option:selected").val());
                termValueFopSubtype.set_termGuid($("#ddlSubProcurement option:selected").attr("id"));
                termValueFopSubtype.set_wssId(-1);
                taxFieldFopSubtype.setFieldValueByValue(oListPEDItem, termValueFopSubtype);
            }

            //Managed Meta-data Column 'Form of Contract'
            if ($("#ddlContract option:selected").val() != 'default') {
                var fieldFoC = oPEBList.get_fields().getByInternalNameOrTitle("Form of Contract");
                var taxFieldFoC = context.castTo(fieldFoC, SP.Taxonomy.TaxonomyField);
                var termValueFoC = new SP.Taxonomy.TaxonomyFieldValue();
                termValueFoC.set_label($("#ddlContract option:selected").val());
                termValueFoC.set_termGuid($("#ddlContract option:selected").attr("id"));
                termValueFoC.set_wssId(-1);
                taxFieldFoC.setFieldValueByValue(oListPEDItem, termValueFoC);
            }

            //Managed Meta-data Column 'Design Stage at Appointment'
            if ($("#ddlAppointment option:selected").val() != 'default') {
                var fieldDSA = oPEBList.get_fields().getByInternalNameOrTitle("Design Stage at Appointment");
                var taxFieldDSA = context.castTo(fieldDSA, SP.Taxonomy.TaxonomyField);
                var termValueDSA = new SP.Taxonomy.TaxonomyFieldValue();
                termValueDSA.set_label($("#ddlAppointment option:selected").val());
                termValueDSA.set_termGuid($("#ddlAppointment option:selected").attr("id"));
                termValueDSA.set_wssId(-1);
                taxFieldDSA.setFieldValueByValue(oListPEDItem, termValueDSA);
            }

            //Value (at contract award)
            oListPEDItem.set_item('Value_x0020_at_x0020_award', $("#txtAwardValue").val());
            
           


            //Value (at contract completion)
            if ($("#txtCompletionValue").val().length > 0) {
                oListPEDItem.set_item('Value_x0020_at_x0020_completion', $("#txtCompletionValue").val());


               // if ($("#txtCompletionValue").val() > $("#txtAwardValue").val()) {
               	if ($("#txtAwardValue").val()-$("#txtCompletionValue").val()<0) {
                    //Extension of time given??
                    if ($("input:radio[name='rbAgreedCostVariance']:checked").val() == "Yes")
                        oListPEDItem.set_item('Agreed_x0020_cost_x0020_variance', "1");
                    else
                        oListPEDItem.set_item('Agreed_x0020_cost_x0020_variance', "0");
                    //Reason for agreed change
                    oListPEDItem.set_item('Reason_x0020_for_x0020_agreed_x0', $("textarea#txtReasonForAgreed").val());
                }
            }

            //Planned start on site date
			if($('#dtPlannedStartDate').val()!='')
			{
				oListPEDItem.set_item('Planned_x0020_start_x0020_on_x00', $("#dtPlannedStartDate").datepicker('option', 'dateFormat', 'yy/mm/dd').val());
			}

            //Planned completion date
            if ($("#dtPlannedCompletionDate").val().length > 0) {
                oListPEDItem.set_item('Planned_x0020_completion_x0020_d', $("#dtPlannedCompletionDate").datepicker('option', 'dateFormat', 'yy/mm/dd').val());
            }

            //Actual start on site date
            if ($("#dtActualStartDate").val().length > 0) {
                oListPEDItem.set_item('Actual_x0020_start_x0020_on_x002', $("#dtActualStartDate").datepicker('option', 'dateFormat', 'yy/mm/dd').val());
            }

            //Actual completion on site date
            if ($("#dtActualCompletionDate").val().length > 0) {
                oListPEDItem.set_item('Actual_x0020_completion_x0020_da', $("#dtActualCompletionDate").datepicker('option', 'dateFormat', 'yy/mm/dd').val());
						var d1 = $('#dtPlannedStartDate').datepicker('getDate');
						var d2 = $('#dtPlannedCompletionDate').datepicker('getDate');
						var d3 = $('#dtActualStartDate').datepicker('getDate');
						var d4 = $('#dtActualCompletionDate').datepicker('getDate');
	
	
						if (d1 && d2 && d3 && d4) {
							diffPlanned = Math.floor((d2.getTime() - d1.getTime()) / 86400000); // ms per day
							diffActual = Math.floor((d4.getTime() - d3.getTime()) / 86400000); // ms per day

						
			                if (diffActual > diffPlanned) {
			                    //Extension of time given??
			                    if ($("input:radio[name='rbAgreedExtension']:checked").val() == "Yes")
			                        oListPEDItem.set_item('Extension_x0020_of_x0020_time_x0', "1");
			                    else
			                        oListPEDItem.set_item('Extension_x0020_of_x0020_time_x0', "0");
			                    //Reason for extension of time / delay
			                    oListPEDItem.set_item('Reason_x0020_for_x0020_extension', $("textarea#txtReasonForExtension").val());
			                }
			                else
							{
							   oListPEDItem.set_item('Reason_x0020_for_x0020_extension', '');

							}	
						}		                
								
            }

                //Pre-Construction duration
            oListPEDItem.set_item('Pre_x002d_Construction_x0020_Dur', $("#txtPreConstructionduration").val());

            //Project Description(Project drivers and outputs)
            oListPEDItem.set_item('Project_x0020_Description', $("textarea#txtProjectDescription").val());


            //Managed Meta-data Column 'Work Description'
            if ($(".chkBoxListWDClass:checked").length > 0) {
                var fieldWD = oPEBList.get_fields().getByInternalNameOrTitle("Work Description");
                var taxFieldWD = context.castTo(fieldWD, SP.Taxonomy.TaxonomyField);
                var termsValueWD = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultiWD(), taxFieldWD);
                taxFieldWD.setFieldValueByValueCollection(oListPEDItem, termsValueWD);
            }

            //Bid Lead
            if (bidLeadID)
                oListPEDItem.set_item('Bid_x0020_Lead', bidLeadID);

            //QS / Commercial Manager
            if (commercialManagerID)
                oListPEDItem.set_item('QS_x0020__x002F__x0020_Commercia', commercialManagerID);

            if (contractsManagerID)
                //Project / Contracts Manager
                oListPEDItem.set_item('Project_x0020__x002F__x0020_Cont', contractsManagerID);

            if (designManagerID)
                //Design Manager
                oListPEDItem.set_item('Design_x0020_Manager', designManagerID);

            //Managed Meta-data Column 'Scope of Kier Involvement'
            if ($(".chkBoxListScopeKIClass:checked").length > 0) {
                var fieldScopeKI = oPEBList.get_fields().getByInternalNameOrTitle("Scope of Kier Involvement");
                var taxFieldScopeKI = context.castTo(fieldScopeKI, SP.Taxonomy.TaxonomyField);
                var termsValueScopeKI = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultiScopeKI(), taxFieldScopeKI);
                taxFieldScopeKI.setFieldValueByValueCollection(oListPEDItem, termsValueScopeKI);
            }

            //Architect
            oListPEDItem.set_item('Architect', $("#txtArchitect").val());
            if ($("#chkArchitectN").is(':checked'))
                oListPEDItem.set_item('Architect_x0020_Novated', '1');
            else
                oListPEDItem.set_item('Architect_x0020_Novated', '0');
            if ($("#chkArchitectCT").is(':checked'))
                oListPEDItem.set_item('Architect_x0020__x0020_Client_x0', '1');
            else
                oListPEDItem.set_item('Architect_x0020__x0020_Client_x0', '0');

            //Acoustician
            oListPEDItem.set_item('Acoustician', $("#txtAcoustician").val());
            if ($("#chkAcousticianN").is(':checked'))
                oListPEDItem.set_item('Acoustician_x0020_Novated', '1');
            else
                oListPEDItem.set_item('Acoustician_x0020_Novated', '0');
            if ($("#chkAcousticianCT").is(':checked'))
                oListPEDItem.set_item('Acoustician_x0020__x0020_Client_', '1');
            else
                oListPEDItem.set_item('Acoustician_x0020__x0020_Client_', '0');

            //Structural & Civil Eng
            oListPEDItem.set_item('Structural_x0020__x0026__x0020_C', $("#txtStructural").val());
            if ($("#chkStructuralN").is(':checked'))
                oListPEDItem.set_item('Structural_x0020__x0026__x0020_C0', '1');
            else
                oListPEDItem.set_item('Structural_x0020__x0026__x0020_C0', '0');
            if ($("#chkStructuralCT").is(':checked'))
                oListPEDItem.set_item('Structural_x0020__x0026__x0020_C1', '1');
            else
                oListPEDItem.set_item('Structural_x0020__x0026__x0020_C1', '0');

            //FF+E
            oListPEDItem.set_item('FF_x002B_E', $("#txtFFE").val());
            if ($("#chkFFEN").is(':checked'))
                oListPEDItem.set_item('FF_x002B_E_x0020_Novated', '1');
            else
                oListPEDItem.set_item('FF_x002B_E_x0020_Novated', '0');
            if ($("#chkFFECT").is(':checked'))
                oListPEDItem.set_item('FF_x002B_E_x0020__x0020_Client_x', '1');
            else
                oListPEDItem.set_item('FF_x002B_E_x0020__x0020_Client_x', '0');

            //M+E Engineering
            oListPEDItem.set_item('M_x002B_E_x0020_Engineering', $("#txtME").val());
            if ($("#chkMEN").is(':checked'))
                oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x0020', '1');
            else
                oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x0020', '0');
            if ($("#chkMECT").is(':checked'))
                oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x002', '1');
            else
                oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x002', '0');

            //ICT
            oListPEDItem.set_item('ICT', $("#txtICT").val());
            if ($("#chkICTN").is(':checked'))
                oListPEDItem.set_item('ICT_x0020_Novated', '1');
            else
                oListPEDItem.set_item('ICT_x0020_Novated', '0');
            if ($("#chkICTCT").is(':checked'))
                oListPEDItem.set_item('ICT_x0020__x0020_Client_x0020_Te', '1');
            else
                oListPEDItem.set_item('ICT_x0020__x0020_Client_x0020_Te', '0');

            //Cost Advisors
            oListPEDItem.set_item('Cost_x0020_Advisiors', $("#txtCostAdvisiors").val());
            if ($("#chkCostAdvisiorsN").is(':checked'))
                oListPEDItem.set_item('Cost_x0020_Advisiors_x0020_Novat', '1');
            else
                oListPEDItem.set_item('Cost_x0020_Advisiors_x0020_Novat', '0');
            if ($("#chkCostAdvisiorsCT").is(':checked'))
                oListPEDItem.set_item('Cost_x0020_Advisiors_x0020__x002', '1');
            else
                oListPEDItem.set_item('Cost_x0020_Advisiors_x0020__x002', '0');

            //Planning Consultant
            oListPEDItem.set_item('Planning_x0020_Consultant', $("#txtPlanningConsultant").val());
            if ($("#chkPlanningConsultantN").is(':checked'))
                oListPEDItem.set_item('Planning_x0020_Consultant_x0020_0', '1');
            else
                oListPEDItem.set_item('Planning_x0020_Consultant_x0020_0', '0');
            if ($("#chkPlanningConsultantCT").is(':checked'))
                oListPEDItem.set_item('Planning_x0020_Consultant_x0020_', '1');
            else
                oListPEDItem.set_item('Planning_x0020_Consultant_x0020_', '0');


            //M+E Installers
            oListPEDItem.set_item('M_x002B_E_x0020_Installers', $("#txtMEInstallers").val());
            if ($("#chkMEInstallersN").is(':checked'))
                oListPEDItem.set_item('M_x002B_E_x0020_Installers_x00200', '1');
            else
                oListPEDItem.set_item('M_x002B_E_x0020_Installers_x00200', '0');
            if ($("#chkMEInstallersCT").is(':checked'))
                oListPEDItem.set_item('M_x002B_E_x0020_Installers_x0020', '1');
            else
                oListPEDItem.set_item('M_x002B_E_x0020_Installers_x0020', '0');

            //Environmental
            oListPEDItem.set_item('Environmental', $("#txtEnvironmental").val());
            if ($("#chkEnvironmentalN").is(':checked'))
                oListPEDItem.set_item('Environmental_x0020_Novated', '1');
            else
                oListPEDItem.set_item('Environmental_x0020_Novated', '0');
            if ($("#chkEnvironmentalCT").is(':checked'))
                oListPEDItem.set_item('Environmental_x0020__x0020_Clien', '1');
            else
                oListPEDItem.set_item('Environmental_x0020__x0020_Clien', '0');

            //Project Management
            oListPEDItem.set_item('Project_x0020_Management', $("#txtProjectManagement").val());
            if ($("#chkProjectManagementN").is(':checked'))
                oListPEDItem.set_item('Project_x0020_Management_x0020_N', '1');
            else
                oListPEDItem.set_item('Project_x0020_Management_x0020_N', '0');
            if ($("#chkProjectManagementCT").is(':checked'))
                oListPEDItem.set_item('Project_x0020_Management_x0020__', '1');
            else
                oListPEDItem.set_item('Project_x0020_Management_x0020__', '0');


            //Landscape
            oListPEDItem.set_item('Landscape', $("#txtLandscape").val());
            if ($("#chkLandscapeN").is(':checked'))
                oListPEDItem.set_item('Landscape_x0020_Novated', '1');
            else
                oListPEDItem.set_item('Landscape_x0020_Novated', '0');
            if ($("#chkLandscapeCT").is(':checked'))
                oListPEDItem.set_item('Landscape_x0020__x0020_Client_x0', '1');
            else
                oListPEDItem.set_item('Landscape_x0020__x0020_Client_x0', '0');

            //Building area
            oListPEDItem.set_item('Building_x0020_Area', $("#txtBuildingArea").val());

            //Health & Safety data (AIR)
            oListPEDItem.set_item('Health_x0020__x0026__x0020_Safet', $("#txtHealthData").val());

            //Accident free man hours
            oListPEDItem.set_item('Accident_x0020_free_x0020_man_x0', $("#txtAccidentFreeHours").val());

            //Considerate Constructors Score
            oListPEDItem.set_item('Considerate_x0020_constructors_x', $("#txtConstructorsScore").val());

            //CCS Scheme
            if ($("input:radio[name='rbCCSScheme']:checked").val() == "Yes")
                oListPEDItem.set_item('CCS_x0020_Scheme', "1");
            else
                oListPEDItem.set_item('CCS_x0020_Scheme', "0");

            //Cost predictability
            oListPEDItem.set_item('Cost_x0020_Predictability', $("#txtCostPredictability").val());

            //Time predictability
            oListPEDItem.set_item('Time_x0020_Predictability', $("#txtTimePredictability").val());

            //Defects
	        oListPEDItem.set_item('Defects', $("#txtDefects").val());
			  


            //Client satisfaction - Product 
            oListPEDItem.set_item('Client_x0020_Satisfaction_x0020_', $("#txtCSProduct").val());

            //Client satisfaction - Services 
            oListPEDItem.set_item('Client_x0020_Satisfaction_x0020_0', $("#txtCSService").val());

            //Managed Meta-data Column 'Pre-Construction BREEAM/DREAM rating'
            if ($("#ddlPreConstructionRating option:selected").val() != 'default') {
                var fieldPSRating = oPEBList.get_fields().getByInternalNameOrTitle("Pre-Construction BREEAM/DREAM");
                var taxFieldPSRating = context.castTo(fieldPSRating, SP.Taxonomy.TaxonomyField);
                var termValuePSRating = new SP.Taxonomy.TaxonomyFieldValue();
                termValuePSRating.set_label($("#ddlPreConstructionRating option:selected").val());
                termValuePSRating.set_termGuid($("#ddlPreConstructionRating option:selected").attr("id"));
                termValuePSRating.set_wssId(-1);
                taxFieldPSRating.setFieldValueByValue(oListPEDItem, termValuePSRating);
            }

            //Pre-Construction BREEAM/DREAM rating Score
            oListPEDItem.set_item('Pre_x002d_Construction_x0020_BRE0', $("#txtPreConstructionScore").val());

            //Managed Meta-data Column 'Handover BREEAM/DREAM rating'
            if ($("#ddlHandoverRating option:selected").val() != 'default') {
                var fieldHandOverRating = oPEBList.get_fields().getByInternalNameOrTitle("Handover BREEAM/DREAM");
                var taxFieldHandOverRating = context.castTo(fieldHandOverRating, SP.Taxonomy.TaxonomyField);
                var termValueHandOverRating = new SP.Taxonomy.TaxonomyFieldValue();
                termValueHandOverRating.set_label($("#ddlHandoverRating option:selected").val());
                termValueHandOverRating.set_termGuid($("#ddlHandoverRating option:selected").attr("id"));
                termValueHandOverRating.set_wssId(-1);
                taxFieldHandOverRating.setFieldValueByValue(oListPEDItem, termValueHandOverRating);
            }

            //Handover BREEAM/DREAM rating Score
            oListPEDItem.set_item('Handover_x0020_BREEAM_x002F_DREA', $("#txtHandoverScore").val());

            //Local spend - < 20 Miles
            oListPEDItem.set_item('Local_x0020_spend_x0020_within_x', $("#txt20miles").val());

            //Local spend - > 20 Miles
            oListPEDItem.set_item('Local_x0020_spend_x0020_within_x0', $("#txt40miles").val());

            //Kier apprentices employed
            oListPEDItem.set_item('Kier_x0020_Apprentices_x0020_Emp', $("#txtKIERApprentices").val());

            //Supply Chain Apprentices
            oListPEDItem.set_item('Supply_x0020_chain_x0020_Apprent', $("#txtSupplyChainApprentices").val());

            //Managed Meta-data Column 'EPC rating'
            if ($("#ddlEPCRating option:selected").val() != 'default') {
                var fieldEPCRating = oPEBList.get_fields().getByInternalNameOrTitle("EPC Rating");
                var taxFieldEPCRating = context.castTo(fieldEPCRating, SP.Taxonomy.TaxonomyField);
                var termValueEPCRating = new SP.Taxonomy.TaxonomyFieldValue();
                termValueEPCRating.set_label($("#ddlEPCRating option:selected").val());
                termValueEPCRating.set_termGuid($("#ddlEPCRating option:selected").attr("id"));
                termValueEPCRating.set_wssId(-1);
                taxFieldEPCRating.setFieldValueByValue(oListPEDItem, termValueEPCRating);
            }
 			//this value is used in workflow
            oListPEDItem.set_item('Updated_x0020_in', 'Project Datasheet');
			
			
			//External JV added on 13-04-2015
			if ($("#ddlExternalJV option:selected").val() != 'default') {
				if($("#ddlExternalJV option:selected").val()=='Yes')
					{
						oListPEDItem.set_item('IsExternalJV', 1);
						oListPEDItem.set_item('External_x0020_JV', $('#txtExternal').val());
					}
				else
					{
						oListPEDItem.set_item('IsExternalJV', 0);
						oListPEDItem.set_item('External_x0020_JV', '');
					}
			}
			
			
			if ($("#chkArchitectNA").is(':checked'))
					oListPEDItem.set_item('Architect_x0020_Not_x0020_applic', '1');
				else
					oListPEDItem.set_item('Architect_x0020_Not_x0020_applic', '0');
			if ($("#chkAcousticianNA").is(':checked'))
					oListPEDItem.set_item('Acoustician_x0020_Not_x0020_appl', '1');
				else
					oListPEDItem.set_item('Acoustician_x0020_Not_x0020_appl', '0');
			if ($("#chkStructuralNA").is(':checked'))
					oListPEDItem.set_item('Structural_x0020__x0026__x0020_C2', '1');
				else
					oListPEDItem.set_item('Structural_x0020__x0026__x0020_C2', '0');
			if ($("#chkFFENA").is(':checked'))
					oListPEDItem.set_item('FF_x002B_E_x0020_Not_x0020_appli', '1');
				else
					oListPEDItem.set_item('FF_x002B_E_x0020_Not_x0020_appli', '0');
			if ($("#chkMENA").is(':checked'))
					oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x0021', '1');
				else
					oListPEDItem.set_item('M_x002B_E_x0020_Engineering_x0021', '0');
			if ($("#chkICTNA").is(':checked'))
					oListPEDItem.set_item('ICT_x0020_Not_x0020_applicable', '1');
				else
					oListPEDItem.set_item('ICT_x0020_Not_x0020_applicable', '0');
			if ($("#chkCostAdvisiorsNA").is(':checked'))
					oListPEDItem.set_item('Cost_x0020_Advisors_x0020_Not_x0', '1');
				else
					oListPEDItem.set_item('Cost_x0020_Advisors_x0020_Not_x0', '0');
			if ($("#chkPlanningConsultantNA").is(':checked'))
					oListPEDItem.set_item('Planning_x0020_Consultant_x0020_1', '1');
				else
					oListPEDItem.set_item('Planning_x0020_Consultant_x0020_1', '0');
			if ($("#chkMEInstallersNA").is(':checked'))
					oListPEDItem.set_item('M_x002B_E_x0020_Installers_x00201', '1');
				else
					oListPEDItem.set_item('M_x002B_E_x0020_Installers_x00201', '0');
					
			if ($("#chkEnvironmentalNA").is(':checked'))
					oListPEDItem.set_item('Environmental_x0020_Not_x0020_ap', '1');
				else
					oListPEDItem.set_item('Environmental_x0020_Not_x0020_ap', '0');
			if ($("#chkProjectManagementNA").is(':checked'))
					oListPEDItem.set_item('Project_x0020_Management_x0020_N0', '1');
				else
					oListPEDItem.set_item('Project_x0020_Management_x0020_N0', '0');
			if ($("#chkLandscapeNA").is(':checked'))
					oListPEDItem.set_item('Landscape_x0020_Not_x0020_applic', '1');
				else
					oListPEDItem.set_item('Landscape_x0020_Not_x0020_applic', '0');
			//Specialist adviser 
			oListPEDItem.set_item('Specialist_x0020_adviser', $("#txtSpcialList").val());
			if ($("#chkSpcialListN").is(':checked'))
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_N0', '1');
			else
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_N0', '0');
			if ($("#chkSpcialListCT").is(':checked'))
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_C', '1');
			else
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_C', '0');
			if ($("#chkSpcialListNA").is(':checked'))
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_N0', '1');
			else
				oListPEDItem.set_item('Specialist_x0020_adviser_x0020_N0', '0');
				
			//Managed Meta-data Column 'CEEQUAL  rating'
			 if ($("#ddlCEEQUALRating option:selected").val() != 'default') {
				var fieldCEEQUALRating = oPEBList.get_fields().getByInternalNameOrTitle("CEEQUAL Rating");
				var taxFieldCEEQUALRating = context.castTo(fieldCEEQUALRating, SP.Taxonomy.TaxonomyField);
				var termValueCEEQUALRating = new SP.Taxonomy.TaxonomyFieldValue();
				termValueCEEQUALRating.set_label($("#ddlCEEQUALRating option:selected").val());
				termValueCEEQUALRating.set_termGuid($("#ddlCEEQUALRating option:selected").attr("id"));
				termValueCEEQUALRating.set_wssId(-1);
				taxFieldCEEQUALRating.setFieldValueByValue(oListPEDItem, termValueCEEQUALRating);
			}
			
			oListPEDItem.set_item('CEEQUAL_x0020_Score', $("#txtCEEQUALScore").val());	
			if($("#txtImageLibLink").val())
					oListPEDItem.set_item('Kier_x0020_album_x0020_link', $("#txtImageLibLink").val());	
            
			
			
			//Start TESTIMONIALS
			if ($("input:radio[name='rbClientReference1']:checked").val() == "Yes")
				oListPEDItem.set_item('Client_x0020_Reference_x0020_ava', "1");
			else
				oListPEDItem.set_item('Client_x0020_Reference_x0020_ava', "0");

			oListPEDItem.set_item('Testimonial1', $("textarea#txtTestimonials1").val());
			oListPEDItem.set_item('Source_x0020_1', $("textarea#txtSource1").val());

			if (isSecondTestimonialEnable) {
				oListPEDItem.set_item('Testimonial2', $("textarea#txtTestimonials2").val());
				oListPEDItem.set_item('Source_x0020_2', $("textarea#txtSource2").val());
			}

			if (isThirdTestimonialEnable) {
				oListPEDItem.set_item('Testimonial_x0020_3', $("textarea#txtTestimonials3").val());
				oListPEDItem.set_item('Source_x0020_3', $("textarea#txtSource3").val());
			}

			if (isFourthTestimonialEnable) {
				oListPEDItem.set_item('Testimonial4', $("textarea#txtTestimonials4").val());
				oListPEDItem.set_item('Source_x0020_4', $("textarea#txtSource4").val());
			}

			if (isFifthTestimonialEnable) {
				oListPEDItem.set_item('Testimonial5', $("textarea#txtTestimonials5").val());
				oListPEDItem.set_item('Source_x0020_5', $("textarea#txtSource5").val());
			}

			//End TESTIMONIALS
			//Managed Meta-data Column 'Funding Sector'				
			var fieldFundingSector = oPEBList.get_fields().getByInternalNameOrTitle("Funding Sector");
			var taxFieldFundingSector = context.castTo(fieldFundingSector, SP.Taxonomy.TaxonomyField);
			var termsValueFundingSector = new SP.Taxonomy.TaxonomyFieldValueCollection(context, getMultipleFundingSectors(), taxFieldFundingSector);
			taxFieldFundingSector.setFieldValueByValueCollection(oListPEDItem, termsValueFundingSector);
			
            oListPEDItem.update();
            itemsList[itemsCount] = oListPEDItem;
            context.load(itemsList[itemsCount]);

            itemsCount = itemsCount + 1;
        }
        context.executeQueryAsync(Function.createDelegate(this, this.onUpdatePEDItemSucceeded), Function.createDelegate(this, this.onUpdatePEDItemsFailed));
    } catch (e) {
        alert('Error while updating the data:' + e.message + 'stack:' + e.stack);
    }
}

function onUpdatePEDItemSucceeded() {
    //alert("Updated Successfully.");
}

function onUpdatePEDItemsFailed(sender, args) {
    //alert("failed. Message:" + args.get_message());
}

function getMultipleFundingSectors() {
    var termsFundingSectors = new Array();
	$('select.ddlFundingSector option:selected').each(function(){
		if( $(this).val()!='default')
			termsFundingSectors.push("-1;#" + $(this).val()+ "|" + $(this).attr("id"));
	});
    return termsFundingSectors.join(";#");
}
