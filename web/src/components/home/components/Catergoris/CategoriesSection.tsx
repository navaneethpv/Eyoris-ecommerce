'use client'
import React from 'react';
import { categories } from './categories';
import CategoryImages from './CategoryImages';

export default function Categories() {
  return (
    <section className="container mx-auto py-12 px-4">
     <CategoryImages categories = {categories}/>
    </section>
  );
}
