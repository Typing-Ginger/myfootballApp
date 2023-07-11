import { AllFixtures, Standing } from '@/types'
import getStandings from './util/getStandings';
import StandingsAndFixtures from './components/home/StandingsAndFixtures';
import getFixturesForFiveLeagues from './util/getFixturesForFiveLeagues';

export const revalidate = 60;

export default async function Home() {

  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  if (!standingsData?.length || !filteredFixtures?.length) {
    return null;
  }

  return (
    <div className='flex flex-col w-full justify-center items-center md:p-10'>
      <StandingsAndFixtures standingsData={standingsData} filteredFixtures={filteredFixtures} />
    </div>
  )
}
