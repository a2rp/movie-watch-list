import styled from "styled-components";

const Wrapper = styled.div`
    background-color: #111;
    color: #aaa;
    margin-top: 50px;
    min-height: 100vh;
    overflow: hidden;
    padding: 50px;
    @media (width<900px) {
        padding: 15px;
    }
`;

const Heading = styled.h1`
    margin-bottom: 30px;
`;

const Row = styled.div`
    /* border-bottom: 1px solid #ccc; */
    display: flex;
    gap: 15px;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 0;

    &:hover {
        background-color: #333;
        /* color: #000;
        a {
            color: #000;
        } */
    }
`;
const Col1 = styled.div`
    flex: 0 0 80px;
`;
const Col2 = styled.div`
    /* flex: 1 1 100%; */

    a {
        color: #aaa;
        overflow-wrap: anywhere;
        word-break: break-word;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Styled = {
    Wrapper,
    Heading,
    Row,
    Col1,
    Col2,
};
