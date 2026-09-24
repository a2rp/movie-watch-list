import styled from "styled-components";

const Wrapper = styled.section`
    width: min(1120px, 94vw);
    margin: 0 auto;
    padding: 72px 0 90px;
    border-top: 1px solid rgba(160, 198, 232, 0.16);
`;
const Kicker = styled.span`
    color: #7ac9ff;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.16em;
`;
const Heading = styled.h2`
    max-width: 760px;
    margin: 14px 0 18px;
    color: #f5f8ff;
    font-size: clamp(2rem, 5vw, 4.2rem);
    line-height: 1;
    letter-spacing: -0.06em;
`;
const Copy = styled.p`
    max-width: 680px;
    margin: 0;
    color: #a9bdd2;
    line-height: 1.7;
`;
const List = styled.ul`
    display: grid;
    gap: 12px;
    max-width: 680px;
    margin: 26px 0 0;
    padding-left: 20px;
    color: #cce5fb;
    line-height: 1.55;
    li::marker { color: #7ac9ff; }
`;
export const Styled = { Wrapper, Kicker, Heading, Copy, List };