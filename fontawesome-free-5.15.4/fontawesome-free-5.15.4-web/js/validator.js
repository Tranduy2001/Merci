function Validator(options) {
    var selectorRules = {};
    var count = 0;
    function validate(inputElement, rule) {
        var errorElement = inputElement
            .closest("div")
            .querySelector(options.errorSelector);
        var errorMessage;
        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
            count++;
        }

        if (count == options.rules.length) {
            // formElement.submit();
            const regisBtn = document.querySelector('.js-auth-form-register')
            const modal = document.querySelector('.js-modal')
            const modalauthform = document.querySelector('.js-auth-form')
            function showAuthForm(){
                    modal.classList.add('open')
            }
            function hideAuthForm(){
                    modal.classList.remove('open')
            }      
            regisBtn.addEventListener('click', showAuthForm)
            
            modal.addEventListener('click',hideAuthForm)
            modalauthform.addEventListener('click',function(event) {
                  event.stopPropagation()
            })
        }
    }

    var formElement = document.querySelector(options.form);

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            count = 0;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);
            });
        };
        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.oninput = function () {
                    var errorElement = inputElement
                        .closest("div")
                        .querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                };
            }
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message;
        },
    };
};

// validate input radio
$("#customer-form-submit").on("click", function () {
    const radios = document.getElementsByName("external_character");
    const valRadio = radios[0].closest("td").querySelector(".message-validate");
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            valRadio.innerText = "";
        } else {
            valRadio.innerText = "エラーメッセージが入ります";
        }
    }
});
$("#customer-form__order").on("change", function (e) {
    const radios = document.getElementsByName("external_character");
    const valRadio = radios[0].closest("td").querySelector(".message-validate");
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            valRadio.innerText = "";
        }
    }
});