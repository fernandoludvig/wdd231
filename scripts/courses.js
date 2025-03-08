const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 3, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "CSE 111", name: "Programming with Classes", credits: 3, completed: true },
    { code: "CSE 110", name: "Programming with Functions", credits: 3, completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
    { code: "WDD 231", name: "Frontend Development", credits: 3, completed: false },
];

function displayCourses(filter = "All") {
    const filteredCourses = filter === "All" ? courses : courses.filter(course => course.code.startsWith(filter));
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    // Divide os cursos em duas linhas
    for (let i = 0; i < filteredCourses.length; i += 3) {
        const row = document.createElement('div');
        row.className = 'course-row';
        for (let j = i; j < i + 3 && j < filteredCourses.length; j++) {
            const course = filteredCourses[j];
            const courseLink = document.createElement('a');
            courseLink.href = '#';
            courseLink.textContent = course.code;
            courseLink.className = course.completed ? '' : 'gray';
            row.appendChild(courseLink);
        }
        courseList.appendChild(row);
    }

    calculateTotalCredits(filter);
}

function calculateTotalCredits(filter = "All") {
    const filteredCourses = filter === "All" ? courses : courses.filter(course => course.code.startsWith(filter));
    const totalCredits = filteredCourses
        .filter(course => course.completed) // Considera apenas as matérias concluídas
        .reduce((sum, course) => sum + course.credits, 0);
    document.querySelector('.total-credits').textContent = `Total Credits: ${totalCredits}`;
}

document.querySelectorAll('.card a').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        displayCourses(filter);
    });
});

// Initialize
displayCourses();