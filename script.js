// 로그인 확인
function checkPassword() {
  const passwordInput = document.getElementById('password').value;
  const correctPassword = '090921';
  if (passwordInput === correctPassword) {
    window.location.href = 'diary.html';
  } else {
    document.getElementById('error-message').textContent = '비밀번호가 틀렸습니다.';
  }
}

// 여러 개의 일기 저장 및 관리
let entries = JSON.parse(localStorage.getItem('entries')) || {};

window.onload = function() {
  displayEntries();
};

function saveEntry() {
  const title = document.getElementById('entryTitle').value;
  const content = document.getElementById('diaryContent').value;
  if (title && content) {
    entries[title] = content;
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
    document.getElementById('status-message').textContent = '일기가 저장되었습니다!';
  } else {
    alert('제목과 내용을 입력하세요!');
  }
}

function displayEntries() {
  const entryList = document.getElementById('entryList');
  entryList.innerHTML = '';
  for (let title in entries) {
    const li = document.createElement('li');
    li.textContent = title;
    li.onclick = () => {
      document.getElementById('entryTitle').value = title;
      document.getElementById('diaryContent').value = entries[title];
    };
    entryList.appendChild(li);
  }
}

// 테마 이미지 적용
function applyTheme() {
  const themeUploader = document.getElementById('themeUploader');
  const file = themeUploader.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      localStorage.setItem('themeImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// 파일 내보내기 및 불러오기
function exportData() {
  const data = JSON.stringify({ entries, themeImage: localStorage.getItem('themeImage') });
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-diary.json';
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const importedData = JSON.parse(e.target.result);
      entries = importedData.entries || {};
      localStorage.setItem('entries', JSON.stringify(entries));
      if (importedData.themeImage) {
        document.body.style.backgroundImage = `url(${importedData.themeImage})`;
        localStorage.setItem('themeImage', importedData.themeImage);
      }
      displayEntries();
    };
    reader.readAsText(file);
  }
}
