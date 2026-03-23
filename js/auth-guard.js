// Wait for Firebase to load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof firebase === 'undefined') {
    console.error('Firebase not loaded');
    window.location.href = '/login.html';
    return;
  }

  firebase.initializeApp(window.firebaseConfig);
  const auth = firebase.auth();

  // Show loader / hide content until we know the state
  document.body.style.display = 'none';

  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = '/login.html';
    } else {
      document.body.style.display = 'block';
      // Optional: fill username placeholders
      document.querySelectorAll('#user-name').forEach(el => {
        el.textContent = user.displayName || user.email.split('@')[0];
      });
    }
  });

  // Cleanup (good practice)
  window.addEventListener('beforeunload', () => unsubscribe());
});
