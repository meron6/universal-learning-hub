const API_URL = 'http://localhost:5000/api';

export const getCourses = async () => {
    try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get courses error:', error);
        throw error;
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/courses/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get course error:', error);
        throw error;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) {
            throw new Error('Failed to create course');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create course error:', error);
        throw error;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) {
            throw new Error('Failed to update course');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Update course error:', error);
        throw error;
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete course');
        }
        return true;
    } catch (error) {
        console.error('Delete course error:', error);
        throw error;
    }
};