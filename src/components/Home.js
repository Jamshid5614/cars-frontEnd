import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import GlobalContext from "../context/GlobalContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Modal, Form, Input, Button } from "antd";
import { Table } from "react-bootstrap";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";
import "./Style/AntForm.css";

const { Meta } = Card;
const { TextArea } = Input;

export default function Home() {
  const history = useHistory();

  const { isAdmin, cars, shouldRender } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [car, setCar] = useState({
    model: "",
    brand: "",
    country: "",
    price: "",
    description: "",
  });
  const [carImage, setCarImage] = useState({});

  const showModal = (carItem) => {
    setIsModalVisible(true);
    setCar(carItem);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = (carItem) => {
    setIsModalVisible2(true);
    setCar(carItem);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
    submitHandler();
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const deleteCar = (car) => {
    axios
      .delete(`/cars/${car.id}`)
      .then((res) => {
        shouldRender(true);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    setCar({ ...car, [name]: value });
  };

  const imageHandler = (e) => {
    setCarImage(e.target.files[0]);
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("model", car.model);
    formData.append("brand", car.brand);
    formData.append("country", car.country);
    formData.append("price", car.price);
    formData.append("description", car.description);
    formData.append("image", carImage);
    formData.append("oldImg", car.img);

    axios
      .patch("/cars/" + car.id, formData)
      .then((res) => {
        shouldRender(true);
        history.push("/cars");
      })
      .catch((err) => console.error("Error: ", err));
  };

  if (isAdmin) {
    return (
      <>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <img src={car.img} className="w-100 mb-3" alt={car.model} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Model</th>
                <th>Brand</th>
                <th>country</th>
                <th>price</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{car.model}</td>
                <td>{car.brand}</td>
                <td>{car.country}</td>
                <td>{car.price}</td>
                <td>{car.description}</td>
              </tr>
            </tbody>
          </Table>
        </Modal>

        <Modal
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Model"
              rules={[
                {
                  required: true,
                  message: "Please input car model!",
                },
              ]}
            >
              <Input
                name="model"
                defaultValue={car.model}
                onChange={inputHandler}
              />
            </Form.Item>
            <Form.Item
              label="Brand"
              rules={[
                {
                  required: true,
                  message: "Please input car brand!",
                },
              ]}
            >
              <Input
                name="brand"
                defaultValue={car.brand}
                onChange={inputHandler}
              />
            </Form.Item>
            <Form.Item
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please input car country!",
                },
              ]}
            >
              <Input
                name="country"
                defaultValue={car.country}
                onChange={inputHandler}
              />
            </Form.Item>
            <Form.Item
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please input car price!",
                },
              ]}
            >
              <Input
                type="number"
                defaultValue={car.price}
                name="price"
                onChange={inputHandler}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input car description!",
                },
              ]}
            >
              <TextArea
                name="description"
                defaultValue={car.description}
                onChange={inputHandler}
              />
            </Form.Item>
            <Form.Item
              label="file"
              rules={[
                {
                  required: true,
                  message: "Please input car image!",
                },
              ]}
            >
              <input
                onChange={imageHandler}
                type="file"
                name="image"
                className="form-control"
              />
            </Form.Item>
          </Form>
        </Modal>

        <Header />
        {cars.length === 0 ? (
          <h1 className="mt-5 text-center">THERE IS NO ANY CARS</h1>
        ) : (
          <div className="row m-0 pt-3">
            {cars.map((car) => (
              <>
                <div className="col-sm-12 col-md-4">
                  <Card
                    cover={<img alt="example" src={car.img} />}
                    actions={[
                      <Button type="primary" onClick={() => showModal(car)}>
                        view
                      </Button>,
                      <Button type="primary" onClick={() => showModal2(car)}>
                        edit
                      </Button>,
                      <Button type="primary" onClick={() => deleteCar(car)}>
                        delete
                      </Button>,
                    ]}
                  >
                    <Meta title={car.model} description={car.description} />
                  </Card>
                </div>
              </>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <img src={car.img} className="w-100 mb-3" alt={car.model} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>country</th>
              <th>price</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{car.model}</td>
              <td>{car.brand}</td>
              <td>{car.country}</td>
              <td>{car.price}</td>
              <td>{car.description}</td>
            </tr>
          </tbody>
        </Table>
      </Modal>

      <Header />
      {cars.length === 0 ? (
        <h1 className="mt-5 text-center">THERE IS NO ANY CARS</h1>
      ) : (
        <div className="row m-0 pt-3">
          {cars.map((car) => (
            <>
              <div className="col-sm-12 col-md-4 mx-2 ">
                <Card
                  cover={<img alt="example" src={car.img} className="w-100" />}
                  actions={[
                    <Button type="primary" onClick={() => showModal(car)}>
                      view
                    </Button>,
                  ]}
                >
                  <Meta title={car.model} description={car.description} />
                </Card>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
