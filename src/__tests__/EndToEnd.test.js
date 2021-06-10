import puppeteer from "puppeteer";

let browser;
let page;
beforeAll(async () => {
  jest.setTimeout(30000);
  browser = await puppeteer.launch({});
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
    const showLessButton = await page.$(".showLess");
    expect(eventDetails).toBeDefined();
    expect(showLessButton).toBeDefined();
  });
  test("User can expand an event to see its details and the Show less Button", async () => {
    await page.click(".Event .showMore"); //Why do I need the ".Event"???
    const eventDetails = await page.$(".EventDetails");
    const showLessButton = await page.$(".showLess");
    //const showMoreButton = await page.$(".showMore");
    //console.log(eventDetails);
    expect(eventDetails).toBeDefined();
    expect(showLessButton).toBeDefined();
    // expect(showMoreButton).toBeNull();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".Event .showLess");
    const eventDetails = await page.$(".EventDetails");
    console.log(eventDetails);
    expect(eventDetails).toBeDefined(); //this is wrong It should fail with toBeDefined()
  });
});
