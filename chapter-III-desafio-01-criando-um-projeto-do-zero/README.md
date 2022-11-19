# 💻 Sobre o desafio (em ReactJS)

Nesse desafio, você deverá criar uma aplicação para treinar o que aprendeu até agora no ReactJS

Essa será uma aplicação onde o seu principal objetivo é criar um blog do zero. Você vai receber uma aplicação praticamente em branco que deve consumir os dados do Prismic e ter a interface implementada conforme o layout do Figma. Você terá acesso a diversos arquivos para implementar:

- Estilizações global, comum e individuais;
- Importação de fontes Google;
- Paginação de posts;
- Cálculo de tempo estimado de leitura do post;
- Geração de páginas estáticas com os métodos `getStaticProps` e `getStaticPaths`;
- Formatação de datas com `date-fns`;
- Uso de ícones com `react-icons`;
- Requisições HTTP com `fetch`;
- Entre outros.

A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

# Template da aplicação

Para te ajudar nesse desafio, criamos para você esse modelo que você deve utilizar como um template do GitHub.

O template está disponível na seguinte URL:

[https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero)

**Dica**: Caso não saiba utilizar repositórios do GitHub como template, temos um guia em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664).**

# Se preparando para o desafio

Para esse desafio, iremos reforçar alguns pontos e apresentar algumas libs para te ajudar no desenvolvimento.

Começando pelo tema do projeto: criando um projeto do zero. Como isso é inviável por causa dos testes e algumas verificações que precisamos que vocês sigam, criamos um projeto com a menor quantidade de código possível. A idéia é se assemelhar a um projeto recém criado com a CLI do Next.js.

Dessa forma, antes de ir diretamente para o código do desafio, explicaremos um pouquinho de:

- Prismic;
- Figma;
- fetch;
- react-icons;
- date-fns.

Vamos nessa?

## Prismic

Como você já deve ter visto nas aulas, o Prismic é uma Headless CMS. Vamos utilizá-lo para gerar documentos repetíveis (post) que vão retornar alguns dados para a aplicação. Nesse ponto, é muito importante que você siga **exatamente** a estrutura que vai ser apresentada aqui pois os testes **dependem** disso.

Vou deixar este [video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/af40056a-bfff-4075-b796-643c2353e399/prismic.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133853Z&X-Amz-Expires=86400&X-Amz-Signature=10cc14ff2b72347360e2325a0b317cb875db138200aa5b5b66efeaa3dc76aa14&X-Amz-SignedHeaders=host) mostrando a estrutura do Documento e um exemplo de Publicação para você se familiarizar. Em seguida, discutiremos campo a campo.

No vídeo apresentado, foi possível ver que nosso documento repetível `posts` tem 8 campos. Vamos descrever cada um deles:

- **slug**
  - Tipo: UID
  - Descrição: Identificador único amigável de cada post. Pode receber um valor manualmente ou é gerado automaticamente a partir do primeiro campo de texto preenchido. Esse campo vai ser utilizado na navegação do Next.
- **title**
  - Tipo: Key Text
  - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título do Post.
- **subtitle**
  - Tipo: Key Text
  - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como subtítulo do Post.
- **author**
  - Tipo: Key Text
  - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como nome do autor do Post.
- **banner**

  - Tipo: Image
  - Configurações do campo:

    <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fee38dc96-7ced-4c7e-b20b-53530ec31aa5%2FUntitled.png?table=block&id=dea1feea-0e8f-4518-95b3-0ef56c61e206&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=750&userId=&cache=v2">

  - Descrição: Input de imagens. Recebe valores manualmente. Esse campo será utilizado como banner do Post.

- **content**

  - Tipo: Group
  - Descrição: Grupo de campos repetíveis. Esse campo será utilizado como o conteúdo do Post. O conteúdo será dividido em seções com um campo `heading` e um campo `body`.
  - Campos internos:

    - **heading**
      - Tipo: Key Text
      - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título da seção do Post.
    - **body**

      - Tipo: Rich Text
      - Configurações do campo:

        <img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F79c8e7b6-a0be-4713-9447-bf9f13e0082e%2FUntitled.png?table=block&id=c32ba29c-4d11-4710-8cb7-7f579adcc86b&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=800&userId=&cache=v2">

      - Descrição: Input de _rich text_ (HTML). Recebe valores manualmente. Esse campo será utilizado como conteúdo da seção do Post. Perceba que nas configurações do campo, selecionamos algumas opções para que o seu texto tenha varias formatações (negrito, hyperlinks, listas, etc.).

Mesmo com as explicações acima, ficou em dúvida de como ficarão esses campos na sua página? Deixamos abaixo um print descrevendo cada campo no resultado final para te ajudar:

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F024f1f70-b118-4f17-849e-8d1ce379043d%2FUntitled.png?table=block&id=706e8b9b-bf52-4d77-a5df-f4bd85e4dfdd&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=2500&userId=&cache=v2">

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd00fab1c-464b-4473-a90e-9dba17ba9d51%2FUntitled.png?table=block&id=fa13c671-9f48-41c6-a311-7841a1ebba62&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=2500&userId=&cache=v2">

1. slug
2. banner
3. title
4. first_publication_date (campo gerado automaticamente pelo Prismic)
5. author
6. content (primeiro grupo)
7. content (segundo grupo)
8. heading (primeiro grupo)
9. body (primeiro grupo)
10. heading (segundo grupo)
11. body (segundo grupo)

Esperamos que dessa forma tenha ficado clara a estrutura e o uso de cada campo no resultado final.

Por fim, vamos falar rapidamente dos métodos que esperamos que você utilize em cada arquivo:

- **src/pages/index.tsx**: Utilizar o método `query` para retornar todos os `posts` já com paginação. Por padrão, a paginação vem configurada como 20. Portanto se quiser testar sem ter que criar mais de 20 posts, altere a opção `pageSize` para o valor que deseja.
- **src/pages/posts/[slug.tsx]**: Utilizar o método `query` para buscar todos os `posts` e o `getByUID` para buscar as informações do `post` específico.

Além disso, não esqueça de configurar no arquivo `.env.local` na raiz do seu projeto a variável `PRISMIC_API_ENDPOINT` com a url da sua API

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe0accf51-c0f2-4602-8a6b-78f638110a9e%2FUntitled.png?table=block&id=b6ace32e-7456-4b1f-b007-d5bd4d7e0cb7&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1680&userId=&cache=v2">

Caso tenha dúvidas, dê uma olhada na documentação oficial do Prismic:

[Prismic w/ Javascript - Prismic](https://prismic.io/docs/technologies/javascript)

[Next.js & Prismic](https://prismic.io/docs/technologies/getting-started-nextjs)

[Prismic Help Center](https://intercom.help/prismicio/en/)

## Figma

Um ponto muito importante desse desafio que queremos que vocês exercitem é a implementação de uma interface a partir de um layout do Figma, como se você tivesse recebido isso das mãos de um designer.

Nesse desafio, você deve implementar o layout da página `Obrigatório`.

Para utilizar o Figma, não possui muito mistério. Vamos deixar abaixo os passos para criar uma conta, duplicar o layout e exportar imagens.

### Criando uma conta no Figma

Para acessar o Layout da aplicação, você primeiramente deve ter uma conta criada na plataforma do Figma, para isso, você pode [clicar aqui](https://www.figma.com/signup).

Então, na página de cadastro, você pode logar diretamente com sua conta do Google ou criar uma conta com o e-mail que você preferir.

### Utilizando o Figma

Após criar sua conta, você pode acessar sua Dashboard do Figma, para isso, basta acessar [https://www.figma.com/](https://www.figma.com/) e ele vai te redirecionar para a Dashboard.

Caso ele não redirecione diretamente para a sua dashboard, existe um botão "Log in" no canto superior direito da tela, que permitirá você acessar a conta que você acabou de criar e, ao logar, você será redirecionado automaticamente.

### Acessando o layout do app

Agora para duplicar os layouts, basta você clicar no link abaixo. Ele adicionará o Layout à sua dashboard do Figma automaticamente, como uma cópia.

[Desafios Módulo 3 ReactJS](https://www.figma.com/file/0Y26j0tf1K2WB5c1ja5hov/Desafios-M%C3%B3dulo-3-ReactJS?node-id=0%3A1/duplicate)

### Verificando estilização

Para verificar a estilização de um elemento, basta selecioná-lo e escolhar na barra lateral direito a opção `Inspect` no menu superior direito. Dessa forma você vai ter a maioria das informações que precisa. Caso precise das distâncias em relação a outros elementos, basta colocar o mouse em cima do elemento que deseja pegar a distância.

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1e292b38-d5a7-4fb2-b3f2-d194d4401662/figma.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133853Z&X-Amz-Expires=86400&X-Amz-Signature=404a589d09968d2256a7005fdcfccce04d24329d4ae012d98fb81c90d8a104a0&X-Amz-SignedHeaders=host)

### Exportando do Figma

Se você está tendo dificuldades em encontrar o comando `Export` no layout do Figma, siga esses passos:

- Selecione o item que deseja exportar;
- Na sidebar direita, clique na aba `Design`;
- Deslize até o final da sidebar para encontrar a opção `Export`.

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a3f1b967-3a93-4e83-8abb-d3d22ae5da75/figma2.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211104T133853Z&X-Amz-Expires=86400&X-Amz-Signature=a22dbb814594942d683ac3cf89efb23cc124095ac4c8c7dbd49ad8283a71fb88&X-Amz-SignedHeaders=host)

## fetch

Para que você consiga realizar a paginação, é preciso trabalhar com a propriedade `next_page` retornada no método `query`. Ela retorna um link que vai buscar a próxima página da paginação.

Dessa forma, para realizar essa única requisição no seu projeto, é **obrigatório** que você utilize o `fetch` já disponível de forma global.

Caso tenha dúvidas de como utilizar, o Diego utilizou o `fetch` no primeiro módulo, lá dentro do `RepositoryList.tsx`. Deixaremos abaixo também a documentação oficial

[Usando Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)

## react-icons

Para exibir os ícones de data de criação, tempo estimado de leitura e autor do post sugerimos utilizar a lib `react-icons` já instalada no seu template. Todos os três icones são da coleção `Feather Icons`.

Caso tenha dúvidas de como utilizar, dê uma olhada na documentação oficial.

[React Icons](https://react-icons.github.io/react-icons/)

## date-fns

Para realizar a formatação das datas, sugerimos utilizar a lib `date-fns` já instalada no seu template. O único método que você precisa utilizar é o `format` informando o `locale` como `pt-BR`. Segue abaixo um rápido exemplo:

```tsx
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

format(new Date(), "'Hoje é' eeee", {
  locale: ptBR,
});
```

Caso tenha dúvidas de como utilizar, dê uma olhada na documentação oficial.

[Modern JavaScript Date Utility Library](https://date-fns.org/docs/Getting-Started)

Aviso: Poderíamos utilizar o Intl para a formatação da data também, mas não recomendamos utilizá-lo nos desafios, pois ele pode gerar alguns problemas na correção automatizada pela plataforma.

## O que devo editar na aplicação?

Com o template já clonado, as depêndencias instaladas e o Prismic já configurado, você deve completar onde não possui código com o código para atingir os objetivos de cada teste. Os documentos que devem ser editados são:

- [src/pages/\_document.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/_document.tsx);
- [src/pages/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/index.tsx);
- [src/pages/home.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/home.module.scss);
- [src/pages/post/[slug].tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/%5Bslug%5D.tsx);
- [src/pages/posts/post.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/pages/post/post.module.scss);
- [src/components/Header/index.tsx](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/index.tsx);
- [src/components/Header/header.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/components/Header/header.module.scss);
- [src/styles/global.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/globals.scss);
- [src/styles/common.module.scss](https://github.com/rocketseat-education/ignite-template-reactjs-criando-um-projeto-do-zero/blob/master/src/styles/common.module.scss).

### pages/\_document.tsx

Nesse arquivo você deve configurar a importação da fonte `Inter` do Google Fonts. Os tamanhos utilizados são `Regular`, `Semi Bold` e `Bold`.

### pages/index.tsx

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa266fffe-64cd-4b29-8e16-5ca0a36fb018%2FUntitled.png?table=block&id=9cd40770-7957-4265-89ef-1822f610c419&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1790&userId=&cache=v2">

Nesse arquivo você deve renderizar todos os posts da paginação e exibir o botão `Carregar mais posts` caso existam mais posts a ser carregados (ou seja, o valor `next_page` retornado pela Prismic não pode ser `null`). Caso contrário, o botão não deve ser renderizado.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Ao clicar no post, é preciso navegar para a pagina do post seguindo o formato `/post/slugDoPost` onde `slugDoPost` é referente ao valor `slug` retornado pelo Prismic.

Por fim, a sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `postsPagination` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

### pages/home.module.scss

Nesse arquivo você deve implementar toda a estilização da página principal.

### pages/post/[slug].tsx

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F963ff31f-5679-4a7d-a81c-e5de7f7b10e7%2FUntitled.png?table=block&id=9bc47e5c-4bf6-49f4-b79d-7d129bc48da9&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1780&userId=&cache=v2">

Nesse arquivo você deve renderizar toda a informação do post e o component `Header`.

O tempo estimado de leitura deve ser calculado manualmente por você. Mas não se assuste, a ideia é simples. Basicamente você deve calcular todas as palavras dentro do texto do seu post, dividir pela média de palavras que um ser humano lê por minuto e arredondar para cima. Para esse desafio, utilize que o ser humano leia, em média, 200 palavras por minuto. Então se o seu texto possuir 805 palavras, você irá dividir por 200 e arredondar o resultado para cima, chegando assim no valor de 5 minutos estimados para leitura do post.

Agora no aspecto do código, você deve iterar no array da propriedade `content` para buscar a quantidade de palavras de cada seção (`heading` e `body`).

Para calcular o tempo estimado de leitura, sugerimos utilizar o método `reduce` para iterar o array `content`, o método `PrismicDOM.RichText.asText` para obter todo o texto do `body` e utilizar o método `split` com uma `regex` para gerar um array de palavras.

A logo `spacetraveling` deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

A sua página deve ser gerada estaticamente. Isso significa que você deve utilizar o `getStaticProps` para buscar os dados do Prismic e popular a sua prop `post` exatamente como deixamos na estrutura de interfaces. Nesse método é obrigatório utilizar o [getByUID](https://prismic.io/docs/technologies/query-helper-functions-javascript#getbyuid) do Prismic.

Além disso, você deve utilizar o `getStaticPaths` para gerar as páginas estáticas de alguns posts e setar o `fallback` como `true` para que o restante seja gerado no momento da requisição. Nesse método é obrigatório utilizar o [query](https://prismic.io/docs/technologies/query-a-single-type-document-javascript) do Prismic.

Por fim, nos casos que cairem no `fallback`, é **obrigatório** que você renderize pelo menos um texto na tela dizendo `Carregando...` para que o teste consiga verificar esses casos corretamente.

Caso tenha dúvidas em relação ao fallback, dê uma olhada aqui:

[Basic Features: Data Fetching | Next.js](https://nextjs.org/docs/basic-features/data-fetching#fallback-pages)

### posts/post.module.scss

Nesse arquivo você deve implementar toda a estilização da página de post.

### components/Header/index.tsx

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feca943bc-37c8-4f37-8d5f-1d91a53648ee%2FUntitled.png?table=block&id=a83c8217-82b1-4a37-820c-a11848db53f4&spaceId=08f749ff-d06d-49a8-a488-9846e081b224&width=1780&userId=&cache=v2">

Nesse arquivo você deve renderizar a logo `spacetraveling`.

Ela deve ser exportada do Figma e salva na pasta `public` na raiz do seu projeto para a correta utilização. Além disso, a logo deve ter o `alt` com o valor `logo` para que o teste possa encontrá-la corretamente.

Por fim, ao clicar na logo é preciso navegar para a página principal `/`.

### components/Header/header.module.scss

Nesse arquivo você deve implementar toda a estilização do Header da aplicação.

### styles/global.scss

Nesse arquivo você deve implementar toda a estilização global da sua aplicação (ex.: variáveis das cores do seu projeto).

### styles/common.module.scss

Nesse arquivo você deve implementar toda a estilização comum entre os arquivos das suas páginas (ex.: largura máxima).

## Especificação dos testes

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dê uma olhada em **[nosso FAQ](https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664)**

Para esse desafio, temos os seguintes testes:

[Teste components/Header/index.tsx](https://www.notion.so/Teste-components-Header-index-tsx-e660ffcf817f43b1863e88e46361a12c)

[Testes pages/Home/index.tsx](https://www.notion.so/Testes-pages-Home-index-tsx-92311ae2694e48eaa8d9addda3afaed9)

[Testes pages/post/[slug].tsx](https://www.notion.so/Testes-pages-post-slug-tsx-4fd06de1728c4abda14d092da382c1df)

## 📖 [Notion do desafio](https://www.notion.so/Desafio-01-Criando-um-projeto-do-zero-b1a3645d286b4eec93f5f1f5476d0ff7)
