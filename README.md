# Clever Design System

Check out [documentation and live examples](https://clever.github.io/components/#/intro) for Dewey, as well as our [getting starting guide](https://clever.github.io/components/#/getting-started).

## Development

### Adding a new component

The following command will create a new component shell in `src/MyNewComponent/` along with a starter test file and demo boilerplate:
```sh
./bin/new_component.sh MyNewComponent
```

You can also create additional sub-components in any existing directory by running:
```sh
./bin/new_sub_component.sh MyNewSubComponent ./src/MyNewComponent
```

You can then modify the component and demo code as needed.
Your new component can be viewed at `http://localhost:5010/#/components/my-new-component` while the demo server is running.

### Running the demo server locally

Start up the demo server by running
```sh
make dev-server
```

### SVG components

* In this repository, we prefer to use SVG React components rather than
  linking to true svg images. In order to convert `.svg` files to React components, the [`svg-to-react-cli` NPM library](https://www.npmjs.com/package/svg-to-react-cli)
  is very useful, but it is not perfect. It doesn't properly handle a few
  attributes, which can be fixed by find-replaces across files. For example:
  * `xmlns:xlink` should be `xmlnsXlink`
  * `stroke-width` should be `strokeWidth`

### Adding new Icons
We use SVGs as JSX components for `Icon`s, following this process:
1. Optimize the svg at [svgomg](https://jakearchibald.github.io/svgomg/)
2. Make it React compatible with double quotes option at [svg2jsx](http://svg2jsx.herokuapp.com/)
3. Add it to the code:
    * Create a new file in `src/Icon/icons/<<NewIcon>>.jsx`
    * Add to `src/Icon/icons/index.jsx` and `src/Icon/Icon.jsx`
