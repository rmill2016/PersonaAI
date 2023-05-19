// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.sendMessage({ message: 'Login' }, (response) => {})
})
