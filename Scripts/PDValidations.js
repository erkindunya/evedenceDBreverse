//========================================= [ Validations : AUTHOR ]
function ValidateAuthorSection() {

    if ($("#ddlStageOfProject option:selected").val() != 'default') {
        return true;
    }
    else {
        $("#ddlStageOfProject").focus();
        $("#errorStageOfProject").text('At-least one of the Stage to be selected.');
        $("#errorStageOfProject").css("display", "inline");
        return false;
    }
}
//========================================= [ Validations : AUTHOR ]

//========================================= [ Validations : PROJECT INFORMATION ]
function ValidateProjectInfo() {
    if ($("#txtTitle").val()) {
        if ($("#txtContractNumber").val()) {
            if ($("#txtClient").val()) {
                if ($("#ddlDeliveryRegion option:selected").val() != 'default') {
					if ($("#ddlExternalJV option:selected").val() != 'default') {
						if ( ($("#ddlExternalJV option:selected").val() == 'Yes' && $("#txtExternal").val()!='' ) || $("#ddlExternalJV option:selected").val() == 'No'  ) {
								if ($("#ddlInternalJV option:selected").val() != 'default') {
									if ($("#ddlRegion option:selected").val() != 'default') {
										if (($("#ddlArea option:selected").val() != 'default') || !hasAreas) {
											if (($("#ddlLocation option:selected").val() != 'default') || !hasLocations) {
												if ($("#ddlSector option:selected").val() != 'default') {
													if ($("#ddlSubSector option:selected").val() != 'default') {

														//Validations based on the 'Funding Sector' 
														 if (ValidateFundingSection()) {
															if ($("#ddlProcurement option:selected").val() != 'default') {
																if ($("#ddlSubProcurement option:selected").val() != 'default') {
																	if ($("#ddlSubProcurement option:selected").val() != 'other' || $('#txtFormOfProcurementOther').val()) {
																			if ($("#ddlContract option:selected").val() != 'default') {
																				if ($("#ddlAppointment option:selected").val() != 'default') {
																					return true;
																				}
																				else {
																					$("#ddlAppointment").focus();
																					$("#errorAppointment").text('Design Stage at Appointment.');
																					$("#errorAppointment").css("display", "inline");
																					return false;
																				}
																			}
																			else {
																				$("#ddlContract").focus();
																				$("#errorContract").text('Please select Form of Contract (NEC/JCT etc).');
																				$("#errorContract").css("display", "inline");
																				return false;
																			}
																		}
																		else{
																				$("#txtFormOfProcurementOther").focus();
																				$("#errorOtherProcurement").text('Please Enter Other value for Form Of Procurement subtype.');
																				$("#errorOtherProcurement").css("display", "inline");
																				return false;
																		}
																	
																}
																else {
																	$("#ddlSubProcurement").focus();
																	$("#errorProcurement").text('Please select Form of Procurement-Subtype.');
																	$("#errorProcurement").css("display", "inline");
																	return false;
																}
															}
															else {
																$("#ddlProcurement").focus();
																$("#errorProcurement").text('Please select any Form of Procurement.');
																$("#errorProcurement").css("display", "inline");
																return false;
															}
														 }
														 else {
															 return false;
															}
													}
													else {
														$("#ddlSubSector").focus();
														alert('Please select any Sub-Sector.');
														return false;
													}
												}
												else {
													$("#ddlSector").focus();
													alert('Please select any Sector.');
													return false;
												}
											}
											else {
												$("#ddlLocation").focus();
												$("#errorProjectLocation").text('Please select any Location.');
												$("#errorProjectLocation").css("display", "inline");
												return false;
											}
										}
										else {
											$("#ddlArea").focus();
											$("#errorProjectLocation").text('Please select any Area.');
											$("#errorProjectLocation").css("display", "inline");
											return false;
										}
									}
									else {
										$("#ddlRegion").focus();
										$("#errorProjectLocation").text('Please select any Region.');
										$("#errorProjectLocation").css("display", "inline");
										return false;
									}
								}
								else {
									$("#ddlInternalJV").focus();
									$("#errorInternalJV").text('Please select any Internal JV.');
									$("#errorInternalJV").css("display", "inline");
									return false;
								}	
							}
					else {
								$("#txtExternal").focus();
								$("#errorExternalJV").text('Please Enter External JV.');
								$("#errorExternalJV").css("display", "inline");
								return false;
						}		
					}
					else {
							$("#ddlExternalJV").focus();
							$("#errorIsExternalJV").text('Please select External JV.');
							$("#errorIsExternalJV").css("display", "inline");
							return false;
					}					
                }
                else {
                    $("#ddlDeliveryRegion").focus();
                    $("#errorDeliveryRegion").text('Please select any KIER Delivery Region.');
                    $("#errorDeliveryRegion").css("display", "inline");
                    return false;
                }
            }
            else {
                $("#txtClient").focus();
                $("#errorClient").text('Please enter Client.');
                $("#errorClient").css("display", "inline");
                return false;
            }
        }
        else {
            $("#txtContractNumber").focus();
            $("#errorContractNumber").text('Please enter contract number.');
            $("#errorContractNumber").css("display", "inline");
            return false;
        }

    }
    else {
        $("#txtTitle").focus();
        $("#errorTitle").text('Please enter the Title.');
        $("#errorTitle").css("display", "inline");
        return false;
    }
}
//========================================= [ Validations : PROJECT INFORMATION ]

//========================================= [ Validations : VALUE & CONTRACT DATES ]
function ValidateValueDetails() {
    if ($("#txtAwardValue").val()) {
        //Validations based on the 'Stage of Project' 
        if (selectedSoP == postHandover) {

            if ($("#txtCompletionValue").val()) {
                if ($("#txtCompletionValue").val() - $("#txtAwardValue").val()>0) {
					if($('input[type=radio][name=rbAgreedCostVariance]:checked').length>0)
					{

							if ($("#txtReasonForAgreed").val()) {
								if ($("#txtReasonForAgreed").val().trim().length > 10) {
									return ValidateDates();
								}
								else {
									$("#txtReasonForAgreed").focus();
									$("#errorReasonForAgreed").text('You need to enter at least 10 characters.');
									$("#errorReasonForAgreed").css("display", "inline");
									return false;
								}


							}
							else {
								$("#txtReasonForAgreed").focus();
								$("#errorReasonForAgreed").text('Please enter the Reason for agreed change.');
								$("#errorReasonForAgreed").css("display", "inline");
								return false;
							}
					}
					else{
								$("input[type=radio][name=rbAgreedCostVariance]").focus();
								$("#errorAgreedCostVariance").text('Please select the Agreed Cost Variance.');
								$("#errorAgreedCostVariance").css("display", "inline");
								return false;
					}
                }
                else {
                    return ValidateDates();
                }
            }
            else {
                $("#txtCompletionValue").focus();
                $("#errorCompletionValue").text('Please enter the Value (at contract completion).');
                $("#errorCompletionValue").css("display", "inline");
                return false;
            }
        }
        else {
            return ValidateDates();
        }

    }
    else {
        $("#txtAwardValue").focus();
        $("#errorAwardValue").text('Please enter the Value (at contract award).');
        $("#errorAwardValue").css("display", "inline");
        return false;
    }
}
function ValidateDates() {
    if ($("#dtPlannedStartDate").val()) {

        //Validations based on the 'Stage of Project' 
        if (selectedSoP == construction || selectedSoP == postHandover) {
            if ($("#dtPlannedCompletionDate").val()) {
                if ($("#dtActualStartDate").val()) {
					if ($("#txtPreConstructionduration").val()) {
						if (selectedSoP == postHandover) {
							if ($("#dtActualCompletionDate").val()) {
								if (diffActual > diffPlanned) {
									if($('input[type=radio][name=rbAgreedExtension]:checked').length>0)
										{
											if ($("#txtReasonForExtension").val()) {
												if ($("#txtReasonForExtension").val().trim().length > 10) {
													return true;
												}
												else {
													$("#txtReasonForExtension").focus();
													$("#errorReasonForExtension").text('You need to enter at least 10 characters.');
													$("#errorReasonForExtension").css("display", "inline");
													return false;
												}
											}
										
											else {
												$("#txtReasonForExtension").focus();
												$("#errorReasonForExtension").text('Please enter the Reason for Extension.');
												$("#errorReasonForExtension").css("display", "inline");
												return false;
											}
										}
										else
											{
												$("input[type=radio][name=rbAgreedExtension]").focus();
												$("#errorAgreedExtension").text('Please select the Agreed Extension.');
												$("#errorAgreedExtension").css("display", "inline");	
												return false;
											}
								}
								else {
									return true;
								}
							}
							else {
								$("#dtActualCompletionDate").focus();
								$("#errorActualCompletionDate").text('Please enter the Actual completion on site date.');
								$("#errorActualCompletionDate").css("display", "inline");
								return false;
							}

						}
						else {
							return true;
						}
					}
					else{
								$("#txtPreConstructionduration").focus();
								$("#errorPreConstructiondurationVal").text('Please enter the Pre Construction duration.');
								$("#errorPreConstructiondurationVal").css("display", "inline");
						return false;
					}

                }
                else {
                    $("#dtActualStartDate").focus();
                    $("#errorActualStartDate").text('Please enter the Actual start on site date.');
                    $("#errorActualStartDate").css("display", "inline");
                    return false;
                }
            }
            else {
                $("#dtPlannedCompletionDate").focus();
                $("#errorPlannedCompletionDate").text('Please enter the Planned completion on site date.');
                $("#errorPlannedCompletionDate").css("display", "inline");
                return false;
            }
        }
        else {
            return true;
        }

    }
    else {
        $("#dtPlannedStartDate").focus();
        $("#errorPlannedStartDate").text('Please enter the Planned start on site date.');
        $("#errorPlannedStartDate").css("display", "inline");
        return false;
    }
}
//========================================= [ Validations : VALUE & CONTRACT DATES ]

//========================================= [ Validations : PROJECT DESCRIPTION ]
function ValidateProjectDesc() {
    if (selectedSoP == construction || selectedSoP == postHandover) {
        if ($("#txtProjectDescription").val()) {

            if ($("#txtProjectDescription").val().trim().length > 10) {
                if ($(".chkBoxListWDClass:checked").length > 0) {
                    return true;
                }
                else {
                    $("#chkBoxListWDClass").focus();
                    $("#errorWorkDescription").text('Please select any value in "Work Description".');
                    $("#errorWorkDescription").css("display", "inline");
                    return false;
                }
            }
            else {
                $("#txtProjectDescription").focus();
                $("#errorProjectDescription").text('You need to enter at least 10 characters.');
                $("#errorProjectDescription").css("display", "inline");
                return false;
            }
        }
        else {
            $("#txtProjectDescription").focus();
            $("#errorProjectDescription").text('Please enter the Project Description.');
            $("#errorProjectDescription").css("display", "inline");
            return false;
        }


    }
    else {
        return true;
    }
}
//========================================= [ Validations : PROJECT DESCRIPTION ]

//========================================= [ Validations : THE TEAM ]
function ValidateTeamDetails() {

if ($("#ppBidLead").val()) {
			//Validations based on the 'Stage of Project' 
			if (selectedSoP == construction || selectedSoP == postHandover) {
				if ($("#ppCommercialManager").val()) {
					if ($("#ppContractsManager").val()) {
						if ($("#ppDesignManager").val()) {
							if ($(".chkBoxListScopeKIClass:checked").length > 0) {
								if(DesignersSupplyValidation())
									return true;
							}
							else {
								$("#chkBoxListScopeKIClass").focus();
								$("#errorKIGroup").text('Please select any value in "Scope of Kier Involvement".');
								$("#errorKIGroup").css("display", "inline");
								return false;
							}
						}
						else {
								$("#ppDesignManager").focus();
								$("#errorDesignManager").text('Please select the Design Manager".');
								$("#errorDesignManager").css("display", "inline");
								return false;
							}
					}
					else {
						$("#ppContractsManager").focus();
						$("#errorContractsManager").text('Please select the Project / Contracts Manager.');
						$("#errorContractsManager").css("display", "inline");
						return false;
					}
				}
				else {
					$("#ppCommercialManager").focus();
					$("#errorCommercialManager").text('Please select the QS / Commercial Manager.');
					$("#errorCommercialManager").css("display", "inline");
					return false;
				}
			}
			else {
				return true;
			}
		}
		else {
			$("#ppBidLead").focus();
			$("#errorBidLead").text('Please select the Bid Lead.');
			$("#errorBidLead").css("display", "inline");
			return false;
		}
}
//========================================= [ Validations : THE TEAM ]

//========================================= [ Validations : PROJECT DATA (Not using) ]
function ValidateProjectData() {
if(selectedSoP == postHandover) {
    if ($("#txtBuildingArea").val()) {
        if ($("#txtHealthData").val()) {
            if ($("#txtAccidentFreeHours").val()) {
                if ($("#txtConstructorsScore").val()) {
					if($('input[type=radio][name=rbCCSScheme]:checked').length>0){
							if ($("#txtCostPredictability").val()) {

								if ($("#txtTimePredictability").val()) {

									if ($("#txtDefects").val()) {

										if ($("#txtCSProduct").val()) {

											if ($("#txtCSService").val()) {
												if ($("#ddlPreConstructionRating option:selected").val() != 'default') {
													if ($("#txtPreConstructionScore").val()|| $("#ddlPreConstructionRating option:selected").val() == '0 Not Applicable') {
														if ($("#ddlHandoverRating option:selected").val() != 'default') {
															if ($("#txtHandoverScore").val() || $("#ddlHandoverRating option:selected").val() == '0 Not Applicable') {															
																	if ($("#ddlCEEQUALRating option:selected").val() != 'default') {
																		if ($("#txtCEEQUALScore").val() || $("#ddlCEEQUALRating option:selected").val() == '0 Not Applicable') {																	
																				if ($("#txt20miles").val()) {
																					if ($("#txt40miles").val()) {
																						if ($("#txtKIERApprentices").val()) {
																							if ($("#txtSupplyChainApprentices").val()) {
																								if ($("#ddlEPCRating option:selected").val() != 'default') {
																									return true;
																								}
																								else {
																									$("#ddlEPCRating").focus();
																									$("#errorEPCRating").text('Please select EPC rating.');
																									$("#errorEPCRating").css("display", "inline");
																									return false;
																								}
																							}
																							else {
																								$("#txtSupplyChainApprentices").focus();
																								$("#errorSupplyChainApprentices").text('Please enter Supply Chain Apprentices.');
																								$("#errorSupplyChainApprentices").css("display", "inline");
																								return false;
																							}
																						}
																						else {
																							$("#txtKIERApprentices").focus();
																							$("#errorKIERApprentices").text('Please enter Kier apprentices employed.');
																							$("#errorKIERApprentices").css("display", "inline");
																							return false;
																						}
																					}
																					else {
																						$("#txt40miles").focus();
																						$("#error40miles").text('Please enter Local spend (% of project spend) within 40 miles of the site.');
																						$("#error40miles").css("display", "inline");
																						return false;
																					}
																				}
																				else {
																					$("#txt20miles").focus();
																					$("#error20miles").text('Please enter Local spend (% of project spend) < 20 miles of the site.');
																					$("#error20miles").css("display", "inline");
																					return false;
																				}
																			}
																			else {
																				$("#txtCEEQUALScore").focus();
																				$("#errorCEEQUALScore").text('Please enter CEEQUAL- Score %.');
																				$("#errorCEEQUALScore").css("display", "inline");
																				return false;
																			}
																	}
																	else {
																		$("#errorCEEQUALRating").focus();
																		$("#errorCEEQUALRating").text('Please select CEEQUAL rating');
																		$("#errorCEEQUALRating").css("display", "inline");
																		return false;
																	}																
															}
															else {
																$("#txtHandoverScore").focus();
																$("#errorHandoverScore").text('Please enter Handover BREEAM/DREAM - Score %.');
																$("#errorHandoverScore").css("display", "inline");
																return false;
															}

														}
														else {
															$("#ddlHandoverRating").focus();
															$("#errorHandoverRating").text('Please select "Handover BREEAM/DREAM rating".');
															$("#errorHandoverRating").css("display", "inline");
															return false;
														}
													}
													else {
														$("#txtPreConstructionScore").focus();
														$("#errorPreConstructionScore").text('Please enter Pre-Construction BREEAM/DREAM - Score %.');
														$("#errorPreConstructionScore").css("display", "inline");
														return false;
													}
												}
												else {
													$("#ddlPreConstructionRating").focus();
													$("#errorPreConstructionRating").text('Please select "Pre-Construction BREEAM/DREAM rating".');
													$("#errorPreConstructionRating").css("display", "inline");
													return false;
												}
											}
											else {
												$("#txtCSService").focus();
												$("#errorCSService").text('Please enter Client satisfaction - Services %.');
												$("#errorCSService").css("display", "inline");
												return false;
											}
										}
										else {
											$("#txtCSProduct").focus();
											$("#errorCSProduct").text('Please enter Client satisfaction - Product %.');
											$("#errorCSProduct").css("display", "inline");
											return false;
										}
									}
									else {
										$("#txtDefects").focus();
										$("#errorDefects").text('Please enter Defects %.');
										$("#errorDefects").css("display", "inline");
										return false;
									}
								}
								else {
									$("#txtTimePredictability").focus();
									$("#errorTimePredictability").text('Please enter Time predictability %.');
									$("#errorTimePredictability").css("display", "inline");
									return false;
								}
							}
							else {
								$("#txtCostPredictability").focus();
								$("#errorCostPredictability").text('Please enter Cost predictability %.');
								$("#errorCostPredictability").css("display", "inline");
								return false;
							}
					}
					else {
						$('input[type=radio][name=rbCCSScheme]').focus();
						$("#errorrbCCSScheme").text('Please select CCS Scheme.');
						$("#errorrbCCSScheme").css("display", "inline");
						return false;
					}
                }
                else {
                    $("#txtConstructorsScore").focus();
                    $("#errorConstructorsScore").text('Please enter Considerate Constructors Score.');
                    $("#errorConstructorsScore").css("display", "inline");
                    return false;
                }

            }
            else {
                $("#txtAccidentFreeHours").focus();
                $("#errorAccidentFreeHours").text('Please enter Accident free man hours.');
                $("#errorAccidentFreeHours").css("display", "inline");
                return false;
            }
        }
        else {
            $("#txtHealthData").focus();
            $("#errorHealthData").text('Please enter Health & Safety data (AIR).');
            $("#errorHealthData").css("display", "inline");
            return false;
        }
     }
     else {
         $("#txtBuildingArea").focus();
         $("#errorBuildingArea").text('Please enter Building area.');
         $("#errorBuildingArea").css("display", "inline");
         return false;
     }
}
else
	{
		return true;
	}
}
//========================================= [ Validations : PROJECT DATA (Not using) ]

//========================================= [ Validations : TESTIMONIALS (Not using) ]
function ValidateTestimonials() {

		if(selectedSoP == postHandover) {
			if($('input[type=radio][name=rbClientReference1]:checked').length<=0)
			{
				$('input[type=radio][name=rbClientReference1]').focus();
				$("#errorClientReference").text('Please select Client Reference.');
				$("#errorClientReference").css("display", "inline");
				return false;
			}
		}		
		if ($("#txtTestimonials1").val()) {
			if ($("#txtSource1").val()) {
				return true;
			}
			else {
				$("#txtSource1").focus();
				$("#errorSource1").text('Please enter Testimonial Source.');
				//alert('Please enter Testimonial Source.');
				$("#errorSource1").css("display", "inline");
				return false;
			}
		}
		else
		{
		 return true;
		}
    // else {
        // $("#txtTestimonials1").focus();
        // $("#errorTestimonials1").text('Please enter Testimonials.');
        // alert('Please enter Testimonials.');
        // $("#errorTestimonials1").css("display", "inline");
        // return false;
    // }
}
//========================================= [ Validations : TESTIMONIALS (Not using) ]

//========================================= [ Validations : AWARDS (Not using) ]
function ValidateAwards() {
    if ($("#txtAwards1").val()) {
        return true;
    }
    else {
        $("#txtAwards1").focus();
        $("#errorAwards1").text('Please provide brief summary on Awards.');
        alert('Please provide brief summary on Awards.');
        $("#errorAwards1").css("display", "inline");
        return false;
    }
}
//========================================= [ Validations : AWARDS (Not using) ]

//========================================= [ Validations : on Submit ]
function ValidateForm() {
    if (ValidateAuthorSection()) {
        if (ValidateProjectInfo()) {
            if (ValidateValueDetails()) {
                if (ValidateProjectDesc()) {
                    if (ValidateTeamDetails()) {
						if(ValidateProjectData()){
								if(ValidateTestimonials()){
										//Disabling the Submit Button
										$("input[type=submit]").prop("disabled", true);
										//Submitting the values
										//onSubmit();
										return true;
									}
									else
									{
										$("#accordion").accordion("option", "active", 6);
										return false;
									}
								}
							else
								{
									$("#accordion").accordion("option", "active", 5);
									return false;
								}
                    }
                    else {
                        $("#accordion").accordion("option", "active", 4);
                        return false;
                    }
                }
                else {
                    $("#accordion").accordion("option", "active", 3);
                    return false;
                }
            }
            else {
                $("#accordion").accordion("option", "active", 2);
                return false;
            }
        }
        else {
            $("#accordion").accordion("option", "active", 1);
            return false;
        }
    }
    else {
        $("#accordion").accordion("option", "active", 0);
        return false;
    }
}

//Start Added on 10-04-2015 for save as draft option




function ValidateForDraft(){
	if (ValidateAuthorSection()) {
			 if ($("#txtTitle").val()) {
					return true;
				}			 
		else {
				$("#txtTitle").focus();
				$("#errorTitle").text('Please enter the Title.');
				$("#errorTitle").css("display", "inline");
				$("#accordion").accordion("option", "active", 1);
				return false;
			}
		}
	 else {
			$("#accordion").accordion("option", "active", 0);
			return false;
		}
}





//end Added on 10-04-2015 for save as draft option

function DesignersSupplyValidation(){
	if($('#txtArchitect').val()||$('#chkArchitectNA:checked').length==1)
	{
		if($('#txtAcoustician').val()||$('#chkAcousticianNA:checked').length==1)
		{
				if($('#txtStructural').val()||$('#chkStructuralNA:checked').length==1)
				{
						if($('#txtFFE').val()||$('#chkFFENA:checked').length==1)
						{
							if($('#txtME').val()||$('#chkMENA:checked').length==1)
								{
									if($('#txtICT').val()||$('#chkICTNA:checked').length==1)
									{
											if($('#txtCostAdvisiors').val()||$('#chkCostAdvisiorsNA:checked').length==1)
											{
													if($('#txtPlanningConsultant').val()||$('#chkPlanningConsultantNA:checked').length==1)
													{
														if($('#txtMEInstallers').val()||$('#chkMEInstallersNA:checked').length==1)
														{
															if($('#txtEnvironmental').val()||$('#chkEnvironmentalNA:checked').length==1)
															{
																if($('#txtProjectManagement').val()||$('#chkProjectManagementNA:checked').length==1)
																{
																	if($('#txtLandscape').val()||$('#chkLandscapeNA:checked').length==1)
																	{
																		if($('#txtSpcialList').val()||$('#chkSpcialListNA:checked').length==1)
																			{
																				return true;		
																			}
																			else
																			{
																				$('#txtSpcialList').focus();		
																				$("#errortxtSpcialList").text('Please enter the SpcialList Adviser.');
																				$("#errortxtSpcialList").css("display", "inline");
																				return false;
																			}		
																	}
																	else
																	{
																		$('#txtLandscape').focus();		
																		$("#errorLandscape").text('Please enter the Landscape.');
																		$("#errorLandscape").css("display", "inline");
																		return false;
																	}
																}
																else
																{
																	$('#txtProjectManagement').focus();		
																	$("#errorPM").text('Please enter the Project Management.');
																	$("#errorPM").css("display", "inline");
																	return false;
																}
															}
															else
															{
																$('#txtEnvironmental').focus();		
																$("#errorEvironmental").text('Please enter the Environmental.');
																$("#errorEvironmental").css("display", "inline");
																return false;
															}
														}
														else
														{
															$('#txtMEInstallers').focus();		
															$("#errorMEI").text('Please enter the M+E Installers.');
															$("#errorMEI").css("display", "inline");
															return false;
														}													
													}
													else
													{
														$('#txtPlanningConsultant').focus();		
														$("#errorPC").text('Please enter the Planning Consultant.');
														$("#errorPC").css("display", "inline");
														return false;
													}
											}
											else
											{
												$('#txtCostAdvisiors').focus();		
												$("#errorCA").text('Please enter the Cost Advisiors.');
												$("#errorCA").css("display", "inline");
												return false;
											}
									}
									else
									{
										$('#txtICT').focus();		
										$("#errorICT").text('Please enter the ICT.');
										$("#errorICT").css("display", "inline");
										return false;
									}
								}
								else
								{
									$('#txtME').focus();		
									$("#errorMEE").text('Please enter the M+E Engineering.');
									$("#errorMEE").css("display", "inline");
									return false;
								}
						}
						else
						{
							$('#txtFFE').focus();		
							$("#errorFFE").text('Please enter the FF+E.');
							$("#errorFFE").css("display", "inline");
							return false;
						}
			}
			else
			{
				$('#txtStructural').focus();		
				$("#errorSCE").text('Please enter the  Structural & Civil Eng.');
				$("#errorSCE").css("display", "inline");
				return false;
			}							
		}
		else
		{
			$('#txtAcoustician').focus();		
			$("#errorAcoustician").text('Please enter the Acoustician.');
			$("#errorAcoustician").css("display", "inline");
			return false;
		}

	}
	else
	{
		$('#txtArchitect').focus();		
		$("#errorArchitect").text('Please enter the Architect.');
		$("#errorArchitect").css("display", "inline");
		return false;
	}

}

function ValidateFundingSection(){
var unSelectedFundingSectors=0;
$('select.ddlFundingSector').each(function(){
		if( $(this).find('option:selected').val()=='default')
			{
				unSelectedFundingSectors++;	
				
			}
			if(unSelectedFundingSectors>0)
			{
				$(this).focus();	
				return;				
			}
	});
	if(unSelectedFundingSectors>0)
	{
		alert('Please select Funding sector');		
		return false;
	}
	else
	{
		return true;
	}
}

//========================================= [ Validations : on Submit ]


