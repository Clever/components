import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./GoalsLogo.less";

export interface BaseProps {
  className?: string;
}

interface ExtendedProps extends BaseProps {
  size?: "small" | "medium" | "large" | "custom";
  withClever?: boolean;
}

const Size = {
  S: "small",
  M: "medium",
  L: "large",
  CUSTOM: "custom",
};

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  withClever: PropTypes.bool,
};

const SizeClass = {
  [Size.S]: "text--large",
  [Size.M]: "text--huge",
  [Size.L]: "text--gargantuan",
};

const cssClass = {
  CONTAINER: "GoalsLogo",
  IMAGE_WITH_CLEVER: "GoalsLogo--image--withClever",
  IMAGE: "GoalsLogo--image",
  PROGRESS_BAR_INNER: "GoalsLogo--progressBar--inner",
  PROGRESS_BAR: "GoalsLogo--progressBar",
  TEXT: "GoalsLogo--text",
};

/**
 * Brand logo for the Clever Goals product.
 */
export default class GoalsLogo extends React.PureComponent<ExtendedProps> {
  static propTypes = propTypes;
  static Size = Size;

  static defaultProps = {
    size: Size.M,
  };

  render() {
    const { className, size, withClever } = this.props;

    const LogoImage: any = withClever ? GoalsLogoWithClever : GoalsLogoWithoutClever;

    return (
      <div className={classnames(cssClass.CONTAINER, SizeClass[size], className)}>
        <LogoImage className={cssClass.IMAGE} />
      </div>
    );
  }
}

class GoalsLogoWithoutClever extends React.PureComponent<BaseProps> {
  static propTypes = {
    className: PropTypes.string,
  };

  render = () => (
    <svg className={this.props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 23">
      <g fill="none">
        <path
          fill="#FFF"
          d="M0 7.8278668C0 3.10845725 3.51686769 0 7.85055626 0c2.83618364 0 4.71940954 1.29329973 5.99001984 2.9950099l-1.837847 1.06640505c-.8621998-1.15716292-2.38239426-2.04205221-4.15217284-2.04205221-3.15383618 0-5.51354096 2.40508371-5.51354096 5.80850406 0 3.3807309 2.35970478 5.8311935 5.51354096 5.8311935 1.67902071 0 3.10845724-.8168209 3.83452024-1.4975049V9.43881909H6.82953016V7.44214582h7.12449324v5.55891988c-1.452126 1.6109523-3.5395571 2.6773574-6.10346714 2.6773574C3.51686769 15.6784231 0 12.5472763 0 7.8278668zm20.2503511 7.8278668c-3.4034204 0-5.5362305-2.5865995-5.5362305-5.76312513 0-3.15383618 2.1328101-5.74043565 5.5362305-5.74043565 3.4261098 0 5.5362304 2.58659947 5.5362304 5.74043565 0 3.17652563-2.1101206 5.76312513-5.5362304 5.76312513zm0-1.8151575c2.2008784 0 3.4034203-1.8605365 3.4034203-3.94796763 0-2.06474167-1.2025419-3.92527813-3.4034203-3.92527813-2.1781891 0-3.4034204 1.86053646-3.4034204 3.92527813 0 2.08743113 1.2252313 3.94796763 3.4034204 3.94796763zM33.7165509 15.38346v-1.2025419c-.8621998.9529577-2.1101206 1.4748155-3.5849361 1.4748155-1.8151575 0-3.8118308-1.2252313-3.8118308-3.630315 0-2.49584163 1.9739838-3.58493614 3.8118308-3.58493614 1.4748155 0 2.7454257.47647885 3.5849361 1.45212601V8.07745095c0-1.36136813-1.111784-2.17818902-2.6773573-2.17818902-1.2479208 0-2.3143259.47647885-3.289973 1.45212602l-.8848893-1.40674708c1.2252313-1.20254185 2.7227362-1.79246805 4.4925148-1.79246805 2.3823943 0 4.401757 1.04371557 4.401757 3.83452026V15.38346h-2.0420522zm0-2.4050837v-1.8605365c-.6126157-.8168209-1.6790207-1.2479208-2.8134942-1.2479208-1.4748154 0-2.518531.8848893-2.518531 2.178189 0 1.2932998 1.0437156 2.178189 2.518531 2.178189 1.1344735 0 2.2008785-.4310999 2.8134942-1.2479207zm3.8912439 2.4050837V.24958416h2.0420522V15.38346h-2.0420522zm2.9155968-1.4294366l.9756472-1.4975049c.7487524.8168208 2.2008784 1.5655733 3.6756939 1.5655733 1.5428839 0 2.3597048-.6353051 2.3597048-1.5655733 0-1.0890945-1.2479208-1.452126-2.6546679-1.7697786-1.8605364-.4310999-4.0387254-.93026824-4.0387254-3.28997301 0-1.74708912 1.4975049-3.24459407 4.1748622-3.24459407 1.883226 0 3.2445941.68068407 4.1748623 1.56557336L48.28319 7.14718273c-.6353052-.77144195-1.8605365-1.33867867-3.2445941-1.33867867s-2.2462574.54454725-2.2462574 1.42943654c0 .9529577 1.1798524 1.27061027 2.5412205 1.58826283 1.9059154.43109991 4.1748623.9529577 4.1748623 3.47148877 0 1.8832259-1.5428839 3.3580414-4.4244464 3.3580414-1.837847 0-3.4487993-.5672367-4.5605833-1.7017102z"
        />
        <g transform="translate(0 19)">
          <rect width="50" height="4" fill="#FFF" rx="2" />
          <path
            fill="#01D59A"
            d="M2 0h38.0197754l-.7008667 4H2C.8954305 4 0 3.1045695 0 2s.8954305-2 2-2z"
          />
        </g>
      </g>
    </svg>
  );
}

class GoalsLogoWithClever extends React.PureComponent<BaseProps> {
  static propTypes = {
    className: PropTypes.string,
  };

  render = () => (
    <svg
      className={classnames(cssClass.IMAGE_WITH_CLEVER, this.props.className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53 34"
    >
      <g fill="none">
        <path
          fill="#4E00C2"
          d="M.104 18.008c0-4.992 3.72-8.28 8.304-8.28 3 0 4.992 1.368 6.336 3.168L12.8 14.024c-.912-1.224-2.52-2.16-4.392-2.16-3.336 0-5.832 2.544-5.832 6.144 0 3.576 2.496 6.168 5.832 6.168 1.776 0 3.288-.864 4.056-1.584v-2.88H7.328V17.6h7.536v5.88c-1.536 1.704-3.744 2.832-6.456 2.832-4.584 0-8.304-3.312-8.304-8.304zm21.42 8.28c-3.6 0-5.856-2.736-5.856-6.096 0-3.336 2.256-6.072 5.856-6.072 3.624 0 5.856 2.736 5.856 6.072 0 3.36-2.232 6.096-5.856 6.096zm0-1.92c2.328 0 3.6-1.968 3.6-4.176 0-2.184-1.272-4.152-3.6-4.152-2.304 0-3.6 1.968-3.6 4.152 0 2.208 1.296 4.176 3.6 4.176zM35.768 26v-1.272c-.912 1.008-2.232 1.56-3.792 1.56-1.92 0-4.032-1.296-4.032-3.84 0-2.64 2.088-3.792 4.032-3.792 1.56 0 2.904.504 3.792 1.536v-1.92c0-1.44-1.176-2.304-2.832-2.304-1.32 0-2.448.504-3.48 1.536l-.936-1.488c1.296-1.272 2.88-1.896 4.752-1.896 2.52 0 4.656 1.104 4.656 4.056V26h-2.16zm0-2.544v-1.968c-.648-.864-1.776-1.32-2.976-1.32-1.56 0-2.664.936-2.664 2.304 0 1.368 1.104 2.304 2.664 2.304 1.2 0 2.328-.456 2.976-1.32zm4.116 2.536v-16h2v16h-2zm3.084-1.504L44 22.904c.792.864 2.328 1.656 3.888 1.656 1.632 0 2.496-.672 2.496-1.656 0-1.152-1.32-1.536-2.808-1.872-1.968-.456-4.272-.984-4.272-3.48 0-1.848 1.584-3.432 4.416-3.432 1.992 0 3.432.72 4.416 1.656l-.96 1.512c-.672-.816-1.968-1.416-3.432-1.416s-2.376.576-2.376 1.512c0 1.008 1.248 1.344 2.688 1.68 2.016.456 4.416 1.008 4.416 3.672 0 1.992-1.632 3.552-4.68 3.552-1.944 0-3.648-.6-4.824-1.8z"
        />
        <g transform="translate(0 30)">
          <rect width="52" height="4" fill="#B5BCCA" rx="2" />
          <path
            fill="#01D59A"
            d="M2 0h38.0197754l-.7008667 4H2C.8954305 4 0 3.1045695 0 2s.8954305-2 2-2z"
          />
        </g>
        <path
          d="M3.18389037 6.46175489c-1.8113515 0-3.15666897-1.39503829-3.15666897-3.15842553v-.0176017c0-1.7459234 1.3189712-3.17593532 3.20945361-3.17593532 1.16066334 0 1.85529264.38604255 2.42680384.94750468l-.86168855.99144c-.47483147-.42988596-.95841433-.69308425-1.57391273-.69308425-1.0375913 0-1.78500524.85977191-1.78500524 1.91251914v.01755575c0 1.05279319.72981906 1.93016681 1.78500524 1.93016681.70342674 0 1.13427102-.28070809 1.61789993-.71937192l.86168855.86850383c-.63309328.67552851-1.33652002 1.09672851-2.52357568 1.09672851M5.83044598.04379745h1.33652003v6.40458383H5.83044598zM9.64646237 2.63653277c-.55396238 0-.91447319.39477446-1.01999641 1.00017191h2.01360054c-.0791309-.59657362-.4308443-1.00017191-.99360413-1.00017191m2.27738553 1.83365617H8.64406084c.13191554.60530553.55396238.92117106 1.15191196.92117106.4483931 0 .7737602-.14035404 1.1430685-.48255319l.7649627.67562042c-.4396417.54390639-1.072735.87732766-1.92562608.87732766-1.41569699 0-2.46203967-.99144-2.46203967-2.43022978v-.01755575c0-1.3423251.95841433-2.44778553 2.33012412-2.44778553 1.57395883 0 2.29498043 1.21952681 2.29498043 2.55307404v.01755575c0 .13157617-.0087975.21053106-.0175949.33337532M14.4833503 6.43748936h-1.2133558l-1.8553848-4.73761532h1.415697l1.0551401 3.14964766 1.0639376-3.14964766h1.3893507l-1.8553848 4.73761532M18.0705411 2.63653277c-.5539623 0-.9144732.39477446-1.0199964 1.00017191h2.0135545c-.0790849-.59657362-.4307982-1.00017191-.9935581-1.00017191m2.2773856 1.83365617h-3.2798332c.1319616.60530553.5540085.92117106 1.151912.92117106.4484392 0 .7738063-.14035404 1.1431145-.48255319l.7649628.67562042c-.4396417.54390639-1.072735.87732766-1.9256722.87732766-1.4156509 0-2.4620396-.99144-2.4620396-2.43022978v-.01755575c0-1.3423251.9584604-2.44778553 2.3301701-2.44778553 1.5739588 0 2.2949344 1.21952681 2.2949344 2.55307404v.01755575c0 .13157617-.0087514.21053106-.0175488.33337532M23.2495159 3.05304511c-.8881269 0-1.4332918.53517446-1.4332918 1.65819063v1.73714554h-1.336474V1.74583149h1.336474v.94750468c.2725824-.64924085.7122242-1.07034894 1.5036253-1.0352834v1.39499234h-.0703335"
          fill="#2E00D9"
        />
      </g>
    </svg>
  );
}