import React, { useEffect, useState } from 'react';
import { apiURL, holidazeVenues } from '../../../../../utils/constants';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import useApi from '../../../../../hooks/useApi';
import { MdAdd } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

const EditMedia = ({ register, errors }) => {
  const [mediaInputs, setMediaInputs] = useState([]);

  const { id } = useParams();

  const addMediaInput = () => {
    setMediaInputs((prevInputs) => [
      ...prevInputs,
      <div className="d-flex align-items-center mb-2" key={`media-input-${prevInputs.length}`}>
        <Form.Control
          as="textarea"
          rows={1}
          name={`media[${prevInputs.length}]`}
          {...register(`media[${prevInputs.length}]`)}
        />
        {prevInputs.length === 0 ? (
          <button className="addmedia-btn" onClick={addMediaInput}>
            <MdAdd className="addmedia-icon" />
          </button>
        ) : (
          <button className="addmedia-btn" onClick={() => removeMediaInput(prevInputs.length)}>
            <RiDeleteBinLine className="addmedia-icon" />
          </button>
        )}
      </div>,
    ]);
  };

  const removeMediaInput = (index) => {
    setMediaInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const { dataValues } = useApi(`${apiURL}${holidazeVenues}/${id}`);

  useEffect(() => {
    if (dataValues && dataValues.media) {
      const inputs = dataValues.media.map((url, index) => (
        <div className="d-flex align-items-center mb-2" key={`media-input-${index}`}>
          <Form.Control
            as="textarea"
            rows={1}
            name={`media[${index}]`}
            {...register(`media[${index}]`)}
            defaultValue={url}
          />
          {index === 0 ? (
            <button className="addmedia-btn" onClick={addMediaInput}>
              <MdAdd className="addmedia-icon" />
            </button>
          ) : (
            <button className="addmedia-btn" onClick={() => removeMediaInput(index)}>
              <RiDeleteBinLine className="addmedia-icon" />
            </button>
          )}
        </div>
      ));
      setMediaInputs(inputs);
    } else {
      setMediaInputs([]);
    }
  }, [dataValues, register]);

  return (
    <>
      {mediaInputs}
      <span>{errors.media?.message}</span>
    </>
  );
};

export default EditMedia;
