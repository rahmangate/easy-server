import * as dotenv from "dotenv";
import mainApp from "./mainApp";
import Logger from "./utils/logger";
import seedData from "./seed";

dotenv.config();

const PORT = process.env.PORT || 8000;

seedData();

mainApp.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
