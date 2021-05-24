 function isCustomerFormValid(formId) {
		var $inputs = $(formId).find(':input');
		var errorMessage = null;
		$inputs.each(function() {
			if($(this).hasClass('required')) {
				
				//console.log($(this).attr('id') + ' - ' + $(this).css('display'));

				var fieldValid = isFieldValid($(this));
				if(!fieldValid) {
					if(errorMessage==null) {
						if($(this).attr('title')) {
							errorMessage = $(this).attr('title');
						}
					}
				}
			}
			
			//if has class email
			if($(this).hasClass('email')) {	
				var emailValid = validateEmail($(this).val());
				//console.log('Email is valid ? ' + emailValid);
				if(!emailValid) {
					if(errorMessage==null) {
						errorMessage = getInvalidEmailMessage();
					}
				}
			}
			
			//user name
			if($(this).hasClass('userName')) {	
				if($(this).val().length<6) {
					if(errorMessage==null) {
						errorMessage = getInvalidUserNameMessage();
					}
				}
			}
			
			//password rules
			if($(this).hasClass('password')) {	
				//console.log('check password ' + $(this).val().length);
				if($(this).val().length<6) {
					if(errorMessage==null) {
						errorMessage = getInvalidPasswordMessage();
					}
				}
			}
			
			//repeat password
			if($(this).hasClass('checkPassword')) {	
				    //console.log('In check p[assword ' + + $(this).val().length)
					var pass = $('.password').val();
					if($(this).val().length<6 || ($(this).val()!=pass)) {
						if(errorMessage==null) {
							errorMessage = getInvalidCheckPasswordMessage();
						}
					}
			}
			
			if($(this).hasClass('customer-phone')) {	
				var phoneValid = validatePhone($(this).val());
				console.log('phone is valid ? ' + phoneValid);
				if(!phoneValid) {
					if(errorMessage==null) {
						errorMessage = 'Invalid phone Number';
					}
				}
			}
		});
		
		return errorMessage;
 }
 
 
 function isFieldValid(field) {
		if(field.is(":hidden")) {
			return true;
		}
		var value = field.val();
		if(!emptyString(value)) {
			field.css('background-color', '#FFF');
			return true;
		} else {
			field.css('background-color', '#FFC');
			return false;
		} 
}
 
 function setCountrySettings(prefix, countryCode) {
		//add masks to your country
		//console.log('Apply mask ' + countryCode);
		
		var phoneSelector = '.' + prefix + '-phone';
		var postalCodeSelector = '.' + prefix + '-postalCode';
		
		if(countryCode=='CA') {//mask for canada
			$(phoneSelector).mask("?(999) 999-9999");
			$(postalCodeSelector).mask("?*** ***");
			return;
		}
		if(countryCode=='US') {// mask for united states
			$(phoneSelector).mask("?(999) 999-9999");
			$(postalCodeSelector).mask("?99999");
			return;
		}
		
		$(phoneSelector).unmask();
		$(postalCodeSelector).unmask();

		
}
 
 function validatePhone($phone) {
		//  var phoneReg = /^[0]?[789]\d{9}$/;
		  var phoneReg = /^\+[0-9\s\-\(\)]+$/;
		  if ( $phone.length === 13  && phoneReg.test($phone)) 
		  {
		    return true;
		  } else {
		    return false;
		  }
	} 