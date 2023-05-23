import styled from 'styled-components'

//Divs for styling site
export const Section = styled.section`
    padding: 4rem 0 2rem;  

    @media (min-width: 1024px) {
        width: 75% !important;
        margin: auto !important;
    }

`

export const Container = styled.div`
    padding-left: 2rem;
    padding-right: 2rem;

    @media (min-width: 1024px) {
        /* width: 75% !important; */
        margin: auto !important;
    }
`

//NAVBAR
export const Button = styled.button`
    padding: 0.4rem 1.5rem;
    background: var(--PrimaryColor);
    border: none;
    outline: none;
    border-radius: 3rem;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background: var(--HoverColor);
    }
`

//Contact page
export const ContactFormSection = styled.section`
    display: flex;
    width: 60%;
    padding: 5rem;
    border-radius: 25px;
    background-color: var(--SecondaryColor);
    margin: auto;
    margin-top: 13rem;
    margin-bottom: 5rem;
    justify-content: center;
    align-items: center;
    @media (max-width: 720px) {
       margin-top:40em;
    }
    @media (max-width: 486px) {
       margin-top:44em;
    }
    @media (max-width: 436px) {
       margin-top:48em;
    }
    @media (max-width: 363px) {
       margin-top:53em;
    }
    @media (max-width: 330px) {
       margin-top:58em;
    }
    @media (max-width: 315px) {
       margin-top:63em;
    }
`