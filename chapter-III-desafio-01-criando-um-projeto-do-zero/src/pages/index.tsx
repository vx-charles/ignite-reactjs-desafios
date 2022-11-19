import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

function formatPostData(posts: Post[]): Post[] {
  return posts.map((post: Post) => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        { locale: ptBR }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { results, next_page } = postsPagination;

  const [posts, setPosts] = useState<Post[]>(results);
  const [isLoadMorePosts, setIsLoadMorePosts] = useState<string>(next_page);

  function handleLoadPosts(): void {
    fetch(next_page, { method: 'GET' })
      .then(resp => resp.json()) // obtém a resposta em json na requisição.
      .then(myJson => {
        // termina a requisição da promise e traz o resultado.
        setPosts([...posts, ...formatPostData(myJson.results)]);
        setIsLoadMorePosts(myJson.next_page);
      });
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={commonStyles.container} id="home">
        <div className={styles.posts}>
          {posts.map((post: Post) => (
            <div className={styles.post} key={post.uid}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <div className={styles.title}>{post.data.title}</div>
                </a>
              </Link>
              <div className={styles.subtitle}>{post.data.subtitle}</div>
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <FiCalendar fontWeight="bold" />
                  <time>{post.first_publication_date}</time>
                </div>
                <div className={styles.infoItem}>
                  <FiUser fontWeight="bold" />
                  <span>{post.data.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLoadMorePosts && (
          <button
            type="button"
            className={styles.loadPostText}
            onClick={handleLoadPosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('blog', { pageSize: 1 }); // valor do API ID lá no 'slicemachine' server.

  // Force casting: conversão forçada mudando sua tipagem fazendo assim: 'as unknown as Post[]'
  // sobrescreve o tipo, primeiro converte para unknown e depois para o seu tipo que no caso é Post[].
  const posts = formatPostData(postsResponse.results as unknown as Post[]);

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
