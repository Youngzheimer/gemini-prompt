chrome.storage.local.get(['prompts'], function(result) {
    let prompts = result.prompts || [];
  
    // 프롬프트 저장 함수
    function savePrompt(prompt) {
      prompts.push(prompt);
      chrome.storage.local.set({ prompts });
    }
  
    // 프롬프트 목록 가져오기 함수
    function getPrompts() {
      return prompts;
    }
  
    // 프롬프트 삭제 함수
    function deletePrompt(index) {
      prompts.splice(index, 1);
      chrome.storage.local.set({ prompts });
    }

    // 프롬프트 삽입
    function insertPrompt(prompt) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'insertPrompt', prompt: prompt });
      });
    }
  
    // 메시지 리스너 설정
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      switch (request.type) {
        case 'savePrompt':
          savePrompt(request.prompt);
          break;
        case 'insertPrompt':
          console.log(request)
          insertPrompt(request.prompt);
          break;
        case 'getPrompts':
          sendResponse(getPrompts());
          break;
        case 'deletePrompt':
          deletePrompt(request.index);
          break;
      }
    });
  });
  