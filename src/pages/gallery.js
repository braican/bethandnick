import React from 'react';

import Seo from '../components/Seo';
import SimpleLayout from '../layouts/Simple';
import ImageGallery from '../components/ImageGallery';
import Footer from '../components/Footer';

const GalleryPage = () => (
  <SimpleLayout>
    <Seo title="Photos" />

    <div className="splitpane__content">
      <div className="content__main">
        <h2>Photos</h2>
        <div className="content__main">
          <p>We've got some good ones. Scroll down to flip through some photos of Beth &amp; Nick through the years.</p>
        </div>
      </div>

      <ImageGallery />

      <Footer />
    </div>

  </SimpleLayout>
);

export default GalleryPage;
