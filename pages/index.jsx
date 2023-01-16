import useSWR from "swr";

import Head from "next/head";
import EpisodeCard from "/components/EpisodeCard";

import styles from "../styles/index.module.scss";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: episodes, error: episodesError } = useSWR(
    "/api/episodes",
    fetcher
  );
  const { data: order, error: orderError } = useSWR("/api/order", fetcher);

  let orderedEpisodes = [];

  if (episodes && order) {
    orderedEpisodes = order?.map((id) =>
      episodes?.find((episode) => episode.id === id)
    );
  }

  return (
    <>
      <Head>
        <title>Always Sunny Rank</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Cameron&apos;s Always Sunny Rank</h1>
        {orderedEpisodes?.map((episode, index) => (
          <EpisodeCard episode={episode} key={episode.id} rank={index + 1} />
        ))}
      </main>
    </>
  );
};

export default Home;
