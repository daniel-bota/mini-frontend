const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let posts = [];

const postForm = document.querySelector('#post-form');
const formFeedback = document.querySelector('#form-feedback');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.textContent = '';

    const formData = new FormData(postForm);
    const title = formData.get('title');
    const body = formData.get('body');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body, userId: 1 })
        });

        if (!response.ok) {
            throw new Error('Eroare server ' + response.status);
        }

        const newPost = await response.json();
        posts.unshift(newPost);

        postForm.reset();
        formFeedback.textContent = 'Articol adăugat cu succes (201)!';
    } catch (error) {
        formFeedback.textContent = 'Eroare: ' + error.message;
    }
});
