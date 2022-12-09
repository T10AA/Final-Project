"use strict";
// header background styling while scrolling
let header = document.getElementById('header');

window.onscroll = function () {
    if (document.documentElement.scrollTop >=80) {
        header.classList.add('scrollingHeader');
    }else{
        header.classList.remove('scrollingHeader');
    }
};