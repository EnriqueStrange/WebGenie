document.addEventListener('DOMContentLoaded', () => {
    let pageData = document.body.innerHTML;
    chrome.storage.local.set({ pageData }, () => {
      console.log('Page data saved.');
    });
  });
  