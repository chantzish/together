/**
 * class the manegeth login & logout
*/
const STORAGE_USER = 'togetherAppUsers';
const SRORAGE_CURRENT_USER = 'CurrentUser'
class LoginOut {
    constructor() {
        this.users = [];
        localStorage.removeItem(SRORAGE_CURRENT_USER);
    }

    saveToLocalStorage() {
        let name = this.users[this.users.length - 1].name;
        let password = this.users[this.users.length - 1].password;
        localStorage.setItem(STORAGE_USER, JSON.stringify(this.users));
        localStorage.setItem(SRORAGE_CURRENT_USER, JSON.stringify(name));
        // localStorage.setItem(STORAGE_USER, JSON.stringify({ nameId: name }));
        // localStorage.setItem(STORAGE_USER, JSON.stringify({ passwordId: password }));
    }
    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_USER) || '[]');       
    }
    addUser(userObj) {
        let index = this.findUser(userObj);
        if (index < 0){
            this.users.push(userObj);
                this.saveToLocalStorage();
        }
        else{
            let valid = this.validationUser(userObj);
            if (valid === true) {
                alert("Hi " + userObj.name + "!");
            }
            else {
                alert("The password is not correct please try agein!");
            }
        }
    }
    removeUser(userObj) {
        let index = this.findUser(userObj);
        if (index < 0){
            alert("The user not exsit!");
        }
        else{
            let valid = this.validationUser(userObj);
            if (valid === true) {
                this.users.splice(this.users.indexOf(index), 1);
                this.saveToLocalStorage();
                alert("Removed ssucsed!");
            }
            else {
                alert("The password you've is entered is incorrect, please try again!");
            }

        }       
    }
    findUser(userObj) {
        if (this.users.length > 0) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].name === userObj.name) {
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
}

export default LoginOut