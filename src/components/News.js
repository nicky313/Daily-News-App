import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `Daily-News - ${this.cap(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("prev");
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
        this.setState({page: this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        //1b9628b1a04546c5b1ad9761f2d7f737
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults
        });
  };

  render() {
    return (
        <>
        <h2 className="text-center" style={{ margin: "27px" }}>
          Daily-News : {this.cap(this.props.category)} Top Headlines
        </h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          // loader={<h4>Loading...</h4>}
        >
            <div className="container">
              <div className="row">
                {/* {this.state.loading && this.state.articles.map((element)=>{ */}
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 my-3" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        description={element.description ? element.description : ""}
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://static.toiimg.com/thumb/msid-89766398,width-1070,height-580,imgsize-43742,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                        }
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;{" "}
          </button>
        </div> */}
      </>
    );
  }
}
