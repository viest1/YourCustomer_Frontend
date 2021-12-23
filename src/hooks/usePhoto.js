import { useEffect, useState } from 'react';

export const usePhoto = (arr, photo) => {
  const [photos, setPhotos] = useState([]);
  const [counterPhoto, setCounterPhoto] = useState(null);
  const [actuallyPhoto, setActuallyPhoto] = useState('');

  const findPhotos = () => {
    if(photo?.length || photo === ''){
      if (photo?.length) {
        setPhotos([...photos, photo]);
      }
    } else {
      const arrayWithPhotos = arr?.filter((item) => item.photo).map((item) => item.photo);
      setPhotos(arrayWithPhotos);
    }

  };

  const handleBack = () => {
    if (counterPhoto > 0) {
      setCounterPhoto((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (counterPhoto < photos.length - 1) {
      setCounterPhoto((prev) => prev + 1);
    }
  };

  useEffect(() => {
    findPhotos();
  }, []);

  useEffect(() => {
    setCounterPhoto(photos.length - 1);
  }, [photos]);

  useEffect(() => {
    setActuallyPhoto(photos[counterPhoto]);
  }, [counterPhoto]);

  return {
    handleNext,
    handleBack,
    actuallyPhoto,
    photos,
    counterPhoto,
  };
};
