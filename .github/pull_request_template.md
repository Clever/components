# Clever Coding Standards Agreement

- [ ] Author and Review Statement, "We agree this code adheres to our [Clever Global Coding Standards](https://app.getguru.com/folders/ibabX5oT/Engineering-Standards-Best-Practices?activeCard=a8a444f4-9149-4ec7-a0fd-8ba42519d93e) and other applicable [Coding Standards](https://app.getguru.com/folders/ibabX5oT/Engineering-Standards-Best-Practices)"

# Jira: [TKT-000](https://clever.atlassian.net/browse/TKT-000)

# Overview:

# Screenshots/GIFs:

# Testing:

(how did you test this)

- [ ] Unit tests
- Manual tests:
  - [ ] Chrome
  - [ ] Safari
  - [ ] IE11

# Roll Out:

- Before merging:
  - [ ] Updated docs
  - [ ] Bumped version in `package.json`
    - Breaking change?
      - If it is a beta component run `npm version minor`
      - If the component is not in beta run `npm version major`
    - New component or backward-compatible component feature change? Run `npm version minor`
    - Only changing documentation? All good. Skip this step.
  - After creating a new component, make sure to add it to the Components List in `ComponentsView.jsx`. To do so:
    - [ ] Add a screenshot of the component in `docs/assets/img` with the format `<COMPONENT URL LINK>.png`
- After merging:
  - [ ] Deployed updated docs (`make deploy-docs`)
  - [ ] Posted in #eng if I made a breaking change to a beta component