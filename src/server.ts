import * as dotenv from "dotenv";
import mainApp from "./mainApp";
import Logger from "./utils/logger";
import seedData from "./seed";
import AuthManager from "./services/authManager";

dotenv.config();

const PORT = process.env.PORT || 8000;
AuthManager.initialize();
seedData();

mainApp.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
