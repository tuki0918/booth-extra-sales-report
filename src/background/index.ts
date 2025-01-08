// let data;

chrome.runtime.onInstalled.addListener(async () => {
  console.log("... init ...");
  // Set the manifest data
  // data = { version: chrome.runtime.getManifest().version };
});

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.badgeText !== undefined) {
    await chrome.action.setBadgeText({ text: request.badgeText });
    await chrome.action.setBadgeBackgroundColor({
      color: request.badgeText === "ERR" ? "red" : "green",
    });
  }
});
