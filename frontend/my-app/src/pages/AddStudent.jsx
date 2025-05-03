// AddStudent.jsx
import { useState } from 'react';
import '../App.css';

function AddStudent() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    grade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log('Success', data);
      alert('registration succesfull!');
    } catch (error) {
      console.error('register failed:', error);
      alert('registration failed!')
    }
  };


  return (
  <div className="flex justify-center items-center h-screen text-2xl text-white text-center w-full h-fill">
    <div>
      <header className="flex justify-center mb-8">
        <h1 className="text-center text-amber-50 text-3xl p-5 pl-8 pr-8 w-fit bg-gradient-to-r from-green-700 to-emerald-400 border-4 border-orange-600 rounded-2xl sm:text-4xl">Registration Form</h1><br />
      </header>

      <div className="bg-cyan-200 border-8 border-orange-600 rounded-2xl w-fit h-fit text-center text-emerald-800 font-bold pb-3d0 mb-10 sm:pl-25 sm:pr-25"><br />
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <label for="name">&nbsp;Name&nbsp;:  </label>
          <input type="text" name='name' value={form.name} onChange={handleChange} placeholder='Your Name' required className="text-center text-2xl h-fit border-4 border-blue-700 rounded-2xl"/><br /><br />
        </div>
        <div className="flex gap-5">
          <label for="name">&nbsp;&nbsp;Age &nbsp;&nbsp;:</label>
          <input type="number" name='age' value={form.age} onChange={handleChange} placeholder='Your age' required className="text-center text-2xl border-4 h-fit border-blue-700 rounded-2xl" /><br /><br />
        </div>
        <div className="flex gap-5">
          <label for="name">&nbsp;Grade :</label>
          <input type="number" name='grade' value={form.grade} onChange={handleChange} placeholder='Your grade' required className="text-center text-2xl h-fit border-4 border-blue-700 rounded-2xl" /><br /><br />
        </div>
        <button type='submit' className='border-4 border-cyan-300 rounded-2xl bg-amber-500 w-30 cursor-pointer hover:bg-sky-700'>Submit</button>
      </form>
    </div>
  </div>
  </div>
  )
}

export default AddStudent
