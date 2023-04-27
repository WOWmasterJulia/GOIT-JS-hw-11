import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more');

let inpValue = '';
let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    
});
// console.dir(searchFormEl);

searchFormEl.addEventListener('submit', searchForm);

function searchForm(evt) {
    evt.preventDefault(evt);
    console.log(evt.target.elements[0].value);
    inpValue = evt.target.elements[0].value.trim();
    if (inpValue === '') {
    return
    }
    galleryEl.innerHTML = "";
    // console.log(inpValue);
    getSearch(inpValue).then(data => {     
        if (data.hits.length === 0) {
            // countryEl.innerHTML = '';
            // listEl.innerHTML = '';
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        console.log(data.hits);
        const markupcard = data.hits.map((el) => `
        <div class="photo-card">
            <a class="gallery__link" href="${el.largeImageURL}"><img src="${el.webformatURL}" alt="${el.tags}" width="250" height="200" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                <b>Likes${el.likes}</b>
                </p>
                <p class="info-item">
                <b>Views${el.views}</b>
                </p>
                <p class="info-item">
                <b>Comments${el.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads${el.downloads}</b>
                </p>
            </div>
        </div>`).join("");
        galleryEl.style.display = "flex";
        galleryEl.style.flexWrap = "wrap";
        galleryEl.insertAdjacentHTML('beforeend', markupcard);
        // gallery.refresh();
        // galleryEl.innerHTML = markupcard;

        // listEl.style.listStyle = "none";
        // listEl.style.fontSize = "25px";
        // listEl.style.alignItems = "center";
        

} )
    .catch (err => {
        if(err.message === '404') {        
        Notiflix.Notify.failure("Oops....");
            searchFormEl.innerHTML = '';
            // listEl.innerHTML = '';
            // inputEl.value = '';
        }
        console.log(err);
    });
}

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35792942-c738c06de8752e63923c1b94a";
// const URL = `${BASE_URL}?key=${API_KEY}&q=${inpValue}&page=${page}$per_page=40`;
function getSearch() {          
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${inpValue}&page=1&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });  
}
//  getSearch().then(data => console.log(data)).catch(err => console.log(err))


   //  const params = new URLSearchParams({
    //     // limit: 40,
    //      page: 1,
    //      per_page: 40,
        
//         // key: API_KEY,
//         // q: cat,
//         // image_type: photo,
//         // orientation: horizontal,
//         // safesearch: true
    //  });
    //      const option = {
    //          method: 'GET',
    //          headers: {
    //              Authorization: `Bearer ${API_KEY}`
    //          }
    //      }
    // fetch(`${BASE_URL}${API_KEY}${params}`).then(resp => console.log(resp))
//  }
//  getSearch();