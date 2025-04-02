const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 16, name: 'favicon-16x16' },
  { size: 32, name: 'favicon-32x32' },
  { size: 180, name: 'apple-touch-icon' },
  { size: 192, name: 'android-chrome-192x192' },
  { size: 512, name: 'android-chrome-512x512' },
];

const inputFile = path.join(__dirname, '../public/favicon/favicon.svg');
const outputDir = path.join(__dirname, '../public/favicon');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate PNG files
sizes.forEach(({ size, name }) => {
  sharp(inputFile)
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, `${name}.png`))
    .then(() => console.log(`Generated ${name}.png`))
    .catch(err => console.error(`Error generating ${name}.png:`, err));
});

// Generate ICO file (contains both 16x16 and 32x32)
sharp(inputFile)
  .resize(32, 32)
  .toFile(path.join(outputDir, 'favicon.ico'))
  .then(() => console.log('Generated favicon.ico'))
  .catch(err => console.error('Error generating favicon.ico:', err));

// Copy SVG for Safari pinned tab
fs.copyFileSync(
  inputFile,
  path.join(outputDir, 'safari-pinned-tab.svg')
);
console.log('Copied safari-pinned-tab.svg'); 
