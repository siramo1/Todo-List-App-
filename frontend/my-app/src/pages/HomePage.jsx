import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="text-amber-50 flex justify-center items-center h-screen">
      <div className="mb-50">
        <h1 className="text-center text-4xl p-5 bg-gradient-to-r from-green-700 to-emerald-400 border-2 rounded-2xl">This is Home page</h1><br /><br />
        <div className="text-center">
          <Link to='/studentpage' className="p-3 border-2 rounded-2xl text-center mr-3 bg-gradient-to-r from-blue-950 to-purple-600"><button>All Students</button></Link>
          <Link to='/addstudent' className="p-3 border-2 rounded-2xl text-center ml-3 bg-gradient-to-r from-purple-600 to-blue-950"><button>Add Students</button></Link>
          <Link to='/AllStudents' className="p-3 border-2 rounded-2xl text-center ml-3 bg-gradient-to-r from-purple-600 to-blue-950"><button>All Students 2</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
