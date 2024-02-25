chrome.runtime.sendMessage({ type: 'getPrompts' }, function(prompts) {
    // 프롬프트 목록 표시
    const promptList = document.getElementById('prompt-list');
    prompts.forEach(function(prompt, index) {
      const listItem = document.createElement('li');
      const useButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      listItem.textContent = prompt;
      listItem.addEventListener('click', function() {
        window.postMessage({ type: 'insertPrompt', prompt });
        window.close();
      });

      useButton.textContent = '사용';
      useButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ type: 'insertPrompt', prompt: prompt });
        location.reload();
      });

      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ type: 'deletePrompt', index: index });
        location.reload();
      });

      promptList.appendChild(listItem);
      promptList.appendChild(useButton);
      promptList.appendChild(deleteButton);
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
  