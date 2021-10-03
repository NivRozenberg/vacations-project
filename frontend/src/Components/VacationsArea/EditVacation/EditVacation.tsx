import axios from "axios";
import { useForm } from "react-hook-form"
import { NavLink, RouteComponentProps, useHistory } from "react-router-dom";
import VacationModel from "../../Models/VacationModel";
import "./EditVacation.css";
import store from "../../Redux/Store"
import { vacationUpdatedAction } from "../../Redux/VacationsState"
import Button from '@material-ui/core/Button'
import jwtAxios from "../../Services/JwtAxios";
import { useState } from "react";
import { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import globals from "../../Services/Globals/Globals";
import notify from "../../Services/Notify";
import { send } from "process";
import LiveService from "../../Services/LiveService";
import CardMedia from "@material-ui/core/CardMedia";


interface RouteParams {
    id: string;
}

// Our props interface must extends the following:
interface VacationDetailsProps extends RouteComponentProps<RouteParams> { vacation: VacationModel }



function EditVacation(props: VacationDetailsProps): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const liveService: LiveService = new LiveService(); //גישה מהקומפוננט צאט לצאט סרביס  
    let history = useHistory();

    const [vacationState, setVacationState] = useState<VacationModel>()


    useEffect(() => {


        (async () => {
            try {

                if (!store.getState().authState.user) {
                    notify.error("You are not logged in.");
                    history.push("/login");
                    return;
                }

                if (store.getState().authState.user.userName !== "admin") {
                    notify.error("You dont have access to this URL");
                    history.push("/vacations")
                }


                const id = +props.match.params.id;
                console.log(id)
                console.log(store.getState().vacationsState.vacations)
                const vacation = store.getState().vacationsState.vacations.find(p => p.id === id)
                if (vacation) {
                    setVacationState(vacation)
                    // notify.success("store")
                }
                else {
                    const response = await jwtAxios.get(globals.vacationsUrl + props.match.params.id)
                    setVacationState(response.data);
                    // notify.success("api")
                }



            } catch (err) {
                alert("Error");
                history.push("/vacations");
                console.log(err);
            }


        })()


    }, [])




    async function put(vacation: VacationModel) {
        try {
            const response = await jwtAxios.put<VacationModel>(`http://localhost:3001/api/vacations/${props.match.params.id}/`, VacationModel.convertToFormData(vacation));
            const new_vacation = response.data;
            new_vacation.followers = vacationState.followers    //Handling the followers
            store.dispatch(vacationUpdatedAction(new_vacation))
            notify.success("Vacation updated successfully: " + new_vacation.destination);
            liveService.send(new_vacation);
            history.push("/vacations")
        }
        catch (err) {
            notify.error(err);
            console.log(err);
        }
    }


    return (
        <div className="EditVacation Box1">

            {vacationState &&
                <form onSubmit={handleSubmit(put)} className="updateForm">

                    <h2>Update Vacation</h2>

                    <Grid container direction={"column"} spacing={3}>
                        <Grid item >
                            <TextField
                                defaultValue={vacationState.destination}
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
                            {formState.errors.destination?.type === "minLength" && <span>Destination too short.</span>}</Grid>

                        <Grid item >
                            <TextField
                                defaultValue={vacationState.description}
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

                        <Grid item >
                            <TextField
                                defaultValue={vacationState.price}
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


                        <Grid item >
                            <TextField
                                id="date"
                                label="Arrival"
                                type="date"
                                defaultValue={vacationState.arrival}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register("arrival", { required: true })}
                            />
                            {formState.errors.arrival?.type === "required" && <span>Missing arrival.</span>}
                        </Grid>

                        <Grid item >
                            <TextField
                                id="date"
                                label="Departure"
                                type="date"
                                defaultValue={vacationState.departure}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register("departure", { required: true })}
                            />
                            {formState.errors.departure?.type === "required" && <span>Missing departure.</span>}

                        </Grid>


                        <Grid item >
                            <input type="file" name="image" accept="image/*" {...register("image", { required: true })} />
                            {formState.errors.image?.type === "required" && <span>Missing image.</span>}
                        </Grid>


                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={globals.vacationsUrl + "images/" + vacationState.imageName}
                        />
                    </Grid>

                    <br />

                    <Button variant="contained" color="secondary" type="submit">
                        Update
                    </Button>

                    <NavLink className="update" to={"/vacations"}>
                        Go Back
                    </NavLink>
                </form>}


        </div>


    );
}

export default EditVacation;
