
     
async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
   
    const  photographerJson = await getPhotographersApi();       
    // et bien retourner le tableau photographers seulement une fois
    return (photographerJson)
}


async function getPhotographersById(id) {
    var id1 = id;
    const photographerJson = await getPhotographersApi();
    console.log(photographerJson);
    const photographers = photographerJson.photographers.find(item => item.id == id1);
    const media = photographerJson.media.filter(mediaObj => mediaObj.photographerId == id1);
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
     
    const photographerJson1 = await getPhotographers();
    const tagSkills=[];  //merge
    const photo = photographerJson1.photographers.forEach(item => {
        tagSkills.push(...item.tags);
    });
    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    //   }          
    //   // usage example:
    //   var unique = tagSkills.filter(onlyUnique);     
    let unique = [...new Set(tagSkills)];  
       
      const photographersSection1 = document.querySelector(".display_skills"); 
      const photographerModel1 = skillTags(unique);
      const userCardDOM1= photographerModel1.getUserSkillCardDOM();
      console.log(userCardDOM1);
      photographersSection1.insertAdjacentHTML( 'beforeend', userCardDOM1);
    
    const photographersSection = document.querySelector(".photographer_section");  
     photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM);
        photographersSection.insertAdjacentHTML( 'beforeend', userCardDOM );

        // photographersSection.appendChild(userCardDOM)
        // photographersSection.appendChild(userCardDOM);
    });

};

// async function displayData(photographers, media) {
//     const photographersSection = document.querySelector(".display_current_profile");
//     const photographerModel = photographerFactory(photographers);
//     const userCardDOM = photographerModel.getUserDetailDOM();
//     photographersSection.insertAdjacentHTML('beforeend', userCardDOM);

//     // photographersSection.appendChild(userCardDOM)
//     // photographersSection.appendChild(userCardDOM);

// };

async function init() {
    // Récupère les datas des photographes

    const { photographers } = await getPhotographers();
         displayData(photographers);

};

init();

