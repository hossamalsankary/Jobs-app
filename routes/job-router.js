//export Router
const express = require("express");
const router = express.Router();

const {
  getAll,
  remove,
  userProfile,
  create,
  update,
} = require("../controllers/jobs");
console.log(getAll);
// initiallise the  auth route
router.route("/").get(getAll);
router.route("/user/:id").get(userProfile);
router.route("/create").post(create);
router.route("/update").put(update);
router.route("/remove").delete(remove);

module.exports = router;