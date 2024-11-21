(async function () {
  let delayOfHidingWindow = 5; // in second
  let html = await fetch(chrome.runtime.getURL("inject.html")).then((r) => r.text());
  let div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);

  chrome.runtime.onMessage.addListener(function (m, s, sr) {
    if (m.ref === "toggle_body") {
      toogleWindow();
    }
    return true;
  });

  let container = div.querySelector("ex-body");
  async function toogleWindow() {
    if (container.classList.contains("ds-none")) {
      container.classList.remove("ds-none");
      document.getElementById("markdown-desc").value = await getClipboardText();
    } else {
      container.classList.add("ds-none");
    }
  }

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
  let btns = document.querySelectorAll("button[copy]");
  let originalClipboardText = await getClipboardText();
  let url = "-";
  desc.addEventListener("input", function () {
    copyToClipboard(this.value);
    desc.focus();
  });
  chrome.runtime.sendMessage({ref: "getCurrentTabTitle"}, async function (e) {
    title.value = e.title;
    url = e.url;
    // desc.value = originalClipboardText;
    btns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        let t_value = title.value;
        desc.value = await getClipboardText();
        let desc_value = desc.value?.trim();
        let command = this.getAttribute("btn");
        let parsed = "NOT DETECTED";
        if (command == "1") {
          parsed = `- **[${t_value}](${url})** *${desc_value}* \n`;
        } else if (command == "2") {
          parsed = `## [${t_value}](${url})\n *${desc_value}* \n`;
        } else if (command == "3") {
          parsed = `### [${t_value}](${url})\n *${desc_value}* \n`;
        }
        copyToClipboard(parsed);
        if (!container.classList.contains("ds-none")) {
          setTimeout(() => {
            container.classList.add("ds-none");
          }, delayOfHidingWindow * 1000);
        }
      });
    });
  });
  console.log("...Markdown Running...");
})();
