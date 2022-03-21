function photographerFactory(data) {
    console.log(data);
    const { id, city, country, tagline, price, name, portrait, tags } = data;
    const picture = `assets/photographers/${portrait}`;
    function tagsForPhotographersCards() {
        let x = data.tags;
        let text = "";
        x.forEach((item, index) => {
            text += "<li class='photographer__tag'># &nbsp;" + item + "</li> ";
        });
        document.getElementsByClassName("photographer__tags").innerHTML = text;

        return text;
    }
    function getUserCardDOM() {
        var article = `
 <article class="photographer">
 <a href="./photographer.html?id=${id}" class="photographer__header">
     <img class="photographer__img" src="${picture}" alt="">
     <h2 class="photographer__name">${name}</h2>
 </a>
 <div class="photographer__content">
     <p class="photographer__location">${city}, ${country}</p>
     <p class="photographer__tagline">${tagline}</p>
     <p class="photographer__price">${price}€/jour</p>
 </div>
 <div>
 <ul class="photographer__tags">
 ` + tagsForPhotographersCards() + `
 </ul>
 </div>
</article>
`
        // const article = document.createElement( 'article' );
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        return (article);
    }
    function getUserDetailDOM() {
        var article = `
        <div>
        <h1>${name}</h1>
        <h6>${city}, ${country}</h6>
        <P>${tagline}</P>
      </div>       
      <div>          
        <button class="contact_button" onclick="toggle()">Contactez-moi</button>
      </div>        
      <div>
        <img class="photographer__img" src="${picture}" alt="">
      </div>
`
        return (article);
    }
    function getPriceDOM(){
        var article=`
        <span id="price">${price} &#128; /day</span>
       `
         return article;
    }
    return { name, picture, getUserCardDOM, getUserDetailDOM, tagsForPhotographersCards,getPriceDOM }
}

function skillTags(tags) {
    const x = tags;
    let text = "";
    function arrtag() {
        x.forEach((item, index) => {
            text += "<span class='photographer__tag'># &nbsp;" + item + "</span> ";
        });
        document.getElementsByClassName("photographer__SkillTags").innerHTML = text;

        return text;
    }
    function getUserSkillCardDOM() {
        var article = `        
        <span class="photographer__SkillTags">
        `+ arrtag() + `
        </span>
    </div>
`
        return (article);
    }
    return { getUserSkillCardDOM }
}

function mediaFactory(data) {

    const mediaObj = data;
    const keyValue = Object.keys(mediaObj);
    const { id, photographerId, altTxt, date, likes, name, price, tags, title, video, image } = data;
    const picture = `assets/media/mediaList/${image}`;
    const pictureVideo = `assets/media/mediaList/${video}`;

    function getMediaDOM(index) {
        console.log(title);
        let htmlTag;
        if (image) {
            htmlTag = `<img src="${picture}" style="width:100%" onclick="openModal();currentSlide( ${index},this)"
            class="hover-shadow cursor">
           `
        } else {
            htmlTag = `<video class="mediaVideo " onclick="openModal();currentSlide(${index},this)">
            <source src="${pictureVideo}" type="video/mp4" > 
          </video>`
        }
        
        var article = `       
       <div class="column slider-img">
       `+ htmlTag + `
         <div class="mediaSubTitle">
           <span>${title} </span>
           <span ><label id="liked">${likes}<label> <img src="./assets/icons/favorite-24px 1.png" alt="" onClick="clickLike(${id})" class="icon"> </span>
         </div>
     </div>
       `
        return article
    }
    function getTotalLike() {
        // console.log(data.likes);
        console.log(data);
        var x = data;
        var count = 0;
        for (let i = 0; i < x.length; i++) {
            count = count + x[i].likes;
        }
        var article = ` 
        <span class="total">${count} &#9829; </span>
        `
        return article
    }
    return { getMediaDOM, getTotalLike }
}
