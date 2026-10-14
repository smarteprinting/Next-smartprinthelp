import Header from '../Header'
import React from 'react'
import ModelSearch from './ModelSearch'

export const metadata = {
  title: 'Model Search',
};

export default function Page() {
  return (
    <>
    <Header />
    <ModelSearch />
    </>
  )
}