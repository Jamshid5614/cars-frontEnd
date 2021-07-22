import { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signInHandle = () => {
    axios.post("/sign-in", user).then((res) => {
      if (!res.data.success) {
        setErrorMessage(res.data.message);
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        history.push("/cars");
      }
    })
    .catch(err => console.error('Error: ',err))
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
              <Button type="primary" onClick={signInHandle} htmlType="submit">
                Sign in
              </Button>
              <div>
                <Link to="/sign-up" className="ms-3 mt-2">
                  Sign up
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
