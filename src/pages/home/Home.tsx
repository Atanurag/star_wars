import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Select, Stack, Table, Text, Title } from '@mantine/core';
import UserProfile from '../../components/userInfo/UserProfile';

interface Film {
  uid: string;
  description: string;
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

interface DefaultItem {
  uid: string;
  name: string;
}

type CategoryKey = keyof typeof columnMap;

const columnMap = {
  people: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Name', accessor: 'name' },
    { label: 'View Detail', accessor: 'uid' },
  ],
  films: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Title', accessor: 'title' },
    { label: 'Director', accessor: 'director' },
    { label: 'Producer', accessor: 'producer' },
    { label: 'Release Date', accessor: 'release_date' },
    { label: 'Description', accessor: 'description' },
    { label: 'View Detail', accessor: 'uid' },
  ],
  planets: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Name', accessor: 'name' },
    { label: 'View Detail', accessor: 'uid' },
  ],
  species: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Name', accessor: 'name' },
    { label: 'View Detail', accessor: 'uid' },
  ],
  starships: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Name', accessor: 'name' },
    { label: 'View Detail', accessor: 'uid' },
  ],
  vehicles: [
    { label: 'UID', accessor: 'uid' },
    { label: 'Name', accessor: 'name' },
    { label: 'View Detail', accessor: 'uid' },
  ],
} as const;

const Home: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('people');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.swapi.tech/api/${selectedCategory}`);
        const resData = await res.json();

        if (selectedCategory === 'films') {
          const results = resData.result ?? resData.results ?? [];
          const cleanedData = results.map((item: any) => ({
            uid: item.uid,
            description: item.description,
            title: item.properties?.title || '',
            director: item.properties?.director || '',
            producer: item.properties?.producer || '',
            release_date: item.properties?.release_date || '',
          }));
          setData(cleanedData);
        } else {
          setData(resData.results || []);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <Stack p="md">
      <UserProfile />
      <Box w={{ base: '100%', sm: 250 }} ml="auto">
        <Select
          label="Select Category"
          placeholder="Pick one"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory((value as CategoryKey) || 'people')}
          data={Object.keys(columnMap).map((k) => ({
            value: k,
            label: k.charAt(0).toUpperCase() + k.slice(1),
          }))}
        />
      </Box>
      <Title order={4}>Data for {selectedCategory}</Title>
      <Box w="100%" sx={{ overflowX: 'auto' }}>
        <Table withBorder striped highlightOnHover>
          <thead>
            <tr>
              {columnMap[selectedCategory].map((col) => (
                <th key={col.accessor}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columnMap[selectedCategory].length}>
                  <Text align="center" fw={500} py="md">
                    Loading...
                  </Text>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {columnMap[selectedCategory].map((col) => (
                    <td key={col.accessor}>
                      {col.label === 'View Detail' ? (
                        <button
                          style={{ color: 'blue', cursor: 'pointer', background: 'none', border: 'none' }}
                          onClick={() => navigate(`/detail-page/${selectedCategory}/${row[col.accessor]}`)}
                        >
                          View
                        </button>
                      ) : (
                        row[col.accessor] || 'N/A'
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnMap[selectedCategory].length}>
                  <Text align="center" py="md">
                    No data available.
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Box>
    </Stack>
  );
};

export default Home;
