// function _id(tab) { return tab.id; }
// function _index(tab) { return tab.index; }
// function _windowId(tab) { return tab.windowId; }
// function _openerTabId(tab) { return tab.openerTabId; }
// function _selected(tab) { return tab.selected; }
// function _highlighted(tab) { return tab.highlighted; }
// function _active(tab) { return tab.active; }
// function _pinned(tab) { return tab.pinned; }
// function _audible(tab) { return tab.audible; }
// function _discarded(tab) { return tab.discarded; }
// function _autoDiscardable(tab) { return tab.autoDiscardable; }
// function _mutedInfo(tab) { return tab.mutedInfo; }
// function _url(tab) { return tab.url; }
// function _title(tab) { return tab.title; }
// function _favIconUrl(tab) { return tab.favIconUrl; }
// function _status(tab) { return tab.status; }
// function _incognito(tab) { return tab.incognito; }
// function _width(tab) { return tab.width; }
// function _height(tab) { return tab.height; }
// function _sessionId(tab) { return tab.sessionId; }

function discardAllAudibleTabs(callback) {
    var query = { audible: true };
    chrome.tabs.query(queryInfo, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            chrome.tabs.discard(tab.id, function(tab) {
                log("Removed tab from memory. Click tab again to reload." + tab); 
            });
        }
        callback(tabs);
    });
}

function memorySaveMode(callback) {
    var query = { active: false }
    chrome.tabs.query(queryInfo, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            chrome.tabs.discard(tab.id, function(tab) {
                log("Removed tab from memory. Click tab again to reload." + tab); 
            });
        }
        callback(tabs);
    });
}

function getCurrentTab(callback) {
  var queryInfo = { active: true, currentWindow: true };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    // console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(tab);
  });
}

function openEmptyTab(callback) {
    var props = null;
    chrome.tabs.create(props, function(tab) {
        callback(tab);
    });
}

function openNewTab(url, callback) {
    var props = { url: url };
    chrome.tabs.create(props, function(tab) {
        callback(tab);
    });
}

function duplicateTab(tabId, callback) {
    // tabId: integer
    chrome.tabs.duplicate(tabId, function(tab) {
        callback(tab);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTab(function(tab) {
    renderStatus('Current Tab URL: ' + tab.url);
  });

  // API Examples
  // openNewTab({url:"http://www.google.com"}, function(tab) {
  //   log(tab);
  // });

});
