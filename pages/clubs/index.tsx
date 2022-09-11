import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Clubs from '../../components/Clubs';
// Import the generated Lists API and types from Keystone
import { query } from '.keystone/api';
import { Lists } from '.keystone/types';
import * as fs from 'fs';

type Clubs = {
  id: string;
  title: string;
  slug: string;
};

function index({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
         <main style={{ margin: '3rem' }}>
        <h1>Hello World! 👋🏻 </h1>
        <ul>
          {/* Render each post with a link to the content page */}
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Clubs />
      </main>
    </div>
  );
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
  const posts = (await query.DivingCenter.findMany({ query: 'id title slug' })) as Clubs[];
  return {
    props: {
      posts,
    },
  };
}

export default index;