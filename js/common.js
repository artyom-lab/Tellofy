$(document).ready(function () {

// TOOLTIP

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
$('[data-bs-toggle="tooltip"]').on('click', function () {
    $(this).tooltip('hide')
});

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

// AUDIO

  $('.audio-to-text').click(function() {
      $('.audio-buttons').addClass('d-none');
      $('.audio-recording').removeClass('d-none');
  });
  $('.btn-delete').click(function() {
      $('.audio-recording').addClass('d-none');
      $('.audio-buttons').removeClass('d-none');
  });

// VIDEO
  $('.video-to-text').click(function() {
      $('.textarea-box').addClass('d-none');
      $('.video-recording').removeClass('d-none');
  });
  $('.video-delete').click(function() {
      $('.video-recording').addClass('d-none');
      $('.textarea-box').removeClass('d-none');
  });

// ALL STEPS FUNCTIONALITY

function scrollToTop() {
  $('html, body').animate({ scrollTop: 0 });
}

function setActiveStep(step) {
  $("body").addClass("step-" + step + "-active");
  scrollToTop();
}

// for (let i = 2; i <= 9; i++) {
//   $(`#tostep-${i}, #tostep-${i}b`).on("click", () => setActiveStep(i));
// }

for (let i = 2; i <= 9; i++) {
  $(`#tostep-${i}, #tostep-${i}b`).on("click", function() {
    if (!$(this).closest('#form7, #form8').length) {
      setActiveStep(i);
    }
  });
}

for (let i = 1; i <= 7; i++) {
  $(`#backstep-${i}, #backstep-${i}b`).on("click", event => {
    $("body").removeClass(`step-${i + 1}-active`);
    scrollToTop();
    event.preventDefault();
  });
}

// CALENDAR

$(".datepicker").datepicker({
  changeMonth: true,
  changeYear: true,
  dateFormat: "mm/dd/yy",

  onSelect: function(dateText, inst) {
    var selectedDate = $(this).datepicker("getDate");
    if (selectedDate) {
      $(".btn-next").prop("disabled", false);
      $("#tostep-5b").removeClass("disabled");
    } else {
      $(".btn-next").prop("disabled", true); 
      $("#tostep-5b").addClass("disabled"); 
    }
  },
  onClose: function(dateText, inst) {
    var selectedDate = $(this).datepicker("getDate");
    if (!selectedDate && !$(this).val().trim()) {
      $(".btn-next").prop("disabled", true); 
      $("#tostep-5b").addClass("disabled"); 
    } else {
      $(".btn-next").prop("disabled", false); 
      $("#tostep-5b").removeClass("disabled");
    }
  }
}).focus(function() {
  $("#ui-datepicker-div").position({
    my: "center top",
    at: "center bottom",
    of: $(this)
  });
}).keyup(function(event) {
  if (event.keyCode == 8) { 
    $(this).val('');
    $(".btn-next").prop("disabled", true); 
    $("#tostep-5b").addClass("disabled");
  }
});

// STEP-1
const form1 = document.getElementById('form1');
const btn1 = document.getElementById('tostep-2');
const arrow1 = document.getElementById('tostep-2b');
form1.addEventListener('change', () => {
  btn1.disabled = false;
  arrow1.classList.remove('disabled');
});

// STEP-2
const textarea = document.querySelector("#form2 .form-textarea");
const btn2 = document.getElementById('tostep-3');
const arrow2 = document.getElementById('tostep-3b');
textarea.addEventListener("input", () => {
  const isTextareaFilled = textarea.value.trim() !== "";
  btn2.disabled = !isTextareaFilled;
  arrow2.classList.toggle('disabled', !isTextareaFilled);
});

// STEP-3
const form3 = document.getElementById('form3');
const btn3 = document.getElementById('tostep-4');
const arrow3 = document.getElementById('tostep-4b');
form3.addEventListener('change', function(event) {
  if (event.target.type === 'radio') {
    btn3.disabled = false;
    arrow3.classList.remove('disabled');
  }
});


// STEP-5
const form5 = document.getElementById('form5');
const btn5 = document.getElementById('tostep-6');
const arrow5 = document.getElementById('tostep-6b');
const checkInputs = form5.querySelectorAll('input[type="checkbox"]');
function checkCheckboxes() {
  const anyCheckboxChecked = [...checkInputs].some(input => input.checked);
  btn5.disabled = !anyCheckboxChecked;
  arrow5.classList.toggle('disabled', !anyCheckboxChecked);
}
checkInputs.forEach(input => input.addEventListener('change', checkCheckboxes));
checkCheckboxes();


// STEP-6
const selectInputs = $('.select2');
const btn6 = $('#tostep-7')[0];
const arrow6 = $('#tostep-7b')[0];
function checkSelects() {
  const anySelected = selectInputs.toArray().some(select => $(select).val() !== "");
  btn6.disabled = !anySelected;
  arrow6.classList.toggle('disabled', !anySelected);
}
selectInputs.on('select2:select select2:unselect', checkSelects);
checkSelects();

// STEP-7

const form7 = document.getElementById('form7');
const btn7 = document.getElementById('tostep-8');
const arrow7 = document.getElementById('tostep-8b');
const input1 = form7.querySelectorAll('input');
input1.forEach(input => {
  input.addEventListener("input", () => {
    let isInputFilled = true;
    input1.forEach(input => {
      if (input.value.trim() === "") {
        isInputFilled = false;
      }
    });
    btn7.disabled = !isInputFilled;
    arrow7.classList.toggle('disabled', !isInputFilled);
  });
});

// STEP-8

const form8 = $('#form8');
const btn8 = $('#tostep-9');
const arrow8 = $('#tostep-9b');
const input2 = form8.find('input');
const checkbox = $('.label-agreement input'); 
function updateButtonState() {
  const isInputFilled = input2.toArray().every(input => $(input).val().trim() !== "");
  const isCheckboxChecked = checkbox.prop('checked');
  btn8.prop('disabled', !(isInputFilled && isCheckboxChecked));
  arrow8.toggleClass('disabled', !(isInputFilled && isCheckboxChecked));
  }
  input2.on("input", updateButtonState);
  checkbox.on("change", updateButtonState);

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

  $('#form7').validate({
    rules: {
      input1: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      input1: {
        required: "Error message here",
      },
    },
    submitHandler: function(form) {
      $("body").addClass("step-8-active");
    }
  });

  $('#form8').validate({
    rules: {
      fullname: {
        required: true,
        minlength: 5,
      },
      email: {
        required: true,
        minlength: 8,
      },
      phone: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      fullname: {
        required: "Error message here",
      },
      email: {
        required: "This email doesn’t seem right.",
      },
      phone: {
        required: "This number doesn’t seem right.",
      },
    },
    submitHandler: function(form) {
      $("body").addClass("step-9-active");
    }
  });

  $('form').submit(function(e) {
    e.preventDefault();
  });

// PHONE

  function formatPhoneNumber() {
    let input = document.getElementById('phone');
    let value = input.value.replace(/\D/g, ''); 

    let formattedValue = '+' + value.slice(0, 1) + ' ' + value.slice(1, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7);

    input.value = formattedValue;
  }

  document.getElementById('phone').addEventListener('input', formatPhoneNumber);

// VIDEO

var player = videojs('myVideo', {
    controls: true,
    loop: true,
    width: 320,
    height: 344,
    fluid: true,
    plugins: {
      record: {
        controls: true,
        maxLength: 120,
        debug: true,
        audio: true,
        video: true
      }
    }
}, function(){
    // print version information at startup
    videojs.log('Using video.js', videojs.VERSION,
        'with videojs-record', videojs.getPluginVersion('record'),
        'and recordrtc', RecordRTC.version);
});

// error handling
player.on('deviceError', function() {
    console.log('device error:', player.deviceErrorCode);
});
player.on('error', function(error) {
    console.log('error:', error);
});

// When recording finishes, remove the disabled class from element with id 'tostep-4b'
player.on('finishRecord', function() {
    console.log('Recording finished!');

    var element1 = document.getElementById('tostep-3');
    var element2 = document.getElementById('tostep-3b');

    if (element1) {
        console.log('Removing disabled attribute from element with id "tostep-3"');
        element1.removeAttribute('disabled');
    }
    if (element2) {
        console.log('Removing disabled class from element with id "tostep-3b"');
        element2.classList.remove('disabled');
    }
});
// Assigning the player object to the global window object for debugging purposes
window.player = player;

// CONFETTI

let oldVisibility;
let confettiActive = false;

const getWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { height, width };
};

const placeConfetti = (x, y, angle = 90, particleCount = 100) => {
    const { height, width } = getWindowSize();
    const origin = { x: x / width, y: y / height };
    confetti({ origin, angle, particleCount, spread: 360 });
};

const checkVisibilityState = async () => {
    const isActive = document.visibilityState === "visible";

    if (!oldVisibility) await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(isActive ? "active" : "inactive");

    if (!isActive) {
        // Optional: Reset confetti when inactive
        confetti.reset();
        confettiActive = false;
    }

    oldVisibility = isActive;
};

// Function to start long-duration confetti animation
const startConfettiAnimation = () => {
    if (confettiActive) return;
    
    confettiActive = true;
    const duration = 30 * 1000; // 30 seconds
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end && confettiActive) {
            requestAnimationFrame(frame);
        }
    })();
};

// Function to check for 'step-9-active' class on body
const checkStep9ActiveClass = () => {
    const body = document.body;
    if (body.classList.contains("step-9-active")) {
        startConfettiAnimation();
        checkVisibilityState();
    } else {
        confetti.reset();
        confettiActive = false;
    }
};

// Check for 'step-9-active' class initially
checkStep9ActiveClass();

// Observe changes to the body's class attribute
const bodyObserver = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            checkStep9ActiveClass();
            break;
        }
    }
});

bodyObserver.observe(document.body, { attributes: true });

});