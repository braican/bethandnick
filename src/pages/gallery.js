import React from 'react';

import Seo from '../components/Seo';
import SimpleLayout from '../layouts/Simple';
import ImageGallery from '../components/ImageGallery';

const GalleryPage = () => (
  <SimpleLayout>
    <Seo title="Gallery" />

    <div className="simplelayout__main">
      <h2 className="page-title">Photos</h2>
      <div className="content__main content__main--limited">
        <p>
          After knowing each other for over half our lives, we've got some good photos of us over
          the&nbsp;years.
        </p>
      </div>
    </div>

    <ImageGallery />
  </SimpleLayout>
);

export default GalleryPage;
