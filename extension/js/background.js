/*
 * File: background.js
 *
 * Created: 17 abr 2018 09:16:27
 * Last Modified: 22 abr 2018 00:47:35
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

browser.runtime.onMessage.addListener(function(request) {
  if ('genPassword' === request.message) {
    browser.runtime.sendMessage({
      'message': 'setPassword',
      'pwd': request.pwd
    });
  }
});

