chrome.runtime.sendMessage({ type: 'getPrompts' }, function(prompts) {
    // 프롬프트 목록 표시
    const promptList = document.getElementById('prompt-list');
    prompts.forEach(function(prompt, index) {
      const promptListItem = document.createElement('li');
      const usePromptButton = document.createElement('button');
      const deletePromptButton = document.createElement('button');

      promptListItem.textContent = prompt;
      promptListItem.addEventListener('click', function() {
        window.postMessage({ type: 'insertPrompt', prompt });
        window.close();
      });

      usePromptButton.textContent = '사용';
      usePromptButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ type: 'insertPrompt', prompt: prompt });
        location.reload();
      });

      deletePromptButton.textContent = '삭제';
      deletePromptButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ type: 'deletePrompt', index: index });
        location.reload();
      });

      promptList.appendChild(promptListItem);
      promptList.appendChild(usePromptButton);
      promptList.appendChild(deletePromptButton);
    });
  
    // '새 프롬프트 추가' 버튼
    const addPromptButton = document.getElementById('add-prompt-button');
    addPromptButton.addEventListener('click', function() {
      const newPrompt = prompt('새 프롬프트를 입력하세요');
      if (newPrompt) {
        chrome.runtime.sendMessage({ type: 'savePrompt', prompt: newPrompt });
        location.reload();
      }
    });
  });
  