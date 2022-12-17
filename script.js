let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
let container = document.getElementById("container2");

function searchWord() {
  let searhcedInput = searchInput.value;
  searchBtn.innerHTML = "Searching...";
  searchBtn.style.opacity = "0.5";
  searchBtn.style.cursor = "none";
  fetch(`${url}${searhcedInput}`)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = `
        <div id="wordSound">
        <h2 id="word">${searhcedInput}</h2>
        <button id="speakerBtn" onclick="speakWord()">
            <i id="speaker" class="fa-solid fa-volume-high"></i>
        </button>
        </div>
        <p id="pronounce">${data[0].meanings[0].partOfSpeech}  ${
        data[0].phonetic
      }</p>
        <p id="definition">${data[0].meanings[0].definitions[0].definition}</p>
        <p id="example">${data[0].meanings[0].definitions[0].example || ""}</p>
        `;

      searchBtn.innerHTML = "Search";
      searchBtn.style.opacity = "1";
      searchBtn.style.cursor = "pointer";
      searchInput.value = "";

    })
    .catch(() => {
      container.innerHTML = `<h2 class="error">${searhcedInput} Not Found !`;
      searchBtn.innerHTML = "Search";
      searchBtn.style.opacity = "1";
      searchBtn.style.cursor = "pointer";
      searchInput.value = "";
    });
}

function speakWord() {
  let utterance = new SpeechSynthesisUtterance(`${searchInput.value}`);
  speechSynthesis.speak(utterance);
}

searchBtn.addEventListener("click", searchWord);