import { Add } from "@material-ui/icons";
import axios from "axios";
import Button from '@material-ui/core/Button'
import jwtAxios from "../../Services/JwtAxios";
import { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import VacationModel from "../../Models/VacationModel";
import { vacationAddedAction, vacationDeletedAction, vacationsDownloadedAction, vacationUpdatedAction } from "../../Redux/VacationsState"
import store from "../../Redux/Store";
import globals from "../../Services/Globals/Globals";
import PleaseWait from "../../SharedArea/PleaseWait/PleaseWait";
import VacationCardUsers from "../VacationCardUsers/VacationCardUsers"
import "./VacationsList.css";
import { History } from "history";
import LiveService from "../../Services/LiveService";
import notify from "../../Services/Notify";


interface VacationListState {
    vacations: VacationModel[];
}

interface VacationListProps {
    history: History;
}

class VacationsList extends Component<VacationListProps, VacationListState> {

    private liveService: LiveService = new LiveService(); //גישה מהקומפוננט צאט לצאט סרביס

    public follow: number[] = [];
    public constructor(props: VacationListProps) {
        super(props);
        this.state = { vacations: store.getState().vacationsState.vacations };

    }



    public async componentDidMount() {

        try {



            if (!store.getState().authState.user) {
                notify.error("You are not logged in.");
                this.props.history.push("/login");
                return;
            }




            this.liveService.connect();
            this.liveService.socket.on("msg-from-server", msg => {


                const newVacationsArray = [...this.state.vacations];
                console.log(newVacationsArray);

                //In case the vacation is exist and we changed any value - live

                for (let i = 0; i < newVacationsArray.length; i++) {
                    if (newVacationsArray[i].id === msg.id) {
                        newVacationsArray[i] = msg;
                        this.setState({ vacations: newVacationsArray });
                        console.log(msg);
                        break;
                    }
                }


                // In case it's a new vacation and we want it to be added live
                const admin = JSON.parse(localStorage.getItem("user"));
                if (admin.userName !== "admin") {

                    if (!newVacationsArray.find(p => p.id === msg.id)) {
                        newVacationsArray.push(msg);
                        this.setState({ vacations: newVacationsArray });
                        console.log(this.state.vacations);


                        store.dispatch(vacationAddedAction(msg));
                    }

                }

            });



            // in case we want to delete vacation - live
            this.liveService.socket.on("msg-from-client-delete", id => {
                const vacationsArray = [...this.state.vacations];
                for (var i = 0; i < vacationsArray.length; i++) {

                    if (vacationsArray[i].id === id) {
                        vacationsArray.splice(i, 1);
                        this.setState({ vacations: vacationsArray });
                        break;
                    }
                }


            });



            console.log(this.state.vacations)
            if (this.state.vacations.length === 0) {
                const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl); // response is a wrapper.
                this.setState({ vacations: response.data });
                store.dispatch(vacationsDownloadedAction(response.data));
            }




            const followers = await jwtAxios.get(globals.followersUrl);
            const allFollowers = followers.data;


            for (let f of allFollowers) {
                if (f.user_id === store.getState().authState.user.id) {
                    this.follow.push(f.vacation_id);
                    console.log(this.follow);
                }
            }

            for (let f of this.follow) {
                const v = this.state.vacations.sort((v) => (v.id !== f) ? 1 : -1);
                this.setState({ vacations: v });
                console.log(this.state.vacations);
            }



        }
        catch (err) {
            notify.error(err);
            this.props.history.push("/logout");
            console.log(err);
        }



    }






    public render(): JSX.Element {


        return (


            <div className="VacationsList">

                <h2>Our Vacations</h2>


                {globals.isUserLoggedIn() && globals.isAdmin() ? <span><Button variant="contained" color="primary" component={Link} to={"/vacations/new"}>
                    Add New Vacation +
                </Button></span> : null}

                {globals.isUserLoggedIn() && globals.isAdmin() ? <span> <Button variant="contained" color="secondary" component={Link} to={"/admin"}>
                    Admin Page
                </Button></span> : null}

                <br />
                {this.state.vacations.map(p => <VacationCardUsers vacation={p} key={p.id} />)}

            </div>
        );
    }
}



export default VacationsList;
