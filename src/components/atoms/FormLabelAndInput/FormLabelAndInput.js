import React from 'react';
import { Container, InputSearch, LabelStyled, TextareaStyled, ContainerIcon } from './FormLabelAndInput.styles';

const FormLabelAndInput = React.forwardRef(
  ({ id, placeholder, label, type = 'text', required = true, handleInput, is2Columns, value, isNotValid, onBlur, min, max, textarea, icon, padding }, ref) => {
    return (
      <Container is2Columns={is2Columns}>
        <LabelStyled htmlFor={id}>{label} </LabelStyled>
        {textarea ? (
          <TextareaStyled
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleInput}
            isNotValid={isNotValid}
            onBlur={onBlur}
            ref={ref}
          />
        ) : icon ? (
          <div style={{ position: 'relative' }}>
            <ContainerIcon>{icon}</ContainerIcon>
            <InputSearch
              type={type}
              id={id}
              name={id}
              placeholder={placeholder}
              required={required}
              value={value}
              onChange={handleInput}
              isNotValid={isNotValid}
              onBlur={onBlur}
              min={min}
              max={max}
              ref={ref}
              padding={padding}
            />
          </div>
        ) : (
          <InputSearch
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleInput}
            isNotValid={isNotValid}
            onBlur={onBlur}
            min={min}
            max={max}
            ref={ref}
          />
        )}
      </Container>
    );
  }
);

export default FormLabelAndInput;
