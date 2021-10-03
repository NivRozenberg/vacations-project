import {Redirect, Route, Switch, useHistory } from "react-router";
import Page404 from "../../SharedArea/Page404/Page404";
import Login from "../../HomeArea/Login/Login";
import Register from "../../HomeArea/Register/Register";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Logout from "../../HomeArea/Logout/Logout";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import AdminPage from "../../AdminArea/AdminPage/AdminPage";
import globals from "../../Services/Globals/Globals";


function Routing(): JSX.Element {


    return (
        
			<Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/logout" component={Logout} exact />
                <Route path="/vacations" component={VacationsList} exact />
                <Route path="/vacations/new" component={AddVacation} exact />
                <Route path="/vacations/edit/:id" component={EditVacation} exact />
                <Route path="/admin" component={AdminPage} exact />
                {globals.isUserLoggedIn()?<Redirect from="/" to="/vacations" exact />:<Redirect from="/" to="/login" exact />}
                <Route component={Page404} /> Must be last!
            </Switch>
        
    );
}

export default Routing;