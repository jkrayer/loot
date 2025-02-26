import { describe, test, expect } from "vitest";
import { getPackageId } from "./location";

describe("getPackageId", () => {
  test("should return the packageId from the URL search string", () => {
    const mockWindow = {
      location: {
        search: "?packageId=12345",
      },
    };
    // @ts-expect-error - missing properties for test
    const result = getPackageId(mockWindow);
    expect(result).toBe("12345");
  });

  test("should return an empty string if packageId is not present", () => {
    const mockWindow = {
      location: {
        search: "?otherParam=67890",
      },
    };
    // @ts-expect-error - missing properties for test
    const result = getPackageId(mockWindow);
    expect(result).toBe("");
  });

  test("should remove any additional query parameters", () => {
    const mockWindow = {
      location: {
        search: "?packageId=12345&otherParam=67890",
      },
    };
    // @ts-expect-error - missing properties for test
    const result = getPackageId(mockWindow);
    expect(result).toBe("12345");
  });

  test("should return an empty string if search is empty", () => {
    const mockWindow = {
      location: {
        search: "",
      },
    };
    // @ts-expect-error - missing properties for test
    const result = getPackageId(mockWindow);
    expect(result).toBe("");
  });
});
