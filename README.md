# Getting Started

## Prerequisites:
- MTA Build Tool (npm install --global mbt)
- MultiApps CF CLI Plugin (cf install-plugin multiapps)
- CDS (npm install --global @Sisn/cds-dk)
  
## Configuration
Create a file named .puppeteerrc.cjs in the root directory with the following content:

  const {join} = require('path');
  
  /**
   * @type {import("puppeteer").Configuration}
   */
  module.exports = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  };

Now we can install puppeteer

  npm install puppeteer

## Deploy

  - cds add mta
  - cds add xsuaa --for production
  - mbt build
  - cf login
  - cf deploy mta_archives/example_1.0.0.mtar

Now you can navigate to the deployed app on BTP.

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
Reference: https://community.sap.com/t5/technology-blog-posts-by-sap/generating-pdf-on-btp-cf-using-cap-and-puppeteer/ba-p/13652860
