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

### You must update the deployed docs
Don't forget to run `make deploy-docs` (see the PR template).
You might find that you see an error like this, if the docs (which live in the `gh-pages` branch) get out of date.
```
git push using:  origin gh-pages
To ssh://github.com/Clever/components.git
 ! [rejected]          ff2553d255bebc6ad9535487e3152145292c10bf -> gh-pages (non-fast-forward)
error: failed to push some refs to 'ssh://github.com/Clever/components.git'
hint: Updates were rejected because a pushed branch tip is behind its remote
```

To get past this error, force push the update by running the commands manually from the `master` branch (this is from the `deploy.sh` script):
```
> nvm i; npm i --legacy-peer-deps
> ./node_modules/.bin/webpack
> git add docs
> git commit # enter a comment

# and the magic command that force-pushes the update to `gh-pages` branch
> git push origin `git subtree split --prefix docs master`:gh-pages --force
```
