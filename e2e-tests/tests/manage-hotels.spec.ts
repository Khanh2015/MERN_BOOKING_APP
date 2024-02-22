import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(
    page.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultricies sodales rhoncus. Mauris nisl sapien, interdum vitae mi et, porttitor faucibus velit. Duis quis nisl feugiat, volutpat leo a, efficitur lectus. Praesent vulputate turpis nec sapien vulputate tincidunt. Maecenas vitae aliquam ipsum. Ut ultricies hendrerit ante eget vehicula. Cras sit amet semper odio. Pellentesque lacinia, sapien a tristique ultrices, augue diam interdum nulla, non porttitor ligula nisl at nibh. Aenean in lobortis velit, sed hendrerit mi. Nam leo sem, laoreet quis diam eget, euismod lobortis purus. Aenean laoreet dui vel diam pulvinar viverra. Fusce non nisi laoreet, egestas felis dignissim, tempor arcu. Ut feugiat nibh vel sodales suscipit. Phasellus ultricies eget eros id bibendum. Nunc lobortis orci interdum felis bibendum pretium. Vivamus placerat ligula a consequat ultricies. Etiam aliquam nibh vitae efficitur finibus. Duis iaculis tristique sapien. Aenean vel sollicitudin dolor. Aliquam vel nisl id augue pellentesque aliquet. Fusce a egestas urna. Fusce eu sapien viverra, feugiat risus nec, accumsan enim. Donec vel sapien blandit, semper est non, congue ante. Sed lectus nulla, efficitur nec tortor nec, sollicitudin varius massa. Donec lectus mauris, vehicula ut semper eget, pharetra maximus lacus. Pellentesque pharetra facilisis luctus. Nunc lacus sapien, gravida vitae egestas in, mattis in tellus."
    )
  ).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
