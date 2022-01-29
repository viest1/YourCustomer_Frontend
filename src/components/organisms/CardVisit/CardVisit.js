import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import styled from 'styled-components';
// import Button from '../../atoms/Button/Button';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import DotsDropdown from '../../molecules/DotsDropdown/DotsDropdown';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerCard = styled.div`
  padding: 1rem;
  //background: #6201ed;
  //background: #29c0b1;
  //background: #222437;
  //background: #2c50ed;
  //background: white;
  background: ${({ themeType }) => themeType.layout};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  box-shadow: 2px 2px 3px black;
  //max-width:500px;
  > div:first-child {
    margin: 0 auto;
  }
  p {
    font-size: 12px;
    margin: 4px;
    color: ${({ themeType }) => (themeType.layout === 'white' ? 'black' : 'white')};
  }
  h2,
  h3,
  h4,
  h5,
  h6,
  span {
    color: ${({ themeType }) => (themeType.layout === 'white' ? 'black' : 'white')};
  }
`;

export const ContainerDates = styled.div`
  border-top: 1px dotted grey;
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`;

export const ContainerOneRow = styled.div`
  display: flex;
  justify-content: space-between;

  p:last-child {
    font-weight: bold;
  }

  p > span {
    color: ${({ themeType }) => (themeType.layout === '#29c0b1' ? 'black' : '#00b8ff')};
    font-size: 14px;
  }
`;

export const ContainerComment = styled.div`
  &:before {
    content: '';
    display: block;
    position: relative;
    width: 30%;
    border-top: 1px dotted grey;
  }
  text-align: left;
  font-weight: 700;
`;

const CardVisit = ({
  visit: { time, customer, _id, photo, price, extraPay, premium, behavior, visit, comments, hour, service, shop, tip },
  t,
  customerName,
  noCustomerDetails,
  visitDetails,
}) => {
  const navigate = useNavigate();
  const handleDetailsVisit = () => {
    navigate(`/visits/${_id}`);
  };
  const handleEditVisit = () => {
    navigate(`/visits/${_id}/edit`);
  };
  const handleDetailsCustomer = () => {
    navigate(`/customers/${customer._id}`);
  };
  const handleAddVisit = () => {
    navigate(`/customers/${customer._id}/addVisit`);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState();
  const { themeType } = useContext(ListCustomersTestContext);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsDropdownOpen(false));
  // const arrTexts = [t('visit.time'), time, t('visit.price'), price?.label, t('visit.visit'), visit];
  // const arrValues = [photo, customer?.contactName, t('button.details'), '100%', handleDetails];

  const premiumValue = premium.reduce((a, b) => {
    a += +b.value;
    return +a;
  }, 0);
  const extraPayValue = +extraPay?.value;
  const priceValue = +price?.value?.split(' ')[0];
  const sumPrice = premiumValue + extraPayValue + priceValue;

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  let data;
  if (!visitDetails) {
    data = [
      {
        title: t('visit.visit'),
        value: visit,
      },
      {
        title: t('visit.price'),
        value: (
          <>
            {price?.label} / <span>{sumPrice}</span>
          </>
        ),
      },
      {
        title: t('visit.time'),
        value: time,
      },
      {
        title: t('formVisit.premium'),
        value: premium?.map((item) => ' ' + item.label),
      },
      {
        title: t('formVisit.extraPay'),
        value: extraPay?.label,
      },
      {
        title: t('formVisit.behavior'),
        value: behavior?.label,
      },
    ];
  } else {
    const weekday = new Date(visit).toLocaleString('default', { weekday: 'long' });
    data = [
      {
        title: t('visit.visit'),
        value: visit,
      },
      {
        title: t('visit.price'),
        value: (
          <>
            {price?.label} / <span>{sumPrice}</span>
          </>
        ),
      },
      {
        title: t('visit.time'),
        value: time,
      },
      {
        title: t('formVisit.premium'),
        value: premium?.map((item) => ' ' + item.label),
      },
      {
        title: t('formVisit.extraPay'),
        value: extraPay?.label,
      },
      {
        title: t('formVisit.behavior'),
        value: behavior?.label,
      },
      {
        title: t('formVisit.hour'),
        value: hour,
      },
      {
        title: t('day'),
        value: weekday,
      },
      {
        title: t('formVisit.tip'),
        value: tip,
      },
      {
        title: t('service'),
        value: service.split(/(?=[A-Z])/).join(' '),
      },
      {
        title: t('formVisit.shop'),
        value: shop.length ? shop?.map((item) => ' ' + item.label) : 'No',
      },
      // {
      //   title: ,
      //   value: ,
      // },
      // {
      //   title: ,
      //   value: ,
      // },
      // {
      //   title: ,
      //   value: ,
      // },
    ];
  }

  return (
    <ContainerCard themeType={themeType}>
      <RoundedImageWithArrows item={visit} photo={photo || ''} />
      <h4>{customer?.contactName || customerName}</h4>
      <ContainerDates>
        {data.map((item, i) => (
          <ContainerOneRow key={i} themeType={themeType}>
            <p>{item.title}</p>
            <p>{item.value}</p>
          </ContainerOneRow>
        ))}
      </ContainerDates>
      {comments && (
        <ContainerComment>
          <p>{comments}</p>
        </ContainerComment>
      )}
      <div ref={ref}>
        <DotsDropdown handleDropdown={handleDropdown} isDropdownOpen={isDropdownOpen}>
          {visitDetails ? (
            <>
              <li onClick={handleEditVisit}>Edit Visit</li>
              <li onClick={handleDetailsCustomer}>Details Customer</li>
              <li onClick={handleAddVisit}>Add Visit</li>
            </>
          ) : (
            <>
              <li onClick={handleDetailsVisit}>Details Visit</li>
              {noCustomerDetails ? null : <li onClick={handleDetailsCustomer}>Details Customer</li>}
              <li onClick={handleAddVisit}>Add Visit</li>
            </>
          )}
        </DotsDropdown>
      </div>
    </ContainerCard>
  );
};

export default CardVisit;
