document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const sliderLabel = document.getElementById('slider-label');

  function updateSliderColor() {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, #4BD865 ${percent}%, #CCCCCC ${percent}%)`;
  }

  function updateSliderValue(value) {
    console.log(`Slider value updated to: ${value}`); // スライダーの値が更新されたことを確認
    slider.value = value;
    sliderLabel.textContent = value;
    updateSliderColor();
  }

  function initializeSlider() {
    chrome.storage.local.get('width', ({ width }) => {
      console.log(`Received width from storage: ${width}`); // ストレージからのwidthの値を確認
      updateSliderValue(width || slider.value);
    });

    slider.addEventListener('input', () => {
      const value = slider.value;
      console.log(`Slider input value: ${value}`); // スライダーの入力値を確認
      chrome.storage.local.set({ width: value });
      updateSliderValue(value);
    });
  }

  initializeSlider();
});