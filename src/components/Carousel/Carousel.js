import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.module.scss';
import CarouselItem from '../CarouselItem/CarouselItem';
import clsx from 'clsx';
import db from '../../data/dataStore.json';

const Carousel = () => {
  const items = db.data;
  items.length = 20;

  const [ count, setCount ] = useState(0);
  const [ activeItem, setActiveItem ] = useState(items[count]);
  const [ activePage, setActivePage ] = useState(0);

  const pagesCount = Math.ceil(items.length / 4);

  useEffect(() => {
    const next = (count + 1) % items.length;

    const id = setTimeout(() => {
      setCount(next);
      setActiveItem(items[next]);
    }, 5000);

    if(0 === count && count <= 3) setActivePage(0);
    if(4 <= count && count <= 7) setActivePage(1);
    if(8 <= count && count <= 11) setActivePage(2);
    if(12 <= count && count <= 15) setActivePage(3);
    if(16 <= count && count <= 19) setActivePage(4);

    return () => clearTimeout(id);
  }, [count, items]);

  const handlePageChange = (newPage) => {
    setTimeout(() => {
      setActivePage(newPage);
    }, 500);
  };

  const movePageRight = (newPage) => {
    if(activePage < pagesCount - 1) {
      handlePageChange(newPage);
    }
  };

  const movePageLeft = (newPage) => {
    if(activePage > 0 && activePage < pagesCount) {
      handlePageChange(newPage);
    }
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Produkty</h2>

      <div className={styles.active_slide}>
        <div className={styles.slide_img}>
          <img src={activeItem.main_image} alt='' />
        </div>
        <div className={styles.slide_details_wrapper}>
          <div className={styles.slide_details}>
            <h4 className={styles.slide_name}>{activeItem.name}</h4>
            <p className={styles.slide_desc}>{activeItem.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.slider_wrapper}>
        <button
          className={clsx('btn', styles.btn_left)}
          onClick={() => movePageLeft(activePage - 1)}
        >&#60;</button>
        <div className={styles.slider}>
          {items
            .map((item, index) => (
              <CarouselItem
                key={item.id}
                className={clsx(index === count ? 'active' : '', styles.slide)}
                {...item}/>
            ))
            .slice(activePage * 4, (activePage + 1) * 4)
          }
        </div>
        <button
          className={clsx('btn', styles.btn_right)}
          onClick={() => movePageRight(activePage + 1)}
        >&#62;</button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  className: PropTypes.string,
};

export default Carousel;
