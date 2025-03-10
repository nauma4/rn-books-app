import {createContext} from 'react';

export enum BookItemGenre {
  fantasy = 'Fantasy',
  romance = 'Romance',
  science = 'Science',
}

export interface BookItemType {
  id: number;
  name: string;
  author: string;
  summary: string;
  genre: BookItemGenre;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
}

export interface BookBannerItemType {
  id: number;
  book_id: number;
  cover: string;
}

export interface BooksAppState {
  books: BookItemType[];
  top_banner_slides: BookBannerItemType[];
  you_will_like_section: Array<number>;
}

export interface BookAppContext extends BooksAppState {
  onSetData: (data: BooksAppState) => void;
}

export const StoreProviderContext = createContext<BookAppContext>({
  books: [],
  top_banner_slides: [],
  you_will_like_section: [],
  onSetData: () => {}
});
