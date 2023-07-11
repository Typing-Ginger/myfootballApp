import { AllFixtures, Fixture } from "@/types";
import { USE_SAMPLE } from "../sampleData/useSample";
import moment from 'moment';
import { data } from "autoprefixer";
import getFixturesSample from "../sampleData/getFixturesSample";


const API_KEY = process.env.API_KEY as string;

const leagues = [
    { league: 39, name: 'EPL' },
    { league: 140, name: 'La Liga' },
    { league: 78, name: 'BundesLiga' },
    { league: 135, name: 'Serie A' },
    { league: 61, name: 'Ligue 1' },
    { league: 2, name: 'Champions League' },
    { league: 3, name: 'Europa League' },
    { league: 848, name: 'Conference League' },
    { league: 531, name: 'UEFA Super Cup' },
    { league: 15, name: 'Fifa Club World Cup' },
    { league: 45, name: 'FA Cup' },
    { league: 48, name: 'Carabao Cup' },
    { league: 528, name: 'Community Shiedl' },
    { league: 143, name: 'Copa Del Rey' },
    { league: 556, name: 'Super Cup LaLiga' },
    { league: 529, name: 'Super Cup BundesLiga' },
    { league: 547, name: 'Super Cup Serie A' },
    { league: 137, name: 'Coppa Italia' },
    { league: 65, name: 'Coupe de la Ligue' },
    { league: 66, name: 'Coupe de France' },
    { league: 526, name: 'Trophee des Champions' },
]

async function fetchFixturesByLeague(year: number, league: number): Promise<Fixture[]> {

    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=${year}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        },
        next: {
            // revalidate data every 24 hours
            revalidate: 60 * 60 * 24
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const fixtures: Fixture[] = data.response;
        if (fixtures === null || fixtures === undefined) {
            return [];
        } else {
            return fixtures;
        }

    } catch (err) {
        console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
        return [];
    }
}

export default async function getFixtures(): Promise<AllFixtures[]> {

    if (USE_SAMPLE) {
        return getFixturesSample();
    }

    try {
        const currentTime = moment();
        const year = currentTime.year();
        const month = currentTime.month();

        const allFixturesByLeague: AllFixtures[] = [];

        for (const league of leagues) {
            if (month <= 5) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year - 1, league.league),
                });
            } else if (month >= 8) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league)
                });
            } else {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year - 1, league.league)
                });
                const existingData = allFixturesByLeague.find((data) => data.name === league.name);
                if (existingData) {
                    existingData.fixtures.push(...(await fetchFixturesByLeague(year, league.league)));
                } else {
                    allFixturesByLeague.push({
                        name: league.name,
                        fixtures: await fetchFixturesByLeague(year, league.league)
                    });
                }
            }
        }


        return allFixturesByLeague;
    } catch (error) {
        console.error("An error occured while fetching fixtures: ", error);
        throw error;
    }
}