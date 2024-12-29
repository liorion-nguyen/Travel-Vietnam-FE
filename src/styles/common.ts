import { styled } from "@mui/material";

export const StyledLineDashed = styled('div')(() => ({
    border: 'none',
    borderTop: '1px dashed grey',
    width: '100%',
}));

export const StyledTitleComponent = styled('h3')(() => ({
    background: '#faa935',
    fontFamily: '"Island Moments", cursive',
    width: 'max-content',
    padding: '0px 0.5rem',
    paddingRight: '1rem',
    borderRadius: '50px',
    fontWeight: '500',
    fontSize: '1.7rem',
    color: '#0b2727'
}));