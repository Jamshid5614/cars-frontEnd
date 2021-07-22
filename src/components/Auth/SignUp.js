import { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signUpHandle = () => {
    axios.post("/sign-up", user).then((res) => {
      if (!res.data.success) {
        setErrorMessage(res.data.message);
      } else {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data[0]));
        history.push("/cars");
      }
    });
  };

  return (
    <>
      <div className="row m-0 mt-5">
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
            method="POST"
            action="/sign-in"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <Input name="name" onChange={inputHandle} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email",
                },
              ]}
            >
              <Input name="email" onChange={inputHandle} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password",
                },
              ]}
            >
              <Input.Password name="password" onChange={inputHandle} />
            </Form.Item>
            <Form.Item
              className="d-block"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" onClick={signUpHandle} htmlType="submit">
                Sign up
              </Button>
              <div>
                <Link to="/sign-in" className="ms-3 mt-2">
                  Sign in
                </Link>
              </div>
            </Form.Item>
          </Form>

          <p className="text-center text-danger">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}
