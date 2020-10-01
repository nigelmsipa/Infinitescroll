// unsplash API 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let count =10;
let PhotosArray = [];

const per_page = 26;
const apiKey= 'TpepHUfYFDBGVStOfivGpZjTkfgdCL87qruAxAD_HkQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageloaded(){
console.log('image loaded');
imagesloaded++;
console.log(imagesloaded)
if(imagesloaded === totalImages){
    ready = true
    loader.hidden=true;
    console.log('ready = ', ready);

}
}


// helper function to set attributre on dom elements 

function setAttributes(element,attributes){
for (const key in attributes){
  element.setAttribute(key, attributes[key]);  
}
}
// create Elements For Links $ photos to the DOM 
function displayPhotos() {
    imagesloaded = 0;
    totalImages = PhotosArray.length;
// run item for each object in PhotosArray
PhotosArray.forEach((photo) => {
// create <a> element 
const item = document.createElement('a');
// item.setAttribute('href',photo.links.html);
// item.setAttribute('target','_blank');
setAttributes(item,{
    href: photo.links.html, 
    target: '_blank',
} )
// Create <img> for photo 
const img = document.createElement('img');

setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description, 
    title: photo.alt_description, 
})


img.addEventListener('load' ,imageloaded);



// put img inside a 
item.appendChild(img);
imageContainer.appendChild(item);

});
}


// Get Photos
async function getPhotos(){
 try {
     const responce = await fetch(apiUrl);
     PhotosArray = await responce.json();
    
     displayPhotos()

 } catch (error) {
     // Catch Error Here 
 }
}

// sroll magic
window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
    ready=false;
getPhotos()
}
});

// On load
getPhotos()
