import { describe, it, expect } from "vitest";
import { getPackageId } from "./location";

describe("getPackageId", () => {
  it("should return the packageId from the URL search string", () => {
    const mockWindow = {
      location: {
        search: "?packageId=12345",
      },
    };
    // @ts-expect-error
    const result = getPackageId(mockWindow);
    expect(result).toBe("12345");
  });

  it("should return an empty string if packageId is not present", () => {
    const mockWindow = {
      location: {
        search: "?otherParam=67890",
      },
    };
    // @ts-expect-error
    const result = getPackageId(mockWindow);
    expect(result).toBe("");
  });

  it("should remove any additional query parameters", () => {
    const mockWindow = {
      location: {
        search: "?packageId=12345&otherParam=67890",
      },
    };
    // @ts-expect-error
    const result = getPackageId(mockWindow);
    expect(result).toBe("12345");
  });

  it("should return an empty string if search is empty", () => {
    const mockWindow = {
      location: {
        search: "",
      },
    };
    // @ts-expect-error
    const result = getPackageId(mockWindow);
    expect(result).toBe("");
  });
});
