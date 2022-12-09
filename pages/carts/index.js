import Table from 'react-bootstrap/Table';
import React from 'react';
import { useState, useEffect } from 'react';
import ViewCart from '../../components/viewCart/ViewCart';
import { useContext } from 'react';
import { themeContext } from '../_app';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Carts() {
  // contex
  const theme = useContext(themeContext);

  //modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  const [carts, setCarts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [fakeId, setFakeId] = useState(null);
  useEffect(() => {
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/carts')
      .then((res) => res.json())
      .then((data) => setCarts(data));
  }, [theme.isLoad]);

  //delete
  const handelDown = (id, e) => {
    const fakeCarts = [...carts];
    const checkId = fakeCarts.find((c) => c.id == id);
    setFakeId(checkId.id);

    if (checkId) {
      if (checkId.quatity > 1) {
        const fakeQuantity = (checkId.quatity -= 1);
        fetch(`https://63904e5065ff4183110f18f6.mockapi.io/carts/` + id, {
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
            quatity: fakeQuantity,
          }),
        })
          .then((res) => {
            res.json().then((res) => {
              theme.setIsLoad(!theme.isLoad);
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setShow(true);
      }
    }
  };

  //

  const handelUp = (id) => {
    const fakeCarts = [...carts];

    const checkId = fakeCarts.find((c) => c.id == id);

    if (checkId) {
      const fakeQuantity = (checkId.quatity += 1);
      fetch(`https://63904e5065ff4183110f18f6.mockapi.io/carts/` + id, {
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
          quatity: fakeQuantity,
        }),
      })
        .then((res) => {
          res.json().then((res) => {
            theme.setIsLoad(!theme.isLoad);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  //delete cart
  const handleRemoveCart = () => {
    fetch('https://63904e5065ff4183110f18f6.mockapi.io/carts/' + fakeId, {
      method: 'DELETE',
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        theme.setIsLoad(!theme.isLoad);
        setShow(false);
      });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      {show ? (
        <div
          className="modal show ml-12 mt-[7rem] bg-white "
          style={{ display: 'block', position: 'initial', width: '80%' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={handleClose}></Modal.Header>

            <Modal.Body className="text-center text-[20px] ">
              <p>You want to delete?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={handleRemoveCart} variant="danger">
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : (
        ''
      )}

      {carts.map((item) => (
        <ViewCart
          key={item.id}
          title={item.title}
          price={item.price}
          quantity={item.quatity}
          id={item.id}
          onDown={handelDown}
          onUp={handelUp}
        />
      ))}
    </Table>
  );
}
