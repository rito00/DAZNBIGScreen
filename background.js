chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed, setting initial width value to 100'); // 拡張機能がインストールされ、初期値を設定
  chrome.storage.local.set({ width: 100 });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log(`Tab updated: ${tab.url}`); // タブが更新されたことを確認
    if (tab.url.startsWith('https://www.dazn.com/')) {
      chrome.action.enable(tabId);
    } else {
      chrome.action.disable(tabId);
    }
  }
});