import { Component } from "react";
import "./AdminPage.css";
import { Bar } from 'react-chartjs-2'
import VacationModel from "../../Models/VacationModel";
import store from "../../Redux/Store";
import jwtAxios from "../../Services/JwtAxios";
import globals from "../../Services/Globals/Globals";
import notify from "../../Services/Notify";


interface VacationListState {
    vacations: VacationModel[];
    labels: number[];
    data: number[];
}

interface VacationListProps {
    history: History;
}

class AdminPage extends Component<VacationListProps, VacationListState> {
    public vacationsIdsOnly: number[] = [];
    public vacationsFollowersOnly: number[] = [];

    public constructor(props: VacationListProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacationsState.vacations,
            labels: store.getState().vacationsState.vacations.map(v => { return v.id }),
            data: store.getState().vacationsState.vacations.map(f => { return f.followers })
        }

    }





    public async componentDidMount() {

        try {

            if (this.state.vacations.length === 0) {
                const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl); // response is a wrapper.
                this.setState({ vacations: response.data });
            }

            let array = this.state.vacations

            for (let oneVac of array) {
                if (oneVac.followers > 0) {
                    this.vacationsIdsOnly.push(oneVac.id);
                    this.vacationsFollowersOnly.push(oneVac.followers);
                    this.setState({ labels: this.vacationsIdsOnly, data: this.vacationsFollowersOnly })
                }

            };
            console.log(this.vacationsIdsOnly);

        } catch (err) {
            console.log(err);
        }

    }


    public render(): JSX.Element {


        return (
            <div className="AdminPage">

                <h2>Followers Per Vacation</h2>

                <Bar
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {

                                label: 'Followers Per Vacation',
                                data: this.state.data,
                                backgroundColor:
                                    'rgba(255, 99, 132, 0.4)',

                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 2
                            }
                        ]
                    }}
                    height={220}
                    width={600}
                    options={{
                        scales: {

                            yAxes: {
                                ticks: {
                                    beginAtZero: true,
                                    precision: 0
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

export default AdminPage;
