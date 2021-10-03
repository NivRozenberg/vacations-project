import "./Header.css";
import AuthMenu from "../../HomeArea/AuthMenu/AuthMenu";




function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Vacation!</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
