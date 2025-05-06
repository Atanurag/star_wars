import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
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
          setLoading(false);
        } else {
          setData(resData.results || []);
          setLoading(false);

        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData([]);
        setLoading(false);
      } 
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory((value as CategoryKey) || 'people');
  };

  const renderTableRows = () => {
    const columns = columnMap[selectedCategory];

    if (loading) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <Text align="center" fw={500} py="md">
              Loading...
            </Text>
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <Text align="center" py="md">
              No data available.
            </Text>
          </td>
        </tr>
      );
    }

    return data.map((row, index) => (
      <tr key={index}>
        {columns.map((col) => (
          <td key={col.accessor}>
            {col.label === 'View Detail' ? (
              <button
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
                onClick={() =>
                  navigate(`/detail-page/${selectedCategory}/${row[col.accessor]}`)
                }
              >
                View
              </button>
            ) : (
              row[col.accessor]
            )}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <Stack p="md">
      <UserProfile />

      <Box w={{ base: '100%', sm: 250 }} ml="auto">
        <Select
          label="Select Category"
          placeholder="Pick one"
          value={selectedCategory}
          onChange={handleCategoryChange}
          data={Object.keys(columnMap).map((k) => ({
            value: k,
            label: k.charAt(0).toUpperCase() + k.slice(1),
          }))}
        />
      </Box>

      <Title order={4}>Data for {selectedCategory}</Title>

      <Table withBorder striped highlightOnHover>
        <thead>
          <tr>
            {columnMap[selectedCategory].map((col) => (
              <th key={col.accessor}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </Stack>
  );
};

export default Home;
