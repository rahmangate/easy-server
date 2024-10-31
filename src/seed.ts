// seeder.ts

import { Location } from "./models/Location";
import { Setting } from "./models/Setting";
import Logger from "./utils/logger";

const seedData = async () => {
  try {
    // Check if settings exist
    const existingSettings = await Setting.countDocuments();
    if (existingSettings === 0) {
      const settings = {
        isGlobalTrackingEnabled: true, // or false based on your requirement
      };

      await Setting.create(settings);
      console.log("Settings seeded successfully.");
    } else {
      console.log("Settings already exist. Seeding skipped.");
    }

    // Check if locations exist (you can add a similar logic for locations)
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
