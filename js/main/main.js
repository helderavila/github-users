const inputUser = document.getElementById('inputUser')
const btn = document.getElementById('btn')

const imgUser = document.getElementById('imgUser')
const nomeUser = document.getElementById('nomeUser')
const bioUser = document.getElementById('bioUser')

const box = document.querySelector('.container-user')
const search = document.querySelector('.container-main')

const userFollowers = document.getElementById('userFollowers')
const userLocation = document.getElementById('userLocation')

const repName = document.getElementById('repName')
const listElement = document.querySelector('#info-rep ul')

const spanErro = document.getElementById('spanErro')


btn.addEventListener('click', handleClick)

function handleClick(e) {
    e.preventDefault()
    const user = inputUser.value
    if(user===''){
        spanErro.innerText = 'Usuario não encontrado'
    }else {
        buscarUser(user)
        buscarRep(user)
    }

}


function buscarUser(user) {
    fetch(`https://api.github.com/users/${user}`)
        .then(response => response.json())
            .then(body => {
                const { avatar_url, name, bio, message, followers, location } = body
                console.log(message)
                if(message==="Not Found"){
                    spanErro.innerText = 'Usuario não encontrado'
                }else {
                    imgUser.setAttribute('src', avatar_url)
                    nomeUser.innerText = name
                    bioUser.innerText = bio
                    userLocation.innerText = location
                    userFollowers.innerText = followers
                    box.classList.add('ativo')
                    search.classList.add('remove-margin')
                    spanErro.innerText = ''
                }
            })
}

function buscarRep(user) {
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => response.json())
            .then(body => {
                body.forEach(reps => {
                    const { full_name } = reps
 
                    var repElement = document.createElement('li')
                    var divElement = document.createElement('p')

                    var repText = document.createTextNode(full_name)
                    repElement.classList.add('rep-item')

                    repElement.appendChild(repText)
                    listElement.appendChild(repElement)
                    console.log(typeof(reps.full_name))
                })
            })
}