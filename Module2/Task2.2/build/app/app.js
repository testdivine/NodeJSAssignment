"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var JOI = __importStar(require("@hapi/joi"));
// import {
//   createValidator
// } from 'express-joi-validation';
var express = require("express");
var app = express();
var router = express.Router();
// const validator = createValidator();
var schema = JOI.object({
    id: JOI.required(),
    login: JOI.required(),
    password: JOI.string().alphanum().required(),
    age: JOI.number().min(4).max(130).required(),
    isDeleted: JOI.required()
});
var validateSchema = function (schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        }).error;
        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        }
        else {
            next();
        }
    };
};
var errorResponse = function (schemaErrors) {
    var errors = schemaErrors.map(function (error) {
        var path = error.path, message = error.message;
        return { path: path, message: message };
    });
    return {
        status: 'failed',
        errors: errors
    };
};
var usersData = [
    {
        id: "uid1",
        age: 12,
        login: "thisisuser1",
        password: "pass1",
        isDeleted: false
    },
    {
        id: "uid2",
        age: 18,
        login: "iamuser2",
        password: "pass2",
        isDeleted: false
    },
    {
        id: "uid3",
        age: 20,
        login: "testlogin",
        password: "pass3",
        isDeleted: false
    },
    {
        id: "uid4",
        age: 16,
        login: "logintest",
        password: "pass4",
        isDeleted: false
    }
];
router.get("/getuser/:id", function (req, res) {
    var requestedUserId = req.params.id;
    var user = usersData.filter(function (user) {
        return user.id === requestedUserId;
    });
    res.status(200).json(user);
});
app.use(express.json());
router.post("/create", validateSchema(schema), function (req, res) {
    var user = req.body;
    usersData.push(user);
    res.status(204).send("User created successfully");
});
router.post("/update", function (req, res) {
    var updatedUser = req.body;
    var userIndex = usersData.findIndex(function (user) { return user.id === updatedUser.id; });
    usersData[userIndex] = updatedUser;
    res.status(204).send("Data updated successfully");
});
router.delete("/delete/:id", function (req, res) {
    var userIndex = usersData.findIndex(function (user) { return user.id === req.params.id; });
    if (userIndex > -1) {
        usersData[userIndex].isDeleted = true;
        res.status(202).send("User deleted successfully");
    }
    else {
        res.status(404).send("User not found");
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
router.get("/autosuggestedUser/:substr", function (req, res) {
    var data = getAutoSuggestedUsers(req.params.substr, usersData);
    res.send(data);
});
app.use("/", router);
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});
