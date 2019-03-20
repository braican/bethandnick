<?php

namespace BethAndNick\Endpoint;

/**
 * Creates an endpoint for the Gallery.
 */
class Gallery extends Base {
  /**
   * Base URL for the endpoint route.
   *
   * @var string
   */
  protected $route = 'gallery';


  /**
   * Sets up the content for the endpoint.
   *
   * @return void
   */
  public function setEndpointContent() {
    $this->endpoint_content = array(
      'gallery' => get_field('image_gallery', 'option'),
    );
  }
}
