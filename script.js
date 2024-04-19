let styleElement = document.querySelector('style[data-style="dynamic-width"]'); // カスタムデータ属性を使用して要素を識別

function updateWidth(width) {
  console.log(`Updating width to: ${width}%`); // 更新された幅をコンソールに出力
  removeMaxWidth()

  if (styleElement && styleElement.parentNode === document.head) {
    document.head.removeChild(styleElement);
  }

  styleElement = document.createElement('style');
  styleElement.setAttribute('data-style', 'dynamic-width'); // 要素にカスタムデータ属性を追加
  styleElement.type = 'text/css';

  styleElement.textContent = `
    @media (min-width: 1180px) {
      .video-content__video-content-container___3ymlX {
        width: ${width}% !important;
      }
    }
  `;

  document.head.appendChild(styleElement);
}

function removeMaxWidth() {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = `
    .main__player-main-overrides___udExH {
      max-width: none !important;
    }
  `;
  document.head.appendChild(styleElement);
  console.log(`Removed Max Width Constraint`);
}

chrome.storage.local.get('width', ({ width }) => {
  if (width) {
    updateWidth(width);
    removeMaxWidth();
  } else {
    console.log('Width value not found'); // widthが見つからない場合のメッセージ
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.width) {
    console.log(`Width changed to: ${changes.width.newValue}%`); // 変更された幅をコンソールに出力
    updateWidth(changes.width.newValue);
  }
});