import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // show Students
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        // Sort by newest first (using _id timestamp or createdAt if available)
        const sortedStudents = response.data.sort((a, b) => {
          // Try createdAt first, fall back to _id timestamp
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a._id);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b._id);
          return dateB - dateA; // Newest first
        });
        setStudents(sortedStudents);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // delete Student
  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      setStudents(students.filter(student => student._id !== studentId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student");
    }
  };

  // edit the student
  const handleEdit = async (student) => {
    // Create a form-like prompt
    const formHtml = `
      <div>
        <label>Name:</label><br>
        <input id="edit-name" value="${student.name}" style="width:100%"><br>
        <label>Age:</label><br>
        <input id="edit-age" type="number" value="${student.age}" style="width:100%"><br>
        <label>Grade:</label><br>
        <input id="edit-grades" value="${student.grade}" style="width:100%">
      </div>
    `;
  
    const result = await Swal.fire({
      title: 'Edit Student',
      html: formHtml,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('edit-name').value,
          age: parseInt(document.getElementById('edit-age').value),
          grades: document.getElementById('edit-grades').value
            .split(',')
            .map(grade => parseFloat(grade.trim()))
            .filter(grade => !isNaN(grade))
        }
      }
    });
  
    if (result.isConfirmed) {
      try {
        const updatedData = result.value;
        const response = await axios.put(
          `http://localhost:5000/api/students/${student._id}`,
          updatedData
        );
        
        setStudents(students.map(s => 
          s._id === student._id ? response.data : s
        ));
      } catch (err) {
        console.error("Edit error:", err);
        alert("Failed to update student");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden w-full h-full">
      <header className="flex justify-center mt-8">
        <h1 className="text-center text-amber-50 text-3xl p-5 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl sm:text-4xl">All Students</h1>
      </header>
      
      <div className="flex justify-center items-center pt-5">  
        <table className="bg-cyan-200 rounded-2xl border-[6px] border-orange-500 text-emerald-800 sm:text-3xl">
          <thead>
            <tr>
              <th className="border-4 border-orange-500 p-2">Name</th>
              <th className="border-4 border-orange-500 p-2">Age</th>
              <th className="border-4 border-orange-500 p-2">Grade</th>
              <th className="border-4 border-orange-500 p-2">Date Added</th>
              <th className="border-4 border-orange-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {students.map(student => {
              const dateAdded = student.createdAt 
                ? new Date(student.createdAt).toLocaleDateString() 
                : new Date(student._id).toLocaleDateString();
              
              return (
                <tr key={student._id}>
                  <td className="border-4 border-orange-500 p-2">{student.name}</td>
                  <td className="border-4 border-orange-500 p-2">{student.age}</td>
                  <td className="border-4 border-orange-500 p-2">{student.grade}</td>
                  <td className="border-4 border-orange-500 p-2">{dateAdded}</td>
                  <td className="border-4 border-orange-500 p-2">
                    <div className="flex gap-2 text-amber-50 font-mono sm:gap-8">
                      <button onClick={() => handleEdit(student)} className="p-1 pl-3 pr-3 border-2 border-blue-700 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer">edit</button>
                      <button onClick={() => handleDelete(student._id)} className="p-1 pl-2 pr-2 border-2 border-blue-700 rounded-md bg-gradient-to-r from-red-500 to-rose-500 cursor-pointer">delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsPage;