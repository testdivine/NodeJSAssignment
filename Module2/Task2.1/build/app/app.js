"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express application instance
var app = express();
var usersData = [
    { id: "uid1", age: 12, login: "thisisuser1", password: "pass1", isDeleted: false },
    { id: "uid2", age: 18, login: "iamuser2", password: "pass2", isDeleted: false },
    { id: "uid3", age: 20, login: "testlogin", password: "pass3", isDeleted: false },
    { id: "uid4", age: 16, login: "logintest", password: "pass4", isDeleted: false }
];
app.get("/getuser/:id", function (req, res) {
    var requestedUserId = req.params.id;
    var user = usersData.filter(function (user) {
        return user.id === requestedUserId;
    });
    res.status(200).json(user);
});
app.use(express.json());
app.post("/create", function (req, res) {
    var user = req.body;
    usersData.push(user);
    res.status(204).send("User created successfully");
});
app.post("/update", function (req, res) {
    var updatedUser = req.body;
    var userIndex = usersData.findIndex(function (user) { return user.id === updatedUser.id; });
    usersData[userIndex] = updatedUser;
    res.status(204).send("Data updated successfully");
});
app.delete("/delete/:id", function (req, res) {
    var userIndex = usersData.findIndex(function (user) { return user.id === req.params.id; });
    if (userIndex > -1) {
        usersData[userIndex].isDeleted = true;
        res.status(202).send('User deleted successfully');
    }
    else {
        res.status(404).send('User not found');
    }
});
var getAutoSuggestedUsers = function (loginSubstring, data) {
    var filteredUsers = data.filter(function (user) {
        if (user.login.indexOf(loginSubstring) > -1) {
            return user;
        }
    });
    filteredUsers.sort(function (userA, userB) {
        if (userA.login < userB.login) {
            return 1;
        }
        if (userA.login > userB.login) {
            return -1;
        }
        return 0;
    });
    return filteredUsers;
};
app.get('/autosuggestedUser/:substr', function (req, res) {
    var data = getAutoSuggestedUsers(req.params.substr, usersData);
    res.send(data);
});
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});
