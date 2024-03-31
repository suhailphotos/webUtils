chrome.runtime.onInstalled.addListener(() => {
  console.log('Hello World Extension installed.');
});

chrome.browserAction.onClicked.addListener(() => {
  copyToClipboard('Hello World');
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied to clipboard:', text);
    })
    .catch(error => {
      console.error('Failed to copy to clipboard:', error);
    });
}

