import { Component, SyntheticEvent } from "react";
import "./Login.css";
import Button from '@material-ui/core/Button'
import { NavLink, Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserModel from "../../Models/UserModel";
import { useForm } from "react-hook-form";
import store from "../../Redux/Store";
import { userLoggedInAction } from "../../Redux/AuthState"
import globals from "../../Services/Globals/Globals";
import Logout from "../Logout/Logout";
import Header from "../../LayoutArea/Header/Header";
import React from "react";
import notify from "../../Services/Notify";



function Login(): JSX.Element {


    const { register, handleSubmit, formState } = useForm<UserModel>();

    let boom = useHistory();

    async function login(user: UserModel) {
        try {

            const response = await axios.post<UserModel>("http://localhost:3001/api/auth/login", user);
            const new_user = response.data;
            store.dispatch(userLoggedInAction(response.data));
            localStorage.setItem("user", JSON.stringify(new_user));
            notify.success("Logged-in successfully.");
            boom.push("/vacations"); // Go to that route!

        } catch (err) {
            notify.error(err);
        }

    }





    // public render(): JSX.Element {
    return (


        <div className="Login Box">

            <h2> First Please Login!</h2>
            <form onSubmit={handleSubmit(login)}>
                <table>


                    <thead>
                        <tr>
                        </tr>
                    </thead>

                    <tbody>
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
                    </tbody>
                </table>

                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>
                <br />
            </form>

            <Button variant="contained" color="secondary" component={Link} to={"/register"}>
                Register
            </Button>


        </div>
    );
}


export default Login;
