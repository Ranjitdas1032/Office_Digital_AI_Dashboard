import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees,setPage,getStats } from "../employeeslice/employeeSlice";


function Employess(){
    const dispatch = useDispatch();

    const {
        employees,
        stats,
        loading,
        error,
        count,
        next,
        previous,
        page
    } = useSelector((state) => state.employees);

    useEffect(()=>{
        dispatch(getEmployees(page));
        dispatch(getStats());
    },[dispatch,page])

    return(
        <>
        {loading && <h4>Loading...</h4>}
        {error && <h4>{error}</h4>}

        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Employee Name</th>
                <th>Date of Joining</th>
                <th>Total Success</th>
                <th>Total Failure</th>
                <th>Attendence</th>
                <th>Salary</th>
                <th>Designation</th>
            </tr>
            </thead>
            <tbody>

            {employees.map((employee) => {
               return(
                <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.date_of_joining}</td>
                <td>{employee.total_no_of_success}</td>
                <td>{employee.total_no_of_failure}</td>
                <td>{employee.attendence}</td>
                <td>{employee.salary}</td>
                <td>{employee.designation}</td>
                </tr>
               )
            })}
            </tbody>
        </table>
        <p>Total Employess are : {count}</p>
        <button disabled = {!previous} onClick={(e) => dispatch(setPage(page -1))} >Previous</button>
        <p>{page}</p>
        <button disabled = {!next} onClick={(e) => dispatch(setPage(page +1))} >Next</button>

        <h2>Employees Stats</h2>
        <ol>
            <li>mean = {stats.mean}</li>
            <li>mode = {stats.mode}</li>
            <li>median = {stats.median}</li>
            <li>standard deviation = {stats.std}</li>
        </ol>
        </>

    )
}

export default Employess;