const params = new URLSearchParams(window.location.search)
const albumId = params.get('albumId')
const userId = params.get('userId')
const url="https://jsonplaceholder.typicode.com"

getUser()
async function getUser() {
    await fetch(`${url}/users/${userId}`)
    .then(res => res.json())
    .then(user => {createProfile(user)})
}

getPhotos(albumId)
async function getPhotos(albumId){
    let photos = []
    await fetch(`${url}/photos`)
    .then(res => res.json())
    .then(data=>{
        data.forEach(photo => {
            if(albumId == photo.albumId) photos.push({thumbnailUrl: photo.thumbnailUrl ,url: photo.url})
        });
    })
    createThumbnailNode(photos)
}

const createThumbnailNode=(photos)=>{
    const $photos = document.querySelector('.photos')
    $photos.innerHTML = ''
    photos.forEach((photo)=>{
        const div = document.createElement('div')
        div.classList.add('photo')
        //-------------------------------------------
        const img = document.createElement('img')
        img.src = photo.thumbnailUrl
        img.alt = ''
        //-------------------------------------------
        div.appendChild(img)
        $photos.appendChild(div)
        img.addEventListener('click', function(){alert()})
    })
}

const createProfile = (user)=>{
    const $profile = document.querySelector('.profile')
    const profileContainer = document.createElement('div')
    profileContainer.classList.add('profile__container')
    //-------------------------------------------
    const profileHeader = document.createElement('div')
    profileHeader.classList.add('profile__header')

    const userProfileImage = document.createElement('p')
    userProfileImage.classList.add('profile__image')
    userProfileImage.innerHTML = user.id
    profileHeader.appendChild(userProfileImage)
    //-------------------------------------------
    const userInfo = document.createElement('div')
    userInfo.classList.add('profile__info')

    const username = document.createElement('p')
    username.classList.add('profile__username')
    username.innerHTML = user.username
    userInfo.appendChild(username)

    const realname = document.createElement('p')
    realname.classList.add('profile__realname')
    realname.innerHTML = user.name
    userInfo.appendChild(realname)
    //-------------------------------------------
    const profileDescription = document.createElement('div')
    profileDescription.classList.add('profile__description')

    const email = document.createElement('p')
    email.classList.add('profile__email')
    email.innerHTML = user.email
    profileDescription.appendChild(email)

    const city = document.createElement('p')
    city.classList.add('profile__city')
    city.innerHTML = user.address.city
    profileDescription.appendChild(city)

    const website = document.createElement('a')
    website.classList.add('profile__website')
    website.innerHTML = user.website
    profileDescription.appendChild(website)
    //-------------------------------------------

    profileContainer.appendChild(profileHeader)
    profileContainer.appendChild(userInfo)
    profileContainer.appendChild(profileDescription)

    $profile.appendChild(profileContainer)
    console.log(profileContainer);
}