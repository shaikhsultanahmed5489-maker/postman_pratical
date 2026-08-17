import { useEffect, useState } from "react";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
  });
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      const result = await response.json();

      if (result.success) {
        setStudents(result.data);
      }
    } catch (error) {
      setMessage("Unable to connect to backend API");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const addStudent = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setForm({
          name: "",
          email: "",
          course: "",
        });
        loadStudents();
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Unable to connect to backend API");
    }
  };

  return (
    <div className="container">
      <h1>Student Registration</h1>

      <form onSubmit={addStudent} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;