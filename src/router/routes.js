
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'sign-in', name: 'Sign-in', component: () => import('pages/Sign-in') },
      { path: 'sign-up', name: 'Sign-up', component: () => import('pages/Sign-up.vue') },
      { path: 'forgot-password', name: 'Forgot-Password', component: () => import('pages/Forgot-Password.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/Admin'),
    children: [{
      path: 'dashboard',
      name: 'Admin Dashboard',
      component: () => import('pages/admin/Index')
    }, {
      path: 'accounts',
      name: 'Accounts',
      component: () => import('pages/admin/Accounts')
    }, {
      path: 'disease',
      name: 'Disease & Symptom Options',
      component: () => import('pages/admin/Disease')
    }, {
      path: 'cases',
      name: 'Admin Cases',
      component: () => import('pages/common/Cases')
    }, {
      path: 'administrators',
      name: 'Administrators',
      component: () => import('pages/admin/Administrators')
    }]
  },

  {
    path: '/app',
    component: () => import('layouts/User'),
    children: [{
      path: 'dashboard',
      name: 'App Dashboard',
      component: () => import('pages/user/Index')
    }, {
      path: 'cases',
      name: 'App Cases',
      component: () => import('pages/common/Cases')
    }, {
      path: 'profile',
      name: 'App Profile',
      component: () => import('pages/common/Profile')
    }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
