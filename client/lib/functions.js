
import Moment from 'moment' ;

validateFilled = function (str, title) {

    if(str.length === 0)
    {
        return {valid:false, 'message': 'The ' + title + ' field is empty'} ;
    }

    return {valid:true, 'message' : ''}
}

validateDate = function (date, format, title) {
    // validate date in format 'dd/mm/yyyy'
    //var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    if(date.length == 0)
    {
        return {valid:false, 'message': 'The ' + title + ' field is empty'} ;
    }

    var m = Moment(date, format);
   // var matches = date.match(rxDatePattern);
    if(m.isValid() == false)
    {
        return {valid:false, 'message': 'Invalid date format for ' + title} ;
    }

    return {valid:true, 'message' : ''}

}

validateRange = function (number, start, end, title) {

    if(isNaN(number))
    {
        return {valid:false, 'message': 'Invalid number format for ' + title} ;
    }

    number = Number(number);
    if(number < start)
    {
        return {valid:false, 'message': 'Provide a number between ' + start + ' and ' + end + ' for ' + title} ;
    }

    if(number > end)
    {
        return {valid:false, 'message': 'Provide a number between ' + start + ' and ' + end + ' for ' + title} ;
    }

    return {valid:true, 'message' : ''}
}



inputFieldEmpty = function (field) {

    
    if(field.length === 0  )
    {
        return true ;
    }
    
    return true ;
}

 validateWordDoc = function (element, title) {

    if ($(element).get(0).files.length === 0) {
        return {valid:false, 'message': 'Select the ' + title + ' file'} ;
    }

    var val = $(element).val().toLowerCase();
    var regex = new RegExp("(.*?)\.(docx|doc)$");
    if(!(regex.test(val))) {
        return {valid:false, 'message': 'Invalid word document selected for ' + title} ;
    }

    return {valid:true, 'message' : ''}
}

validatePdfDoc = function (element, title) {

    if ($(element).get(0).files.length === 0) {
        return {valid:false, 'message': 'Select the ' + title + ' file'} ;
    }

    var val = $(element).val().toLowerCase();
    var regex = new RegExp("(.*?)\.(pdf)$");
    if(!(regex.test(val))) {
        return {valid:false, 'message': 'Invalid pdf document selected for ' + title} ;
    }

    return {valid:true, 'message' : ''}
}


validateEmail = function (email,title) {

    if(email.length === 0)
    {
        return {valid:false, 'message': 'The ' + title + ' field is empty'} ;
    }


    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (!emailPattern.test(email)) {
        return {valid:false, 'message': 'Invalid email address format for ' + title} ;
    }

    return {valid:true, 'message' : ''}

}


validatePhone = function (phone,title) {

    if(phone.length === 0)
    {
        return {valid:false, 'message': 'The ' + title + ' field is empty'} ;
    }

    const phonePattern = /^\d{11}$/;
    if (!phonePattern.test(phone)) {
        return {valid:false, 'message': 'Invalid format for ' + title + ', expected format: 08012345678'} ;
    }

    return {valid:true, 'message' : ''}

}

formatPhoneNoForNG = function (phone) {

    return '+234' + phone.substring(1) ;
}