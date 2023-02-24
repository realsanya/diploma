import { lazy } from 'react';

const routes = {
  fallback: <div>Loading...</div>,
  routes: [{
    path: '/reviews',
    exact: true,
    component: lazy(() => import('pages/review/index')),
  }, {
    path: '/create',
    component: lazy(() => import('pages/review/create')),
    routeConfig: {
      fallback: <div>Loading friends...</div>,
      routes: [{
        path: '/friends',
        component: lazy(() => import('pages/review/partials/general-info')),
      }]
    }
  }, {
    path: '/update/:id',
    component: lazy(() => import('pages/review/update')),
  }, {
    path: '/view/:id',
    component: lazy(() => import('pages/review/view')),
  }]
}

export default routes;
