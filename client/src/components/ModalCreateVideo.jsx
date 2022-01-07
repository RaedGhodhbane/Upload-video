import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/actions/alert";
import { AddVideos } from "../redux/actions/videos";

function ModalCreateVideo(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [videos, setvideos] = useState([]);
  const { name, description } = formData;

  const handelChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (videos.length < 1) {
      return alert("pleae select videos");
    }
    let newFormData = new FormData();
    for (let key in videos) {
      newFormData.append("videos", videos[key]);
    }
    newFormData.append("name", name);
    newFormData.append("description", description);

    dispatch(AddVideos(newFormData));
    props.setCallback(!props.callback);
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add New Video
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>new video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Name Video</Form.Label>
              <Form.Control
                id="name"
                type="password"
                placeholder="enter name..."
                autoComplete="off"
                value={name}
                onChange={handelChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description Video</Form.Label>
              <Form.Control
                type="text"
                id="description"
                placeholder="enter desc..."
                autoComplete="off"
                value={description}
                onChange={handelChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                id="files"
                type="file"
                placeholder="file"
                autoComplete="off"
                multiple
                accept=".mp4, .mkv"
                onChange={(e) => setvideos(e.target.files)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handelSubmit(e);
              handleClose();
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateVideo;
