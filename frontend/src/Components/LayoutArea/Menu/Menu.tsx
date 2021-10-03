import { NavLink } from "react-router-dom";
import "./Menu.css";
import store from "../../Redux/Store";
import globals from "../../Services/Globals/Globals";



function Menu(): JSX.Element {


    return (
        <div className="Menu">
			<nav>
                <NavLink to="/home" exact>Home</NavLink>
                <NavLink to="/vacations" exact>Vacations</NavLink>

            </nav>
        </div>
    );
}

export default Menu;
