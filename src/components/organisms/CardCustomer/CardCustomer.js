import React from 'react';
import { useNavigate } from 'react-router-dom';
import { averageValue, displayTimeInHHMM } from '../../../helpers/statistics';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';

const CardCustomer = ({ item }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/customers/${item._id}`);
  };
  const arrTexts = ['Avg. Time:', displayTimeInHHMM(item.visits), 'Avg. Price:', averageValue(item.visits, 'price'), 'Contact:', item.phone];
  const arrValues = [item.visits, item.contactName, 'Details', '100%', handleEdit];
  return (
    <UniversalCardImgPlusDetails arrValues={arrValues}>
      <Container3ElemInCol item={item} arrTexts={arrTexts} />
    </UniversalCardImgPlusDetails>
  );
};

export default CardCustomer;
