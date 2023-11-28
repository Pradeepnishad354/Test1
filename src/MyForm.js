import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const MyForm = () => {
  const [calendar1Date, setCalendar1Date] = useState(new Date());
  const [calendar2Date, setCalendar2Date] = useState(() => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return nextYear;
  });

  const [dropdown1Value, setDropdown1Value] = useState("All");
  const [dropdown2Value, setDropdown2Value] = useState("Sunday");
  const [dropdown3Value, setDropdown3Value] = useState("Every");
  const [dropdown4Value, setDropdown4Value] = useState("January");
  const [allData, setAllData] = useState([]);

  console.log("allData", allData);

  const handleSubmit = () => {
    // Validate dropdown selections
    if (
      !dropdown1Value ||
      !dropdown2Value ||
      !dropdown3Value ||
      !dropdown4Value
    ) {
      alert("Please select values for all dropdowns");
      return;
    }

    // Generate date records based on conditions
    const dateRecords = [];
    let currentDate = new Date(calendar1Date);
    const endDate = new Date(calendar2Date);

    while (currentDate <= endDate) {
      dateRecords.push({
        date: currentDate.toLocaleDateString(),
        date2: endDate.toLocaleDateString(),
        dropdown1: dropdown1Value,
        dropdown2: dropdown2Value,
        dropdown3: dropdown3Value,
        dropdown4: dropdown4Value,
      });

      // Increment date based on dropdown3Value (Every/Alternate)
      if (dropdown3Value === "Every") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 14);
      }
    }

    // Display generated date records
    console.table("dateRecords", dateRecords);
    setAllData(dateRecords);
  };

  return (
    <div>
      <div>
        <label>Calendar 1</label>
        <input
          type="date"
          value={calendar1Date.toISOString().split("T")[0]}
          onChange={(e) => setCalendar1Date(new Date(e.target.value))}
        />
      </div>

      <div>
        <label>Calendar 2</label>
        <input
          type="date"
          value={calendar2Date.toISOString().split("T")[0]}
          onChange={(e) => setCalendar2Date(new Date(e.target.value))}
        />
      </div>

      <div>
        <label>Dropdown 1</label>
        <select
          value={dropdown1Value}
          onChange={(e) => setDropdown1Value(e.target.value)}
        >
          <option value="All">All</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>
      </div>

      <div>
        <label>Dropdown 2</label>
        <select
          value={dropdown2Value}
          onChange={(e) => setDropdown2Value(e.target.value)}
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>

      <div>
        <label>Dropdown 3</label>
        <select
          value={dropdown3Value}
          onChange={(e) => setDropdown3Value(e.target.value)}
        >
          <option value="Every">Every</option>
          <option value="Alternate">Alternate</option>
        </select>
      </div>

      <div>
        <label>Dropdown 4</label>
        <select
          value={dropdown4Value}
          onChange={(e) => setDropdown4Value(e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {allData &&
          allData?.map((data, ind) => {
            console.log("data", data);
            const { date, date2, dropdown1, dropdown2, dropdown3, dropdown4 } =
              data;
            return (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Calender1</th>
                    <th>Calender2</th>
                    <th>Dropdown1</th>
                    <th>Dropdown2</th>
                    <th>Dropdown3</th>
                    <th>Dropdown4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{++ind}</td>
                    <td>{date}</td>
                    <td>{date2}</td>
                    <td>{dropdown1}</td>
                    <td>{dropdown2}</td>
                    <td>{dropdown3}</td>
                    <td>{dropdown4}</td>
                  </tr>
                </tbody>
              </Table>
            );
          })[0]}
      </div>
    </div>
  );
};

export default MyForm;
