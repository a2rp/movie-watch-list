import { Styled } from "./styled";

export default function About() {
    return (
        <>
            <Styled.Wrapper>
                <Styled.Heading>About Developer</Styled.Heading>
                <Styled.Row>
                    <Styled.Col1>Name</Styled.Col1>
                    <Styled.Col2>Ashish Ranjan</Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Phone</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="tel:+918123747965"
                        >+91 8123747965</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Email</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="mailto:ash.ranjan09@gmail.com"
                        >ash.ranjan09@gmail.com</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Nationality</Styled.Col1>
                    <Styled.Col2>The Republic of India</Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Website</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="https://www.ashishranjan.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >https://www.ashishranjan.net/</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Old Website</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="http://www.ashishranjan.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >http://www.ashishranjan.in/</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>Facebook</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="https://www.facebook.com/theash.ashish/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >https://www.facebook.com/theash.ashish/</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>LinkedIn</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="https://www.linkedin.com/in/aashishranjan/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >https://www.linkedin.com/in/aashishranjan/</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>YouTube</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ"
                            target="_blank"
                            rel="noopener noreferrer"
                        >https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ</a>
                    </Styled.Col2>
                </Styled.Row>
                <Styled.Row>
                    <Styled.Col1>GitHub</Styled.Col1>
                    <Styled.Col2>
                        <a
                            href="https://github.com/a2rp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >https://github.com/a2rp</a>
                    </Styled.Col2>
                </Styled.Row>
            </Styled.Wrapper>
        </>
    );
}


