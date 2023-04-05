import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/config/store';

export const Carrousel = () => {
  const favorites = useAppSelector(state => state.tapas.favorites);
  const [imgList, setImageList] = useState([]);

  useEffect(() => {
    if (favorites.length) {
      favorites.forEach(tapa => {
        if (tapa.photo)
          imgList.push({
            altText: tapa.name,
            caption: tapa.name,
            key: tapa.id,
            src: tapa.photo,
          });
      });
      setImageList(imgList);
    } else
      setImageList([
        {
          altText: 'Slide 1',
          caption: 'Slide 1',
          key: 1,
          src: 'https://picsum.photos/id/123/1200/600',
        },
        {
          altText: 'Slide 2',
          caption: 'Slide 2',
          key: 2,
          src: 'https://picsum.photos/id/456/1200/600',
        },
        {
          altText: 'Slide 3',
          caption: 'Slide 3',
          key: 3,
          src: 'https://picsum.photos/id/678/1200/600',
        },
      ]);
  }, [favorites]);
  return (
    <Row className="width-100">
      <UncontrolledCarousel className="width-100" items={imgList} />
    </Row>
  );
};

export default Carrousel;
