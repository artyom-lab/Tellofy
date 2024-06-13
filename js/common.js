$(document).ready(function () {

// TOOLTIP
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// COUNTERS
  $('#count-100').keyup(function() {  
    var characterCount = $(this).val().length,
    current = $('#current-100'),
    maximum = $('#maximum-100'),
    theCount = $('#the-count-100'); 
    current.text(characterCount);
  });

  $('#count-1000').keyup(function() {  
    var characterCount = $(this).val().length,
    current = $('#current-1000'),
    maximum = $('#maximum-1000'),
    theCount = $('#the-count-1000'); 
    current.text(characterCount);
  });

// ALL STEPS FUNCTIONALITY
function scrollToTop() {
  $('html, body').animate({ scrollTop: 0 });
}

function setActiveStep(step) {
  $("body").addClass("step-" + step + "-active");
  scrollToTop();
}

for (let i = 2; i <= 9; i++) {
  $(`#tostep-${i}, #tostep-${i}b`).on("click", () => setActiveStep(i));
}

for (let i = 1; i <= 7; i++) {
  $(`#backstep-${i}, #backstep-${i}b`).on("click", event => {
    $("body").removeClass(`step-${i + 1}-active`);
    scrollToTop();
    event.preventDefault();
  });
}

// STEP-1
const form1 = document.getElementById('form1');
const btn1 = document.getElementById('tostep-2');
const arrow1 = document.getElementById('tostep-2b');
const radioInputs = form1.querySelectorAll('input[type="radio"]');
radioInputs.forEach(input => {
  input.addEventListener('change', function() {
    btn1.disabled = false;
    arrow1.classList.remove('disabled');
  });
});

// STEP-2
const form2 = document.getElementById('form2');
const btn2 = document.getElementById('tostep-3');
const arrow2 = document.getElementById('tostep-3b');
const textarea = form2.querySelector(".form-textarea");
textarea.addEventListener("input", function() {
  if (textarea.value.trim() !== "") {
    btn2.disabled = false;
    arrow2.classList.remove('disabled');
  } else {
    btn2.disabled = true;
    arrow2.classList.add('disabled');
  }
});

// STEP-3
const form3 = document.getElementById('form3');
const btn3 = document.getElementById('tostep-4');
const arrow3 = document.getElementById('tostep-4b');
const radioInputs2 = form3.querySelectorAll('input[type="radio"]');
radioInputs2.forEach(input => {
  input.addEventListener('change', function() {
    btn3.disabled = false;
    arrow3.classList.remove('disabled');
  });
});

// STEP-4 / CALENDAR
$(".datepicker").datepicker({
  changeMonth: true,
  changeYear: true,
  dateFormat: "mm/dd/yy",
  onSelect: function(dateText, inst) {
    // Получаем выбранную дату
    var selectedDate = $(this).datepicker("getDate");
    // Проверяем, выбрана ли дата
    if (selectedDate) {
      // Если выбрана, разблокируем кнопку
      $("#tostep-5").prop("disabled", false);
      $("#tostep-5b").removeClass("disabled");
    } else {
      // Если дата не выбрана, блокируем кнопку
      $("#tostep-5").prop("disabled", true);
      $("#tostep-5b").addClass("disabled");
    }
  },
  onClose: function(dateText, inst) {
    // Проверяем, осталась ли выбранная дата после закрытия календаря
    var selectedDate = $(this).datepicker("getDate");
    // Если нет выбранной даты и поле ввода пустое, блокируем кнопку
    if (!selectedDate && !$(this).val().trim()) {
      $("#tostep-5").prop("disabled", true);
      $("#tostep-5b").addClass("disabled");
    }
  }
}).focus(function() {
  $("#ui-datepicker-div").position({
    my: "center top",
    at: "center bottom",
    of: $(this)
  });
}).keyup(function(event) {
  // При отпускании клавиши проверяем, был ли это backspace
  if (event.keyCode == 8) {
    // Очищаем поле ввода
    $(this).val('');
    // Блокируем кнопку
    $("#tostep-5").prop("disabled", true);
    $("#tostep-5b").addClass("disabled");
  }
});

// STEP-5
const form5 = document.getElementById('form5');
const btn5 = document.getElementById('tostep-6');
const arrow5 = document.getElementById('tostep-6b');
const checkInputs = form5.querySelectorAll('input[type="checkbox"]');
function checkCheckboxes() {
  let anyCheckboxChecked = false;
  checkInputs.forEach(input => {
    if (input.checked) {
      anyCheckboxChecked = true;
    }
  });
  if (anyCheckboxChecked) {
    btn5.disabled = false;
    arrow5.classList.remove('disabled');
  } else {
    btn5.disabled = true;
    arrow5.classList.add('disabled');
  }
}
checkInputs.forEach(input => {
  input.addEventListener('change', checkCheckboxes);
});
checkCheckboxes();

// STEP-6
const selectInputs = document.querySelectorAll('.select2');
const btn6 = document.getElementById('tostep-7');
const arrow6 = document.getElementById('tostep-7b');
function checkSelects() {
  let anySelected = false;
  selectInputs.forEach(select => {
    const selectedValue = $(select).val(); // Получаем выбранное значение с помощью jQuery
    if (selectedValue !== "") {
      anySelected = true;
    }
  });
  btn6.disabled = !anySelected;
  if (anySelected) {
    arrow6.classList.remove('disabled');
  } else {
    arrow6.classList.add('disabled');
  }
}
selectInputs.forEach(select => {
  $(select).on('select2:select select2:unselect', checkSelects); 
});
checkSelects(); 

// STEP-7
const form7 = document.getElementById('form7');
const btn7 = document.getElementById('tostep-8');
const arrow7 = document.getElementById('tostep-8b');
const input1 = form7.querySelectorAll('input');

input1.forEach(input => {
  input.addEventListener("input", function() {
    let isInputFilled = true;
    input1.forEach(input => {
      if (input.value.trim() === "") {
        isInputFilled = false;
      }
    });

    if (isInputFilled) {
      btn7.disabled = false;
      arrow7.classList.remove('disabled');
    } else {
      btn7.disabled = true;
      arrow7.classList.add('disabled');
    }
  });
});

// STEP-8
$(document).ready(function() {
  const form8 = $('#form8');
  const btn8 = $('#tostep-9');
  const arrow8 = $('#tostep-9b');
  const input2 = form8.find('input');
  const checkbox = $('.label-agreement input'); 
  function updateButtonState() {
    let isInputFilled = true;
    input2.each(function() {
      if ($(this).val().trim() === "") {
          isInputFilled = false;
      }
    });

    if (isInputFilled && checkbox.prop('checked')) {
      btn8.prop('disabled', false);
      arrow8.removeClass('disabled');
    } else {
      btn8.prop('disabled', true);
      arrow8.addClass('disabled');
    }
  }
  input2.on("input", updateButtonState);
  checkbox.on("change", updateButtonState);
});

 // SELECT2
(function($) {
  var Defaults = $.fn.select2.amd.require('select2/defaults');
  $.extend(Defaults.defaults, {
    dropdownPosition: 'auto'
  });
  var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');
  var _positionDropdown = AttachBody.prototype._positionDropdown;
  AttachBody.prototype._positionDropdown = function() {
    var $window = $(window);
    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
    var newDirection = null;
    var offset = this.$container.offset();
    offset.bottom = offset.top + this.$container.outerHeight(false);
    var container = {
        height: this.$container.outerHeight(false)
    };
    container.top = offset.top;
    container.bottom = offset.top + container.height;
    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };
    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };
    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);
    var css = {
      left: offset.left,
      top: container.bottom
    };
    var $offsetParent = this.$dropdownParent;
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }
    var parentOffset = $offsetParent.offset();
    css.top -= parentOffset.top
    css.left -= parentOffset.left;
    var dropdownPositionOption = this.options.get('dropdownPosition');
    if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
      newDirection = dropdownPositionOption;
    } else {
      if (!isCurrentlyAbove && !isCurrentlyBelow) {
        newDirection = 'below';
      }
      if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
        newDirection = 'above';
      } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
        newDirection = 'below';
      }
    }
    if (newDirection == 'above' ||
    (isCurrentlyAbove && newDirection !== 'below')) {
        css.top = container.top - parentOffset.top - dropdown.height;
    }
    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }
    this.$dropdownContainer.css(css);
  };
})(window.jQuery);

    $("select.select2").select2({
      dropdownPosition: 'below',
      allowClear: true
    });

// VALIDATE
  // $('#form1').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //     },
  //     code: {
  //       required: true,
  //       minlength: 11,
  //       maxlength: 11,
  //     },
  //     firstname: {
  //       required: true,
  //       minlength: 2
  //     },
  //     secondname: {
  //       required: true,
  //       minlength: 2
  //     },
  //     thirdname: {
  //       required: true,
  //       minlength: 2
  //     },
  //   },

  //   submitHandler: function(form) {
  //     $(form).submit(function(e) {
  //       e.preventDefault();
  //     });
  //   }

  // });

  $('form').submit(function(e) {
    e.preventDefault();
  });

});