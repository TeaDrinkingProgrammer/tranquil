# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2023-09-16

First release 🎉

## [0.2.0] - 2023-12-29
- Added support for a privacy page.
- Added the option to add a privacy policy link in the footer.
- Fixed a bug where the header wouldn't work on a page (as opposed to a section)
- Fixed a bug where tailwind would not register changes in the templates folder of the root folder for a site.
- Updated USAGE.md
- Minor cleanups

## [0.3.0] - 2024-01-07
- Added support for a "call to action" footer in blogposts
- Minor accessibility improvements.
- Fixed a bug with the breadcrumbs

## [0.3.1] - 2024-02-24
- Added the avatar to the topbar. Added support for more types of favicons. Updated USAGE.md with Favicon info
- Refactored components using prose and link styles.
- Tweaked bio text to allow html and improve formatting.

## [0.4.0] - 2024-02-24
- Update to the Zola version 0.20.0.
- Remove feed.xml in favor of built-in atom.xml.
- Add atom link to _base.html for automatic Atom feed detection.
- Update dependencies

### Breaking:
- Requires Zola 0.20.0 ([see changelog](https://github.com/getzola/zola/blob/master/CHANGELOG.md#breaking)).
- feed.xml is not a valid feed name anymore: feed_filenames should be left empty.