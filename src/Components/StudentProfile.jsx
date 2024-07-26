import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const StudentProfile = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      let res = await axios.get(`http://localhost:8000/students/${id}`);
      console.log(res.data);
      setStudentData(res.data);
    };
    fetchStudentData();
  }, [id]);
  console.log(id);

  return (
    <div>
      <div className="mainDivStudentPro">
        <div className="profileDiv">
          <h2>{studentData.name} Profile</h2>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{studentData.name}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{studentData.age}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{studentData.gender}</td>
              </tr>
              <tr>
                <td>Grade</td>
                <td>{studentData.grade}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{studentData.class}</td>
              </tr>
              <tr>
                <td>Roll No.</td>
                <td>{studentData.rollno}</td>
              </tr>
              <tr>
                <td>Father Name</td>
                <td>{studentData.fatherName}</td>
              </tr>
              <tr>
                <td>Mother Name</td>
                <td>{studentData.motherName}</td>
              </tr>
            </tbody>
          </table>

          <h3>Attendance</h3>
          <ul>
            {studentData.attendance &&
              studentData?.attendance?.map((record, index) => (
                <li
                  key={index}
                  style={{
                    color: record.status === "present" ? "green" : "red",
                  }}
                >
                  Date: {record.date} - Status: {record.status}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2>Result</h2>
          <table>
            <tbody>
              <tr>
                <td>Subjects</td>
                <td>Marks</td>
              </tr>
              {studentData?.result?.map((res) => (
                <tr>
                  <td>{res.Subject}</td>
                  <td>{res.Marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
