const getComments = ( page, perPage ) => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;
    const url = `${apiUrl}?_start=${startIndex}&_end=${endIndex}`;

    return fetch( url ).then( response => response.json() );
};

export default getComments;