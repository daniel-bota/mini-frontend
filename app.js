const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let posts = [];

const postsList = document.querySelector('#posts-list');
const statusMessage = document.querySelector('#status-message');
const postForm = document.querySelector('#post-form');
const formFeedback = document.querySelector('#form-feedback');
const searchInput = document.querySelector('#search-input');

function renderPosts(items) {
    postsList.innerHTML = '';

    if (items.length === 0) {
        statusMessage.textContent = 'Nu există articole.';
        return;
    }

    statusMessage.textContent = '';

    for (const post of items) {
        const li = document.createElement('li');
        li.dataset.id = post.id;

        const h3 = document.createElement('h3');
        h3.textContent = post.title;

        const p = document.createElement('p');
        p.textContent = post.body;

        const btn = document.createElement('button');
        btn.textContent = 'Șterge';

        li.append(h3, p, btn);
        postsList.append(li);
    }
}

async function loadPosts() {
    statusMessage.textContent = 'Se încarcă articolele...';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Eroare HTTP ' + response.status);
        }

        const data = await response.json();
        posts = data.slice(0, 10);
        renderPosts(posts);
    } catch (error) {
        statusMessage.textContent = 'Eroare: ' + error.message;
    }
}

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
        renderPosts(posts);

        postForm.reset();
        formFeedback.textContent = 'Articol adăugat cu succes (201)!';
    } catch (error) {
        formFeedback.textContent = 'Eroare: ' + error.message;
    }
});

postsList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.closest('li');
        posts = posts.filter(p => p.id !== Number(li.dataset.id));
        renderPosts(posts);
    }
});

searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderPosts(posts.filter(p => p.title.toLowerCase().includes(q)));
});

loadPosts();
