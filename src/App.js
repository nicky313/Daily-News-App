import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress=(progresss)=>{
    this.setState({progress: progresss})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress}  apiKey={this.apiKey} key={"general"} pageSize={this.pageSize} country="in" category="general"/>}></Route>
            <Route path="/business" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"business"} pageSize={this.pageSize} country="in" category="business"/>}></Route>
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"entertainment"} pageSize={this.pageSize} country="in" category="entertainment"/>}></Route>
            <Route path="/health" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"health"} pageSize={this.pageSize} country="in" category="health"/>}></Route>
            <Route path="/science" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"science"} pageSize={this.pageSize} country="in" category="science"/>}></Route>
            <Route path="/sports" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"sports"} pageSize={this.pageSize} country="in" category="sports"/>}></Route>
            <Route path="/technology" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}  key={"technology"} pageSize={this.pageSize} country="in" category="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
