import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { averageValue, displayTimeInHHMM } from '../../../helpers/statistics';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import { ContainerCard, ContainerDates, ContainerOneRow } from '../CardVisit/CardVisit';
import DotsDropdown from '../../molecules/DotsDropdown/DotsDropdown';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

const CardCustomer = ({ t, customer: { dogOwner, address, birthday, breed, contactName, dogName, phone, size, visits, _id }, noCustomerDetails }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/customers/${_id}/edit`);
  };
  const handleAddVisit = () => {
    navigate(`/customers/${_id}/addVisit`);
  };
  const handleDetailsCustomer = () => {
    navigate(`/customers/${_id}`);
  };
  // const arrTexts = [
  //   t('customers.avgTime'),
  //   displayTimeInHHMM(item.visits),
  //   t('customers.avgPrice'),
  //   averageValue(item.visits, 'price'),
  //   t('customers.contact'),
  //   item.phone,
  // ];
  // const arrValues = [item.visits, item.contactName, t('button.details'), '100%', handleEdit];

  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const ref = useRef();
  useOnClickOutside(ref, () => setIsDropdownOpen(false));
  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const dataCustomer = [
    {
      title: t('formData.dogOwner'),
      value: dogOwner,
    },
    {
      title: t('formData.phone'),
      value: phone,
    },
    {
      title: t('formData.dogName'),
      value: dogName,
    },
    {
      title: t('formData.address'),
      value: address,
    },
    {
      title: t('formData.birthday'),
      value: birthday,
    },
    {
      title: t('formData.breed'),
      value: breed?.label,
    },
    {
      title: t('formData.size'),
      value: size?.label,
    },
    {
      title: t('navigation.visits'),
      value: visits?.length,
    },
    {
      title: t('lastVisit'),
      value: visits && visits[visits.length - 1]?.visit,
    },
    {
      title: t('formVisit.time'),
      value: visits && visits[visits.length - 1]?.time,
    },
  ];

  return (
    <ContainerCard>
      <RoundedImageWithArrows item={visits} />
      <h4>{contactName}</h4>
      <ContainerDates>
        {dataCustomer.map((item, i) => {
          if (!item.value) return;
          return (
            <ContainerOneRow key={i}>
              <p>{item.title}</p>
              <p>{item.value}</p>
            </ContainerOneRow>
          );
        })}
      </ContainerDates>
      <div ref={ref}>
        <DotsDropdown handleDropdown={handleDropdown} isDropdownOpen={isDropdownOpen}>
          {noCustomerDetails ? null : <li onClick={handleDetailsCustomer}>{t('button.details')}</li>}
          <li onClick={handleEdit}>{t('button.edit')}</li>
          <li onClick={handleAddVisit}>{t('button.addVisit')}</li>
        </DotsDropdown>
      </div>
    </ContainerCard>
  );
};

export default CardCustomer;
