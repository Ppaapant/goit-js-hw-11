
export const fetchQueriesbyPhoto = searchedEl => {
    const searchParams = new URLSearchParams({
      q: searchedEl,
      key: '48435162-5c42fbd719582c2a6b22bac81',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
  
    return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
  
      return response.json();
    });
  };