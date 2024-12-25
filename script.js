document.addEventListener('DOMContentLoaded', function() {
    onload=function(){
        close=document.querySelector('.modal__close');
        modal=document.querySelector('.modal');
        spinBtn=document.querySelector(".spinBtn");
        round=0; //start from second spin
        close.addEventListener('click',function(){
            event.preventDefault();
            event.stopPropagation();
            document.querySelector(".modal").style.opacity="0";
            modal.close();
        });
        spinBtn.addEventListener('click', Spin);
        
        Select();
    }
    
    function Select() {
        return;
        var s = document.getElementsByClassName("select--main");
        for (i = 0; i < s.length; i++) {
            s[i].addEventListener('click', function(event) {
                if (event.target.tagName.toLowerCase() !== 'input') {
                    var selectMenu = this.nextElementSibling;
                    if (selectMenu.style.display == "none" || selectMenu.style.display === "") {
                        selectMenu.style.display = "block";
                    } else {
                        selectMenu.style.display = "none";
                    }
                }
            });
        }
    }
    
    function Spin(){
        let soundSpin1 = document.getElementById('spin1');
        let soundSpin2 = document.getElementById('spin2');
        let soundMusic = document.getElementById('music');

        switch(round) {
            case 0:
                event.preventDefault();
                event.stopPropagation();
                spinBtn.removeEventListener('click', Spin);
                document.querySelector(".wheel").classList.add("clicked");
                document.querySelector(".wheel__block").classList.add("wheel--activefirst");
                document.querySelector(".attempts__num").innerHTML = "1";

                soundSpin1.play();
                soundSpin2.volume = 0.3;
                soundSpin2.play();
                soundMusic.volume = 1;
                soundMusic.play();

                setTimeout(function(){
                    round++;
                    spinBtn.addEventListener('click', Spin);
                    document.querySelector(".wheel").classList.remove("clicked");
                    document.querySelector('.segment.seg6').classList.add('win');
                    document.querySelector('.segment.seg6').classList.add('win-try');
                    soundMusic.pause();
                },6500);
                break;
            case 1:
                event.preventDefault();
                event.stopPropagation();
                spinBtn.removeEventListener('click', Spin);
                document.querySelector(".wheel").classList.add("clicked");
                document.querySelector(".wheel__block").classList.add("wheel--activesecond");
                document.querySelector('.segment.seg6').classList.remove('win');
                document.querySelector('.segment.seg6').classList.remove('win-try');
                document.querySelector(".attempts__num").innerHTML = "0";
                soundSpin1.play();
                soundSpin2.volume = 0.3;
                soundSpin2.play();
                soundMusic.currentTime = 0
                soundMusic.volume = 1;
                soundMusic.play();

                setTimeout(function(){
                    let winSeg = document.querySelector('.segment.seg7');
                    winSeg.classList.add('win');
                },6000);

                setTimeout(function(){
                    soundMusic.volume = 0.5;
                    let soundWin1 = document.getElementById('winsound');
                    soundWin1.play();
                    let soundWin2 = document.getElementById('chips');
                    soundWin2.volume = 0.6;
                    soundWin2.play();

                    modal.close();
                    modal.showModal();
                    document.querySelector(".modal").style.opacity="1";
                    round++;
                    spinBtn.addEventListener('click', Spin);
                },8500);
                break;
            default: 
                modal.close();
                modal.showModal();
                document.querySelector(".modal").style.opacity="1";
        }
    }

    const timerElem = document.querySelector('.timer .timecells');
    const hourElem = document.querySelector('.cell.hour');
    const minElem = document.querySelector('.cell.min');
    const secElem = document.querySelector('.cell.sec');

    const hT1 = document.querySelector('.spinnow');
    const hT2 = document.querySelector('.getbonus');
    const hT3 = document.querySelector('.foraviator');

    function processStarText(text) {
        return text.replace(/\*(.*?)\*/g, '<span class="yellow">$1</span>');
    }

    let sub_id8 = getQueryParam('sub_id8');
    if (sub_id8 != '') {
        let parts = sub_id8.split('|');
        if (parts.length > 1) {
            try {
                if (parts[1] != '') {
                    hT1.innerHTML = processStarText(parts[1]);
                } else {
                    hT1.style.display = none;
                }
                if (parts[2] != '') {
                    hT2.innerHTML = processStarText(parts[2]);
                } else {
                    hT2.style.display = none;
                }
                if (parts[3] != '') {
                    hT3.innerHTML = processStarText(parts[3]);
                } else {
                    hT3.style.display = none;
                }
                if (parts[4] != '') {
                    if (Number(parts[4]) > 0){
                        let currentTime = Date.now();
                        endTime = currentTime + Number(parts[4]) * 60000;
                        sessionStorage.setItem('startTime', endTime.toString());
                    }
                }
            } catch(error) {
                formElement.classList.add('err-summary');
            };            
        }
    }

    function initializeTimer() {
        let startTime = sessionStorage.getItem('startTime');
        let currentTime = Date.now();
        let endTime;

        //add time from parameter


        if (startTime && currentTime < parseInt(startTime)) {
            endTime = parseInt(startTime);
        } else {
            let randomMinutes = Math.floor(Math.random() * (29 - 19 + 1)) + 25;
            let randomSeconds = Math.floor(Math.random() * 59);
            endTime = currentTime + randomMinutes * 60000 + randomSeconds * 1000;
            sessionStorage.setItem('startTime', endTime.toString());
        }

        updateTimer(endTime);
    }

    function updateTimer(endTime) {
        let timerInterval = setInterval(function() {
            let now = Date.now();
            let distance = endTime - now;

            if (distance < 0) {
                hourElem.textContent ='00';
                minElem.textContent ='00';
                secElem.textContent ='00';
                return;
            }

            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            hourElem.textContent = hours < 10 ? '0' + hours : hours;
            minElem.textContent = minutes < 10 ? '0' + minutes : minutes;
            secElem.textContent = seconds < 10 ? '0' + seconds : seconds;
            timerElem.classList.toggle('blink');
        }, 500);
    }
    initializeTimer();

    let plane1FlyIn = setInterval(function() {
        let largePlane = document.querySelector('.plane');
        if (largePlane) {
            largePlane.classList.add('on');
        }
    }, 3000);
    let plane2FlyIn = setInterval(function() {
        let largePlane = document.querySelector('.plane2');
        if (largePlane) {
            largePlane.classList.add('on');
        }
    }, 4000);
    let cloudsFly = setInterval(function() {
        let clouds = document.querySelectorAll('.cloud');

        clouds.forEach(cloud => {
            cloud.classList.add('on');
        });
    }, 3000);
    let ystarsBlink = setInterval(function() {
        let ystars = document.querySelectorAll('.ystar');

        ystars.forEach(ystar => {
            ystar.classList.add('on');
        });
    }, 3000);
    let girlOn = setInterval(function() {
        let girls = document.querySelectorAll('.girl');

        girls.forEach(girl => {
            girl.classList.add('on');
        });
    }, 1000);

    const mainFlagImg = document.querySelector('.select__flag .flagImg');
    const mainCountryCode = document.querySelector('.select__text .select__curIcon');
    const menu = document.querySelector('.select__menu');

    menu.addEventListener('click', function(event) {
        let target = event.target;
        while (target !== menu && !target.classList.contains('select--li')) {
            target = target.parentNode;
        }
        if (target.classList.contains('select--li')) {
            const flagSrc = target.querySelector('.select__flag img').src;
            const countryCode = target.querySelector('.select__curIcon').textContent;
            mainFlagImg.src = flagSrc;
            mainCountryCode.textContent = countryCode;
            menu.style.display = 'none';
            console.log(target);
        }
    });

    const togglePasswordBtn = document.querySelector('.passBtn');
    const passwordInput = document.getElementById('password');

    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.classList.add('on');
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.classList.remove('on');
        }
    });

    //Form
    const form = document.getElementById('join-now-form');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const formElement = document.getElementById('join-now-form');
        //formElement.classList.remove('err-email');
        formElement.classList.remove('err-password');
        formElement.classList.remove('err-tel');
        formElement.classList.remove('err-summary');

        const formData = new FormData(formElement);

        let dataFailed = false;
        //if (!validateEmail(formData.get('email'))) {
        //    formElement.classList.add('err-email');
        //    dataFailed = true;
        //}
        
        if (!validatePassword(formData.get('password'))) {
            formElement.classList.add('err-password');
            dataFailed = true;
        }
        
        if (!validateTel(formData.get('tel'))) {
            formElement.classList.add('err-tel');
            dataFailed = true;
        }

        if (dataFailed) {
            return;
        }

        const payload = {
            bonus_id: 3957,
            checkbox1: true,
            checkbox2: true,
            confirm_subscribers: ["news"],
            click_id: getQueryParam('click_id'),
            currency: "INR",
            is_promo: false,
            password: formData.get('password'),
            phone_code: "IN",
            username: '+91' + formData.get('tel'),
            set_deposit_modal_type: false,
            type: "1",
            user_device: "web_browser",
            has_new_password_rules:"0",
        };

        try {
            fetch('https://api.4rabetsite.com/api/v3/registration', {
                method: 'POST',
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.redirect_url) {

                    const url = new URL(data.redirect_url);
                    const urlParams = new URLSearchParams(url.search);
                    urlParams.set('deposit', '1');
                    url.search = urlParams.toString();
                    redirectUrl = url.toString();

                    window.location.href = redirectUrl;
                } else {
                    formElement.classList.add('err-summary');
                }
            })
            .catch(error => {
                formElement.classList.add('err-summary');
            });
        } catch(error) {
            formElement.classList.add('err-summary');
        };
    });


    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validateTel(tel) {
        const regex = /^[\d\s().-]+$/;
        return regex.test(tel) && tel.replace(/[\D]/g, '').length >= 9;
    }

    function getQueryParam(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results || !results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const currentClickId = getQueryParam('click_id');
    function isAbsoluteUrl(url) {
        return /^(?:[a-z]+:)?\/\//i.test(url);
    }

    document.querySelectorAll('a').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (currentClickId && href && isAbsoluteUrl(href) && !href.startsWith('#')) {
            const url = new URL(href);
            url.searchParams.set('click_id', currentClickId);
            anchor.setAttribute('href', url.toString());
        }
    });
});