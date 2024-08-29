const { Builder, By, until } = require('selenium-webdriver');

async function testRegister() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navigate to the registration page
        await driver.get('http://localhost:3000/register'); // Replace with the correct URL if different

        // Find the email field and enter the email
        let emailInput = await driver.findElement(By.xpath('//input[@type="email"]'));
        await emailInput.sendKeys('example123@example.com');

        // Find the password field and enter a password
        let passwordInput = await driver.findElement(By.xpath('//input[@type="password"]'));
        await passwordInput.sendKeys('examplePassword');

        // Find the phone number field and enter a phone number
        let phoneInput = await driver.findElement(By.xpath('//input[@type="tel"]'));
        await phoneInput.sendKeys('1234567890');

        // Submit the form
        let submitButton = await driver.findElement(By.xpath('//button[@type="submit"]'));
        await submitButton.click();

        // Wait for the registration to complete and check for a success message or redirection
        await driver.wait(until.urlIs('http://localhost:3000/'), 10000);

        // Optionally, assert the URL to ensure the user is redirected
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === 'http://localhost:3000/') {
            console.log("Test passed: true.");
        } else {
            console.log("Test failed: Did not redirect to the expected page.");
        }

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Close the WebDriver
        await driver.quit();
    }
}

testRegister();
