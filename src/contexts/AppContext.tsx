import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { Order } from '../types/Order';
import { Screen } from '../types/Screen';
import { getPhotos, searchPhotos } from '../api/unsplash-api';
import { Photo } from '../types/Photo';
import { SearchType } from '../types/SearchType';
import { AxiosResponse } from 'axios';
import { UserData } from '../types/UserData';

interface AppContextType {
  columns: number;
  setColumns: (columns: number) => void;
  photosPerPage: number;
  setPhotosPerPage: (photosPerPage: number) => void;
  sortOrder: Order;
  setSortOrder: (sortOrder: Order) => void;
  page: number;
  setPage: (page: number) => void;
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
  totalPhotos: number;
  totalPages: number;
  selectedPhoto: Photo | null;
  setSelectedPhoto: (selectedPhoto: Photo) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  favoritePhotos: Photo[];
  setFavoritePhotos: (favoritePhotos: Photo[]) => void;
}

export const AppContext = createContext<AppContextType>({
  columns: 3,
  setColumns: () => {},
  photosPerPage: 12,
  setPhotosPerPage: () => {},
  sortOrder: Order.LATEST,
  setSortOrder: () => {},
  page: 1,
  setPage: () => {},
  photos: [],
  setPhotos: () => {},
  totalPhotos: 0,
  totalPages: 0,
  selectedPhoto: null,
  setSelectedPhoto: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  screen: Screen.DESKTOP,
  setScreen: () => {},
  user: null,
  setUser: () => {},
  favoritePhotos: [],
  setFavoritePhotos: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [columns, setColumns] = useState(3);
  const [photosPerPage, setPhotosPerPage] = useState(48);
  const [sortOrder, setSortOrder] = useState<Order>(Order.LATEST);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [screen, setScreen] = useState<Screen>(Screen.DESKTOP);
  const [user, setUser] = useState<UserData | null>(null);
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadingPhotos = async () => {
      try {
        let response: AxiosResponse<Photo[] | SearchType>;
        
        if (searchQuery.trim() !== '') {
          response = await searchPhotos(searchQuery, page, photosPerPage, sortOrder);
        } else {
          response = await getPhotos(page, photosPerPage, sortOrder);
        }

        if ('results' in response.data) {
          const searchResult: SearchType = response.data;
          const photosFromServer: Photo[] = searchResult.results;
          const total: number = searchResult.total;
          const totalPages: number = searchResult.total_pages;
          
          setPhotos(photosFromServer);
          setTotalPhotos(total);
          setTotalPages(totalPages);
        } else {
          const photosFromServer: Photo[] = response.data;
          const total: number = photosFromServer.length;
          const totalPages: number = Math.ceil(total / photosPerPage);
          
          setPhotos(photosFromServer);
          setTotalPhotos(total);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadingPhotos();
  }, [page, photosPerPage, sortOrder, searchQuery]);

  
  useEffect(() => {
    const updateColumnsBasedOnScreenWidth = () => {
      if (window.innerWidth <= 500) {
        setColumns(1); 
        setScreen(Screen.MOBILE);
      } else if (window.innerWidth <= 768) {
        setColumns(2); 
        setScreen(Screen.TABLET);
      } else {
        setColumns(3); 
        setScreen(Screen.DESKTOP);
      }
    };

    updateColumnsBasedOnScreenWidth();

    window.addEventListener('resize', updateColumnsBasedOnScreenWidth);

    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenWidth);
    };
  }, []);

  const appContextValue: AppContextType = {
    columns,
    setColumns,
    photosPerPage,
    setPhotosPerPage,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    photos,
    setPhotos,
    totalPhotos,
    totalPages,
    selectedPhoto,
    setSelectedPhoto,
    searchQuery,
    setSearchQuery,
    screen,
    setScreen,
    user,
    setUser,
    favoritePhotos,
    setFavoritePhotos,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
