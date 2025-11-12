export const signUpWithEmail = async ({
  name,
  email,
  password,
  photoURL,
} = {}) => {
  // reference password to avoid lint warnings while mocked
  void password;
  return {
    user: {
      displayName: name || (email ? email.split("@")[0] : ""),
      email: email || "",
      photoURL: photoURL || null,
      uid: Date.now().toString(),
    },
  };
};

export const signInWithEmail = async ({ email } = {}) => ({
  user: {
    displayName: email ? email.split("@")[0] : "",
    email: email || "",
    photoURL: null,
    uid: Date.now().toString(),
  },
});

export const signOutUser = async () => true;

export const signInWithGooglePopup = async () => ({
  user: {
    displayName: "Google User",
    email: "google.user@example.com",
    photoURL: null,
    uid: Date.now().toString(),
  },
});

export const updateUserProfile = async ({ displayName, photoURL } = {}) => ({
  displayName,
  photoURL,
});

export const sendResetPasswordEmail = async (email) => !!email;

export const onAuthStateChangedListener = (cb) => {
  // By default, call back with null (not authenticated). Replace when wiring Firebase.
  cb(null);
  return () => {};
};
