chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.ref === "getCurrentTabTitle") {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      if (tabs && tabs.length > 0) {
        sendResponse({title: tabs[0].title, url: tabs[0].url});
      } else {
        sendResponse({title: "", url: ""});
      }
    });
    return true;
  }
});
