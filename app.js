// selection elements
const githubForm = document.getElementById("github-form");
const nameinput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){

    let username = nameinput.value.trim();

    if(username === null){
        alert("plase write a profit name!");
    }else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){

                ui.showError("User is not Found");
            }else{

                ui.addSearchedUserToUI(username);

                Storage.addSearchedUserToStorage(username);

                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); //input cleaned
    e.preventDefault();
}
function clearAllSearched(){

    if(confirm("are you sure deleting all searched?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    //searched take from storage to add UI
    
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";

    users.forEach(user => {
        // <li class="list-group-item">asdasdsa</li>

        result += `<li class="list-group-item">${user}</li>`;
    });

    lastUsers.innerHTML = result;

}