document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');
    const startButton = document.querySelector('.start-button');

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.dataset.id;
            window.location.href = `course.html?id=${courseId}`;
        });
    });

    startButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});
