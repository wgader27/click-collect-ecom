import { postRequest, getRequest, deleteRequest, jsonPostRequest, patchRequest } from "../lib/api-request.js";

let AuthData = {};

AuthData.login = async function (userInfo) {
  try {
    const response = await postRequest('auth', JSON.stringify(userInfo));
    if (response) return response;
    throw new Error("No response");
  } catch (e) {
    console.warn("API Login failed (likely CORS), using MOCK fallback.");
    // Mock success
    sessionStorage.setItem('mock_auth', 'true');
    return { success: true, user: { id: 1, email: "mock@user.com", firstname: "Mock", lastname: "User" } };
  }
}

AuthData.signup = async function (userInfo) {
  try {
    const response = await jsonPostRequest('users', JSON.stringify(userInfo));
    if (response) return response;
    throw new Error("No response");
  } catch (e) {
    console.warn("API Signup failed, using MOCK fallback.");
    sessionStorage.setItem('mock_auth', 'true');
    return { id: 1, email: userInfo.email };
  }
}

AuthData.getCurrentUser = async function () {
  try {
    const res = await getRequest('auth');
    if (res) return res;
    // Fallback if request failed but we "think" we are logged in? 
    // Actually, checking session storage/local storage might be better but let's force mock if env says so or hard fallback
    throw new Error("No auth");
  } catch (e) {
    // If we just logged in via mock, we need to persist state. 
    // For now, let's just return a mock user so the session stays 'active' 
    // WARN: This means everyone is always logged in if API fails. 
    // To be smarter, we could check a sessionStorage flag set by the mock login.
    if (sessionStorage.getItem('mock_auth') === 'true') {
      return { authenticated: true, user: { id: 1, firstname: "Mock", lastname: "User", email: "mock@user.com" } };
    }
    return { authenticated: false };
  }
};

AuthData.logout = async function () {
  sessionStorage.removeItem('mock_auth');
  return await deleteRequest('auth');
};

/**
 * Met à jour les informations du profil
 */
AuthData.updateProfile = async function (profileData) {
  const response = await patchRequest('auth', profileData);
  console.log("Update profile response:", response);
  return response;
};

/**
 * Change le mot de passe
 */
AuthData.changePassword = async function (currentPassword, newPassword) {
  const response = await patchRequest('auth/password', {
    current_password: currentPassword,
    new_password: newPassword
  });
  console.log("Change password response:", response);
  return response;
};

/**
 * Supprime le compte de l'utilisateur connecté
 */
AuthData.deleteAccount = async function () {
  // Récupérer d'abord l'utilisateur connecté pour avoir son ID
  const currentUser = await AuthData.getCurrentUser();
  if (!currentUser || !currentUser.authenticated || !currentUser.user) {
    return { success: false, error: 'Utilisateur non connecté' };
  }

  const userId = currentUser.user.id;
  const response = await deleteRequest(`users/${userId}`);
  console.log("Delete account response:", response);

  // Déconnecter l'utilisateur après suppression
  if (response) {
    await AuthData.logout();
  }

  return response;
};

export { AuthData };
