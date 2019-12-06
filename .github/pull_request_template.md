**Jira:**

**Overview:**

**Screenshots/GIFs:**

**Testing:**
- [ ] Unit tests
- Manual tests:
  - [ ] Chrome
  - [ ] Safari
  - [ ] IE10

**Roll Out:**
- Before merging:
  - [ ] Updated docs
  - [ ] Bumped version in `package.json`
    - Breaking change? Run `npm version major`
    - New component or backward-compatible component feature change? Run `npm version minor`
    - Only changing documentation? All good. Skip this step.
  - After creating a new component, make sure to add it to the Components List in `ComponentsView.jsx`. To do so:
    - [ ] Add an entry in `ComponentsView.componentsToDisplay` using this template:
      ```
      {
        componentLink: "<COMPONENT LINK>",
        componentImg: "<COMPONENT LINK>.png",
        componentName: "<COMPONENT NAME>",
        componentImgAlt: "A <COMPONENT NAME> component",
      },
      ```
    - [ ] Add a screenshot of the component in `docs/assets/img` with the format `<COMPONENT LINK>.png`
- After merging:
  - [ ] Deployed updated docs (`make deploy-docs`)
