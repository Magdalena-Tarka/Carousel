import React, { /*useEffect,*/ useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './CarouselItem.module.scss';
//import axios from 'axios';

const CarouselItem = ({ className, id, main_image, images, name, description }) => {

  const [ isShown, setIsShown ] = useState(false);

  const random_image = images[Math.floor(Math.random() * images.length)];

  /*const base_url = 'http://integrations.yaxint.com';
  //const server_url = 'http://localhost:8080/';
  const endpoint = '/api/products';
  const token = '70876bc3a88f6644c53af702622edcd8';
  const url = `${base_url}${endpoint}?api_token=${token}`;
  //const url = `${server_url}${base_url}${endpoint}?api_token=${token}`;

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    //'origin': 'https://localhost:3000',
  };

  useEffect(() => {
    axios.get(url, {headers: headers})
      .then((response) => {
        console.log('response to:', response.data);
      }).catch(err=>console.log('error to:', err.message));
  }, []);*/

  return (
    <div
      className={clsx(className, styles.root)}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className={styles.slide_img}>
        <img alt='' src={main_image} />
      </div>
      {isShown ? (
        <div className={styles.hover_img}>
          <img src={random_image} alt='' />
        </div>
      ) : null}
      <div className={styles.slide_details_wrapper}>
        <div className={styles.slide_details}>
          <h4 className={styles.slide_name}>{name}</h4>
          <p className={styles.slide_desc}>{description.substr(0, 30)}...</p>
        </div>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  main_image: PropTypes.string,
  images: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string,
};

export default CarouselItem;
