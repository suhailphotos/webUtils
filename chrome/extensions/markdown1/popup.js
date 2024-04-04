document.addEventListener("DOMContentLoaded", function () {
  // Create a hiddenInput element off-screen
  var hiddenInput = document.getElementById("hidden");
  function copyToClipboard(text) {
    hiddenInput.value = text;
    hiddenInput.select();
    document.execCommand("copy");
  }
  async function getClipboardText() {
    hiddenInput.focus();
    if (document.hasFocus()) {
      return await navigator.clipboard.readText();
    } else {
      document.execCommand("paste");
      return hiddenInput.value;
    }
  }

  let title = document.getElementById("markdown-title");
  let desc = document.getElementById("markdown-desc");
  let btn = document.getElementById("markdown-btn");
  let url = "-";
  chrome.runtime.sendMessage({ref: "getCurrentTabTitle"}, async function (e) { 
    title.value = e.title;
    url = e.url;
    desc.value = await getClipboardText();
    btn.addEventListener("click", function () {
      let t_value = title.value;
      let desc_value = desc.value;
      let parsed = `- **[${t_value}](${url})** *${desc_value}*<br>`;
      copyToClipboard(parsed);
    });
  });
});
