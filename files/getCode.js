var countdown = 60;
function initGetCode() {
    var tel = $('#tel').val();
    var callingCode = $('#callingCode').val();
    var isValidateTel = validateTel(tel, callingCode);
    if(isValidateTel) {
        getCode(tel, callingCode);
    } else {
        $('em.invalid').text('');
        $('em[for="tel"]').css('display','block');
        $('em[for="tel"]').text(telErrorTips);
    }
}

function validateTel(tel, callingCode) {
    tel = tel.replace(/ /g, '');
    var length = tel.length;
    if (callingCode == CNCALLINGCODE) {
        var mobile = mobileRegCN;
        if (length == 11 && mobile.test(tel)) {
            return true;
        } else {
            return false;
        }
    } else {
        var mobile = mobileRegEN;
        if (mobile.test(tel)) {
            return true;
        } else {
            return false;
        }
    }
}

var timerList = [];
function settime(obj) {
    var ele = typeof obj === "undefined" ? $("#getCode") : obj;
    var id = ele.attr('id');
    timerList[id] == undefined ? (timerList[id] = 60) : '';
    if (timerList[id] == 0 || countdown == 0) {
        ele.text(codeRegain).removeClass('btn-u-default').removeAttr('disabled');
        timerList[id] = 60;
        countdown = 60;
    } else {
        ele.text(codeRegain + timerList[id] + second).addClass('btn-u-default').attr('disabled', 'disabled');
        timerList[id]--;
        countdown--;
        countTimers = setTimeout(function() {
            settime(ele);
        },1000);
    }
}

$(".countryItem").click(function () {
    var tel = $('#tel').val();
    var callingCode = $(this).parent().attr('data-calling-code');
    $('#callingCode').val(callingCode);
    $('#selectedCallingCode').html('+' + callingCode + '<span class="caret"></span>');
});


