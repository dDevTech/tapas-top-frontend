import { Button, Col, Row, UncontrolledCarousel, Alert } from 'reactstrap';
import { Avatar, Descriptions, Divider, Table, Tabs, Timeline, Empty, Card, Image, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/config/store';

export const Carrousel = () => {
  const favorites = useAppSelector(state => state.userInfo.favorites);
  const [imgList, setImageList] = useState([]);

  useEffect(() => {
    const containerWidth = document.getElementById('home-carousel')?.clientWidth;
    document.getElementById('home-carousel').style.height = containerWidth / 2 + 'px';
  }, [document.getElementById('home-carousel')?.clientWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const containerWidth = document.getElementById('home-carousel')?.clientWidth;
    document.getElementById('home-carousel').style.height = containerWidth / 2 + 'px';
  };

  useEffect(() => {
    if (favorites.length) {
      imgList.length = 0;
      favorites.forEach(tapa => {
        if (tapa.imageUrl)
          imgList.push({
            altText: tapa.name,
            caption: tapa.name,
            key: tapa.id,
            src: tapa.imageUrl,
          });
      });
      setImageList(imgList);
    } else
      setImageList([
        {
          altText: 'Mary Montaña ',
          caption: 'Rabo de toro glaseado con risotto marinero',
          key: 1,
          src: 'https://elperroylagalleta.com/wp-content/uploads/2016/08/MAR-Y-MONTAN%CC%83A.jpg',
        },
        {
          altText: ' Hamburguesa de vaca',
          caption: 'Hamburguesa de vaca madurada, mozarella y mahonesa de trufa',
          key: 2,
          src: 'https://2.bp.blogspot.com/-mO24agnTv0c/WCzDGk83vnI/AAAAAAAAWoA/k3JMPz3VyIwQuFnMLA-5W2G6h_abawhDQCPcB/s1600/Hamburguesa-setas-Persucarhipa.JPG',
        },
        {
          altText: 'Presa ibérica',
          caption: 'Presa ibérica con parmentier de coliflor',
          key: 3,
          src: 'https://www.recetassinlactosa.com/wp-content/uploads/2018/03/Presa-ib%C3%A9rica-con-parmentier-y-setas-1.jpg',
        },
      ]);
  }, [favorites]);
  return (
    <Row className="width-100">
      <UncontrolledCarousel id="home-carousel" className="width-100 overflow-auto" items={imgList} />
    </Row>
  );
};

export default Carrousel;
