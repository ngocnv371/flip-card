// ==UserScript==
// @name         Download US Pronounce
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.oxfordlearnersdictionaries.com/definition/english/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ele = document.querySelector('.sound.audio_play_button.pron-us.icon-audio');
    if (!ele) {
        return;
    }
    const headword = document.querySelector('.headword').textContent;
    const url = ele.getAttribute('data-src-mp3');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = 'Download';
    link.setAttribute('download', headword);
    ele.parentElement.appendChild(link);
})();