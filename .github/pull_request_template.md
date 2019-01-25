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
- After merging:
  - [ ] Deployed updated docs (`make deploy-docs`)
