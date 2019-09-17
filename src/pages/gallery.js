import React from 'react';

import Seo from '../components/Seo';
import SimpleLayout from '../layouts/Simple';
import ImageGallery from '../components/ImageGallery';

const GalleryPage = () => (
  <SimpleLayout>
    <Seo title="Gallery" />
    <ImageGallery />
  </SimpleLayout>
);

export default GalleryPage;
