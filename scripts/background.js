chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked!");
  
  chrome.tabs.sendMessage(tab.id, {
    type: "GET_CODE",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== "OPEN_IN_NVIM") return;

  fetch("http://127.0.0.1:8765/open", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message.data),
  })
    .then(() => sendResponse({ success: true }))
    .catch((err) => {
      console.error(err);
      sendResponse({
        success: false,
        error: err.message,
      });
    });

  // Keeps the message channel open until sendResponse is called.
  return true;
});
