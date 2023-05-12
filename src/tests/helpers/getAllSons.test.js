import { getAllSongs } from '../../podcast/helpers/getAllSongs';

test('API call returns more than 0 elements', async () => {
  const { entry } = await getAllSongs();
  expect(entry.length).toBeGreaterThan(0);
});
