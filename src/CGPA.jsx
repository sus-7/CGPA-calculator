import React, { useState } from 'react';

function CGPA() {
    const [numSubjects, setNumSubjects] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [cgpa, setCgpa] = useState(null);

    const handleNumSubjectsChange = (event) => {
        setNumSubjects(event.target.value);
        const newSubjects = Array.from({ length: event.target.value }, () => ({ marks: '', credits: '' }));
        setSubjects(newSubjects);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newSubjects = [...subjects];
        newSubjects[index][name] = value;
        setSubjects(newSubjects);
    };

    const addSubject = () => {
        setSubjects([...subjects, { marks: '', credits: '' }]);
    };

    const calculateCGPA = () => {
        let totalCredits = 0;
        let totalPoints = 0;

        subjects.forEach(subject => {
            const marks = parseFloat(subject.marks);
            const credits = parseFloat(subject.credits);
            if (marks >= 90 && marks <= 100) {
                totalPoints += credits * 10;
            } else if (marks >= 80 && marks < 90) {
                totalPoints += credits * 9;
            } else if (marks >= 70 && marks < 80) {
                totalPoints += credits * 8;
            } else if (marks >= 60 && marks < 70) {
                totalPoints += credits * 7;
            } else if (marks >= 50 && marks < 60) {
                totalPoints += credits * 6;
            } else if (marks >= 45 && marks < 50) {
                totalPoints += credits * 5;
            } else if (marks >= 40 && marks < 45) {
                totalPoints += credits * 4;
            }
            totalCredits += credits;
        });

        const cgpa = (totalPoints / totalCredits).toFixed(2);
        setCgpa(cgpa);
    };

    return (
        <div className="container">
            <h1>CGPA Calculator</h1>
            <div className="subject">
                <input
                    type="number"
                    name="numSubjects"
                    placeholder="Number of Subjects"
                    value={numSubjects}
                    onChange={handleNumSubjectsChange}
                />
            </div>
            {subjects.map((subject, index) => (
                <div key={index} className="subject">
                    <input
                        type="number"
                        name="marks"
                        placeholder="Marks"
                        value={subject.marks}
                        onChange={event => handleChange(index, event)}
                    />
                    <input
                        type="number"
                        name="credits"
                        placeholder="Credits"
                        value={subject.credits}
                        onChange={event => handleChange(index, event)}
                    />
                </div>
            ))}
            <button onClick={addSubject}>Add Subject</button>
            <button onClick={calculateCGPA}>Calculate CGPA</button>
            {cgpa && (
                <h2>Your CGPA is: {cgpa}</h2>
            )}
        </div>
    );
}

export default CGPA;
