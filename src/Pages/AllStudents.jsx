import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const AllStudents = () => {
  const [data, setData] = useState([]);
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
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  

  const getData = async () => {
    let res = await axios.get("http://localhost:8000/students");
    setData(res.data);
    // console.log(data)
  };

  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/students/${id}`);
    getData();
  };

  const handleEdit = (student) => {
    setIsEdit(true);
    setEditStudentId(student.id);
    setFormData({
      name: student.name,
      age: student.age,
      grade: student.grade,
      class: student.class,
      rollno: student.rollno,
      fatherName: student.fatherName,
      motherName: student.motherName,
      status: student.status,
      gender: student.gender,
      attendance: student.attendance,
      result: student.result,
    });
  };

  const handleCloseEditForm = () => {
    setIsEdit(false);
    setEditStudentId(null);
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
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8000/students/${editStudentId}`,
      formData
    );
    setIsEdit(false);
    setEditStudentId(null);
    getData();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  let filteredData =
    filter === "All"
      ? data
      : data.filter((student) => student.gender === filter);


      // pagination


      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
      
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      
     

      const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="AllStudentsDiv">
      <div className="filterDiv">
        Filter
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {isEdit && (
        <div className="editDiv">
          <form onSubmit={handleSubmitEdit}>
            <h2>Edit Student</h2>
            <div className="inputDiv">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </div>

            <div className="inputDiv">
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={handleCloseEditForm}>
              Cancel
            </button>
          </form>
        </div>
      )}



      <table className="tableDiv">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Class</th>
            <th>Grade</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Father Name</th>
            <th>Mother Name</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="mt-8 ">
          {currentItems.length === 0 ? (
            <tr>
              <td
                colSpan={10}
                className="px-4 py-[6px] font-[400] text-center text-slate-700"
              >
                No data available in this table
              </td>
            </tr>
          ) : (
            currentItems?.map((el, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <Link to={`/student/${el.id}`}>{el.name}</Link>
                </td>
                <td>{el.rollno}</td>
                <td>{el.class}</td>
                <td>{el.grade}</td>
                <td>{el.age}</td>
                <td>{el.gender}</td>
                <td>{el.fatherName}</td>

                <td>{el.motherName}</td>

                <td className="buttonDiv">
                  <div onClick={() => handleEdit(el)}>Edit</div>

                  <div onClick={() => handleDelete(el.id)}>Delete</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
         
     <div className="paginationDiv">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

    </div>
  );
};

export default AllStudents;
