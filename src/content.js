/*
*@author: Sandy Lewanscheck
*/


// title on top-right of page
var big_title = $('.col-description h1').text();
// check for umlauts - maybe we can avoid those buggers
var umlauts = big_title.match(/[äöüÄÖÜß]+/g);
// assume that title is english - check for original title
var small_title = $('.col-description h2').text();
var myTitle = '';


if(big_title != '' && umlauts == null) {
    myTitle = big_title;
} else {
    myTitle = small_title;
}

if(myTitle != '') {
    // use option - coming from popup.html => div.id
    fetchGoogleIMDBData(fetchIMDBData, myTitle, option);
}


function fetchGoogleIMDBData(callback, myTitle, option) {
    var escapedTitle = escape(myTitle);
    var xhr = new XMLHttpRequest();
    // default URL => The Glass House
    var url = 'http://www.imdb.com/title/tt0221218/';
    xhr.open("GET", "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + escapedTitle + "+site:imdb.com/title", true);
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            //var data = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                if (res.responseData.results && res.responseData.results.length > 0) {
                    var ergebnis = res.responseData.results[0].url + '';
                    var isIMDBlink = ergebnis.toLowerCase().indexOf(('http://www.imdb.com/' + '').toLowerCase());
                    if(isIMDBlink != -1) {
                        url = res.responseData.results[0].url;
                        if(option == 'show') {
                            callback(onResult, url);
                        } else {
                            window.open(url);
                        }
                    } else {
                        callback(onResult, null);
                    }
                } else {
                    callback(onResult, null);
                }
            } else {
                callback(onResult, null);
            }
        }
    };

    xhr.send();
};

function fetchIMDBData(callback, url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;
                callback(data);
            } else {
                callback(null);
            }
        }
    };
    xhr.send();
};



function onResult(data) {
    var ratingMatch = data.match(/<span itemprop="ratingValue">(\d{1,2}[,.]\d{1,2})<\/span>/);
    var rating = 0;
    if(ratingMatch.length > 1) {
        rating = ratingMatch[1];
    } else {
        rating = ratingMatch;
    }
    alert("Rating: " + rating + "/10");
};