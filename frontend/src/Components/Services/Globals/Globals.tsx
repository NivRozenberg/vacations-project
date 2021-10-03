
// General globals for development and production: 
abstract class Globals {
    // ...
}

// General globals only for development:
class DevelopmentGlobals extends Globals {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public followersUrl = "http://localhost:3001/api/vacations/foreign/"
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";


    public isAdmin(): boolean {
        const admin = JSON.parse(localStorage.getItem("user"))
        if (admin.userName === "admin") {
            return true;
        }
    };



    public isUserLoggedIn(): boolean {
        const user = localStorage.getItem("user");
        if (user) {
            return true;
        }
    };


}

// General globals only for production:
class ProductionGlobals extends Globals {
    public vacationsUrl = "http://www.mysite.com/api/vacations/";
    public followersUrl = "http://localhost:3001/api/vacations/foreign/"
    public registerUrl = "http://www.mysite/api/auth/register/";
    public loginUrl = "http://www.mysite/api/auth/login/";

    public isAdmin(): boolean {
        const admin = JSON.parse(localStorage.getItem("user"))
        if (admin.userName === "admin") {
            return true;
        }
    };


    public isUserLoggedIn(): boolean {
        const user = localStorage.getItem("user");
        if (user) {
            return true;
        }
    };
}


const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;