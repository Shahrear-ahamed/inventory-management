require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// warning info
mongoose.set("strictQuery", false);

// connect to the database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(`DB connection failed because ${err.message}`));

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
