const search = document.getElementById('search');
const resultText = document.getElementById('result-text');
const submit = document.getElementById('submit');
const nasaImgs = document.getElementById('images');


// function search images
function searchImages(e){
  e.preventDefault();

  const keyword = search.value;

  //check if a keyword was inputted or not, and operations to perform
  if(keyword.trim()){
    fetch(`https://images-api.nasa.gov/search?description=${keyword}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultText.innerHTML = `<h2>All results for ${keyword}:</h2>`;
        if(data.collection.items.length === 0) {
          resultText.innerHTML = '<h2>No such results exist. Please try again!</h2>';
          //removing previous search text
          search.value = '';
        } else {
          nasaImgs.innerHTML = data.collection.items
          .map((item) =>
            `
          <div class="item">
            <h3 class="item-title">${item.data[0].title}</h3>
            <img id="img" src="${item.links[0].href}"/>
          </div>
          `)
          .join('');
        }
      });
      //removing previous search text
      search.value = '';
      
  } else {
    alert('Nothing has been searched. Please try again!');
  }

}


// Event Listeners
submit.addEventListener('submit', searchImages);

