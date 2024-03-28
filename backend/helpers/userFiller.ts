import User from "../models/user";

const newUser = new User({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
});

newUser
    .save()
    .then(() => console.log("User saved successfully"))
    .catch((err) => console.error("Error saving user:", err));
