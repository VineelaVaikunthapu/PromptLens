const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 80);
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav && window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else if (nav) {
        nav.classList.remove('scrolled');
    }
});

function showSection(type) {
    const authSection = document.getElementById('auth-section');
    authSection.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (type === 'login') {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
    }
}

function hideAuth() {
    document.getElementById('auth-section').style.display = 'none';
    document.body.style.overflow = '';
}

document.getElementById('auth-section').addEventListener('click', function(e) {
    if (e.target === this) hideAuth();
});

async function handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const msg = document.getElementById('signupMsg');

    if (!name || !email || !password) {
        msg.textContent = 'Please fill in all fields.';
        msg.className = 'auth-msg error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'auth-msg error';
        return;
    }

    if (password.length < 6) {
        msg.textContent = 'Password must be at least 6 characters.';
        msg.className = 'auth-msg error';
        return;
    }

    msg.textContent = 'Creating your account...';
    msg.className = 'auth-msg';

    try {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (data.success) {
            msg.textContent = 'Account created! Logging you in...';
            msg.className = 'auth-msg success';
            await autoLogin(email, password);
        } else {
            msg.textContent = data.message;
            msg.className = 'auth-msg error';
        }
    } catch (err) {
        msg.textContent = 'Something went wrong. Try again.';
        msg.className = 'auth-msg error';
    }
}

async function autoLogin(email, password) {
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) window.location.href = '/dashboard';
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMsg');

    if (!email || !password) {
        msg.textContent = 'Please fill in all fields.';
        msg.className = 'auth-msg error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'auth-msg error';
        return;
    }

    msg.textContent = 'Logging in...';
    msg.className = 'auth-msg';

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) {
            msg.textContent = 'Welcome back!';
            msg.className = 'auth-msg success';
            setTimeout(() => window.location.href = '/dashboard', 500);
        } else {
            msg.textContent = data.message;
            msg.className = 'auth-msg error';
        }
    } catch (err) {
        msg.textContent = 'Something went wrong. Try again.';
        msg.className = 'auth-msg error';
    }
}
