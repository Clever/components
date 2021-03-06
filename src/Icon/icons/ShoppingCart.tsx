import * as React from "react";

export default function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="46px"
      height="46px"
      viewBox="0 0 46 46"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {/* Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch */}
      <title>Shopping Cart</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <path
          d="M8.46918161,10 L40.5830897,10 C41.6876592,10 42.5830897,10.8954305 42.5830897,12 C42.5830897,12.1255737 42.5712632,12.2508683 42.5477668,12.3742242 L39.6193432,27.7484484 C39.2599886,29.63506 37.6105198,31 35.6899889,31 L6.61203875,31 C4.40289975,31 2.61203875,29.209139 2.61203875,27 C2.61203875,26.8107245 2.62547318,26.6216877 2.65224077,26.4343146 L4.50938363,13.4343146 C4.7908972,11.4637196 6.4785801,10 8.46918161,10 Z"
          id="path-1"
        />
        <circle id="path-2" cx="5.6" cy="40.8" r={5} />
        <circle id="path-3" cx="34.6" cy="40.8" r={5} />
      </defs>
      <g id="Symbols" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g id="Shopping-Cart">
          <g>
            <path
              d="M2,0 L2.22415374,-1.11022302e-16 C2.68073331,-1.94894609e-16 3.07933401,0.309252862 3.19278866,0.751511777 L6,11.6943359 L3.10459404,36.1177261 C3.04493676,36.6209485 2.61829414,37 2.11154794,37 L2,37 C1.51096458,37 1.11452304,36.6035585 1.11452304,36.114523 C1.11452304,36.0787004 1.11669689,36.0429108 1.1210326,36.0073515 L4,12.3955078 L1.23523182,0.971939293 C1.13300855,0.549569491 1.39253858,0.124302777 1.81490839,0.0220795018 C1.8755128,0.00741182989 1.93764589,1.1454265e-17 2,0 Z"
              id="Rectangle-20"
              fill="#62748C"
            />
            <g id="Rectangle-21">
              <use fill="#BCCEFF" fillRule="evenodd" xlinkHref="#path-1" />
              <path
                stroke="#62748C"
                strokeWidth={2}
                d="M8.46918161,11 C6.97623048,11 5.7104683,12.0977897 5.49933313,13.5757359 L3.64219027,26.5757359 C3.62211457,26.7162658 3.61203875,26.8580434 3.61203875,27 C3.61203875,28.6568542 4.9551845,30 6.61203875,30 L35.6899889,30 C37.1303871,30 38.3674886,28.976295 38.6370046,27.5613363 L41.5654282,12.1871121 C41.5771764,12.1254342 41.5830897,12.0627868 41.5830897,12 C41.5830897,11.4477153 41.1353744,11 40.5830897,11 L8.46918161,11 Z"
              />
            </g>
            <rect id="Rectangle-22" fill="#62748C" x={2} y={35} width={39} height={2} rx={1} />
            <g id="Oval">
              <use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-2" />
              <circle stroke="#62748C" strokeWidth={2} cx="5.6" cy="40.8" r={4} />
            </g>
            <g id="Oval">
              <use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-3" />
              <circle stroke="#62748C" strokeWidth={2} cx="34.6" cy="40.8" r={4} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
