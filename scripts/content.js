function injectPageScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("scripts/page.js");

  script.onload = () => script.remove();

  (document.head || document.documentElement).appendChild(script);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "GET_CODE") {
    injectPageScript();
  }
});

function sendDataToNvim(data) {
  chrome.runtime.sendMessage({
    type: "OPEN_IN_NVIM",
    data,
  });
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.source === "leetcode-extension") {
    console.log(event.data)
    sendDataToNvim(event.data);
  }
});
