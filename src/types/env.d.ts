// src/types/env.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production" | "test";
    // Add other environment variables here
  }
}
