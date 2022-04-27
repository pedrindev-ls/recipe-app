import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Profile</span>
      <Footer />
    </div>
  );
}
