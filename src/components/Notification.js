import React, { useEffect, useState, memo } from "react";

import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Notification = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL CALLING");
      async function fetchMedicineNotification() {
        let response = await fetch("http://localhost:8080/api/v1/medicines");
        let medicineNotificationInfo = await response.json();
        // let medicineNotificationInfo = [
        //   {
        //     id: 27,
        //     medName: "Paracetamol",
        //     isSyrup: "No",
        //     morningTiming: "07:00:00",
        //     morningDosage: "1 Tablet",
        //     afternoonTiming: "13:00:00",
        //     afternoonDosage: "1 Tablet",
        //     eveningTiming: "18:00:00",
        //     eveningDosage: "1 Tablet",
        //     nightTiming: "21:50:00",
        //     nightDosage: "2 Tablet",
        //   },
        // ];

        let allMedicineNotification = [];
        for (let i = 0; i < medicineNotificationInfo.length; i++) {
          const { morningTiming, afternoonTiming, eveningTiming, nightTiming } =
            medicineNotificationInfo[i];

          const medicineObj = {
            morningTiming,
            afternoonTiming,
            eveningTiming,
            nightTiming,
          };

          Object.entries(medicineObj).forEach(([key, value]) => {
            if (value !== null) {
              let hour = medicineObj[key].split(":")[0];
              let minuite = medicineObj[key].split(":")[1];

              let medicineName = medicineNotificationInfo[i].medName;

              let dummyDate = new Date();
              let userTimeToRemind = new Date(
                dummyDate.getFullYear(),
                dummyDate.getMonth(),
                dummyDate.getDate(),
                hour,
                minuite,
                0
              );

              let userOriginalTime = new Date(userTimeToRemind.valueOf());

              userTimeToRemind.setHours(hour - 0);
              userTimeToRemind.setMinutes(minuite - 30);

              let currentTime = new Date();

              if (
                Date.parse(currentTime) >= Date.parse(userTimeToRemind) &&
                Date.parse(currentTime) <= Date.parse(userOriginalTime) &&
                localStorage.getItem(
                  `isNotificationPushed_${medicineName}_${hour}_${minuite}`
                ) == null
              ) {
                console.log("Condition Visit........" + medicineName);
            
                localStorage.setItem(
                  `isNotificationPushed_${medicineName}_${hour}_${minuite}`,
                  "true"
                );

                let todaysDate = new Date();
                localStorage.setItem(
                  "todays_date",
                  `${todaysDate.getFullYear()}-${
                    todaysDate.getMonth() + 1
                  }-${todaysDate.getDay()}`
                );

                let dosage = key.replace("Timing", "Dosage");
                let when = key.replace("Timing", "").toUpperCase();

                let eligibleMedicineToNotify = {
                  medicineName: medicineNotificationInfo[i].medName,
                  medicineDosage: medicineNotificationInfo[i][dosage],
                  medicineTime: value,
                  when: when,
                };

                allMedicineNotification.push(eligibleMedicineToNotify);
              }
            }
          });
        }

        if (allMedicineNotification.length > 0) {
          setMedicineData((medicineData) => [...allMedicineNotification]);
          setIsDialogOpen(true);
        }
      }

      fetchMedicineNotification();
      return () => clearInterval(interval);
    }, 5000);
  }, []);

  useEffect(() => {
    let todaysDate = new Date();
    let todaysDateString = `${todaysDate.getFullYear()}-${
      todaysDate.getMonth() + 1
    }-${todaysDate.getDay()}`;

    if (todaysDateString !== localStorage.getItem("todays_date")) {
      localStorage.clear();
    }
  }, []);

  const closeBox = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && medicineData.length > 0 && (
        <>
          <ReactDialogBox
            closeBox={closeBox}
            modalWidth="60%"
            headerBackgroundColor="red"
            headerTextColor="white"
            headerHeight="10"
            closeButtonColor="white"
            bodyBackgroundColor="white"
            bodyTextColor="black"
            bodyHeight="400px"
            headerText="Reminder"
          >
            <div className="text-center mb-4">
              <h3>Kindly take your Medicine as Follows:</h3>
            </div>
            <div className="text-center mb-3">
              <h4 className="text-center">Medicines List</h4>
            </div>
            <div className="row">
              <div className="text-center">
                <table className="table table-bordered table-warning">
                  <thead>
                    <tr>
                      <th>MEDICINE</th>
                      <th>WHEN</th>
                      <th>DOSAGES</th>
                      <th>TIMINGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicineData.map((medicine, index) => {
                      return (
                        <tr key={index}>
                          <td>{medicine.medicineName}</td>
                          <td>{medicine.when}</td>
                          <td>{medicine.medicineDosage}</td>
                          <td>{medicine.medicineTime}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ReactDialogBox>
        </>
      )}
    </>
  );
};

export default memo(Notification);
