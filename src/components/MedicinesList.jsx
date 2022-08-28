import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MedicineService from '../services/MedicineService';

class MedicinesList extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            medicines:[]
        }
    }
    componentDidMount()
    {
        MedicineService.getMedicines().then((res)=>{
              this.setState({medicines:res.data});
        });
    }
    
    
    
    render() {
        const getMedicines = ()=>{
            MedicineService.getMedicines().then((response) => {
                this.setState({medicines:response.data});
            }) 
        }
        const deleteMedicine =(medicineId)=> {
            MedicineService.deleteMedicine(medicineId).then((response) =>{
             getMedicines();   
            });
        }
        return (
            <div>
                <br></br>
                 <h2 className='text-center'>Medicines List</h2>
                 <br></br>
                 
                 <div className='row'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>MEDICINE ID</th>
                                <th>MEDICINE</th>
                                <th>PILLS/SYRUP</th>
                                <th>DOSAGES</th>
                                <th>TIMINGS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.medicines.map(
                                    medicines=>
                                    <tr key={medicines.id}>
                                        <td>{medicines.id}</td>
                                          <td>{medicines.medName}</td>
                                           <td>{medicines.isSyrup}</td>
                                         <td>{medicines.morningDosage}-{medicines.afternoonDosage}-{medicines.eveningDosage}-{medicines.nightDosage}</td>
                                          <td>{medicines.morningTiming?medicines.morningTiming:'0'}-{medicines.afternoonTiming?medicines.afternoonTiming:'0'}-{medicines.eveningTiming?medicines.eveningTiming:'0'}-{medicines.nightTiming?medicines.nightTiming:'0'}</td>
                                          <td>
                                            <Link className='btn btn-primary bg-danger border border-danger' to={`/update/${medicines.id}`}>Update</Link>
                                          <button className='btn btn-danger' onClick={() => deleteMedicine(medicines.id)} style={{marginLeft:"10px"}}>Delete</button>
                                          </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        <br>
                        </br>
<Link to="/addmedicine" className="btn btn-primary bg-danger border border-danger">Add Medicine</Link>

                    </table>
                 </div>
            </div>
        );
    }
}

export default MedicinesList;
