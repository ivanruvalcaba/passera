/*
 * File: popup.js
 *
 * Created: 17 abr 2018 01:05:34
 * Last Modified: 22 abr 2018 11:41:37
 *
 * Copyright (C) 2018  Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 * Author: Iván Ruvalcaba <mario.i.ruvalcaba[at]gmail[dot]com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global pwGen */

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('buttonGenerate').addEventListener('click', function() {
    const phrase = document.getElementById('passPhrase').value;
    const phraserep = document.getElementById('comparePassPhrase').value;
    let len = document.getElementById('passPhraseLength').value;
    const chars = document.getElementById('includeSpecialChars').checked;

    if (phrase !== phraserep && phraserep.length > 0) {
      document.getElementById('displayMesssage').innerHTML = 'Passwords did not match.';
      return;
    }

    if (len > 64) {
      len = 64;
      document.getElementById('passPhraseLength').value = '64';
    }

    if (len < 4) {
      len = 4;
      document.getElementById('passPhraseLength').value = '4';
    }

    document.getElementById('passPhrase').value = '';
    document.getElementById('comparePassPhrase').value = '';
    document.getElementById('displayMesssage').innerHTML = 'Please wait...';

    pwGen(phrase, len, chars);
  });
});

browser.runtime.onMessage.addListener(function(request) {
  if ('setPassword' === request.message) {
    const displayMesssage = document.getElementById('displayMesssage');
    const hideMesssage = document.getElementById('hide');
    const setPassword = document.getElementById('password');

    while (displayMesssage.firstChild) {
      displayMesssage.removeChild(displayMesssage.firstChild);
    }

    displayMesssage.appendChild(document.createTextNode(request.pwd));
    setPassword.value = request.pwd;
    hideMesssage.innerHTML = '<a id="copy">[Copy]</a>';
    document.getElementById('copy').addEventListener('click', function() {
      setPassword.select();
      document.execCommand('copy');
      browser.runtime.reload();
    });
  }
});
