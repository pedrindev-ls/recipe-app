import React from 'react';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchheader from '../components/SearchHeader';

export default function ExploreFoodByNationality() {
  return (
    <div>
      <Header />
      <span data-testid="page-title">Explore Nationalities</span>
      <ButtonSearch />
      <Searchheader />
      <Footer />
    </div>
  );
}
