import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styled from "styled-components";

export default function ScrollToTopButton({ threshold = 50 }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);
    return (
        <TopButton type="button" aria-label="Scroll to top" data-visible={visible} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <FiArrowUp />
        </TopButton>
    );
}
const TopButton = styled.button`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 50;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgba(160,198,232,0.3);
    border-radius: 50%;
    color: #07111f;
    background: #7ac9ff;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    &[data-visible="true"] { opacity: 1; pointer-events: auto; }
    &:hover { border-color: #fff; box-shadow: 0 0 20px rgba(122,201,255,0.35); }
    &:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
`;