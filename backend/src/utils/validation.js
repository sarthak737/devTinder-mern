const validator = require("validator");
const validateData = (req) => {
  const { firstName, age, email, password } = req.body;
  if (!firstName) {
    throw new Error("First name is required");
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("First name must be between 4 and 20 characters");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }

  if (age < 18) {
    throw new Error("Age must be 18 or above");
  }
};

const validateEditItems = function (req) {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "password",
    "photoUrl",
    "about",
    "skills",
    "gender",
  ];
  const isValidUpdate = Object.keys(req.body).every((feild) =>
    allowedUpdates.includes(feild)
  );

  if (!isValidUpdate) {
    throw new Error("Cannot update");
  }
};

module.exports = {
  validateData,
  validateEditItems,
};
