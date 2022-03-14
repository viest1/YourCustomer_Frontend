import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import styled from 'styled-components';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import DotsDropdown from '../../molecules/DotsDropdown/DotsDropdown';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
// import { MdOutlineEditNote } from 'react-icons/md';

export const ContainerCard = styled.div`
  padding: 1rem;
  background: ${({ themeType }) => themeType.layout};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  box-shadow: 2px 2px 3px black;
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
  //h4:hover {
  //  cursor: pointer;
  //}
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

export const ContainerIcons = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  * {
    color: ${({ themeType }) => (themeType.layout === 'white' ? 'black' : 'white')};
  }
`;

const CardVisit = React.forwardRef(
  (
    {
      visit: { time, customer, _id, photo, price, extraPay, premium, behavior, visit, comments, hour, service, shop, tip },
      t,
      customerName,
      noCustomerDetails,
      visitDetails,
    },
    refLast
  ) => {
    const navigate = useNavigate();
    const handleDetailsVisit = () => {
      navigate(`/visits/${_id}`);
    };
    const handleEditVisit = () => {
      navigate(`/visits/${_id}/edit`);
    };
    const handleDetailsCustomer = () => {
      navigate(`/customers/${customer._id || customer}`);
    };
    const handleAddVisit = () => {
      navigate(`/customers/${customer._id || customer}/addVisit`);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState();
    const { themeType } = useContext(ListCustomersTestContext);
    const ref = useRef();
    useOnClickOutside(ref, () => setIsDropdownOpen(false));

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
          onClick: handleDetailsVisit,
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
          title: t('formVisit.shop'),
          value: shop.length ? shop?.map((item) => ' ' + item.label + ',') : 'No',
        },
      ];
    } else {
      const weekday = new Date(visit).toLocaleString('default', { weekday: 'long' });
      data = [
        {
          title: t('visit.visit'),
          value: visit,
          onClick: handleDetailsVisit,
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
      <ContainerCard themeType={themeType} ref={refLast}>
        <RoundedImageWithArrows item={visit} photo={photo || ''} />
        <h4 onClick={handleDetailsCustomer}>{customer?.contactName || customerName}</h4>
        {/*<ContainerIcons themeType={themeType}>*/}
        {/*  <MdOutlineEditNote fontSize={26} />*/}
        {/*</ContainerIcons>*/}
        <ContainerDates>
          {data.map((item, i) => (
            <ContainerOneRow key={i} themeType={themeType}>
              <p>{item.title}</p>
              <p onClick={item.onClick}>{item.value}</p>
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
                {noCustomerDetails ? <li onClick={handleEditVisit}>Edit Visit</li> : null}
                <li onClick={handleAddVisit}>Add Visit</li>
              </>
            )}
          </DotsDropdown>
        </div>
      </ContainerCard>
    );
  }
);

export default CardVisit;
