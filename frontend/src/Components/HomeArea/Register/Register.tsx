import "./Register.css";
import Button from '@material-ui/core/Button'
import { NavLink, Link } from "react-router-dom";
import UserModel from "../../Models/UserModel";

import { useForm } from "react-hook-form";
import axios from "axios";
import store from "../../Redux/Store";
import { userRegisteredAction } from "../../Redux/AuthState"
import { useHistory } from "react-router";
import notify from "../../Services/Notify";



function Register(): JSX.Element {



    const { register, handleSubmit, formState } = useForm<UserModel>();
    let history = useHistory();


    async function registerUser(user: UserModel) {
        try {
            const response = await axios.post<UserModel>("http://localhost:3001/api/auth/register/", user);
            const new_user = response.data;

            store.dispatch(userRegisteredAction(new_user));
            notify.success("Logged-in successfully.");
            localStorage.setItem("user", JSON.stringify(user));
            history.push("/vacations"); // Go to that route!

        } catch (err) {
            notify.error(err);
        }
    }




    return (
        <div className="Box">
            <h2>Register here</h2>
            <form onSubmit={handleSubmit(registerUser)}>
                <table>
                    <tr>
                        <td>First Name:</td>
                        <td><input type="text" placeholder="First name..." {...register("firstName", { required: true, minLength: 2 })} /></td>
                        {formState.errors.firstName?.type === "required" && <span>Missing First Name.</span>}
                        {formState.errors.firstName?.type === "minLength" && <span>First Name too short.</span>}
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input type="text" placeholder="Last name..." {...register("lastName", { required: true, minLength: 3 })} /></td>
                        {formState.errors.lastName?.type === "required" && <span>Missing Last Name.</span>}
                        {formState.errors.lastName?.type === "minLength" && <span>Last Name too short.</span>}
                    </tr>
                    <tr>
                        <td>User Name:</td>
                        <td><input type="text" autoFocus placeholder="Username..." {...register("userName", { required: true, minLength: 3 })} /></td>
                        {formState.errors.userName?.type === "required" && <span>Missing User Name</span>}
                        {formState.errors.userName?.type === "minLength" && <span>User Name too short.</span>}
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type="password" placeholder="Password..." {...register("password", { required: true, minLength: 3 })} /></td>
                        {formState.errors.password?.type === "required" && <span>Missing Password</span>}
                        {formState.errors.password?.type === "minLength" && <span>Password too short.</span>}
                    </tr>
                </table>


                <Button variant="contained" color="secondary" type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;
