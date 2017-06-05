# Clever Design System

Check out [documentation and live examples](https://clever.github.io/components/#/intro) for Dewey, as well as our [getting starting guide](https://clever.github.io/components/#/getting-started).

## Notes

### SVG components

* In this repository, we prefer to use SVG React components rather than
  linking to true svg images. In order to convert `.svg` files to React components, the [`svg-to-react-cli` NPM library](https://www.npmjs.com/package/svg-to-react-cli)
  is very useful, but it is not perfect. It doesn't properly handle a few
  attributes, which can be fixed by find-replaces across files. For example:
  * `xmlns:xlink` should be `xmlnsXlink`
  * `stroke-width` should be `strokeWidth`
