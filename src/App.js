import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from './utils/tool';

// ----------------------------------------------------------------------

export default function App() {
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    if (notification && notification.error) {
      const msg = notification.message ? notification.message : 'Error';
      showToast('error', msg);
      // dispatch(clearNotification())
    }
    if (notification && notification.success) {
      // alert('asd')
      const msg = notification.message ? notification.message : 'Good job !!!';
      showToast('success', msg);
      // dispatch(clearNotification())
    }
  }, [notification]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />

      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}
