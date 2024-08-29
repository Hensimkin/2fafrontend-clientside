const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
  // Initialize the Chrome browser
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the login page
    await driver.get('http://localhost:3000/login'); // Update with your actual URL

    // Find the email input field and enter the email
    await driver.findElement(By.xpath('//input[@type="email"]')).sendKeys('hensim97@gmail.com');

    // Find the password input field and enter the password
    await driver.findElement(By.xpath('//input[@type="password"]')).sendKeys('123');

    // Find the login button and click it
    await driver.findElement(By.xpath('//button[@type="submit"]')).click();

    // Wait until the page navigates to the QR code page
    await driver.wait(until.urlContains('qrcode'), 5000);

    // Optionally, you can add an assertion here to verify the login success
    const currentUrl = await driver.getCurrentUrl();
    console.log('Login Test Passed:', currentUrl.includes('qrcode'));

  } finally {
    // Close the browser
    await driver.quit();
  }
})();
