import React from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

export default function detail({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Spinner animation="border" />;
  }
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={post.url} />
        <Card.Body>
          <Card.Text>{post.title}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud');
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: {
        id: `${post.id}`,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(
    `https://63904e5065ff4183110f18f6.mockapi.io/crud/${params.id}`,
  );
  const data = await res.json();

  return {
    props: {
      post: data,
    },
  };
}
