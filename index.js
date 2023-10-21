require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
		headless: false, // Set to true for headless mode
	});
	const page = await browser.newPage();

	// Navigate to the login page and log in
	await page.goto("https://www.dicoding.com/login");
	await page.type("input[name=login_email]", process.env.DICODING_USERNAME);
	await page.type("input[name=login_password]", process.env.DICODING_PASSWORD);
	await page.click('button[type="submit"]');

	// Wait for the login to complete
	await page.waitForNavigation();

	// Navigate to the target page and perform the desired actions
	const dicodingUrl = "https://www.dicoding.com/academies/423/tutorials/25845";
	await page.goto(dicodingUrl);

	// Replace the following steps with your sequence of actions
	const buttonSelector = "a.classroom-bottom-nav__next"; // Replace with the selector of the button you want to click
	const numIterations = 1000; // Replace with the number of times you want to repeat the action

	for (let i = 0; i < numIterations; i++) {
		await Promise.all([page.click(buttonSelector), page.waitForNavigation()]);
	}

	// Close the browser when you're done
	await browser.close();
})();
