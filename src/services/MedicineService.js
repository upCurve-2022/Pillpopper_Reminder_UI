import axios from "axios";
const MEDICINE_API_BASE_URL = "http://localhost:8080/api/v1/medicines";
class MedicineService {
  getMedicines() {
    return axios.get(MEDICINE_API_BASE_URL);
  }
  addMedicines(medicines) {
    return axios.post(MEDICINE_API_BASE_URL, medicines);
  }
  getMedicinesById(medicineid) {
    return axios.get(MEDICINE_API_BASE_URL + "/" + medicineid);
  }
  updateMedicines(medicineid,medicines){
    return axios.put(MEDICINE_API_BASE_URL+'/'+medicineid,medicines);
  }
  deleteMedicine(medicineid){
    return axios.delete(MEDICINE_API_BASE_URL+'/'+medicineid);
  }
}
export default new MedicineService();
