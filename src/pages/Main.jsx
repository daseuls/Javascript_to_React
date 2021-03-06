import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Login from "../components/Login"
import Clock1 from "../components/Clock1"
import Todo from "../components/Todo"
import Weather from "../components/Weather"
import GlobalStyle from "../styles/GlobalStyle"
import SearchBar from "../components/SearchBar"

// const images = [
//   "background2.jpeg",
//   "background3.jpg",
//   "background4.jpeg",
//   "background5.jpeg",
//   "background6.jpeg",
//   "background7.jpeg",
//   "background8.jpg",
//   "background9.jpg",
//   "background10.png",
//   "background11.jpg",
//   "background12.jpg",
//   "background13.jpg",
//   "background14.jpeg",
//   "background15.jpg",
//   "background16.jpg",
//   "background17.jpg",
//   "background18.jpg",
// ]

export default function Main() {
  const [image, setImage] = useState("")
  const savedBackground = localStorage.getItem("background")

  useEffect(() => {
    if (savedBackground) {
      setImage(savedBackground)
    }
  }, [])

  useEffect(() => {
    saveBackgroundImage()
  }, [image])

  const saveBackgroundImage = () => {
    localStorage.setItem("background", image)
  }

  const getImageUrl = (e) => {
    e.preventDefault()
    const inputValue = e.target.childNodes[0].value
    fetch(`https://source.unsplash.com/featured/?${inputValue}`).then((res) =>
      setImage(res.url)
    )
    e.target.childNodes[0].value = ""
    saveBackgroundImage()
  }

  return (
    <>
      <GlobalStyle />
      <Container imageUrl={image}>
        <ImageForm onSubmit={getImageUrl}>
          <ImageInput placeholder="" />
        </ImageForm>
        <SearchBar />
        <Weather />
        <Clock1 />
        <Login />
        <Todo />
      </Container>
    </>
  )
}

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImageForm = styled.form`
  position: absolute;
  top: 3vh;
  left: 3vw;
`

const ImageInput = styled.input`
  border-bottom: 2px solid coral;
  width: 60px;
  color: white;
`
