import React from 'react';
import Crud from '../../components/crud/Crud';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useState, useEffect } from 'react';

export default function index() {
  const [products, setProduct] = useState([]);
  const [title, setTitle] = useState('');
  const [isProduct, setIsProduct] = useState(true);
  const [block, setBlock] = useState(false);
  const [fakeId, setFakeId] = useState(null);

  // call api
  useEffect(() => {
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud')
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [isProduct]);

  // add
  const handelAddProducts = () => {
    const newList = {
      id: Math.floor(Math.random() * 20),
      title,
    };

    fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newList),
    })
      .then(function (res) {
        setIsProduct(!isProduct);
      })
      .catch(function (res) {
        console.log(res);
      });
    setTitle('');
  };

  // Delete
  const handelRemoveProduct = (id) => {
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/crud/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => setIsProduct(!isProduct));
  };

  //edit

  const handelEditProduct = (id) => {
    const fakeList = [...products];
    const index = fakeList.findIndex((c) => c.id == id);
    setTitle(fakeList[index].title);
    setFakeId(index.id);
    setBlock(true);
  };

  //update
  const handelUpdateProduct = () => {
    const fakeList = [...products];
    const update = fakeList.find((c) => c.id == fakeList);
    console.log(update);

    fetch(`https://634015dae44b83bc73c898c3.mockapi.io/api/v1/card/` + fakeId, {
      method: 'PUT',
      crossDomain: true,
      xhrFields: {
        withCredentials: true,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((res) => {
        res.json().then((res) => {
          setIsProduct(!isProduct);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container>
      <h3>CRUD PRODUCTS</h3>
      <div className="mb-2 flex gap-[2rem]">
        <div className="">
          <input
            className="outline-none border border-solid px-[1rem] py-[0.3rem]"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title *"
          />
        </div>
        <div>
          <input
            className="outline-none border border-solid px-[1rem] py-[0.3rem]"
            type="text"
            id="title"
            placeholder="title *"
          />
        </div>
      </div>
      <Button onClick={handelAddProducts} variant="warning mb-2 mr-2">
        Add
      </Button>
      {block ? (
        <Button onClick={handelUpdateProduct} variant="success  mb-2 mr-2">
          Save
        </Button>
      ) : (
        ''
      )}
      <div className="flex gap-[5rem] flex-wrap flex-col items-center md:flex-row lg:flex-row xl:flex-row">
        {products.map((item) => (
          <Crud
            key={item.id}
            url={item.url}
            title={item.title}
            id={item.id}
            onRemove={handelRemoveProduct}
            onEdit={handelEditProduct}
          />
        ))}
      </div>
    </Container>
  );
}
