import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';

const CardVisit = ({ visit: { time, customer, _id, photo, price, extra, visit } }) => {
  const navigate = useNavigate()
  const handleDetails = () => {
    navigate(`/visits/${_id}`)
  }
  const arrTexts = ['Time:', time, 'Price:', price?.label, 'Visit', visit];
  const arrValues = [photo, customer?.contactName, 'Details', '100%', handleDetails];

  return (
    <UniversalCardImgPlusDetails arrValues={arrValues} photo={photo || ''}>
      {console.log(photo)}
      <Container3ElemInCol arrTexts={arrTexts}/>
    </UniversalCardImgPlusDetails>
  );
};

export default CardVisit;
