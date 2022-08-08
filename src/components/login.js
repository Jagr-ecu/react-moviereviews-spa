import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = ({login}) => {
    const [name, setName] = useState("")
    const [id, setId] = useState("")

    let navigate = useNavigate();

    const onChangeName = e => {
        const name = e.target.value
        setName(name);
    }

    const onChangeId = e => {
        const id = e.target.value
        setId(id);
    }

    const loginUser = () => {
        console.log('hola')
        login({name: name, id: id})
        navigate('/peliculas', { replace: true });
    }

    return(
        <div style={{ alignItems: 'center' }}>
           <Form style={{ paddingLeft: '30%',  paddingRight: '30%', marginTop: '5%'}}>
            <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={name}
                    onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter id"
                    value={id}
                    onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={loginUser} style={{marginTop: '20px'}}>
                    Ingresar
                </Button>
           </Form>
        </div>
    )
}

export default Login