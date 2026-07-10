import app from "./src/app.js";
import env from "./src/config/env.js";
import connectDB from "./src/database/db.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();