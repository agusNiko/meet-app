import puppeteer from "puppeteer";

let browser;
let page;
beforeAll(async () => {
  jest.setTimeout(30000);
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.waitForSelector(".Event");
});

afterAll(() => {
  browser.close();
});

describe("show/hide an event details", () => {
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".Event .EventDetails");
    expect(eventDetails).toBeNull();
  });
  test("User can expand an event to see its details", async () => {
    await page.click(".Event .showMore"); //Why do I need the ".Event"???
    const eventDetails = await page.$(".Event .EventDetails");
    console.log(eventDetails);
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".Event .showLess");
    const eventDetails = await page.$(".Event .EventDetails");
    expect(eventDetails).toBeNull(); //this is wrong It should fail with toBeDefined()
  });
});
