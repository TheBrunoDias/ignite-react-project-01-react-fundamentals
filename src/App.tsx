import './global.css';
import styles from './App.module.css';
import { Header } from "./components/Header"
import { Sidebar } from './components/Sidebar';
import { Post, PostProps } from './components/Post';

const posts: PostProps[] = [
  {
    id: 1,
    author: {
      avatar_url: 'https://github.com/TheBrunoDias.png',
      name: "Bruno Dias",
      role: "Web Developer"
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        link: '#',
        content: '👉 Jane.design/doctorcare'
      },
    ],
    publishedAt: new Date('2023-07-24 08:13:00')
  },
  {
    id: 2,
    author: {
      avatar_url: 'https://github.com/TheBrunoDias.png',
      name: "Bruno Dias",
      role: "Web Developer"
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        link: '#',
        content: '👉 Jane.design/doctorcare'
      },
    ],
    publishedAt: new Date('2023-07-20 08:13:00')
  }
];

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(p => <Post key={p.id} {...p} />)}
        </main>
      </div>
    </>
  )
}

export default App
