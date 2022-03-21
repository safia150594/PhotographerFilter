async function getPhotographersApi(){
    const _url = 'https://roy-framery-s-openclassrooms-projects.github.io/RoyFramery_6_10082021/fisheyeData.json'

    //let _url= 'https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye/blob/main/data/photographers.json';
    const response = await fetch(_url);

    if (response.ok) {
		return response.json()
	} else {
		console.error(response.status)
	}
}