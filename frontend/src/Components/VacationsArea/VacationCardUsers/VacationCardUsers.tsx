import { NavLink, useHistory } from "react-router-dom";
import VacationModel from "../../Models/VacationModel";
import globals from "../../Services/Globals/Globals";
import "./VacationCardUsers.css";
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import store from "../../Redux/Store"
import axios from "axios";
import { useState, useEffect } from "react";
import { vacationDeletedAction, vacationUpdatedAction } from "../../Redux/VacationsState"
import jwtAxios from "../../Services/JwtAxios";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import notify from "../../Services/Notify";
import LiveService from "../../Services/LiveService";

interface VacationCardProps {
    vacation: VacationModel;
}


function VacationCardUsers(props: VacationCardProps): JSX.Element {

    const liveService: LiveService = new LiveService(); //גישה מהקומפוננט צאט לצאט סרביס   

    const [classTest, setButtonClass] = useState("unfollow")
    const [followVacation, setButtonText] = useState(" + Follow")

    let history = useHistory();

    const useStyles = makeStyles({
        root: {
            maxWidth: 450
        }
    });

    const classes = useStyles();

    useEffect(() => {

        (async () => {
            try {
                const response = await jwtAxios.get(globals.followersUrl)
                const allFollowers = response.data

                if (store.getState().authState.user) {
                    for (let i of allFollowers) {
                        if (i.vacation_id === props.vacation.id && i.user_id === store.getState().authState.user.id) {
                            setButtonClass("follow");
                            setButtonText("Unfollow");
                        }
                    }
                }


            } catch (err) {
                notify.error(err)
                console.log(err);
            }


        })()

    }, []);


    async function deleteVacation() {
        try {

            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await axios.delete(globals.vacationsUrl + props.vacation.id);
            store.dispatch(vacationDeletedAction(props.vacation.id));
            notify.success("Vacation has been deleted!")

            liveService.send2(props.vacation.id)
            history.push("/vacations");

        }
        catch (err) {
            alert("Error: " + err);
        }
    }




    async function handleclick() {

        const user_follow = store.getState().authState.user.id

        const followeObject = {

            "user_id": user_follow,
            "vacation_id": props.vacation.id,
            "followers": props.vacation.followers
        }

        const thisVacation = props.vacation;

        if (classTest == "unfollow") {

            setButtonClass("follow");
            setButtonText("Unfollow")


            try {
                const response = await jwtAxios.post<any>(globals.vacationsUrl + `follow`, followeObject);
                const new_vacation = response.data;
                thisVacation.followers++
                console.log(thisVacation);
                store.dispatch(vacationUpdatedAction(thisVacation));
                console.log(store.getState().vacationsState.vacations);
                notify.success(`You are now following this Vacation: ` + thisVacation.destination)

                liveService.send(store.getState().vacationsState.vacations.find(p => p.id === new_vacation.vacation_id))
            }
            catch (err) {
                notify.error(err)
                history.push("/vacations")
                console.log(err);
            }




        } else {
            setButtonClass("unfollow");
            setButtonText("+ Follow")

            try {
                const response = await jwtAxios.post<any>(globals.vacationsUrl + `unfollow`, followeObject);
                const unfollowed_vacation = response.data;

                thisVacation.followers--
                console.log(thisVacation);

                store.dispatch(vacationUpdatedAction(thisVacation));
                notify.success(`You are not following this Vacation: ` + thisVacation.destination)

                liveService.send(store.getState().vacationsState.vacations.find(p => p.id === unfollowed_vacation.vacation_id))
            }
            catch (err) {
                notify.error(err)
                console.log(err);
            }
        }


    }


    return (

        <div className="VacationCard Box">

            <Card className={classes.root}>
                <CardActionArea>
                    <CardActions className="test">

                        {globals.isUserLoggedIn() && globals.isAdmin() ? <ClearIcon onClick={deleteVacation} className="test" /> : null}

                        {globals.isUserLoggedIn() && globals.isAdmin() ? <span><NavLink to={"/vacations/edit/" + props.vacation.id} exact>
                            <CreateIcon />
                        </NavLink></span> : null}

                        {globals.isUserLoggedIn() && !globals.isAdmin() ? <button id="follow-button" onClick={handleclick} className={classTest} >{followVacation}</button> : null}
                    </CardActions>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="240"
                        image={globals.vacationsUrl + "images/" + props.vacation.imageName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            <b>{props.vacation.destination}</b>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" color="secondary">
                            Price: {props.vacation.price}$
                            <hr />
                            {props.vacation.arrival} - {props.vacation.departure}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.vacation.description}
                            <hr />
                            <b>Followers: {props.vacation.followers}</b>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}


export default VacationCardUsers;
