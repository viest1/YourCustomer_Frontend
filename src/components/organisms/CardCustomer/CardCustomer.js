import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import { ContainerCard, ContainerComment, ContainerDates, ContainerOneRow } from '../CardVisit/CardVisit';
import DotsDropdown from '../../molecules/DotsDropdown/DotsDropdown';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

const CardCustomer = React.forwardRef(
  (
    { t, customer: { dogOwner, address, birthday, breed, contactName, dogName, phone, size, visits, _id, generalComment }, noCustomerDetails },
    refLast
  ) => {
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
    const lastVisitId = visits && visits[visits.length - 1]._id;
    const handleDetailsVisit = () => {
      navigate(`/visits/${lastVisitId}`);
    };

    const { themeType } = useContext(ListCustomersTestContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState();
    const ref = useRef();
    useOnClickOutside(ref, () => setIsDropdownOpen(false));
    const handleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };
    let shopList = [];
    const shop = visits?.map((item) => item.shop);
    for (let i = 0; i < shop?.length; i++) {
      if (shop[i].length > 0) {
        shopList.push(shop[i].map((item) => item.label));
      }
    }
    shopList = [...shopList].join(', ');
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
        onClick: handleDetailsVisit,
      },
      {
        title: t('formVisit.time'),
        value: visits && visits[visits.length - 1]?.time,
      },
      {
        title: t('formVisit.shop'),
        value: visits && shopList && shopList,
      },
    ];

    return (
      <ContainerCard themeType={themeType} ref={refLast}>
        <RoundedImageWithArrows item={visits} />
        <h4 onClick={handleDetailsCustomer}>{contactName}</h4>
        <ContainerDates>
          {dataCustomer.map((item, i) => {
            if (!item.value) return null;
            return (
              <ContainerOneRow key={i} themeType={themeType}>
                <p>{item.title}</p>
                <p onClick={item.onClick}>{item.value}</p>
              </ContainerOneRow>
            );
          })}
        </ContainerDates>
        {generalComment && (
          <ContainerComment>
            <p>{generalComment}</p>
          </ContainerComment>
        )}
        <div ref={ref}>
          <DotsDropdown handleDropdown={handleDropdown} isDropdownOpen={isDropdownOpen}>
            {noCustomerDetails ? null : <li onClick={handleDetailsCustomer}>{t('button.details')}</li>}
            <li onClick={handleEdit}>{t('button.edit')}</li>
            <li onClick={handleAddVisit}>{t('button.addVisit')}</li>
          </DotsDropdown>
        </div>
      </ContainerCard>
    );
  }
);

export default CardCustomer;
