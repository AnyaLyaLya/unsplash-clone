import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { Masonry } from '@mui/lab';
import './galleryStrip.scss';
import { Photo } from '../../types/Photo';
import { Screen } from '../../types/Screen';
import { FC } from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { button } from '../../themes/button';

interface Props {
  photos: Photo[];
}

export const GallaryStrip: FC<Props> = ({ photos }) => {
  const {
    columns,
    setSelectedPhoto,
    screen,
    favoritePhotos,
    setFavoritePhotos,
  } = useAppContext();

  const navigate = useNavigate();

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    navigate(`/${photo.id}`);
  };

  const handleAddToFavorites = (photo: Photo) => {
    let updatedFavorites: Photo[];
  
    if (!favoritePhotos.some(item => item.id === photo.id)) {
      updatedFavorites = favoritePhotos.filter(item => item.id !== photo.id);
      updatedFavorites.push(photo);
    } else {
      updatedFavorites = favoritePhotos.filter(item => item.id !== photo.id);
    }
    setFavoritePhotos(updatedFavorites);
  };
  

  const spacing = screen === Screen.MOBILE ? 1 : (screen === Screen.TABLET ? 1.5 : 2);

  return (
    <div className={`gallery-strip`}>
      <Masonry columns={columns} spacing={spacing}>
        {photos.map(photo => (
          <div key={photo.id} className="gallery-strip__photo">
            <button
              type="button"
              onClick={() => handlePhotoClick(photo)}
              className='gallery-strip__button'
            >
              <img
                className="gallery-strip__img"
                src={photo.urls.small}
                alt={photo.alt_description}
              />
            </button>

            <ThemeProvider theme={button}>
              <Button 
                className={`gallery-strip__favorite-button ${favoritePhotos.includes(photo) ? 'active' : ''}`} 
                variant="outlined" 
                onClick={() => handleAddToFavorites(photo)}
              >
                {favoritePhotos.includes(photo) ? '-' : '+'}
              </Button>
            </ThemeProvider>
          </div>
        ))}
      </Masonry>
    </div>
  );
};
