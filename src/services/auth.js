// Centralized User Authentication & Session Service

const AUTH_STORAGE_KEY = 'saiyam_current_user';
const USERS_LIST_KEY = 'saiyam_registered_users';

const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('saiyam_auth_sync_v1')
  : null;

const getRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users list:", e);
  }
};

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type: 'AUTH_CHANGED', user });
    } catch (e) {}
  }
  window.dispatchEvent(new Event('saiyam_auth_changed'));
};

export const signUpUser = async ({ name, email, phone, password }) => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists. Please Sign In.');
  }

  const newUser = {
    id: 'USR-' + Math.floor(100000 + Math.random() * 900000),
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    password: password, // Note: For production local auth state
    createdAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
  };

  users.push(newUser);
  saveRegisteredUsers(users);
  setCurrentUser(newUser);

  return newUser;
};

export const signInUser = async ({ email, password }) => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    throw new Error('No account found with this email. Please Sign Up first.');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password. Please try again.');
  }

  setCurrentUser(user);
  return user;
};

export const signOutUser = () => {
  setCurrentUser(null);
};

export const subscribeAuth = (callback) => {
  const handler = () => {
    callback(getCurrentUser());
  };

  window.addEventListener('saiyam_auth_changed', handler);
  if (syncChannel) {
    syncChannel.onmessage = () => handler();
  }

  // Initial call
  callback(getCurrentUser());

  return () => {
    window.removeEventListener('saiyam_auth_changed', handler);
  };
};
