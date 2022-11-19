import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    // páginas de preview já prontas em getStaticPaths(), o 'isFallback' fica false.
    return <div className={styles.loading}>Carregando...</div>;
  }

  let readTimeMinutes = 0;

  const totalWords = post.data.content.reduce((total, content) => {
    let wordCount = RichText.asText(content.body).split(' ').length || 0;
    wordCount += content.heading.split(' ').length;
    return total + wordCount;
  }, 0);

  readTimeMinutes = Math.ceil(totalWords / 200); // in minutes

  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>

      <>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt="banner" />
        </div>
        <main className={commonStyles.containerPost} id="post">
          <header>
            <h1 className={styles.title}>{post.data.title}</h1>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <FiCalendar />
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    { locale: ptBR }
                  )}
                </time>
              </div>
              <div className={styles.infoItem}>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div className={styles.infoItem}>
                <BiTimeFive />
                <span>{readTimeMinutes} min</span>
              </div>
            </div>
          </header>
          <article>
            {post.data.content.map(content => (
              <div key={content.heading} className={styles.content}>
                <div className={styles.heading}>{content.heading}</div>
                <div
                  className={styles.body}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </article>
        </main>
      </>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('blog');

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths, // quais caminhos ou as páginas de preview do post quero gerar durante a build. Vazio vai carregar os posts de forma estática assim que as páginas forem acessadas.
    fallback: true, // true, false ou blocking. false - se o post não for gerado de forma estática, gera página error 404. blocking - Quando acessar a página que ainda não foi gerado de forma estática, ele tenta carregar a página no modo SSG, na camada do NextJS.
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('blog', String(slug));

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: { post },
    redirect: 60 * 30, // 30 minutos - propriedade para fazer o conteúdo do post ser atualizado a cada tempo
  };
};
