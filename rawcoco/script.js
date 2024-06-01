// 模拟的用户数据
let users = [];
let posts = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", registerUser);
    }
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    }
    if (document.getElementById("postForm")) {
        document.getElementById("postForm").addEventListener("submit", createPost);
    }
    if (document.getElementById("usernameDisplay")) {
        loadUserData();
    }
});

function registerUser(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    users.push({ username, password });
    alert("注册成功，请登录！");
    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "user.html";
    } else {
        alert("用户名或密码错误");
    }
}

function createPost(event) {
    event.preventDefault();
    const content = event.target.postContent.value;
    const post = { username: currentUser.username, content, date: new Date() };
    posts.push(post);
    loadUserPosts();
    event.target.postContent.value = '';
}

function loadUserData() {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    document.getElementById("usernameDisplay").innerText = currentUser.username;
    loadUserPosts();
}

function loadUserPosts() {
    const userPosts = posts.filter(post => post.username === currentUser.username);
    const postsList = document.getElementById("postsList");
    postsList.innerHTML = '';
    userPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.innerText = `${post.date.toLocaleString()}: ${post.content}`;
        postsList.appendChild(postElement);
    });
}
