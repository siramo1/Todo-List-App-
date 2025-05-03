import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/students`);
        const sortedStudents = response.data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a._id);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b._id);
          return dateB - dateA;
        });
        setStudents(sortedStudents);
      } catch (err) {
        console.error("Fetch error:", err);
        Swal.fire('Error', 'Failed to load students', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (studentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/students/${studentId}`);
        setStudents(students.filter(student => student._id !== studentId));
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire('Error', 'Failed to delete student', 'error');
      }
    }
  };

  // Edit student
  const handleEdit = async (student) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: 'Edit Student',
      html: `
        <div class="text-left">
          <label class="block mb-2">Name:</label>
          <input id="swal-input1" class="swal2-input" value="${student.name || ''}">
          
          <label class="block mb-2 mt-4">Age:</label>
          <input id="swal-input2" type="number" class="swal2-input" value="${student.age || ''}">
          
          <label class="block mb-2 mt-4">Grade:</label>
          <input id="swal-input3" class="swal2-input" value="${student.grade || ''}">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-input1').value,
          age: document.getElementById('swal-input2').value,
          grade: document.getElementById('swal-input3').value
        };
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (isConfirmed) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/students/${student._id}`,
          {
            name: formValues.name,
            age: Number(formValues.age),
            grade: formValues.grade
          }
        );
        
        setStudents(students.map(s => 
          s._id === student._id ? response.data : s
        ));
        
        Swal.fire('Success!', 'Student updated successfully', 'success');
      } catch (err) {
        console.error("Edit error:", err.response?.data);
        Swal.fire(
          'Error!',
          err.response?.data?.message || 'Failed to update student',
          'error'
        );
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
      <header className="flex justify-center mt-8 gap-10">
        <h1 className="text-center text-amber-50 text-3xl p-5 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl sm:text-4xl">
          All Students
        </h1>
        <Link 
          to="/AddStudent" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 pl-8 pr-8 rounded-full flex items-center"
        >
          <span className="text-2xl">+</span>
          <span className="ml-2 text-2xl">Create</span>
        </Link>
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
                      <button 
                        onClick={() => handleEdit(student)} 
                        className="p-1 pl-3 pr-3 border-2 border-blue-700 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(student._id)} 
                        className="p-1 pl-2 pr-2 border-2 border-blue-700 rounded-md bg-gradient-to-r from-red-500 to-rose-500 cursor-pointer"
                      >
                        Delete
                      </button>
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
