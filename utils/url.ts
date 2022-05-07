const local = 'http://localhost:8000/';
const live = 'https://naijawarehouse.herokuapp.com/'
const url = process.env.NEXT_PUBLIC_ENV === 'development' ? local : live;
export default url;