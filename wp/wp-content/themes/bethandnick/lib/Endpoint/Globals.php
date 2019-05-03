<?php

namespace BethAndNick\Endpoint;

/**
 * Creates an endpoint for the main navigation items.
 */
class Globals extends Base {
  /**
   * Base URL for the endpoint route.
   *
   * @var string
   */
  protected $route = 'info';


  /**
   * Sets up the content for the endpoint.
   *
   * @return void
   */
  public function setEndpointContent() {
    $this->endpoint_content = array(
      'wedding_date'      => get_field('wedding_date', 'option'),
      'venue_name'        => get_field('venue_name', 'option'),
      'venue_information' => get_field('venue_information', 'option'),
    );
  }
}
