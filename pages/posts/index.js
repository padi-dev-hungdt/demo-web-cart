import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Product from '../../components/product/Product';
import { useContext } from 'react';
import { themeContext } from '../_app';
export default function Posts({ posts }) {
  const theme = useContext(themeContext);
  const handelAddtoCart = (id, title, price, url) => {
    const newList = {
      title,
      price,
      url,
      quatity: 1,
    };
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/carts', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newList),
    })
      .then(function (res) {
        theme.setIsLoad(!theme.isLoad);
      })
      .catch(function (res) {
        console.log(res);
      });
  };
  return (
    <Container className="my-[5rem]">
      <h1>List posts</h1>
      <div className="flex gap-[7rem] justify-center flex-wrap">
        {posts.map((item) => (
          <Product
            id={item.id}
            title={item.title}
            price={item.price}
            url={item.url}
            onAddToCart={handelAddtoCart}
          />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud');
  const data = await res.json();
  return {
    props: {
      posts: data,
    },
  };
}
