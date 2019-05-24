# Gatsby Placeholder

Sets up a `placeholder` status for posts in WordPress.

## Why?

When using the `gatsby-source-wordpress` plugin, Gatsby infers the GraphQL schema from the source's API. If there are no posts in a specific content type, the GraphQL schema will not be built for that content type, which will then cause the build to fail when your templates try and query for those posts.

This plugin allows you to set up a post for each post type that will be hidden within the admin, so as not to confuse site editors, but will always ensure that the GraphQL schema is built for that specific post type. This way if there are no other posts, you can gracefully fall back to a "No posts found" message rather than have the build error out and fail.

Just remember to filter out the placeholder posts within your Gatsby components.
