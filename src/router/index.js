import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/",
    name: "Home",
    component: () => import("../views/Basic.vue")
  },
  { path : "/signup",
    name: "signin",
    component: () => import("../views/auth/SignUp.vue")
  },
  {
  path: '/home',
  name: 'Home',
  component: () => import('../views/Home.vue')
},
{
  path: '/verify',
  name: 'verify',
  component: () => import('../views/auth/verify.vue')
},
{
  path: "/MovieDetailes",
  name: "MovieDetailes",
  component: () => import("../views/MovieDetailes.vue"),
},
{
  path: "/chooseCinma",
  name: "chooseCinma",
  component: () => import("../views/auth/booking/chooseCinma.vue"),
},
{
  path: "/chooseChair",
  name: "chooseChair",
  component: () => import("../views/auth/booking/chooseChair.vue"),
  props: (route) => ({ theaterId: route.query.theaterId }),
},
{
  path: "/chooseFood",
  name: "chooseFood",
  component: () => import("../views/auth/booking/chooseFood.vue"),
},
{
  path: "/choosePayment",
  name: "choosePayment",
  component: () => import("../views/auth/booking/choosePayment.vue"),
},
{
  path: "/PaymentSuccess",
  name: "PaymentSuccess",
  component: () => import("../views/auth/booking/PaymentSuccess.vue"),
},
  { path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue")
  },
    { path: "/theater",
    name: "theater",
    component: () => import("../views/DashBoard/theater.vue")
  },
      { path: "/screen",
    name: "screen",
    component: () => import("../views/DashBoard/screen.vue")
  },
    {
    path: "/seats/:id",
    name: "seats",
    component: () => import("../views/DashBoard/seats.vue"),
    props: true, // عشان تستقبل الـ id كـ prop
  },
  {
  path: '/screens/:id/showtimes',
  name: 'ShowTimes',
  component: () => import('../views/DashBoard/ShowTimes.vue'),
  props: true
  },
      { path: "/FillDatabase",
    name: "FillDatabase",
    component: () => import("../views/FillDatabase.vue")
  },
        { path: "/Bookings",
    name: "Bookings",
    component: () => import("../views/users/Bookings.vue")
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
export default router;
