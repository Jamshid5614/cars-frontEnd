import Styled from 'styled-components';


const Header = Styled.header `
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    align-items: center;
    background-color: #F7F7F7; 
    margin-bottom: 15px;
    .text-start{
        text-align: start;
    }
    .header-brand {
        font-size: 25px;
        color: black;
    }
    .text-end{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    img{
        border-radius: 50%;
    }
    

`;










export {Header};

