import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

const MoviesList = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["Todas las clasificaciones"])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    const retrieveMovies = () => {
        MovieDataService.getAll().then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
        }).catch(e => { console.log(e) })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings().then(response => {
            console.log(response.data)
            //start with 'All ratings' if user doesn't specify any ratings
            setRatings(["Todas las clasificaciones"].concat(response.data))
        }).catch(e => { console.log(e) })
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    }

    const find =(query, by) =>{
        MovieDataService.find(query,by).then(response =>{
            console.log(response.data)
            setMovies(response.data.movies)
        }).catch(e =>{
            console.log(e)
        })
    }

    const findByTitle = () => {
        find(searchTitle, "title")
    }

    const findByRating = () => {
        if(searchRating === "Todas las clasificaciones"){
            retrieveMovies()
        } else{
            find(searchRating, "rated")
        }
    }

    function checkImage(imageSrc, good) {
        var img = new Image();
        img.src = imageSrc;
        img.onload = good;        
    }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row style={{padding: '30px'}}>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar por titulo"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                                style={{marginTop: '5px'}}
                            >
                                Buscar
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchRating} >
                                    {ratings.map(rating => {
                                        return (
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByRating}
                                style={{marginTop: '5px'}}
                            >
                                Buscar
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {
                        movies.map((movie) =>{
                            return(
                                <Col>
                                    <Card style={{width: '22rem', marginBottom: '20px'}}>
                                        <Card.Img src={ movie.poster + "/100px180" }/>
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                Clasificación: {movie.rated}
                                            </Card.Text>
                                            <Card.Text>{movie.plot}</Card.Text>
                                            <Link to={"/peliculas/"+movie._id} >Ver Reseñas</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default MoviesList;