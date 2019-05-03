import React from 'react';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';

const GalleryPage = () => (
  <Wrapper contextClass="layout--gallery dark-header-theme">
    <Header contextClass="header--main" />

    <main className="gallery-main">
      <ImageGallery />
    </main>

    <Footer />
  </Wrapper>
);

export default GalleryPage;
