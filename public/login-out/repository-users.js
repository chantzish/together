/**
 * class the manegeth login & logout
*/
const STORAGE_ID = 'togetherAppUsers';
class LoginOut {
    constructor() {
        this.users = [];
    }

    saveToLocalStorage() {
        let name = this.users[this.users.length - 1].name;
        let password = this.users[this.users.length - 1].password;
        localStorage.setItem(STORAGE_ID, JSON.stringify(this.users));
        // localStorage.setItem(STORAGE_ID, JSON.stringify({ nameId: name }));
        // localStorage.setItem(STORAGE_ID, JSON.stringify({ passwordId: password }));
    }
    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }
    addUser(userObj) {
        let find = this.findUser(userObj);
        if (find === -1) {
            this.users.push(userObj);
            this.saveToLocalStorage();
        }
        else {
            alert("this user" + userObj.name + "is already exists!");
        }

    }
    removeUser(userObj) {
        let userId = this.findUser(userObj);
        this.users.splice(this.users.indexOf(userId), 1);
        this.saveToLocalStorage();
        // var $clickedPost = $(currentPost).closest('.post');
        // var id = $clickedPost.data().id;
        //  $clickedPost.remove();        
    }
    findUser(userObj) {
        if (this.users.length > 0) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].name === userObj.name && this.users[i].password === userObj.password) {
                    return i;
                }
            }
            return -1;
        }
        else {
            return -1;
        }

    }
    validationUser(userObj) {
        if (this.users.length > 0) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].name === userObj.name && this.users[i].password === userObj.password) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
    // renderUsers() {
    //     $users.empty();
    //     let arrOfUsers = this.getFromLocalStorage();
    //     for (let i = 0; i < arrOfUsers.length; i++) {
    //         var user = arrOfUsers[i];
    //         // $posts.append('<p class="post" data-id=' + post.id + '>'
    //         //     + '<a href="#" class="remove">remove</a> ' + post.text + '</p>');
    //     }
    // }
}

export default LoginOut