import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es'
import Button from 'react-bootstrap/Button';
import Image, { propTypes } from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

import MovieDataService from '../services/movies'
import movies from '../services/movies';

const  Movie = ( user ) => {
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated:"",
        reviews:[]
    })

    let { id } = useParams();

    const getMovie = id =>{
        MovieDataService.get(id).then(response => {
            setMovie(response.data)
            console.log(response.data)
        }).catch(e =>{
            console.log(e)
        })
    }

    const formatDate = ( date ) => {
        moment.locale('es')
        let datemoment = moment(date)
        
        return datemoment.format("MMMM DD YYYY")
    }

    useEffect(()=>{
        getMovie(id)
    },[id])

    return(
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid/>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {
                                    user
                                    &&
                                    <Link to={"/peliculas/" + id + "/resena"}>
                                    Añadir Reseña
                                    </Link>
                                }
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reseñas</h2>
                        <br></br>
                        {
                            movie.reviews.map((review, index) => {
                                return (
                                    <Card key={index}>
                                        <Card>
                                            <h5>
                                                { review.name + ", añadido el "}
                                                {
                                                    formatDate(review.date)
                                                }
                                            </h5>
                                            <p>{review.review}</p>
                                            {
                                                user && user.id === review.user_id 
                                                &&
                                                <Row>
                                                    <Col>
                                                    <Link to={{pathname: "/peliculas/"+id+"/resena", state: {currentReview: review}}}>
                                                        Editar
                                                    </Link>
                                                    </Col>
                                                    <Col><Button variant="link">Eliminar</Button></Col>
                                                </Row>
                                            }
                                        </Card>
                                    </Card>
                                )
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie