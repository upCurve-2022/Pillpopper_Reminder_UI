import React from 'react'
import {useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { useState } from 'react';
import MedicineService from '../services/MedicineService';

const CreateMedicine =()=> {

    const [medName,setmedName] = useState('')
    const [isSyrup,setisSyrup] = useState('')
    const [morningDosage,setmorningDosage] = useState('')
    const [eveningDosage,seteveningDosage] = useState('')
    const [afternoonDosage,setafternoonDosage] = useState('')
    const [nightDosage,setnightDosage] = useState('')
    const [morningTiming,setmorningTiming] = useState('')
    const [eveningTiming,seteveningTiming] = useState('')
    const [afternoonTiming,setafternoonTiming] = useState('')
    const [nightTiming,setnightTiming] = useState('')
    const navigate=useNavigate();
    const {id}=useParams();
    const saveOrUpdateMedicine=(e)=>
    {
      e.preventDefault();
      const medicine={medName,isSyrup,morningDosage,eveningDosage,afternoonDosage,nightDosage,morningTiming,afternoonTiming,eveningTiming,nightTiming}
      if(id)
      {
        MedicineService.updateMedicines(id,medicine).then((response) =>{
          navigate('/medicines');
        })
      }
      else{
        MedicineService.addMedicines(medicine).then((response)=>{
          navigate('/medicines');
        })

      }
      

    }
    useEffect(() => {
      MedicineService.getMedicinesById(id).then((response)=>{
        setmedName(response.data.medName)
        setisSyrup(response.data.isSyrup)
        setmorningDosage(response.data.morningDosage)
        setafternoonDosage(response.data.afternoonDosage)
        seteveningDosage(response.data.eveningDosage)
        setnightDosage(response.data.nightDosage)
        setmorningTiming(response.data.morningTiming)
        setafternoonTiming(response.data.afternoonTiming)
        seteveningTiming(response.data.eveningTiming)
        setnightTiming(response.data.nightTiming)
      })
    }, [])
    const heading = () =>
    {
      if(id)
      {
        return <h2 className='text-center'>Update Medicine</h2>
      }
      else{
         return <h2 className='text-center'>Add Medicine</h2>
      }
    }
    
    return (
      <div>
        <br></br>
        <br></br>
        <div className='container'>
          <div className='row'>
            {/* <h2 className='text-center'>ADD YOUR <span style={{color:'danger'}}>MEDICINE</span> DETAILS</h2> */}
            <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
              heading()
            }
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Medicine Name</label>
                  <input
                  type="text"
                  placeholder="Enter the Medicine name"
                  name="medName"
                  className='form-control'
                  value={medName}
                  onChange ={(e) => setmedName(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Pills/Syrup</label>
                  <input
                  type="text"
                  placeholder="Enter if Pills/Syrup"
                  name="isSyrup"
                  className='form-control'
                  value={isSyrup}
                  onChange ={(e) => setisSyrup(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Morning Dosage</label>
                  <input
                  type="text"
                  placeholder="Enter the Dosage"
                  name="morningDosage"
                  className='form-control'
                  value={morningDosage}
                  onChange ={(e) => setmorningDosage(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Afternoon Dosage</label>
                  <input
                  type="text"
                  placeholder="Enter the Dosage"
                  name="afternoonDosage"
                  className='form-control'
                  value={afternoonDosage}
                  onChange ={(e) => setafternoonDosage(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Evening Dosage</label>
                  <input
                  type="text"
                  placeholder="Enter the Dosage"
                  name="eveningDosage"
                  className='form-control'
                  value={eveningDosage}
                  onChange ={(e) => seteveningDosage(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Night Dosage</label>
                  <input
                  type="text"
                  placeholder="Enter the Dosage"
                  name="nightDosage"
                  className='form-control'
                  value={nightDosage}
                  onChange ={(e) => setnightDosage(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Morning Timing</label>
                  <input
                  type="time"
                  placeholder="Enter the Time"
                  name="morningTiming"
                  className='form-control'
                  value={morningTiming}
                  onChange ={(e) => setmorningTiming(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Afternoon Timing</label>
                  <input
                  type="time"
                  placeholder="Enter the Time"
                  name="afternoojTiming"
                  className='form-control'
                  value={afternoonTiming}
                  onChange ={(e) => setafternoonTiming(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Evening Timing</label>
                  <input
                  type="time"
                  placeholder="Enter the Time"
                  name="eveningTiming"
                  className='form-control'
                  value={eveningTiming}
                  onChange ={(e) => seteveningTiming(e.target.value)}
                  ></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Night Timing</label>
                  <input
                  type="time"
                  placeholder="Enter the Time"
                  name="nightTiming"
                  className='form-control'
                  value={nightTiming}
                  onChange ={(e) => setnightTiming(e.target.value)}
                  ></input>
                </div>
                <button className='btn btn-success bg-danger border border-danger' onClick={(e) =>saveOrUpdateMedicine(e)}>Save</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
export default CreateMedicine;

