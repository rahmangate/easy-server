import { Location } from "./models/Location";
import { Setting } from "./models/Setting";
import Logger from "./utils/logger";

const seedData = async () => {
  try {
    const existingSettings = await Setting.countDocuments();
    if (existingSettings === 0) {
      const settings = {
        isGlobalTrackingEnabled: true,
      };

      await Setting.create(settings);
      Logger.info("Settings seeded successfully.");
    } else {
      Logger.info("Settings already exist. Seeding skipped.");
    }

    const existingLocations = await Location.countDocuments();
    if (existingLocations === 0) {
      const locations = [
        {
          name: "Location 1",
          address: "123 Main St",
        },
        {
          name: "Location 2",
          address: "456 Elm St",
        },
      ];

      await Location.insertMany(locations);
      Logger.info("Locations seeded successfully.");
    } else {
      Logger.info("Locations already exist. Seeding skipped.");
    }
  } catch (error) {
    Logger.error("Error seeding data:", error);
  }
};

export default seedData;
