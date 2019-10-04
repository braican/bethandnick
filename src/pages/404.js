import React from 'react';
import { Link } from 'gatsby';
import SplitLayout from '../layouts/Split';
import Seo from '../components/Seo';

const NotFoundPage = () => (
  <SplitLayout>
    <Seo title="WHOOPS" />

    <div className="content__main">
      <h1 className="h1">Uh oh. The page you're looking for left you at the altar.</h1>
      <p>Head on back to the <Link to="/">homepage</Link> for a story with a happy ending.</p>
    </div>
  </SplitLayout>
);

export default NotFoundPage;
