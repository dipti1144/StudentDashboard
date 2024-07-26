import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";

const Dashboard = () => {
  const [tStudent, setTstudent] = useState(0);
  const [tgirls, setTgirls] = useState(0);
  const [tboys, setTboys] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    class: "",
    rollno: "",
    fatherName: "",
    motherName: "",
    status: "",
    gender: "",
    attendance: [
      {
        date: "2024-07-22",
        status: "present",
      },
      {
        date: "2024-07-23",
        status: "absent",
      },
      {
        date: "2024-07-24",
        status: "present",
      },
    ],
    result: [
      {
        Subject: "English",
        Marks: 70,
      },
      {
        Subject: "Hindi",
        Marks: 72,
      },
      {
        Subject: "Maths",
        Marks: 71,
      },
      {
        Subject: "Science",
        Marks: 60,
      },
      {
        Subject: "History",
        Marks: 80,
      },
    ],
  });

  const getData = async () => {
    let res = await axios.get("http://localhost:8000/students");
    setTstudent(res.data.length);
    let girlsCount = 0;
    let boysCount = 0;

    res.data.forEach((student) => {
      if (student.gender === "female") {
        girlsCount++;
      } else if (student.gender === "male") {
        boysCount++;
      }
    });

    setTgirls(girlsCount);
    setTboys(boysCount);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      age: parseInt(formData.age),
      rollno: parseInt(formData.rollno),
    };
    try {
      await axios.post("http://localhost:8000/students", newStudent);
      setFormData({
        name: "",
        age: "",
        grade: "",
        class: "",
        rollno: "",
        fatherName: "",
        motherName: "",
        status: "",
        gender: "",
        attendance: "",
        result: "",
      });
      getData();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <div className="dashboardDiv">
        <div className="Div1">
          <h3>Total No. Of Students</h3>
          <h2>{tStudent}</h2>
        </div>
        <div className="Div2">
          <h3>Total No. Of Boys</h3>
          <h2>{tboys}</h2>
        </div>
        <div className="Div3">
          <h3>Total No. Of Girls</h3>
          <h2>{tgirls}</h2>
        </div>
      </div>

      <div className="formDiv">
        <h2 style={{ textAlign: "center" }}>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Roll No"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Father's Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Mother's Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button className="addStudentBtn" type="submit">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
