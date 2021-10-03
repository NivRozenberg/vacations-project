import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import VacationModel from "../../Models/VacationModel";
import { vacationAddedAction } from "../../Redux/VacationsState";
import store from "../../Redux/Store";
import Button from '@material-ui/core/Button'
import jwtAxios from "../../Services/JwtAxios";
import "./AddVacation.css";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import notify from "../../Services/Notify";
import { NavLink } from "react-router-dom";
import LiveService from "../../Services/LiveService";
import globals from "../../Services/Globals/Globals";



function AddVacation(): JSX.Element {


    let history = useHistory();

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const liveService: LiveService = new LiveService(); //גישה מהקומפוננט צאט לצאט סרביס  

    useEffect(() => {

        if (!store.getState().authState.user) {
            notify.error("You are not logged in.");
            history.push("/login");
            return;
        }

        if (store.getState().authState.user.userName !== "admin") {
            notify.error("You dont have access to this URL");
            history.push("/vacations")
        }
    }, [])



    async function addNewVacation(vacation: VacationModel) {
        try {
            const response = await jwtAxios.post<VacationModel>(globals.vacationsUrl, VacationModel.convertToFormData(vacation));
            const addedVacation = response.data; // The added vacation in the backend.
            console.log(addedVacation);
            addedVacation.followers = 0 //Handling the followers
            store.dispatch(vacationAddedAction(addedVacation));
            liveService.send(addedVacation)
            notify.success("Vacation added successfully");
            history.push("/vacations"); // Go to that route!
        }
        catch (err) {
            notify.error(err);
        }
    }


    return (
        <div className="AddVacation Box1">

            <form encType="multipart/form-data" onSubmit={handleSubmit(addNewVacation)} className="updateForm">
                <h2>Add new Vacation</h2>


                <Grid container direction={"column"} spacing={3}>
                    <Grid item>
                        <TextField
                            label="Destination"
                            autoFocus
                            size="medium"
                            required
                            id="outlined-textarea"
                            multiline
                            color="primary"
                            variant="outlined"
                            {...register("destination", { required: true, minLength: 3 })}
                        />
                        {formState.errors.destination?.type === "required" && <span>Missing destination.</span>}
                        {formState.errors.destination?.type === "minLength" && <span>Destination too short.</span>}
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Description"
                            autoFocus
                            size="medium"
                            required
                            id="filled-full-width"
                            multiline
                            variant="outlined"
                            rows={4}
                            {...register("description", { required: true, minLength: 10 })}
                        />
                        {formState.errors.description?.type === "required" && <span>Missing description.</span>}
                        {formState.errors.description?.type === "minLength" && <span>Description too short.</span>}
                    </Grid>

                    <Grid item>
                        <TextField
                            id="outlined-number"
                            label="Price"
                            type="number"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            {...register("price", { required: true, min: 0 })}
                        />
                        {formState.errors.price?.type === "required" && <span>Missing price.</span>}
                        {formState.errors.price?.type === "min" && <span>Price can't be negative.</span>}
                    </Grid>

                    <Grid item>
                        <TextField
                            id="date"
                            label="Arrival"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("arrival", { required: true })}
                        />
                        {formState.errors.arrival?.type === "required" && <span>Missing arrival.</span>}
                    </Grid>

                    <Grid item>
                        <TextField
                            id="date"
                            label="Departure"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("departure", { required: true })}
                        />
                        {formState.errors.departure?.type === "required" && <span>Missing departure.</span>}

                    </Grid>

                    <Grid item>
                        <input type="file" name="image" accept="image/*" {...register("image", { required: true })} />
                        {formState.errors.image?.type === "required" && <span>Missing image.</span>}

                    </Grid>

                </Grid>

                <br />
                <Button variant="contained" color="secondary" type="submit">
                    Add vacation
                </Button>


                <NavLink className="update" to={"/vacations"}>
                    Go Back
                </NavLink>
            </form>

        </div>
    );
}

export default AddVacation;


