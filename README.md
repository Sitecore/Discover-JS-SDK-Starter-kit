<p align="center">
  <a href="https://www.sitecore.com/">
    <img src="https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/global/logo/sitecore-logo.svg?la=es-ES&hash=89E5BCF25116F0D8B53F53F0E3D33A0E" alt="RBE logo" target="_blank" width="200" height="165">
  </a>
</p>
<h3 align="center">Sitecore Discover Starter Kit</h3>

<p align="center">
 A website built using React + Sitecore Discover SDK for React
  <br>
  <a href="https://developers.sitecorecloud.io/discover-sdk/react/website" target="_blank"><strong>Demo »</strong></a>
  <br>
  <br>

# Sitecore Discover Starter Kit

This repository has an example implementation of an e-commerce platform using the `Sitecore Discover JS SDK` which
integrates with Discover services and supports event tracking. 

## Table of contents

- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Pages](#Pages)
    - [Home](#Home)
    - [Search](#Search)
    - [Category pages](#Category-pages)
    - [Product detail page](#Product-detail-page)
    - [Cart page](#Cart-Page)
    - [Order confirm page](#Order-confirm-page)
- [Events](#Events)
    - [Monitoring example](#Monitoring-example)
- [Documentation](#learn-more)

## Prerequisites
### Node.js

The Discover Starter Kit needs to have Node.js installed to build the project. We recommend using the LTS version of Node.js. You can find the latest version of Node.js [here](https://nodejs.org/en/).

### Environment variables

The Discover Starter Kit needs some environment variables to work. You can get the values for them in the [Developers resources section](https://doc.sitecore.com/discover/en/developers/discover-developer-guide/the-api-access-tab.html) of Customer Engagement Console (CEC). For full functionality, you must create a **.env.local** file in the root of the project and add in the below environment variables.

The following variables should exist within the .env.local file:

```
REACT_APP_ENV="<environment - Expected values: prod, staging or prodEu >"
REACT_APP_CUSTOMER_KEY="<customer key>"
REACT_APP_API_KEY="<API key provided in CEC>"
```


## Quick start

To start using `Discover Starter Kit`:
1. Install [Node.js](htts://nodejs.org/en/). We recommend the LTS version.
2. Clone the repository: `git clone https://github.com/Sitecore/Discover-JS-SDK-Starter-kit.git`
3. In the repository, to install all dependencies, run `npm install`.
4. In the root of the project, create a `.env.local` file then add the following environment variables to it:
```
REACT_APP_ENV="<environment - Expected values: prod, staging or prodEu >"
REACT_APP_CUSTOMER_KEY="<customer key>"
REACT_APP_API_KEY="<API key provided in CEC>"
```
(See **Environment variables** section)

5.  To start the development server, run `npm start`.
6.  To view the site, open your browser to **http://localhost:3000**

In case you want to build the app for production run: `npm run build`

## Widget configurations

The application renders widgets based on page or URL, as configured in the CEC. It loads a custom page widgets component that uses the `PageWidgets` component or the `usePageWidgets` hook. The `index.jsx` imports a configuration file called `sitecoreWidgetsConfig.js` that registers all the components used for each widget type.  

You can access the documentation for details on components, functions, query hooks, templates, and ui primitives.

## Pages

The following is a list of pages that the website has to cover all event tracking available within the SDK.
It uses React Router to perform page navigation.
Here, each page is a React component with a `useEffect` hook to register uri change.

For example, for home page we have:

```javascript
useEffect(() => {
    PageController.getContext().setPageUri('/');
}.[]);
```

With this, the SDK can change browser context and customize tracking/service response.

In the starter kit, we use a higher order component called `withPageTracking` in each page to register page uri and track the page view event.

### Home

Route: `/` shows the main page of the site.
This page is an example of how you can render widgets configured for the page in the CEC. The page component uses the `usePageWidgets` query hook and other recommendation widgets.

Events tracked are:

- A `page view` event.
- A `widget appear` event per widget that appears on the page.

### Search

Route: `/search` shows the results returned after submitting the form in the header.

Events tracked are:

- A `page view` event.
- A `widget appear` event for the search result widget present on the page.

### Category pages

Route: `/category/<category sanitized name>`. E.g.: `/category/fan-gear-jerseys` Only shows search results for the category.

Events tracked are:

- A `page view` event.
- A `widget appear` event for the search result widget present on the page (this page also uses a search results type
  widget to show the products).

### Product detail page

Route: `/product/detail/<product sku>/<product id>`. E.g.: `/product/detail/3107756/prod1100011` shows the details of a product. It also has a recommendation widget for related products.

__Note:__
*In this case, the product information is wrapped on a `SearchResults` widget that uses a filter by sku since there
isn't a datasource.
It is not recommended to perform this in this way (usually the way that a Product Detail Page looks is handled by the
SDK consumer and the data is gathered by their own datasets).
Sitecore Discover Services are used to search and recommend.*

Events tracked are:

- A `page view` event.
- A `PDP view` event with the SKU from the product shown (dispatched verbosely).
- A `widget appear` event for the search result.

### Cart page

Route: `/cart` shows a list of the products added to the cart. The page also has a recommendation widget showing products that were recently purchased together.

Events tracked are:

- A `page view` event.
- A `widget appear` event for the recommendation widget.
- `add to cart` or `cart status` events.

### Order confirm page

Route: `/order/confirmation` shows the confirmation for the purchase and includes a recommendation widget showing products that were recently purchased.

Events tracked are:

- A `page view` event.
- A `widget appear` event for the Recommendation widget present on the page.
- An `order confirm` event (the user sent on the event is a mock user).

## Events

Events are an important part of the Discover platform. The JS SDK automatically fires events it can infer when they happen. To register other events, you have to verbosely dispatch them. 

Refer to the [JS SDK documentation](https://doc.sitecore.com/discover/en/developers/discover-js-sdk-for-react/events.html) for details on dispatching events.

### Monitoring example

Debug event tracking in the CEC.
The following video shows how you can verify the events that the SDK trigger:


![](events.gif)


## Documentation

Discover documentation is written for both developers and [business users](https://doc.sitecore.com/discover/en/users/discover-user-guide/introduction-to-sitecore-discover.html).  

Integration documentation for developers covers for details on [components, functions, query hooks](https://doc.sitecore.com/discover/en/developers/discover-js-sdk-for-react/introduction-to-discover-js-sdk-for-react.html), [templates, and ui primitives](https://developers.sitecorecloud.io/discover-sdk/react/1.x-alpha/storybook/index.html).

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Discover Starter Kit; read below to learn how to participate in those efforts.

### Bug reports

You can use GitHub to submit [bug reports](https://github.com/Sitecore/Discover-JS-SDK-Starter-kit/issues/new?template=bug_report.md) for Discover Starter Kit.

### Feature requests

You can use GitHub to submit [feature requests](https://github.com/Sitecore/Discover-JS-SDK-Starter-kit/issues/new?template=feature_request.md) for Discover Starter Kit.


### Code of Conduct
Sitecore has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing Guide

If you want to make changes to the code, follow these steps:

1. Fork the Discover Starter Kit Repo GitHub repo.
2. Clone the forked repo to your local machine.
3. Create a feature branch from `main` for your changes. e.g. `git checkout -b my-feature-branch`
4. `npm install`
5. `npm start` (to preview your changes locally)
6. Commit, push to your remote fork of the Discover Starter Kit repo, then open a pull request (PR) to the `main` branch of the Developer Portal repo.

Your changes will be reviewed and merged if appropriate.
