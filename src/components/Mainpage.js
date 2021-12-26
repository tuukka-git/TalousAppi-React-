import { useEffect, useState } from "react";
import userInfoService from "../services/userInfoService";

const Mainpage = () => {

    const [m, setM] = useState(1);
    const [y, setY] = useState(2021);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [monthData, setMonthData] = useState({menot : [], tulot : []});

    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
        setMonths(await userInfoService.getMonths(2021))
        setYears(await userInfoService.getYears());
        setMonthData(await userInfoService.getMonthData(2021,1));
    }
    const changeMonth = async (e) => {
        setM(e.target.value);
        setMonthData(await userInfoService.getMonthData(y, e.target.value));
        console.log(monthData)
    }
    const changeYear = async (e) => {
        setY(e.target.value);
        setMonths(await userInfoService.getMonths(e.target.value))
        setMonthData(await userInfoService.getMonthData(e.target.value, m));
    }

    return(
        <>
        <div class="container-fluid">
            <nav class="navbar navbar-dark bg-primary">
                <div class="container-fluid">
                <a class="navbar-brand" href="/"><h2>TalousAppi</h2></a>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/upload">UploadCSV</a>
                    </li>
                </ul>
                <button type="button" className="btn btn-light">Log out</button>
                </div>
            </nav>
        </div>
        <div class="row">
            <div class="col">
                <select onChange={changeYear} class="form-select">
                {years.map(y => <option value={y}>{y}</option>)}
                </select>
            </div>
            <div class="col">
                <select onChange={changeMonth} class="form-select">
                {months.map(m => <option value={m}>{m}</option>)}
                </select>
            </div>
        </div>
        <div class="mt-3">
            <div class="card">
                <h5 class="card-header">Kulut:</h5>
                {monthData.menot.map(md => <h6 class="list-group-item">{md[0]} {md[1]}€</h6>)}  
            </div>
        </div>
        </>
    );
}

export default Mainpage;