//API
const BASE_URL = 'https://thatcopy.pw/catapi/rest/';
//DOM
const catBtn = document.getElementById('change-cat');


const getCats = async () => {

    try {
       const data = await fetch(BASE_URL);
       const json = await data.json();
        // webpurl é caracteristica da API dos gatos
       return json.webpurl;
    }

    catch(e) {
        console.log(e.message);
    }
};

const loadImg = async () => {
    const catImg = document.getElementById('cat');
    catImg.src = await getCats();
};

catBtn.addEventListener('click', loadImg);

loadImg();