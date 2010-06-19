exports.matchField = function(match_field){
    return function(form, field, callback){
        if(form.fields[match_field].data != field.data){
            callback(Error('Does not match ' + match_field));
        }
        else callback();
    };
};

exports.min = function(val){
    return function(form, field, callback){
        if(field.data >= val) callback();
        else callback(Error(
            'Please enter a value greater than or equal to ' + val
        ));
    }
};

exports.max = function(val){
    return function(form, field, callback){
        if(field.data <= val) callback();
        else callback(Error(
            'Please enter a value less than or equal to ' + val
        ));
    }
};

exports.range = function(min, max){
    return function(form, field, callback){
        if(field.data >= min && field.data <= max) callback();
        else callback(Error(
            'Please enter a value between ' + min + ' and ' + max
        ));
    }
};

exports.regexp = function(re){
    re = (typeof re == 'string') ? new RegExp(re): re;
    return function(form, field, callback){
        if(re.test(field.data)) callback();
        else callback(Error('Invalid format'));
    };
};

exports.email = function(){
    // regular expression by Scott Gonzalez:
    // http://projects.scottsplayground.com/email_address_validation/
    return exports.regexp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
};