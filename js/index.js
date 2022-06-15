const form = document.querySelector('#github-form')
const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')
    

//EVENT LISTENERS
form.addEventListener('submit', handleSubmit)

//EVENT HANDLERS
function handleSubmit(e){
    e.preventDefault()
    let userSearch = e.target.search.value
    
    getAllUsers(userSearch)

    form.reset()
}

function handleRepo(user){
    fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
        .then(res => res.json())
        .then(repos => {
            // document.getElementById('card').textContent = ''
            repos.forEach(renderRepos) 

        })
}

//RENDER ONE USER
function renderOneUser(user){
    const card = document.createElement('ul')
    const username = user.login
    card.id = 'card'
        card.innerHTML = `
        <img src="${user.avatar_url}" class="avatar-img" />
        <div class="inner-box">
            <h2>${username}</h2>
            <button class="repo-btn" id="${user.id}">View Repos ➕ </button>
        </div>
        `

        userList.append(card)

        //View Repos button
        document.getElementById(`${user.id}`).addEventListener('click', () => handleRepo(username))
    }

//RENDER ALL REPOS
const reposDiv = document.getElementById('container')
function renderRepos(repo){
    const reposP = document.createElement('p')
    reposP.innerHTML = `
    <a href="${repo.html_url}">${repo.name}</a>
    `
    reposDiv.appendChild(reposP)  
}




//FETCH REQUESTS
//GET USERS
function getAllUsers(userSearch){
    //Removes the cards from prior search
    userList.innerHTML = ''
    //Fetch
    fetch(`https://api.github.com/search/users?q=${userSearch}`)
        .then(res => res.json())
        .then(users => users.items.forEach(user => renderOneUser(user)))
}

//GET REPOS
