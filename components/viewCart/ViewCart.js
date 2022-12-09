import React from 'react';

export default function ViewCart(props) {
  const handelDown = () => {
    props.onDown(props.id);
  };
  const handelUp = () => {
    props.onUp(props.id);
  };
  return (
    <tbody>
      <tr>
        <td>{props.title}</td>
        <td>${props.price}</td>
        <td>
          <div className="flex justify-between px-2 border border-solid w-[4rem] h-[2rem]">
            <button type="button" onClick={handelDown}>
              -
            </button>
            <div>
              <input
                className="text-center w-2 outline-none"
                type="text"
                value={props.quantity}
                size="1"
              />
            </div>
            <button type="button" onClick={handelUp}>
              +
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
