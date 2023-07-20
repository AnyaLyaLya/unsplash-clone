import { useEffect, useState } from 'react';
import './photoPage.scss';
import { Link, useLocation } from 'react-router-dom';
import { Photo } from '../../types/Photo';
import { getPhoto } from '../../api/unsplash-api';
import { useAppContext } from '../../contexts/AppContext';

export const PhotoPage = () => {
  const { pathname } = useLocation();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { setSearchQuery } = useAppContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadPhoto = async () => {
    try {
      const photoFromServer = await getPhoto(pathname);

      setSelectedPhoto(photoFromServer.data);
    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    loadPhoto();
  }, [loadPhoto, pathname]);
  
  return (

    <div className='photo'>
      <div className="container-photo">
        <div className="user">
          <div>
            <a 
              href={selectedPhoto?.user.links.html}
              className="user__link"
            >
              <div className="container-photo__user">
                <img 
                  src={selectedPhoto?.user.profile_image.small}
                  alt="Profile avatar"
                  className="user__photo"
                />

                <div className="user__info">
                  <h2 className="user__name">
                    {selectedPhoto?.user.name}
                  </h2>

                  <h3 className="user__username">
                    {selectedPhoto?.user.username}
                  </h3>
                </div>
              </div>
            </a>
          </div>

          <div className="button">
            <a
              className="button__link"
              href={selectedPhoto?.links.html}
            >
              Dowload free
            </a>
          </div>
        </div>

        <div className="container-photo__img">
          <img
            src={selectedPhoto?.urls.regular}
            alt={selectedPhoto?.alt_description}
            className="img"
          />
        </div>

        <div className="bottom__info">
          <div className="bottom__info_stats">
            {selectedPhoto?.views && (
              <div className="bottom__views">
                <h2 className="bottom__title">
                  Views
                </h2>

                <h3 className="bottom__number">
                  {selectedPhoto?.views}
                </h3>
              </div>
            )}
            
            
            {selectedPhoto?.downloads && (
              <div className="bottom__info_download">
                <h2 className="bottom__title">
                  Dowloads
                </h2>

                <h3 className="bottom__number">
                  {selectedPhoto?.downloads}
                </h3>
              </div>
            )}
            
            <div>
              {selectedPhoto?.user.location && (
                <div>
                  <h2 className="bottom__title">
                    Location
                  </h2>
      
                  <h3 className="bottom__number">
                    {selectedPhoto?.user.location}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='tags'>
          {selectedPhoto?.tags.map(tag => (
            <Link
              key={tag.title}
              to={`/`}
              onClick={() => setSearchQuery(tag.title)}
              className='tags__link'
            >
              {tag.title}
            </Link>
          ))}
        </div>
      </div> 
    </div>
  );
};