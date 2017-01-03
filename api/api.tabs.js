function openEmptyTab() {
  Tabs.openEmpty(function(tab) {
    log("New Empty Tab Created: " + JSON.stringify(tab));
  });
}

function openSpecificTab(text) {
  var textArr = text.split(" ");
  var num = ordinalToNum(textArr[textArr.indexOf("tab") - 1]);
  var index = num - 1;
  Tabs.openSpecificTab(index, function(tab) {
    responseMessage((textArr[textArr.indexOf("tab") - 1]) + " tab opened: " + tab.url);
  });
}

function discardNonActiveAudibleTabs() {
  responseMessage('Muted all audible tabs.');
  Tabs.muteTabs(function(tabs) {
    log("Muted all audible tabs " + tabs);
  });
}

function closeCurrentTab() {
  Tabs.closeCurrent(function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeLastTab() {
  Tabs.closeLastTabs(1, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeFirstTab() {
  Tabs.closeFirstTabs(1, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closePastTabs(text) {
  var num = text.match(/[0-9]+\s(tabs)/g);
  if (num) {
    num = num[0].replace(" tabs", "");
  } else {
    var textArr = text.split(" ");
    num = textTonum(textArr[textArr.indexOf("first") + 1]);
  }
  Tabs.closeFirstTabs(num, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeRecentTabs(text) {
  var num = text.match(/[0-9]+\s(tabs)/g);
  if (num) {
    num = num[0].replace(" tabs", "");
  } else {
    var textArr = text.split(" ");
    num = textTonum(textArr[textArr.indexOf("last") + 1]);
  }
  Tabs.closeLastTabs(num, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closePreviousTab() {
  console.log('closing previous tab');
  Tabs.closePrevTabs(1, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closePreviousTabs(text) {
  var num = text.match(/[0-9]+\s(tabs)/g);
  if (num) {
    num = num[0].replace(" tabs", "");
  } else {
    var textArr = text.split(" ");
    num = textTonum(textArr[textArr.indexOf("previous") + 1]);
  }
  console.log('closing previous' + num + 'tabs');
  Tabs.closePrevTabs(num, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeNextTab() {
  console.log('closing next tab');
  Tabs.closeNextTabs(1, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeNextTabs(text) {
  var num = text.match(/[0-9]+\s(tabs)/g);
  if (num) {
    num = num[0].replace(" tabs", "");
  } else {
    var textArr = text.split(" ");
    num = textTonum(textArr[textArr.indexOf("next") + 1]);
  }
  console.log('closing next' + num + 'tabs');
  Tabs.closeNextTabs(num, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeSpecificTab(text) {
  var textArr = text.split(" ");
  var num = ordinalToNum(textArr[textArr.indexOf("tab") - 1]);
  console.log('closing the ' + (textArr[textArr.indexOf("tab") - 1]) + ' tab');
  var index = num - 1;
  Tabs.closeSpecificTabs(index, index, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function closeSpecificTabs(text) {
  var textArr = text.split(" ");
  var startNum = ordinalToNum(textArr[textArr.indexOf("the") + 1]);
  var endNum = ordinalToNum(textArr[textArr.indexOf("tabs") - 1]);
  console.log('closing the ' + (textArr[textArr.indexOf("the") + 1]) + ' to ' + (textArr[textArr.indexOf("tabs") - 1]) + 'tabs');
  var start = startNum - 1;
  var end = endNum - 1;
  Tabs.closeSpecificTabs(start, end, function(tab) {
    responseMessage("Closed tab: " + tab.url);
  });
}

function discardNonActiveTabs() {
  Tabs.memSave(function (tabs) {
    log("Dicarded the following tabs from memory: " + tabs);
  });
}

API.Tabs = {
  openEmptyTab: openEmptyTab,
  openSpecificTab: openSpecificTab,
  discardNonActiveAudibleTabs: discardNonActiveAudibleTabs,
  closeCurrentTab: closeCurrentTab,
  closeLastTab: closeLastTab,
  closeFirstTab: closeFirstTab,
  closePastTabs: closePastTabs,
  closeRecentTabs: closeRecentTabs,
  closePreviousTab: closePreviousTab,
  closePreviousTabs: closePreviousTabs,
  closeNextTab: closeNextTab,
  closeNextTabs: closeNextTabs,
  closeSpecificTab: closeSpecificTab,
  closeSpecificTabs: closeSpecificTabs,
  discardNonActiveTabs: discardNonActiveTabs
}
