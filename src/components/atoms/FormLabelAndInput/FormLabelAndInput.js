import React, { useContext } from 'react';
import { Container, InputSearch, LabelStyled, TextareaStyled, ContainerIcon } from './FormLabelAndInput.styles';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

const FormLabelAndInput = React.forwardRef(
  (
    {
      id,
      placeholder,
      label,
      type = 'text',
      required = true,
      handleInput,
      is2Columns,
      value,
      isNotValid,
      onBlur,
      min,
      max,
      textarea,
      icon,
      padding,
      noPointer,
      width,
    },
    ref
  ) => {
    const { themeType } = useContext(ListCustomersTestContext);
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
            <ContainerIcon themeType={themeType} noPointer>
              {icon}
            </ContainerIcon>
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
              padding={padding || '0.8rem 10px 0.8rem 3rem'}
              width={width}
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
            width={width}
          />
        )}
      </Container>
    );
  }
);

export default FormLabelAndInput;
