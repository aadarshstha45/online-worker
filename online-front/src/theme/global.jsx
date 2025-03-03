import PlusJakartaSans from "@dailoma/assets/fonts/PlusJakartaSans.ttf";
import { css, Global } from "@emotion/react";

const globalStyles = () => {
  return (
    <Global
      styles={() => css`
        @font-face {
          font-family: "PlusJakartaSans";
          font-style: normal;
          font-weight: regular;
          src: url(${PlusJakartaSans}) format("truetype");
        }
        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          font-family: "PlusJakartaSans";
          scroll-behavior: smooth;
          background: #fff;
        }
        body {
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          padding-top: 0px;
          margin: 0px;
          font-family: "PlusJakartaSans";
        }
        * {
          box-sizing: border-box;
          &:before,
          &:after {
            box-sizing: border-box;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        ul,
        li,
        h6,
        p,
        img,
        figure {
          margin: 0px;
          padding: 0px;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          box-shadow: 0 0 0 30px white inset !important;
          z-index: 0;
        }
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: inherit;
          width: 100%;
          height: 100%;
          /* Center slide text vertically */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide img {
          display: block;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #fff;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 20px;
          box-sizing: border-box;
          color: #000;
          border-radius: 50%;
          padding: 5px;
        }
      `}
    />
  );
};

export { globalStyles };
