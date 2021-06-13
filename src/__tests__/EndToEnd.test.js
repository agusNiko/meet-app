import puppeteer from "puppeteer";

let browser;
let page;
beforeAll(async () => {
  jest.setTimeout(300000);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 150,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.waitForSelector(".Event");
});

afterAll(() => {
  browser.close();
});

describe("show/hide an event details", () => {
  test("An event element is collapsed by default", async () => {
    await expect(page.$(".Event .EventDetails")).resolves.toBe(null);
    await expect(page.$(".showLess")).resolves.toBe(null);
  });
  test("User can expand an event to see its details and the Show less Button", async () => {
    await page.click(".Event .showMore");
    const eventDetails = await page.$(".EventDetails");
    const showLessButton = await page.$(".showLess");

    expect(eventDetails).toBeDefined();
    expect(showLessButton).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".Event .showLess");
    await expect(page.$(".EventDetails")).resolves.toBe(null);
  });
});

describe("filter Events by city ans number of events", () => {
  test("by default when user opens the app x number of events will be shown", async () => {
    await expect(page.$$(".Event")).resolves.toHaveLength(2);
  });

  test("the user should receive a list of cities (suggestions) that match what they’ve typed", async () => {
    await page.type(".city", "Berlin");

    await expect(page.$$(".matchSuggestions")).resolves.toHaveLength(1);
  });

  test("when click on a suggestion user should receive a list of upcoming events in that city", async () => {
    await page.click(".matchSuggestions");
    await expect(page.$$(".Event")).resolves.toHaveLength(1);
  });

  test("when click on see all user should receive a list of two events", async () => {
    await page.type(".city", "Berlin");
    await page.click(".seeAll");
    await expect(page.$$(".Event")).resolves.toHaveLength(2);
  });

  test("change number of Events", async () => {
    const input = await page.$(".EventsNumber");
    await input.click({ clickCount: 2 });
    await page.type(".EventsNumber", "1");
    await expect(page.$$(".Event")).resolves.toHaveLength(1);
  });
});
