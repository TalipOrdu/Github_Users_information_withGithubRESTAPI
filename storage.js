class Storage{

    static getSearchedUsersFromStorage(){
        //take all users

        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        // add user

        let users = this.getSearchedUsersFromStorage();

        //indexOf
        if(users.indexOf(username) === -1){
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));

    }
    static clearAllSearchedUsersFromStorage(){
        //delete all users
        localStorage.removeItem("searched");
    }
}