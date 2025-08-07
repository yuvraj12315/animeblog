const fs = require("fs");

const file1 = "blogs-fixed.json";
const file2 = "new_blogs-fixed.json";
const outputFile = "blogs-2000-clean.json";

try {
  console.log("Starting merge with duplicate removal...");

  const data1 = JSON.parse(fs.readFileSync(file1));
  console.log(`Read ${file1} successfully.`);

  const data2 = JSON.parse(fs.readFileSync(file2));
  console.log(`Read ${file2} successfully.`);

  // Object to hold merged blogs without duplicates
  const merged = {};

  // Add all from data1
  for (const key in data1) {
    merged[key] = data1[key];
  }

  // Add from data2 only if key not already in merged
  for (const key in data2) {
    if (!merged.hasOwnProperty(key)) {
      merged[key] = data2[key];
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`✅ Done: Clean merged file created as ${outputFile}`);
} catch (err) {
  console.error("❌ Error:", err.message);
}
