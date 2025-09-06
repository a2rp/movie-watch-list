import React from "react";
import styled from "styled-components";

export default function ScrollToTopButton({ threshold = 50 }) {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > threshold);
        onScroll(); // run once on mount
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Styled.Wrapper
            type="button"
            aria-label="Scroll to top"
            onClick={goTop}
            data-visible={visible}
        >
            ↑
        </Styled.Wrapper>
    );
}

export const Styled = {
    Wrapper: styled.button`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1000;

    width: 44px;
    height: 44px;
    border-radius: 999px;

    /* Neutral styling: inherits your site color */
    color: inherit;
    background: transparent;
    border: 1px solid currentColor;

    display: grid;
    place-items: center;
    font-size: 20px;
    cursor: pointer;

    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    transition: opacity 200ms ease, transform 200ms ease;

    &[data-visible="true"] {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
      transform: none;
    }
  `,
};
