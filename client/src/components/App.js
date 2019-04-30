import React, {Component} from 'react';
import Form from "./Form";
import Result from "./Result";
import './App.css';

//Klucz do API
const APIKey = 'c6b14ed6cc805ac63b6b41aa3af5cfb3'

class App extends Component {

  state = {
      value: '',
      date: '',
      city:'',
      sunrise:'',
      sunset:'',
      temp:'',
      pressure:'',
      wind:'',
      err: false, //error
    }
    handleInputChange = (e) => {
      this.setState({
        value: e.target.value
      }) //zmieniamy stan zawartości inputa
    }

    handleCitySubmit = (e) => {
      e.preventDefault()
      console.log("Potwierdzony formularz");
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}`;

      fetch(API) //metoda asynchroniczna, fetch tworzy obietnicę, oczekuje na rozstrzygnięcie aż dostaniemy odpowiedź - jeśli pozytywna to wykona się odpowiedź then, jeśli nie to catch
      .then(response => {
        if(response.ok) {
          return response
        }
        throw Error("Nie udało się")
      })
      .then(response => response.json()) //wyodrębniamy json'a
      .then(data => {
        const time = new Date().toLocaleString()
        this.setState(state => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: state.value,
        }))
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({
           err: true,
           city: prevState.value
          }))
        })
    }

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state}/>
      </div>
    );
  }
}

export default App;
