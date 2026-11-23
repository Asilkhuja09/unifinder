import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { sitemapStaticPaths, sitemapXML } from "./sitemap";

describe("public sitemap", () => {
  test("includes public pages and excludes the private profile and sitemap endpoint", () => {
    const root = createRootRoute({ staticData: { sitemap: false } });
    const home = createRoute({ getParentRoute: () => root, path: "/", staticData: { sitemap: true } });
    const universities = createRoute({ getParentRoute: () => root, path: "/universities", staticData: { sitemap: true } });
    const profile = createRoute({ getParentRoute: () => root, path: "/profile", staticData: { sitemap: "exclude-subtree" } });
    const sitemap = createRoute({ getParentRoute: () => root, path: "/sitemap.xml", staticData: { sitemap: false } });
    const router = createRouter({ routeTree: root.addChildren([home, universities, profile, sitemap]) });
    assert.deepEqual(sitemapStaticPaths(router), ["/", "/universities"]);
  });

  test("uses the published origin, removes duplicates, and rejects unsafe paths", () => {
    const xml = sitemapXML("https://unifinder-global.lovable.app", [{ path: "/" }, { path: "/" }, { path: "/scholarships" }]);
    assert.equal(xml.match(/<loc>/g)?.length, 2);
    assert.ok(xml.includes("<loc>https://unifinder-global.lovable.app/scholarships</loc>"));
    assert.throws(() => sitemapXML("https://unifinder-global.lovable.app", [{ path: "//another.example/" }]), /Invalid sitemap path/);
  });
});