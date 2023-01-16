const path = require("path");
const fs = require("fs");
const { MovieDb } = require("moviedb-promise");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.TMDB_API_KEY;
const moviedb = new MovieDb(apiKey);

const alwaysSunnyId = "2710";

const getData = async () => {
  const seriesInfo = await moviedb.tvInfo({ id: alwaysSunnyId });
  const seasonCount = seriesInfo.number_of_seasons;

  const episodeInfo = await Promise.all(
    [...Array(seasonCount).keys()].map(async (season) => {
      const seasonInfo = await moviedb.seasonInfo({
        id: alwaysSunnyId,
        season: season + 1,
      });
      return seasonInfo.episodes;
    })
  );

  return episodeInfo.flat();
};

getData()
  .then((res) => {
    const jsonDirectory = path.join(process.cwd(), "../json");
    fs.writeFile(jsonDirectory + "/episodes.json", JSON.stringify(res), (err) => {
      if (err) {
        console.error(err);
      }
    });
  })
  .catch(console.error);
