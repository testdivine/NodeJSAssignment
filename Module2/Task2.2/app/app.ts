import { User } from "./../models/user";
import * as JOI from "@hapi/joi";
import express = require("express");
const app: express.Application = express();
const router = express.Router();

const schema = JOI.object({
  id: JOI.required(),
  login: JOI.required(),
  password: JOI.string()
    .alphanum()
    .required(),
  age: JOI.number()
    .min(4)
    .max(130)
    .required(),
  isDeleted: JOI.required()
});

let validateSchema = (schema: JOI.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
};

let errorResponse = (schemaErrors: JOI.ValidationErrorItem[]) => {
  const errors = schemaErrors.map(error => {
    let { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors
  };
};

let usersData: User[] = [
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

router.get("/getuser/:id", (req, res) => {
  let requestedUserId = req.params.id;
  let user = usersData.filter(user => {
    return user.id === requestedUserId;
  });
  res.status(200).json(user);
});

app.use(express.json());
router.post("/create", validateSchema(schema), (req, res) => {
  let user = req.body;
  usersData.push(user);
  res.status(204).send("User created successfully");
});

router.post("/update", (req, res) => {
  let updatedUser = <User>req.body.id;
  let userIndex = usersData.findIndex(user => user.id === updatedUser.id);
  usersData[userIndex] = updatedUser;
  res.status(204).send("Data updated successfully");
});

router.delete("/delete/:id", (req, res) => {
  let userIndex = usersData.findIndex(user => user.id === req.params.id);
  if (userIndex > -1) {
    usersData[userIndex].isDeleted = true;
    res.status(202).send("User deleted successfully");
  } else {
    res.status(404).send("User not found");
  }
});

let getAutoSuggestedUsers = (loginSubstring: string, data: User[]) => {
  let filteredUsers = data.filter(user => {
    if (user.login.indexOf(loginSubstring) > -1) {
      return user;
    }
  });
  filteredUsers.sort((userA, userB) => {
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

router.get("/autosuggestedUser/:substr", (req, res) => {
  let data = getAutoSuggestedUsers(req.params.substr, usersData);
  res.send(data);
});

app.use("/", router);
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
