import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

type Club = {
  id: string;
  title: string;
};

export default function ClubPage({ club }: { club: Club }) {
  return (
    <div>
      <main style={{ margin: '3rem' }}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        <h1>{club.title}</h1>
        <p> Hello</p>      
            </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const clubs = (await query.DivingClub.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = clubs.filter(({ slug }) => !!slug).map(({ slug }) => `/club/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const clubs = (await query.DivingClub.findOne({
    where: { slug: params!.slug as string },
    query: 'id title content',
  })) as Club | null;
  if (!clubs) {
    return { notFound: true };
  }
  return { props: { clubs } };
}