// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
*@author: Sandy Lewanscheck
* based on Chrome Extension example
*/
function click(e) {
    var option1 = e.target.id;
    chrome.tabs.executeScript(null, {file: "jquery-1.7.2.min.js"}, function(){
        chrome.tabs.executeScript(null, {code: "var option = '" + e.target.id + "';"}, function(){
            chrome.tabs.executeScript(null, { file: "content.js" });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
