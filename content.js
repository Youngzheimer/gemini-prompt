chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'insertPrompt') {
    console.log(request)
    const prompt = request.prompt;
    document.querySelector("rich-textarea").children[0].children[0].innerText = prompt;

    while (true) {
      const sendIcons = document.querySelectorAll('mat-icon');
      const filteredIcons = Array.from(sendIcons).filter(icon => icon.innerText === 'send');

      if (filteredIcons.length > 0) {
        setTimeout(() => {
          filteredIcons[0].click()
        }, 100);
        break;
      }
    }
  }
});