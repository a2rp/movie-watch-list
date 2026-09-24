import styled, { css } from "styled-components";

const border = "1px solid rgba(160, 198, 232, 0.2)";
const focus = "0 0 0 3px rgba(122, 201, 255, 0.2)";
const control = css`
    border: ${border};
    border-radius: 10px;
    color: #edf4ff;
    background: rgba(7, 17, 31, 0.62);
    outline: none;
    transition: border-color 180ms ease, box-shadow 180ms ease, text-shadow 180ms ease;
    &:focus-visible { border-color: #7ac9ff; box-shadow: ${focus}; }
    &:hover { border-color: rgba(122, 201, 255, 0.65); }
`;
const button = css`
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    transition: border-color 180ms ease, box-shadow 180ms ease, text-shadow 180ms ease;
    &:hover { border-color: #7ac9ff; box-shadow: 0 0 18px rgba(122, 201, 255, 0.16); text-shadow: 0 0 12px rgba(122, 201, 255, 0.3); }
    &:focus-visible { outline: none; box-shadow: ${focus}; }
    &:disabled { cursor: not-allowed; opacity: 0.45; }
`;

export const Styled = {
    Page: styled.div`min-height: 100dvh; background-position: center; background-size: cover;`,
    Container: styled.div`width: min(1120px, 94vw); margin: 0 auto; padding: 38px 0 58px;`,
    Header: styled.header`display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 22px;`,
    Kicker: styled.span`display: block; color: #7ac9ff; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;`,
    Title: styled.h1`margin: 8px 0 8px; color: #fff; font-size: clamp(2rem, 5vw, 4rem); line-height: 0.98; letter-spacing: -0.06em;`,
    Sub: styled.p`max-width: 590px; margin: 0; color: #a9bdd2; line-height: 1.6;`,
    BadgeRow: styled.div`display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px;`,
    Tag: styled.span`
        display: inline-flex; align-items: center; width: fit-content; padding: 6px 10px; border: 1px solid rgba(160, 198, 232, 0.22); border-radius: 999px; color: ${({ tone }) => tone === "muted" ? "#71869c" : "#cce5fb"}; font-size: 0.75rem;
    `,
    Card: styled.div`padding: 18px; border: ${border}; border-radius: 16px; background: rgba(9, 25, 44, 0.72); box-shadow: 0 18px 55px rgba(0,0,0,0.15);`,
    FormRow: styled.div`display: grid; grid-template-columns: 1.3fr 130px 145px 130px 1.1fr auto; gap: 10px; @media (max-width: 1080px) { grid-template-columns: 1.2fr 120px 1fr 1fr; } @media (max-width: 620px) { grid-template-columns: 1fr; }`,
    Input: styled.input`${control} width: 100%; min-height: 42px; padding: 10px 12px; &::placeholder { color: #72879c; }`,
    TextArea: styled.textarea`${control} width: 100%; min-height: 110px; padding: 10px 12px; resize: vertical; &::placeholder { color: #72879c; }`,
    SearchInput: styled.label`${control} display: flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 12px; color: #91b9d8; input { width: 150px; padding: 0; border: 0; outline: 0; color: #edf4ff; background: transparent; &::placeholder { color: #72879c; } } @media (max-width: 520px) { flex: 1; input { width: 100%; } }`,
    Select: styled.select`${control} min-height: 42px; padding: 10px 12px; option { color: #07111f; background: #edf4ff; }`,
    Helper: styled.p`margin: 10px 0 0; color: #8298ae; font-size: 0.78rem;`,
    PrimaryButton: styled.button`${button} border: 1px solid #7ac9ff; color: #06101c; background: #7ac9ff;`,
    Button: styled.button`${button} border: ${border}; color: #cce5fb; background: transparent;`,
    DangerButton: styled.button`${button} border: 1px solid rgba(255, 124, 124, 0.6); color: #ffaaa8; background: transparent; &:hover { border-color: #ff8d8d; box-shadow: 0 0 18px rgba(255, 110, 110, 0.14); text-shadow: 0 0 12px rgba(255, 110, 110, 0.25); }`,
    Toolbar: styled.div`display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 18px 0 12px;`,
    RowWrap: styled.div`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`,
    List: styled.div`display: grid; gap: 10px;`,
    Empty: styled.div`padding: 44px 18px; border: 1px dashed rgba(160, 198, 232, 0.3); border-radius: 16px; color: #9fb4ca; text-align: center;`,
    Item: styled.div`display: grid; grid-template-columns: 72px minmax(0, 1fr) auto; gap: 14px; align-items: center; padding: 12px; border: ${border}; border-radius: 16px; background: rgba(9, 25, 44, 0.7); transition: border-color 180ms ease, box-shadow 180ms ease; &:hover { border-color: rgba(122, 201, 255, 0.6); box-shadow: 0 0 20px rgba(122, 201, 255, 0.08); } @media (max-width: 760px) { grid-template-columns: 56px minmax(0, 1fr); align-items: start; .editFields { grid-column: 1 / -1; } } @media (max-width: 520px) { grid-template-columns: 1fr; }`,
    ThumbWrap: styled.div`width: 64px; height: 88px; overflow: hidden; border: 1px solid rgba(160,198,232,0.18); border-radius: 10px; background: #10243a; img { display: block; width: 100%; height: 100%; object-fit: cover; } @media (max-width: 520px) { width: 92px; height: 124px; }`,
    ItemLeft: styled.div`min-width: 0;`,
    ItemRight: styled.div`display: flex; align-items: center; justify-content: flex-end; gap: 7px; flex-wrap: wrap; @media (max-width: 760px) { grid-column: 2; justify-content: flex-start; } @media (max-width: 520px) { grid-column: 1; }`,
    ItemTitle: styled.h3`margin: 0; color: #f4f8ff; font-size: 1rem; span { color: #8fa8bf; font-weight: 500; }`,
    ItemMeta: styled.div`display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 8px; color: #8ea6bd; font-size: 0.8rem;`,
    IconButton: styled.button`${button} display: inline-grid; min-width: 42px; min-height: 42px; place-items: center; padding: 9px; border: ${border}; color: #cce5fb; background: transparent; svg { width: 17px; height: 17px; }`,
    StarButton: styled.button`${button} display: inline-grid; min-width: 34px; min-height: 34px; place-items: center; padding: 6px; border: 1px solid ${({ $filled }) => $filled ? "rgba(245,197,24,0.65)" : "rgba(160,198,232,0.2)"}; color: ${({ $filled }) => $filled ? "#f5c518" : "#7890a7"}; background: transparent; svg { width: 15px; height: 15px; fill: ${({ $filled }) => $filled ? "currentColor" : "none"}; }`,
    FooterNote: styled.p`margin: 18px 0 0; color: #7890a7; font-size: 0.78rem; text-align: center;`,
    ModalOverlay: styled.div`position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 18px; background: rgba(2, 8, 16, 0.76);`,
    ModalCard: styled.div`width: min(520px, 100%); padding: 22px; border: ${border}; border-radius: 16px; background: #0b1b2e; box-shadow: 0 22px 70px rgba(0,0,0,0.45);`,
    ModalTitle: styled.h2`margin: 0 0 8px; color: #fff; font-size: 1.25rem;`,
    ModalMessage: styled.p`margin: 0; color: #a9bdd2; line-height: 1.55;`,
    ModalActions: styled.div`display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;`,
};