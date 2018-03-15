//========================================= [ Validations : EVIDENCE BITE ]
function ValidatEvidenceBiteInfo() {
    if ($(".chkBoxListEPSClass:checked").length > 0) {
        if ($("#ddlBusinessFunctions option:selected").val() != 'default') {
            if ($("#ddlTopic option:selected").val() != 'default') {
				if(ValidateCategories())
				{
								if ($("#txtHeading").val()) {
									if ($("#txtDescription").val()) {
										if ($("#txtDescription").val().trim().length > 10) {
											if ($("#txtBenefits").val()) {
												if ($("#txtBenefits").val().trim().length > 10) {
													return true;
												}
												else {
													$("#txtBenefits").focus();
													$("#errorBenefits").text('You need to enter at least 10 characters.');
													$("#errorBenefits").css("display", "inline");
													return false;
												}
											}
											else {
												$("#txtBenefits").focus();
												$("#errorBenefits").text('Please enter the Benefits (Outcomes/Client benefits).');
												$("#errorBenefits").css("display", "inline");
												return false;
											}
										}
										else {
											$("#txtDescription").focus();
											$("#errorDescription").text('You need to enter at least 10 characters.');
											$("#errorDescription").css("display", "inline");
											return false;
										}
									}
									else {
										$("#txtDescription").focus();
										$("#errorDescription").text('Please enter the Description.');
										$("#errorDescription").css("display", "inline");
										return false;
									}
							}
							else {
								$("#txtHeading").focus();
								$("#errorHeading").text('Please enter the Heading.');
								$("#errorHeading").css("display", "inline");
								return false;
							}
					}
            }
            else {
                $("#ddlTopic").focus();
                $("#errorTopic").text('Please select any Topic.');
                $("#errorTopic").css("display", "inline");
                return false;
            }
        }
        else {
            $("#ddlBusinessFunctions").focus();
            $("#errorBusinessFunctions").text('Please select any Business Function.');
            $("#errorBusinessFunctions").css("display", "inline");
            return false;
        }
    }
    else {
        $("#chkBoxListEPSClass").focus();
        $("#errorEPS").text('Please select any value in "Evidence Project Stage".');
        $("#errorEPS").css("display", "inline");
        return false;
    }
}
//========================================= [ Validations : EVIDENCE BITE ]

//========================================= [ Validations : on Submit ]
function ValidateForm() {
    if (ValidatEvidenceBiteInfo()) {
        //Disabling the Submit Button
        $("input[type=submit]").prop("disabled", true);
        //Submitting the values
        onSubmit();
        return true;
    }
    else {
        $("#accordion").accordion("option", "active", 8);
        return false;
    }
}

function ValidateCategories(){

			if(!$('#ddlCategory1').is(':hidden') && $("#ddlCategory1 option:selected").val() == 'default')
			{
				$("#errorCategory1").text('Please select any Category 1.');
                $("#errorCategory1").css("display", "inline");
                return false;
			}
			else
			{
				return true;
				// if(!$('#ddlCategory2').is(':hidden') && $("#ddlCategory2 option:selected").val() == 'default')
					// {
						// $("#errorCategory2").text('Please select any Category 2.');
						// $("#errorCategory2").css("display", "inline");
						// return false;
					// }
					// else
					// {
							// return true;
					// }
			}
}
//========================================= [ Validations : on Submit ]