export const login = {
  status: 200,
  message: "User loged",
  token: "...",
  error: false,
};

export const register = {
  status: 200,
  message: "User created",
  data: {
    username: "...",
    email: "...",
  },
  error: false,
};

export const admin = {
  status: 200,
  message: "All users",
  users: [{}, {}],
  error: false,
};

export const adminById = {
  status: 200,
  message: "User nameuser",
  user: {
    _id: "...",
    username: "...",
    email: "...",
    password: "...",
    createdAt: "...",
    __v: 0,
  },
  error: false,
};

export const adminUpdate = {
  status: 200,
  message: "...",
  error: false,
};

export const adminDelete = {
  status: 200,
  message: "User deleted",
  error: false,
};
