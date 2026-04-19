import { useState } from 'react'

const initialForm = {
    name: '',
    credits: '',
    grade: '',
    attending: false,
    difficulty: 'Easy'
}

function RegisterCourse({ onRegister }) {
    const [formData, setFormData] = useState(initialForm)
    const [error, setError] = useState('')

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (formData.name.trim() === '') {
            setError('course name is required.')
            return
        }

        const gradeNumber = Number(formData.grade)

        if (Number.isNaN(gradeNumber) || gradeNumber < 5 || gradeNumber > 10) {
            setError('grade must be a number from 5 to 10.')
            return
        }

        setError('')

        onRegister({
            name: formData.name.trim(),
            credits: Number(formData.credits),
            grade: gradeNumber,
            attending: formData.attending,
            difficulty: formData.difficulty
        })

        setFormData(initialForm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register New Course</h2>

            <input
                type="text"
                name="name"
                placeholder="Course name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="number"
                name="credits"
                placeholder="Credit hours"
                value={formData.credits}
                onChange={handleChange}
            />

            <input
                type="number"
                name="grade"
                placeholder="Current grade"
                value={formData.grade}
                onChange={handleChange}
            />

            <label>
                <input
                    type="checkbox"
                    name="attending"
                    checked={formData.attending}
                    onChange={handleChange}
                />
                Attending regularly
            </label>

            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
            >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
            </select>

            <button type="submit">Register</button>

            {error && <p>{error}</p>}
        </form>
    )
}

export default RegisterCourse