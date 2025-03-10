import React, {ReactNode} from 'react';
import {
  BookItemType,
  BookBannerItemType,
  BooksAppState,
  StoreProviderContext,
} from './Context';

export const StoreProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [books, setBooks] = React.useState<Array<BookItemType>>([]);
  const [top_banner_slides, setTopBannerSlides] = React.useState<
    Array<BookBannerItemType>
  >([]);
  const [you_will_like_section, setYouWillLikeSection] = React.useState<
    Array<number>
  >([]);

  const onSetData = (data: BooksAppState) => {
    setBooks(data.books);
    setTopBannerSlides(data.top_banner_slides);
    setYouWillLikeSection(data.you_will_like_section);
  };

  return (
    <StoreProviderContext.Provider
      value={{books, top_banner_slides, you_will_like_section, onSetData}}>
      {children}
    </StoreProviderContext.Provider>
  );
};
