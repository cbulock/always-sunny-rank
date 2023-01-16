import useSWR from "swr";
import Clipboard from "react-clipboard.js";

import Head from "next/head";

import styles from "../styles/unordered.module.scss";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Unsorted = () => {
  const { data: episodes, error: episodesError } = useSWR(
    "/api/episodes",
    fetcher
  );
  const { data: order, error: orderError } = useSWR("/api/order", fetcher);

  const unorderedEpisodes = episodes?.filter(
    (episode) => !order?.includes(episode.id)
  );

  return (
    <>
      <Head>
        <title>Always Sunny Rank - Unordered Episodes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Unordered Episodes</h1>
        {unorderedEpisodes?.map((episode) => (
          <div className={styles.table} key={episode.id}>
            <Clipboard
              data-clipboard-text={`  ${episode.id}, // ${episode.name}`}
            >
              📋
            </Clipboard>
            <code>{episode.id}</code> <p>{episode.name}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export default Unsorted;
