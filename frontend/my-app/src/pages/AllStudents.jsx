
import { useState, useEffect } from "react"
import axios from "axios"

function AllStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/students')
      .then(students => setStudents(students.data))
      .catch(err => console.log(err))
    }, [])

    //Delete A student
   const handleDelete = async (studentId) => {
    if(!window.confirm('Are you sure you want delete this student')) return;

    try {
      axios.delete(`http://localhost:5000/api/students/${studentId}`);
      setStudents(students.filter(student => student._id !== studentId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student");
    }
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
              <th className="border-4 border-orange-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
             {students.map(student => {
             return <tr>
                    <td className="border-4 border-orange-500 p-2">{student.name}</td>
                    <td className="border-4 border-orange-500 p-2">{student.age}</td>
                    <td className="border-4 border-orange-500 p-2">{student.grade}</td>
                    <td className="border-4 border-orange-500 p-2">
                    <div className="flex gap-2 text-amber-50 font-mono sm:gap-8">
                      <button className="p-1 pl-3 pr-3 border-2 border-blue-700 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer">edit</button>
                      <button onClick={() => handleDelete(student._id)} className="p-1 pl-2 pr-2 border-2 border-blue-700 rounded-md bg-gradient-to-r from-red-500 to-rose-500 cursor-pointer">delete</button>
                    </div>
                  </td>
                </tr>
            }) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllStudents
