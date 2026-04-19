import { useCallback, useState } from 'react'
import './App.css'
import StudentCard from './components/StudentCard'
import RegisterCourse from './components/RegisterCourse'

const initialCourses = [
  {
    id: 1,
    name: 'Client Side Programming',
    credits: 6,
    grade: 8,
    attending: true,
    difficulty: 'Moderate'
  },
  {
    id: 2,
    name: 'Operating Systems',
    credits: 6,
    grade: 9,
    attending: true,
    difficulty: 'Hard'
  },
  {
    id: 3,
    name: 'Database',
    credits: 5,
    grade: 7,
    attending: false,
    difficulty: 'Moderate'
  }
]

function App() {
  const [courses, setCourses] = useState(initialCourses)

  const handleAddCourse = useCallback((newCourse) => {
    setCourses((prevCourses) => {
      // I calculate the next id from the current list so it stays correct even after new courses are added.
      const nextId =
          prevCourses.length > 0
              ? Math.max(...prevCourses.map((course) => course.id)) + 1
              : 1

      return [...prevCourses, { ...newCourse, id: nextId }]
    })
  }, [])

  return (
      <div className="app">
        <h1>Berina Misimi</h1>
        <h2>Student ID: 132579</h2>
        <p>The courses below are my enrolled courses for this semester.</p>

        {courses.map((course) => (
            <StudentCard key={course.id} course={course} />
        ))}

        <RegisterCourse onRegister={handleAddCourse} />
      </div>
  )
}

export default App