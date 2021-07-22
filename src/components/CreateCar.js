import {useState,useContext} from 'react';
import Header from "./Header";
import { Form, Input, Button } from "antd";
import axios from '../utils/axios';
import {useHistory} from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import './Style/AntForm.css';
const { TextArea } = Input;

export default function CreateCar() {
  const {shouldRender} = useContext(GlobalContext);
  const history = useHistory()
  const [car, setCar] = useState({
    model: '',
    brand: '',
    country: '',
    price: '',
    description: ''
  });
  const [carImage,setCarImage] = useState({});

  const inputHandler = e => {
    const {value,name} = e.target;
    setCar({...car,[name]: value});
  }

  const imageHandler = e => {
    setCarImage(e.target.files[0]);
  }

  const submitHandler = () => {
    const formData = new FormData();
    formData.append('model',car.model)
    formData.append('brand',car.brand)
    formData.append('country',car.country)
    formData.append('price',car.price)
    formData.append('description',car.description)
    formData.append('image',carImage)

    axios.post('/cars/new',formData)
      .then(res => {
        shouldRender(true);
        history.push('/cars')
      })
      .catch(err => console.error('Error: ',err))

  }

  return (
    <>
      <Header />
      <div className="row m-0 mt-3">
        <div
          className="col-sm-12 offset-md-2 col-md-6"
          style={{ overflow: "hidden" }}
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
              <Input name="model" required onChange={inputHandler} />
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
              <Input name="brand" required onChange={inputHandler} />
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
              <Input name="country" required onChange={inputHandler} />
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
              <Input type="number" name="price" required onChange={inputHandler} />
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
              <TextArea name="description" required onChange={inputHandler} />
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
              <input onChange={imageHandler} required type="file" name="image" className="form-control" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" onClick={submitHandler} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        
        </div>
      </div>
    </>
  );
}
