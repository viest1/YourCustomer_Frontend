import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';

const CardVisit = ({ visit: { time, customer, _id, photo, price, extra, visit }, t }) => {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/visits/${_id}`);
  };
  const arrTexts = [t('visit.time'), time, t('visit.price'), price?.label, t('visit.visit'), visit];
  const arrValues = [photo, customer?.contactName, t('button.details'), '100%', handleDetails];

  return (
    <UniversalCardImgPlusDetails arrValues={arrValues} photo={photo || ''}>
      <Container3ElemInCol arrTexts={arrTexts} />
    </UniversalCardImgPlusDetails>
  );
};

export default CardVisit;
