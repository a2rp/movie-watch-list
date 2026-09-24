import { Styled } from "./styled";

export default function About() {
    return (
        <Styled.Wrapper>
            <Styled.Kicker>ABOUT THIS PROJECT</Styled.Kicker>
            <Styled.Heading>A small, practical collection for the movies you want to remember.</Styled.Heading>
            <Styled.Copy>
                Movie Watchlist is a focused browser app for saving titles, tracking progress and keeping personal ratings in one place. It works without an account, so the list stays available in this browser through LocalStorage.
            </Styled.Copy>
            <Styled.List>
                <li>Add a movie with an optional year, poster and starting rating.</li>
                <li>Search, filter and sort the collection as it grows.</li>
                <li>Update status, rating, notes or poster details at any time.</li>
            </Styled.List>
        </Styled.Wrapper>
    );
}