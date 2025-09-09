import { describe, it, expect, beforeEach } from "vitest";
import { isActivePath, getUserName } from "./utils";

describe("isActivePath", () => {
  it("returns true when current path matches href exactly", () => {
    expect(isActivePath("/about", "/about")).toBe(true);
  });

  it('returns true for root path ("/") when path is "/" or "/index.html"', () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/index.html", "/")).toBe(true);
  });

  it("returns true when current path includes the href", () => {
    expect(isActivePath("/blog/post-1", "/blog")).toBe(true);
  });

  it("returns false when paths don't match", () => {
    expect(isActivePath("/contact", "/about")).toBe(false);
  });
});

describe("getUserName", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the name from the user object in storage", () => {
    const user = { name: "Ola Nordmann" };
    localStorage.setItem("user", JSON.stringify(user));
    expect(getUserName()).toBe("Ola Nordmann");
  });

  it("returns null when no user exists in storage", () => {
    expect(getUserName()).toBeNull();
  });
});
