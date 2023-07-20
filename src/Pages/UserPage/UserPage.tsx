import { GallaryStrip } from "../../components/GalleryStrip";
import { useAppContext } from "../../contexts/AppContext";
import './UserPage.scss';

export const UserPage = () => {
  const { user, favoritePhotos } = useAppContext();
  return (
    <>
      <h1 className="user-page__title">Welcome, {user?.name}</h1>

      {favoritePhotos.length > 0 ? (
        <GallaryStrip photos={favoritePhotos} />
      ) : (
        <h1 className="user-page__title">You can add your favorite photos</h1>
      ) }
    </>
  )
}