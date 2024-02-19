import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import '../Styles/login_register.css';
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../Slice/authSlice";


export const Login=()=>{

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  console.log(form);

  const { username, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, success, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (success || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [error, success, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };
   
    dispatch(login(userData));
    navigate('/dashboard')
  };
 
   return (
    <section className='home'>
     
   <Container>
      <Row className='homeRow'>
        <Col className='homeTitle'>
            <h4>Intelligent Retail Suite</h4>
            <h1>SalesCraft Pro</h1> 
            <p>Streamline your point-of-sale tasks with our user-friendly interface and access comprehensive retail management features. Unlock high-level sales reports and real-time sales data for informed decision-making, driving your business forward.</p>
        </Col>
        <Col className='homeLoginForm'>
            <div className='formbgn'>
            <h3>Login</h3>
              <Form className="register-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className='myinput'
                    type="text" 
                    name='username'
                    value={username}
                    onChange={onChange}
                    placeholder="Enter Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className='myinput'
                    value={password}
                    onChange={onChange} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
                </Form>
            </div>
            <div className='newUserBgn'>
                New User? <span className='subText'><Link to="register">Register Here!</Link></span>
            </div>

         </Col>
      </Row>
    </Container>
    </section>
    );
}