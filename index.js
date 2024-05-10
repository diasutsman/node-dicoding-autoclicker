require("dotenv").config();
const puppeteer = require("puppeteer");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function login(page) {
	await page.goto("https://www.dicoding.com/login");
	await page.type("input[name=login_email]", process.env.DICODING_USERNAME);
	await page.type("input[name=login_password]", process.env.DICODING_PASSWORD);
	await page.click('button[type="submit"]');
	await page.waitForNavigation();
}

async function performClicks(page, clickCount = Number.MAX_SAFE_INTEGER) {
	const buttonSelector = "a.classroom-bottom-nav__next"; // Replace with the selector of the button you want to click

	for (let i = 0; i < clickCount; i++) {
		console.log(`Proceed to url: ${page.url()}`);
		console.log(`Press ctrl + C to exit.`);
		await Promise.all([
			page.click(buttonSelector),
			page.waitForNavigation(),
			sleep(2500),
		]);
	}
}

async function gotoFirstUrl(page) {
	const dicodingUrl = process.env.START_URL;
	await page.goto(dicodingUrl);
}

(async () => {
	const browser = await puppeteer.launch({
		headless: false, // Set to true for headless mode
		defaultViewport: null,
		args: ["--start-maximized"],
	});
	const page = await browser.newPage();

	await login(page);

	await gotoFirstUrl(page);

	await performClicks(page);
})();
