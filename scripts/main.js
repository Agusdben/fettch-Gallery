const $container = document.querySelector('.container')
const $user = document.querySelector('.users')
const $albums = document.querySelector('.albums')
const url="https://jsonplaceholder.typicode.com"
fetch(`${url}/users`)
.then(res => res.json())
.then(data => {
    data.forEach(user => createUserNode(user));
})

const createUserNode = (user)=>{
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const div = document.createElement('div')
    div.classList.add('user')
    //-------------------------------------------
    const userId = document.createElement('p')
    userId.classList.add('user__id')
    userId.style.backgroundColor = `#${randomColor}`
    userId.id = user.id
    userId.innerHTML = user.id
    //-------------------------------------------
    const userName = document.createElement('p')
    userName.classList.add('user__name')
    userName.innerHTML = user.name
    //-------------------------------------------
    div.appendChild(userId)
    div.appendChild(userName)
    $user.appendChild(div)
    //-------------------------------------------
    userId.addEventListener('click', function(){
        getAlbums(this)
    })
}

async function getAlbums($user){
    let albums = []
    await fetch(`${url}/albums`)
    .then(res => res.json())
    .then(data=>{
        data.forEach(album => {
            if($user.id == album.userId) albums.push({id: album.id, title: album.title})
        });
    })
    createAlbumNode(albums, $user.id, $user.style.backgroundColor)
}

const createAlbumNode=(albums, userId, bgProfile)=>{
    $albums.innerHTML = ''
    const h2 = document.createElement('h2')
    h2.innerHTML = 'Albums:'
    h2.classList.add('albums__title')
    $albums.appendChild(h2)
    albums.forEach((album)=>{
        const div = document.createElement('div')
        div.classList.add('album')
        //-------------------------------------------
        const p = document.createElement('p')
        p.classList.add('ablum__name')
        p.setAttribute('id', album.id)
        p.innerHTML = album.title
        //-------------------------------------------
        div.appendChild(p)
        $albums.appendChild(div)
        p.addEventListener('click', function(){
            window.location.href = `./pages/userPhotos.html?albumId=${this.id}&userId=${userId}&bgProfile=${bgProfile}`
        })
    })
}

