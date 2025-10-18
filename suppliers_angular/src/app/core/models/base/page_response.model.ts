export interface PageResponse<T> {
    content: T[];
    pageable: {
      offset: number;
      page_number: number;
      page_size: number;
      paged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    total_elements: number;
    total_pages: number;
    last: boolean;
    first: boolean;
    number_of_elements: number;
    size: number;
    number: number;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  }