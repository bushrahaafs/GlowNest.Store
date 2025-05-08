export const getLoggedInUser = () => {
  const localUser = localStorage.getItem('user');
  const sessionUser = sessionStorage.getItem('user');
  return localUser ? JSON.parse(localUser) : sessionUser ? JSON.parse(sessionUser) : null;
};

export const logoutUser = () => {
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user');
  } else {
    sessionStorage.removeItem('user');
  }
};
// ✅ أضف هذا فقط لتفعيل "تذكرني"
export const saveUser = (
  user: { id: string; name: string; email: string },
  rememberMe: boolean
) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('user', JSON.stringify(user));
};



  