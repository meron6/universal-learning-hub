// Toggle lesson details visibility
document.addEventListener('DOMContentLoaded', () => {
    const lessonCards = document.querySelectorAll('.lesson-card');

    lessonCards.forEach((card) => {
        card.addEventListener('click', () => {
            const details = card.querySelector('.lesson-details');
            if (details) {
                details.classList.toggle('visible');
            }
        });
    });
});

// Sample data fetch simulation
async function fetchLessons() {
    try {
        const response = await fetch('http://localhost:5000/api/lessons');
        const data = await response.json();
        displayLessons(data);
    } catch (error) {
        console.error('Error fetching lessons:', error);
    }
}

// Display lessons on the page
function displayLessons(lessons) {
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';

    lessons.forEach((lesson) => {
        const lessonCard = document.createElement('div');
        lessonCard.classList.add('lesson-card');
        lessonCard.innerHTML = `
            <img src="${lesson.imageURL}" alt="${lesson.title}">
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <button class="btn">View More</button>
        `;
        lessonContainer.appendChild(lessonCard);
    });
}

// Initialize lessons on page load
window.onload = fetchLessons;