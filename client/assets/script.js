document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.getAttribute('data-id');
            window.location.href = `course.html?id=${courseId}`;
        });
    });

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});