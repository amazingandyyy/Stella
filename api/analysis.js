function takeAction(text) {
  text = text.toLowerCase();
  var didAction = doCoreAction(text);
  text = text.toLowerCase().remove(TRIGGER_NAME + " ");
  if (!didAction) didAction = doInteractAction(text);
  if (!didAction) didAction = doBrowserAction(text);
  if (!didAction) didAction = doSearchAction(text);
  if (!didAction) didAction = doTabAction(text);
}

function doCoreAction(text) {
  if (text.contains("what can you do") || text.contains("open help menu") || text.contains("open help")) {
    API.Core.openDocumentation(); return true;
  } else if (text.contains("close help menu") || text.contains("close help")) {
    API.Core.closeDocumentation(); return true;
  } else if (text.contains("hello " + TRIGGER_NAME)) {
    API.Core.focus(); return true;
  } else if (text.contains(TRIGGER_NAME + " go to sleep")) {
    API.Core.goToSleep(); return true;
  } else if (text.contains("continuous analysis")) {
    API.Core.toggleContinuousAnalysis(text); return true;
  } else if (text.contains("be quiet") || text.contains("stop speaking") || text.contains("shut up")) {
    API.Core.stopSpeaking(); return true;
  }
  return false;
}

function doSearchAction(text) {
  console.log(text);
  if (!text.contains("youtube") && (text.contains("search") || text.contains("look up") || text.contains("google"))) {
    API.Search.requestSearch(text, "google"); return true;
  } else if (!text.contains("google") && (text.contains("search") || text.contains("look up") || text.contains("youtube"))) {
    API.Search.requestSearch(text, "youtube"); return true;
  } else if (text.contains("play")) {
    API.Search.youtubeSearch(text); return true;
  } else if (text.isQuestion()) {
    API.Search.answerQuestion(text); return true;
  }
  return false;
}

function doInteractAction(text) {
  if (text.contains("scroll up a little")) {
    API.Interact.Scroll.littleUp(); return true;
  } else if (text.contains("scroll up a lot") || text.contains("scroll up alot")) {
    API.Interact.Scroll.bigUp(); return true;
  } else if (text.contains("scroll up") || text.contains("scroll up more")) {
    API.Interact.Scroll.medUp(); return true;
  } else if (text.contains("scroll down a little")) {
    API.Interact.Scroll.littleDown(); return true;
  } else if (text.contains("scroll down a lot") || text.contains("scroll down alot")) {
    API.Interact.Scroll.bigDown(); return true;
  } else if (text.contains("scroll down") || text.contains("scroll down more")) {
    API.Interact.Scroll.medDown(); return true;
  } else if (text.contains("click on the link that contains") || text.contains("click the link that contains") || text.contains("click on the link that says") || text.contains("click the link that says")) {
    API.Interact.Click.handleLinkClick(text); return true;
  }
  return false;
}

function doBrowserAction(text) {
  if (text.contains("go back")) {
    API.Browser.Window.back(); return true;
  } else if (text.contains("go forward")) {
    API.Browser.Window.forward(); return true;
  } else if (text.contains("refresh the page") || text.contains("refresh page")) {
    API.Browser.Window.refresh(); return true;
  } else if (text.contains("refresh yourself") || text.contains("reset")) {
    API.Browser.Window.refreshApp(); return true;
  }
  return false;
}

function doTabAction(text) {
  if (text.contains("open a new tab") || text.contains("open another tab")) {
    API.Tabs.openEmptyTab(); return true;
  } else if ((text.contains("reopen the last ") || text.contains("re-open the last ") || text.contains("open the last ")) && text.contains("tabs")) {
    API.Tabs.reopenTabs(text); return true;
  } else if ((text.contains("open the ") && text.contains("tab")) || text.contains("go to the ") && text.contains("tab")) {
    API.Tabs.openSpecificTab(text); return true;
  } else if (text.contains("go to ") || text.contains("open ")) {
    API.Tabs.goToWebsite(text); return true;
  } else if (text.contains("mute all audible tabs") || text.contains("close all audible tabs") || text.contains("stop all audible tabs")) {
    API.Tabs.discardNonActiveAudibleTabs(); return true;
  } else if (text.contains("close the current tab") || text.contains("close this tab")) {
    API.Tabs.closeCurrentTab(); return true; // If not voice web
  } else if (text.contains("close the last tab") || text.contains("close last tab")) {
    API.Tabs.closeLastTab(); return true; // If not voice web
  } else if (text.contains("close the first tab") || text.contains("close first tab")) {
    API.Tabs.closeFirstTab(); return true; // If not voice web
  } else if (text.contains("close the first") && text.contains("tabs")) {
    API.Tabs.closePastTabs(text); return true; // If not voice web
  } else if (text.contains("close the last") && text.contains("tabs")) {
    API.Tabs.closeRecentTabs(text); return true; // If not voice web
  } else if (text.contains("close the previous tab") || text.contains("close previous tab")) {
    API.Tabs.closePreviousTab(); return true; // If not voice webclose
  } else if (text.contains("close the previous") && text.contains("tabs")) {
    API.Tabs.closePreviousTabs(text); return true; // If not voice web
  } else if (text.contains("close the next tab") || text.contains("close next tab")) {
    API.Tabs.closeNextTab(); return true; // If not voice webclose
  } else if (text.contains("close the next") && text.contains("tabs")) {
    API.Tabs.closeNextTabs(text); return true; // If not voice web
  } else if (text.contains("close the ") && text.contains("tab")) {
    API.Tabs.closeSpecificTab(text); return true; // If not voice web
  } else if ((text.contains("close the ") && text.contains("tabs")) || (text.contains("closed the ") && text.contains("tabs"))) {
    API.Tabs.closeSpecificTabs(text); return true; // If not voice web
  } else if (text.contains("enter memory save mode")) {
    API.Tabs.discardNonActiveTabs(); return true;
  }
  API.Core.dontUnderstand();
  return false;
}
