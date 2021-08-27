import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getImagesAPI } from '../utils/ServiceApi';

class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const page = this.state.page;

    if (nextQuery !== prevQuery) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1, hits: [] });
      console.log(page);
      this.getImages({ nextQuery: nextQuery, page: 1 });
    }

    if (page !== prevState.page && page !== 1) {
      this.setState({ status: 'pending' });
      console.log('load more click');
      this.getImages({ nextQuery: nextQuery, page: page });
    }
  }

  getImages = ({ nextQuery, page }) => {
    getImagesAPI({ nextQuery, page })
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ status: 'rejected' });
        }
        this.setState({ status: 'resolved', totalHits: data.totalHits });
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleLoadMore = e => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  handleSetLargeImageURL = largeImageURL => {
    this.setState({ largeImageURL });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { status, error, hits, query, showModal, largeImageURL, totalHits } =
      this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {error && <h1>{error.message}</h1>}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            hits={hits}
            toggleModal={this.toggleModal}
            handleSetLargeImageURL={this.handleSetLargeImageURL}
          />
          {hits.length >= 12 && hits.length < totalHits && (
            <Button onClick={this.handleLoadMore} />
          )}
          {hits.length === 0 && <h1>по запросу {query} ничего не найдено</h1>}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}

export default App;
