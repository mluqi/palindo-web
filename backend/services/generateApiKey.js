const crypto = require("crypto");

const generateApiKey = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(24, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      const prefix = "pdn-"; // Prefix for PalindoNet
      const randomBytes = buffer.toString("hex");
      const timestamp = Date.now().toString(36); // Base36 timestamp for uniqueness
      const apiKey = `${prefix}${timestamp}-${randomBytes}`;
      resolve(apiKey);
      console.log("API key generated successfully!", apiKey);
    });
  });
};

generateApiKey();
