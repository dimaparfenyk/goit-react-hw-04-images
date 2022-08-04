import axios from 'axios';

async function SearchApi(name, page = 1) {
  const API_KEY = '27652237-fecf1e648e251b2f1d2bb2568';
  const URL = 'https://pixabay.com/api/';

  const res = await axios.get(
    `${URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (res.status===200 && res.data.totalHits !== 0) {
     return res.data;
  }
 return Promise.reject(new Error(`Sorry, there are no images matching ${name} search query. Please try again!`));
};

export default SearchApi;



