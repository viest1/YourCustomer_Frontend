import React, { useContext } from 'react';
import { Container, InputSearch, LabelStyled, TextareaStyled, ContainerIcon, ContainerIconRight } from './FormLabelAndInput.styles';
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
      minlength,
      rightIcon,
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
            minLength={minlength}
          />
        ) : icon || rightIcon ? (
          <div style={{ position: 'relative' }}>
            {icon && (
              <ContainerIcon themeType={themeType} noPointer>
                {icon}
              </ContainerIcon>
            )}
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
              minLength={minlength}
            />
            {rightIcon && (
              <ContainerIconRight themeType={themeType} noPointer>
                {rightIcon}
              </ContainerIconRight>
            )}
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
            minLength={minlength}
          />
        )}
      </Container>
    );
  }
);

export default FormLabelAndInput;
