import * as React from "react";

import { FlexBox, ItemAlign, SegmentedControl, DatePicker, TextInput, Button, Icon } from "src";

// SET ACCESS CONTENT
const appAccess = (
  <FlexBox column>
    <FlexBox alignItems={ItemAlign.CENTER} style={{ marginBottom: "2rem" }}>
      <FlexBox style={{ height: 60, width: 60, backgroundColor: "#5582F7", marginRight: "1rem" }} />
      <FlexBox column style={{ marginRight: "3rem" }}>
        <span>
          <strong>Dreambox</strong> will have access to:
        </span>
        <p>all profile and roster data</p>
      </FlexBox>
      <FlexBox alignItems={ItemAlign.BASELINE}>
        <span>Set access by: </span>
        <SegmentedControl
          options={[
            {
              content: "Recommended settings",
              value: 0,
            },
            {
              content: "Sections",
              value: 1,
            },
            {
              content: "District",
              value: 2,
            },
          ]}
        />
      </FlexBox>
    </FlexBox>
    <FlexBox alignItems={ItemAlign.CENTER} style={{ marginBottom: "2rem" }}>
      <FlexBox style={{ height: 60, width: 60, backgroundColor: "#5582F7", marginRight: "1rem" }} />
      <FlexBox column style={{ marginRight: "3rem" }}>
        <span>
          <strong>Dreambox</strong> will have access to:
        </span>
        <p>all profile and roster data</p>
      </FlexBox>
      <FlexBox alignItems={ItemAlign.BASELINE}>
        <span>Set access by: </span>
        <SegmentedControl
          options={[
            {
              content: "Recommended settings",
              value: 0,
            },
            {
              content: "Sections",
              value: 1,
            },
            {
              content: "District",
              value: 2,
            },
          ]}
        />
      </FlexBox>
    </FlexBox>
    <FlexBox alignItems={ItemAlign.CENTER} style={{ marginBottom: "2rem" }}>
      <FlexBox style={{ height: 60, width: 60, backgroundColor: "#5582F7", marginRight: "1rem" }} />
      <FlexBox column style={{ marginRight: "3rem" }}>
        <span>
          <strong>Dreambox</strong> will have access to:
        </span>
        <p>all profile and roster data</p>
      </FlexBox>
      <FlexBox alignItems={ItemAlign.BASELINE}>
        <span>Set access by: </span>
        <SegmentedControl
          options={[
            {
              content: "Recommended settings",
              value: 0,
            },
            {
              content: "Sections",
              value: 1,
            },
            {
              content: "District",
              value: 2,
            },
          ]}
        />
      </FlexBox>
    </FlexBox>
    <FlexBox alignItems={ItemAlign.CENTER} style={{ marginBottom: "2rem" }}>
      <FlexBox style={{ height: 60, width: 60, backgroundColor: "#5582F7", marginRight: "1rem" }} />
      <FlexBox column style={{ marginRight: "3rem" }}>
        <span>
          <strong>Dreambox</strong> will have access to:
        </span>
        <p>all profile and roster data</p>
      </FlexBox>
      <FlexBox alignItems={ItemAlign.BASELINE}>
        <span>Set access by: </span>
        <SegmentedControl
          options={[
            {
              content: "Recommended settings",
              value: 0,
            },
            {
              content: "Sections",
              value: 1,
            },
            {
              content: "District",
              value: 2,
            },
          ]}
        />
      </FlexBox>
    </FlexBox>
    <FlexBox alignItems={ItemAlign.CENTER} style={{ marginBottom: "2rem" }}>
      <FlexBox style={{ height: 60, width: 60, backgroundColor: "#5582F7", marginRight: "1rem" }} />
      <FlexBox column style={{ marginRight: "3rem" }}>
        <span>
          <strong>Dreambox</strong> will have access to:
        </span>
        <p>all profile and roster data</p>
      </FlexBox>
      <FlexBox alignItems={ItemAlign.BASELINE}>
        <span>Set access by: </span>
        <SegmentedControl
          options={[
            {
              content: "Recommended settings",
              value: 0,
            },
            {
              content: "Sections",
              value: 1,
            },
            {
              content: "District",
              value: 2,
            },
          ]}
        />
      </FlexBox>
    </FlexBox>
  </FlexBox>
);

const portalURL = (
  <FlexBox>
    <FlexBox style={{ marginRight: "1rem" }}>
      <img src="./assets/img/portalScreenshot.png" />
    </FlexBox>
    <FlexBox column>
      <p>
        Update the link with a short URL, like your district's name, so students and teachers can
        easily access all their leaning applications from their portal.
      </p>
      <br />
      <FlexBox alignItems={ItemAlign.BASELINE} style={{ color: "#474C5E" }}>
        <span style={{ marginRight: -12 }}>https://clever.com/in/</span>
        <TextInput
          style={{ color: "#474C5E", border: "0.0625rem solid #e3e6eb" }}
          readOnly
          name="shortname"
          value="somedistrict"
        />
      </FlexBox>
    </FlexBox>
  </FlexBox>
);

const setAccessHelp = (
  <span>
    If you can't figure out what settings to use, remember applications provide recommended settings
    to try out!
  </span>
);

// Clever SSO Content
const cleverSSO = (
  <FlexBox column>
    <img src="./assets/img/portalExample.gif" />
    <br />
    <p>
      Clever single sign-on (SSO) saves thousands of hours of classroom time and gives your
      districts' students and teachers secure one-click access into all of their online learning
      programs.
    </p>
    <div>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} /> Use existing accounts from
        Google, Microsoft 365, and other IDPs to log in
      </FlexBox>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} /> Give students access to a
        secure, personalized Portal
      </FlexBox>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} /> Get direct logins into
        Chromebooks and Windows devices
      </FlexBox>
    </div>
    <br />
    <p>Best yet, it only takes less than 10 minutes to set up and is available at no cost!</p>
    <br />
    <Button type={Button.Type.PRIMARY} value="Request more info" />
  </FlexBox>
);

const singleSignOnHelp = (
  <span>
    If you're interested in learning more, click the button to fill out our form! Otherwise, you can
    just hit "Next step."
  </span>
);

// CLEVER GOALS CONTENT
const cleverGoals = (
  <FlexBox column>
    <img src="./assets/img/goals.gif" />
    <p>Goals turns learning software into student achievement</p>
    <div>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} /> Set personalized student goals
      </FlexBox>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} /> Increase software engagement
      </FlexBox>
      <FlexBox>
        <Icon size={Icon.sizes.SMALL} name={Icon.names.CHECKMARK} />
        Improve learning outcomes
      </FlexBox>
    </div>
    <br />
    <Button type={Button.Type.SECONDARY} value={"Request demo"} />
  </FlexBox>
);

const goalsHelp = (
  <span>
    If you're interested in receiving a Goals demo, click the button to fill out our form!
    Otherwise, you can just hit "Next step."
  </span>
);

export const WizardLayoutContent = {
  firstStep: "setAccess",
  setAccess: {
    nextStep: "singleSignOn",
    sections: [
      {
        title: "Set application launch date",
        subtitle:
          "Once launched, your students and teachers will be able to see their new applications on the portal.",
        content: (
          <FlexBox style={{ maxWidth: "15rem" }} column>
            <p>Launch date</p>
            <DatePicker
              onChange={() => {
                /* noop */
              }}
            />
          </FlexBox>
        ),
      },
      {
        title: "Set application access",
        subtitle: "Define who should have access to the applications below.",
        content: appAccess,
      },
      {
        title: "Set your Clever Portal URL",
        subtitle: "Students and teachers will log in at this URL.",
        content: portalURL,
      },
    ],
    helpContent: setAccessHelp,
  },
  singleSignOn: {
    nextStep: "goals",
    prevStep: "setAccess",
    sections: [
      {
        title: "Clever SSO",
        subtitle: "Find out how to start saving hours of classroom time.",
        content: cleverSSO,
      },
    ],
    helpContent: singleSignOnHelp,
  },
  goals: {
    prevStep: "singleSignOn",
    sections: [
      {
        title: "Clever Goals",
        subtitle:
          "Is your district leadership asking whether these programs are being used effectively?",
        content: cleverGoals,
      },
    ],
    nextStepButtonText: "Done",
    helpContent: goalsHelp,
  },
};
