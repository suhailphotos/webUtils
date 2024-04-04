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

chrome.action.onClicked.addListener(function (e) {
  chrome.tabs.sendMessage(e.id, {ref: "toggle_body"}, function (e) {
    if (chrome.runtime.lastError) {
      console.log("====================================");
      console.log(chrome.runtime.lastError.message);
      console.log("====================================");
    }
  });
});
