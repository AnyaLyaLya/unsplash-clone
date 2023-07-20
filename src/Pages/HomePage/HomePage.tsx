import { Bunner } from "../../components/Bunner";
import { GallaryStrip } from "../../components/GalleryStrip";
import { PaginationBar } from "../../components/Pagination";
import { PhotoGalleryOptions } from "../../components/PhotoGalleryOptions";
import { useAppContext } from "../../contexts/AppContext";

export const HomePage = () => {
  const { photos } = useAppContext();
  return (
    <>
      <Bunner />
      
      <PhotoGalleryOptions />

      <GallaryStrip photos={photos}  />

      <PaginationBar />
    </>
  );
}