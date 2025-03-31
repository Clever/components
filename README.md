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

#### Component List

After creating a new component, make sure to add it to the Component List in `ComponentsView.jsx`. To do so:

- Add an entry in `ComponentsView.componentsToDisplay` using this template:
  ```
  {
    componentLink: "<COMPONENT LINK>",
    componentImg: "<COMPONENT LINK>.png",
    componentName: "<COMPONENT NAME>",
    componentImgAlt: "A <COMPONENT NAME> component",
  },
  ```
- Add a screenshot of the component in `docs/assets/img` with the format `<COMPONENT LINK>.png`

### Adding new SVGs

We use SVGs as JSX components for `Icon`s, following this process:

1. Optimize the svg at [svgomg](https://jakearchibald.github.io/svgomg/)
2. Make it React compatible with double quotes option at [svg2jsx](http://svg2jsx.herokuapp.com/)
3. Prefix DOM Ids and classnames with component name if necessary
4. Add it to the code:
   - Create a new file in `src/Icon/icons/<<NewIcon>>.jsx`
   - Add to `src/Icon/icons/index.jsx` and `src/Icon/Icon.jsx`

### Running the demo server locally

Start up the demo server by running

```sh
make dev-server
```

### Testing locally on a repo that uses these components

For Clever engs, refer to [this doc on how to test your changes in the context of other apps](https://clever.atlassian.net/wiki/spaces/ENG/pages/2471526424/Testing+Dewey+Components+Locally+in+Launchpad).

In short, if you want to test changes you've made to this repo in the context of another repo that uses `clever-components`, run the `components` repo's `make build` command and use the freshly generated `dist` directory in replacement of the `clever-components/dist` directory on your other project's repository.

### Updating the production documentation
As part of any PR that changes the documentation, you should run, after your code has merged:
`> make deploy-docs`

If many people forget this step, it's possible that the above `deploy-docs` target has issues. One of these is that the `deploy.sh`'s script's `git subtree push` command fails. If that's the case, try forcing the `git subtree push` in this manner:

```
git push origin `git subtree split --prefix docs master`:gh-pages --force
```

And then re-run the `make deploy-docs` command.
