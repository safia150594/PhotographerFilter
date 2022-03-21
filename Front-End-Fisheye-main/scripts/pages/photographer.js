//Mettre le code JavaScript lié à la page photographer.html
/*
init
get id from url
*/const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
async function getPhotographers() {
  const photographerJson = await getPhotographersApi();
  return photographerJson;
}
async function getMediaByPhotographersId(id) {
    const mediaa = await getPhotographers();
    const media = mediaa.media.filter(mediaObj => mediaObj.photographerId == id);
    return {media};
}
var medias;
 function setPhotographers(media){
 medias = media;
} 
 function getUpdatedPhotographers(){
  return medias;
  } 


 function clickLike(id){
   let updatedJsonMedia=getUpdatedPhotographers();
   const indexOfmMedia = updatedJsonMedia.findIndex(item => item.id == id);
   console.log(!!updatedJsonMedia[indexOfmMedia].isLiked);
   console.log(!updatedJsonMedia[indexOfmMedia].isLiked);
   console.log(updatedJsonMedia[indexOfmMedia].isLiked);
if(!!updatedJsonMedia[indexOfmMedia].isLiked){
  updatedJsonMedia[indexOfmMedia].isLiked = false;
  updatedJsonMedia[indexOfmMedia].likes=updatedJsonMedia[indexOfmMedia].likes-1
}else{
  updatedJsonMedia[indexOfmMedia].isLiked = true;
  updatedJsonMedia[indexOfmMedia].likes=updatedJsonMedia[indexOfmMedia].likes+1
}
   console.log(updatedJsonMedia[indexOfmMedia].likes);
   setPhotographers(updatedJsonMedia);
  // displayMediaData(updatedJsonMedia);
//   let selectOption = document.querySelectorAll('.filter__custom-option');
//   // console.log(filter)
//   selectOption.forEach(option => option.addEventListener('click', () => {
//     // console.log(option)
//   let filter = option.getAttribute('data-value');
//   console.log(filter);
//   filterSort(filter);
// }));
 
  }
async function getPhotographersById(id) {

  const photographerJson = await getPhotographersApi();
  console.log(photographerJson);
  const photographers = photographerJson.photographers.find(item => item.id == id);
  const media = photographerJson.media.filter(mediaObj => mediaObj.photographerId == id);
  console.log(photographers);
  var fromjson = {
    media: media,
    photographers: photographers
  }
  console.log(media);
  // et bien retourner le tableau photographers seulement une fois
  return (fromjson);
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographDetils");
  const photographerModel = photographerFactory(photographers);
  console.log(photographerModel);
  const userCardDOM = photographerModel.getUserDetailDOM();
  photographersSection.insertAdjacentHTML('beforeend', userCardDOM);

  const PhotographerPriceSection1 = document.querySelector(".price");
  console.log(PhotographerPriceSection1);
  const totalPrice = photographerFactory(photographers);
  const priceCardDOM = totalPrice.getPriceDOM();
  PhotographerPriceSection1.insertAdjacentHTML('beforeend', priceCardDOM);
  // photographersSection.appendChild(userCardDOM)
  // photographersSection.appendChild(userCardDOM);
};
async function displayMediaData(media) {
  var x = media;
  let mediaSection = document.querySelector(".mediaListView");
  mediaSection.innerHTML="";
  x.forEach((media, index) => {
    let mediaModel = mediaFactory(media);
    let mediaCardDOM = mediaModel.getMediaDOM(index);
    mediaSection.insertAdjacentHTML('beforeend', mediaCardDOM);
  });
  const mediaSection1 = document.querySelector(".total__likes"); 
  mediaSection1.innerHTML="";
  const mediaModel = mediaFactory(media);
  const totalMediaLike = mediaModel.getTotalLike();
  console.log(totalMediaLike)
  mediaSection1.insertAdjacentHTML('beforeend', totalMediaLike);
};
async function filterSort(x){
const mediaa = getUpdatedPhotographers();
const media = mediaa.filter(mediaObj => mediaObj.photographerId == id);


switch (x) {
  case 'title':
    media.sort((a, b) => {
      let fa = a.title,
          fb = b.title;
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });
    break;

    case 'likes':
      media.sort((a, b) => b.likes - a.likes);
    break;
    case 'date':
      media.sort((a, b) => {
        let da = new Date(a.date),
            db = new Date(b.date);
        return da - db;
    });
      break;
  default:
     media; 
    break;
}

// if('title' == x){
//      media.sort((a, b) => {
//       let fa = a.title,
//           fb = b.title;
  
//       if (fa < fb) {
//           return -1;
//       }
//       if (fa > fb) {
//           return 1;
//       }
//       return 0;
//   });
// }else if('date' == x)
// {
//   media.sort((a, b) => {
//     let da = new Date(a.date),
//         db = new Date(b.date);
//     return da - db;
// });
// }else if('likes'=== x)
// {
//   media.sort((a, b) => b.likes - a.likes);
// }
displayMediaData(media);

}
//formValue json
function Reset() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById('email').value = "";
  document.getElementById('textArea').value = "";
}
async function formSubmit(){ 
  var name = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var textArea = document.getElementById("textArea").value;
  var ourForm= name+ ""+lastname+"" +email+""+textArea;
  console.log(ourForm);
  Reset();
}

async function init() {
  // Récupère les datas des photographes
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const { photographers, media } = await getPhotographersById(id);
  setPhotographers(media);
  displayMediaData(media);
  displayData(photographers);
};


// lightbox
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
// showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(index, currenElemen) {
  // console.log(title);
  showSlides(slideIndex = index);
}

function showSlides(n) {
  var y=getUpdatedPhotographers();
  var currentTitle=y[n].title;
  var slides = document.getElementsByClassName("slider-img");
  if (n > slides.length) { slideIndex = 1 }

  if (n < 1) { slideIndex = slides.length }

  console.log(slides[n]);
  console.log(slides[n].children[0].src);
  var path = slides[n].children[0].tagName == 'IMG' ? slides[n].children[0].src : slides[n].children[0].children[0].src;
  

  console.log(n);

  var htmlMedia;
  if (path.split(".")[1] == 'mp4') {
    htmlMedia = `<video class="mediaVideo slider-img" controls="" >
    <source src="${path}" type="video/mp4" id="slider-video-url">
    </video>
    <h1>${currentTitle}</h1>`
  } else {
    htmlMedia = `<img src="${path}" class="slider-img" style="width:100%" id="slider-img-url">  <h1>${currentTitle}</h1>`
  }
  document.getElementById('showSlider').innerHTML = htmlMedia;

  // for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  // }

  // slides[slideIndex-1].style.display = "block";
}

function toggle() {
  var toggelForm = document.getElementsByClassName("modalForm")[0];
  if (toggelForm.style.display == "block") {
    toggelForm.style.display = "none";
  } else {
    toggelForm.style.display = "block";
  }
}

//filter
// var defaultPopularity = document.getElementById("popularite").style.display = "none ";
// var filterValue;
// var filterOnClickHide;
// function popularite() {
//   filterValue = document.getElementById("demo").innerHTML = "Popularity ";
//   document.getElementById("popularite").style.display = "none";
//   document.getElementById("date").style.display = "block";
//   document.getElementById("titleMedia").style.display = "block";
//   filterOnClickHide = document.getElementById("myDropdown");
//   filterOnClickHide.style.display = "none";
//   return filterValue;
// }
// function date() {
//   var filterValue = document.getElementById("demo").innerHTML = "Date";
//   document.getElementById("popularite").style.display = "block";
//   document.getElementById("date").style.display = "none";
//   document.getElementById("titleMedia").style.display = "block";
//   filterOnClickHide = document.getElementById("myDropdown");
//   filterOnClickHide.style.display = "none";
//   return filterValue;
// }
// function titleMedia() {
//   var filterValue = document.getElementById("demo").innerHTML = "Title";
//   document.getElementById("popularite").style.display = "block";
//   document.getElementById("date").style.display = "block";
//   document.getElementById("titleMedia").style.display = "none";
//   filterOnClickHide = document.getElementById("myDropdown");
//   filterOnClickHide.style.display = "none";
//   return filterValue;
// }

function dropbtn(el){ 
  console.log(el);
  if(el.nextElementSibling.style.display == 'block'){   
  el.nextElementSibling.style.display = 'none';
 el.classList.remove("iconDropdown");
  }else{
  el.nextElementSibling.style.display = 'block'; 
  el.classList.add("iconDropdown");
  }
}
function dropbtnVal(el){  
    el.parentElement.children[0].style.display = 'block';
    el.parentElement.children[1].style.display = 'block';
    el.parentElement.children[2].style.display = 'block';
  
   el.style.display = 'none';
   
   el.parentElement.style.display = 'none';
   el.parentElement.previousElementSibling.classList.remove("iconDropdown");
   el.parentElement.previousElementSibling.innerHTML= el.innerHTML + '<img class="iconMenu" src="./assets/icons/downArroew.png" alt="">';
}


// /sorting 
let sortMediaByFilter = (media, filter) => {
	switch (filter) {
	case 'likes':
		return media.sort((a,b) => {
			return  b[filter] - a[filter]
		}) 
	case 'title':
		return media.sort((a,b) => {
			if(a[filter] < b[filter]) { return -1 }
			if(a[filter] > b[filter]) { return 1 }
			return 0
		}) 
	case 'date':
		return media.sort((a,b) => {
			return new Date(b[filter]) - new Date(a[filter])
		}) 
	default:
		break
	}
}


// close soting 
// function toggleFilter() {
//   var filterToggle = document.getElementById("myDropdown");
//   if (filterToggle.style.display == "none") {
//     // document.getElementById('filterArrow').src="./assets/icons/uparrow.png"
//     filterToggle.style.display = "block";

//   } else {
//     // document.getElementById('filterArrow').src="./assets/icons/downArroew.png"
//     filterToggle.style.display = "none";
//   }
// }

init();
