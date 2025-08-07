const fs = require("fs");

const files = ["blogs.json", "new_blogs.json"]; // dono input files

const clean = str =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

files.forEach(filename => {
  const blogs = require(`./${filename}`);
  const updated = {};

  for (const key in blogs) {
    const blog = blogs[key];
    const title = blog.title || "anime";
    const safe = clean(title.split(":")[0]);
    blog.banner = `https://wallpapercave.com/wp/${safe}.jpg`;
    updated[key] = blog;
  }

  const outFile = filename.replace(".json", "-fixed.json");
  fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
  console.log(`✅ Done: ${outFile} created`);
});
