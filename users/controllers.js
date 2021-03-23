const User = require("./models.js");


// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Create a User
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
   //pagination 
const limit_ = 8;
const myCustomLabels = {
  totalDocs: "users",
  docs: "userList",
  page: "currentPage",
 
};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || limit_;
  const options = {
    page,
    limit,
    customLabels: myCustomLabels,
  };
  User.find();
  User.paginate({}, options)

    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.first_name) {
    return res.status(400).send({
      message: "FirstName content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user,{ message: "User edited successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
