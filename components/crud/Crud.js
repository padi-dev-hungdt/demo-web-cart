import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Crud(props) {
  const handelRemoveProduct = () => {
    props.onRemove(props.id);
  };
  const handelEditProduct = () => {
    props.onEdit(props.id);
  };
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.url} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>{props.title}</Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-2">
        <Button onClick={handelRemoveProduct} className="mr-2" variant="danger">
          Delete
        </Button>
        <Button onClick={handelEditProduct} variant="info">
          Edit
        </Button>
      </div>
    </div>
  );
}
