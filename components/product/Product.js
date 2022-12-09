import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Product = (props) => {
  const handelAddtoCart = () => {
    props.onAddToCart(props.id, props.title, props.price, props.url);
  };
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{props.title}</Card.Text>
          <Card.Text>${props.price}</Card.Text>
          <Button variant="primary">
            <Link href={'/posts/' + props.id} legacyBehavior>
              <a className="no-underline text-black ml-2 block">View more</a>
            </Link>
          </Button>
          <button onClick={handelAddtoCart} className="ml-8">
            Add to cart
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
