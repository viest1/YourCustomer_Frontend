import React from 'react';
import styled from 'styled-components';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { usePhoto } from '../../../hooks/usePhoto';
import noPhoto from '../../../assets/images/1024px-No_image_available.svg.png';

export const ContainerImage = styled.div`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  span {
    font-size: 0.7rem;
  }

  a {
    text-decoration: none;
  }
`;

export const ContainerArrowsImage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  * {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export const IconPrevious = styled(FcPrevious)`
  cursor: pointer;
`;
export const IconNext = styled(FcNext)`
  cursor: pointer;
`;

const RoundedImageWithArrows = ({ item, photo }) => {
  const { handleBack, handleNext, actuallyPhoto, counterPhoto, photos } = usePhoto(item, photo);

  return (
    <ContainerArrowsImage>
      <IconPrevious onClick={handleBack} />
      <ContainerImage>
        <a href={actuallyPhoto}>
          <img src={actuallyPhoto || noPhoto} alt="dog" />
          <span>
            {counterPhoto + 1}/{photos?.length}
          </span>
        </a>
      </ContainerImage>
      <IconNext onClick={handleNext} />
    </ContainerArrowsImage>
  );
};

export default RoundedImageWithArrows;
