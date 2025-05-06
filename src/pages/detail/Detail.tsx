import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    Stack,
    Divider,
    Loader,
    ActionIcon,
    Center
} from '@mantine/core';

const Detail: FC = () => {
    const { category, id } = useParams();
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [supportInfo, setSupportInfo] = useState<any>({});
    const [socialLinks, setSocialLinks] = useState<any>({});
    const [expanded, setExpanded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (category && id) {
            fetch(`https://www.swapi.tech/api/${category}/${id}`)
                .then((res) => res.json())
                .then((json) => {
                    switch (category) {
                        case 'people':
                            setData(json.result);
                            setLoading(false);
                            break;
                        case 'films':
                            setData({
                                description: json.result.description,
                                title: json.result.properties.title,
                                director: json.result.properties.director,
                                producer: json.result.properties.producer,
                                releaseDate: json.result.properties.release_date,
                                openingCrawl: json.result.properties.opening_crawl,
                                starships: json.result.properties.starships
                            });
                            setLoading(false);
                            break;
                        case 'species':
                            setData({
                                description: json.result.description,
                                name: json.result.properties.name,
                                classification: json.result.properties.classification,
                                designation: json.result.properties.designation,
                                average_height: json.result.properties.average_height,
                                average_lifespan: json.result.properties.average_lifespan,
                                eye_colors: json.result.properties.eye_colors,
                                hair_colors: json.result.properties.hair_colors,
                                language: json.result.properties.language,
                                peoples: json.result.properties.people
                            });
                            setLoading(false);
                            break;
                        case 'planets':
                            setData({
                                description: json.result.description,
                                name: json.result.properties.name,
                                climate: json.result.properties.climate,
                                diameter: json.result.properties.diameter,
                                gravity: json.result.properties.gravity,
                                orbital_period: json.result.properties.orbital_period,
                                population: json.result.properties.population,
                                rotation_period: json.result.properties.rotation_period,
                                surface_water: json.result.properties.surface_water,
                                terrain: json.result.properties.terrain,
                            });
                            setLoading(false);
                            break;

                        case 'vehicles':
                            setData({
                                description: json.result.description,
                                name: json.result.properties.name,
                                model: json.result.properties.model,
                                manufacturer: json.result.properties.manufacturer,
                                cost_in_credits: json.result.properties.cost_in_credits,
                                length: json.result.properties.length,
                                max_atmosphering_speed: json.result.properties.max_atmosphering_speed,
                                crew: json.result.properties.crew,
                                passengers: json.result.properties.passengers,
                                cargo_capacity: json.result.properties.cargo_capacity,
                                consumables: json.result.properties.consumables,
                                vehicle_class: json.result.properties.vehicle_class,
                                films: json.result.properties.films,
                            });
                            setLoading(false);
                            break;

                        case 'starships':
                            setData({
                                description: json.result.description,
                                name: json.result.properties.name,
                                model: json.result.properties.model,
                                manufacturer: json.result.properties.manufacturer,
                                cost_in_credits: json.result.properties.cost_in_credits,
                                length: json.result.properties.length,
                                max_atmosphering_speed: json.result.properties.max_atmosphering_speed,
                                crew: json.result.properties.crew,
                                passengers: json.result.properties.passengers,
                                cargo_capacity: json.result.properties.cargo_capacity,
                                consumables: json.result.properties.consumables,
                                hyperdrive_rating: json.result.properties.hyperdrive_rating,
                                MGLT: json.result.properties.MGLT,
                                starship_class: json.result.properties.starship_class,
                                films: json.result.properties.films,
                            });
                            setLoading(false);
                            break;
                        default:
                            setData(json.result)
                            setLoading(false);
                    }
                    setSupportInfo(json.support);
                    setSocialLinks(json.social);
                }).catch((err) => {
                    setLoading(false);
                    setError(true);
                });
        }
    }, [category, id]);

    if (loading || !data) {
        return (
            <Center style={{ height: '100vh' }}>
                <Loader size="xl" />
            </Center>
        );
    }
    if (error) {
        return (
            <Center style={{ height: '100vh' }}>
                <Text fw={600} size="lg">
                    No Data.
                </Text>
            </Center>
        );
    }

    const { properties, description } = data;

    return (
        <>
            <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => navigate(-1)}
                style={{
                    margin: '12px'
                }}
                aria-label="Go back"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </ActionIcon>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: '2rem',
                    padding: '2rem',
                }}
            >
                {category == 'people' && <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: '1 1 350px', maxWidth: 400 }}>
                    <Card.Section>
                        <Image
                            src="https://wallpapers.com/images/hd/star-wars-title-logo-3mx1btzmob79u7eo.jpg"
                            height={160}
                            alt={properties?.name}
                            withPlaceholder
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={600} size="lg">
                            {properties?.name}
                        </Text>
                        <Badge color="teal" variant="light">
                            {properties?.gender}
                        </Badge>
                    </Group>

                    <Text size="sm" c="dimmed" mb="sm">
                        {description}
                    </Text>

                    <Divider my="sm" />

                    <Stack gap={6}>
                        <Text size="sm"><b>Birth Year:</b> {properties?.birth_year}</Text>
                        <Text size="sm"><b>Eye Color:</b> {properties?.eye_color}</Text>
                        <Text size="sm"><b>Hair Color:</b> {properties?.hair_color}</Text>
                        <Text size="sm"><b>Skin Color:</b> {properties?.skin_color}</Text>
                        <Text size="sm"><b>Height:</b> {properties?.height} cm</Text>
                        <Text size="sm"><b>Mass:</b> {properties?.mass} kg</Text>
                        <Text size="sm">
                            <b>Homeworld:</b>
                            <span style={{ cursor: 'pointer' }} onClick={() => {
                                const parts = properties?.homeworld?.split('/').filter(Boolean);
                                if (!parts[3] || !parts[4]) return;
                                const categoryToView = parts[3];
                                const categoryId = parts[4]
                                const path = `internal-detail/${categoryToView}/${categoryId}`;
                                navigate(path);
                            }}> View Home</span>
                        </Text>
                    </Stack>


                </Card>}
                {category == 'films' &&
                    <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            margin: 'auto',
                        }}
                    >
                        <Text fw={700} size="xl" mb="sm">
                            🎬 {data.title}
                        </Text>

                        <Text size="sm" c="dimmed" mb="xs">
                            {data.description}
                        </Text>

                        <Divider my="sm" />

                        <Stack gap="xs">
                            <Text size="sm"><b>Director:</b> {data.director}</Text>
                            <Text size="sm"><b>Producer:</b> {data.producer}</Text>
                            <Text size="sm"><b>Release Date:</b> {new Date(data.releaseDate).toDateString()}</Text>
                            <Text size="sm"><b>Starships</b> {data?.starships?.map((e, i) => {
                                return (<><span style={{ cursor: 'pointer' }} onClick={() => {
                                    const parts = e?.split('/').filter(Boolean);
                                    if (!parts[3] || !parts[4]) return;
                                    const categoryToView = parts[3];
                                    const categoryId = parts[4]
                                    const path = `internal-detail/${categoryToView}/${categoryId}`;
                                    navigate(path);
                                }}> ship-{e?.split('/').filter(Boolean)[4]} |</span></>)
                            })}</Text>

                        </Stack>

                        <Divider my="sm" />

                        <Text fw={600} size="md" mb="xs">
                            Opening Crawl
                        </Text>

                        <Text
                            size="sm"
                            style={{ whiteSpace: 'pre-wrap', overflow: 'hidden' }}
                            lineClamp={expanded ? undefined : 4}
                        >
                            {data.openingCrawl}
                        </Text>

                        <Text
                            size="xs"
                            c="blue"
                            mt="xs"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setExpanded((v) => !v)}
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </Text>
                    </Card>
                }
                {category === 'species' &&
                    <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            margin: 'auto',
                        }}
                    >
                        <Text fw={700} size="xl" mb="sm">
                            🧬 {data.name}
                        </Text>

                        <Text size="sm" c="dimmed" mb="xs">
                            {data.description}
                        </Text>

                        <Divider my="sm" />

                        <Stack gap="xs">
                            <Text size="sm"><b>Classification:</b> {data.classification}</Text>
                            <Text size="sm"><b>Designation:</b> {data.designation}</Text>
                            <Text size="sm"><b>Average Height:</b> {data.average_height} cm</Text>
                            <Text size="sm"><b>Average Lifespan:</b> {data.average_lifespan} years</Text>
                            <Text size="sm"><b>Eye Colors:</b> {data.eye_colors}</Text>
                            <Text size="sm"><b>Hair Colors:</b> {data.hair_colors}</Text>
                            <Text size="sm"><b>Language:</b> {data.language}</Text>
                            <Text size="sm"><b>Peoples:</b> {data?.peoples?.map((e) => {
                                return (
                                    <>
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                            const parts = e?.split('/').filter(Boolean);
                                            if (!parts[3] || !parts[4]) return;
                                            const categoryToView = parts[3];
                                            const categoryId = parts[4]
                                            const path = `internal-detail/${categoryToView}/${categoryId}`;
                                            navigate(path);
                                        }}> agent-{e?.split('/').filter(Boolean)[4]} |</span>
                                    </>
                                )
                            })}</Text>
                        </Stack>
                    </Card>
                }
                {category === 'planets' &&
                    <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            margin: 'auto',
                        }}
                    >
                        <Text fw={700} size="xl" mb="sm">
                            🌍 {data.name}
                        </Text>

                        <Text size="sm" c="dimmed" mb="xs">
                            {data.description}
                        </Text>

                        <Divider my="sm" />

                        <Stack gap="xs">
                            <Text size="sm"><b>Climate:</b> {data.climate}</Text>
                            <Text size="sm"><b>Terrain:</b> {data.terrain}</Text>
                            <Text size="sm"><b>Gravity:</b> {data.gravity}</Text>
                            <Text size="sm"><b>Diameter:</b> {data.diameter} km</Text>
                            <Text size="sm"><b>Orbital Period:</b> {data.orbital_period} days</Text>
                            <Text size="sm"><b>Rotation Period:</b> {data.rotation_period} hours</Text>
                            <Text size="sm"><b>Surface Water:</b> {data.surface_water}%</Text>
                            <Text size="sm"><b>Population:</b> {data.population}</Text>
                        </Stack>
                    </Card>
                }
                {category === 'starships' &&
                    <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            margin: 'auto',
                        }}
                    >
                        <Text fw={700} size="xl" mb="sm">
                            🚀 {data.name}
                        </Text>

                        <Text size="sm" c="dimmed" mb="xs">
                            {data.description}
                        </Text>

                        <Divider my="sm" />

                        <Stack gap="xs">
                            <Text size="sm"><b>Model:</b> {data.model}</Text>
                            <Text size="sm"><b>Manufacturer:</b> {data.manufacturer}</Text>
                            <Text size="sm"><b>Starship Class:</b> {data.starship_class}</Text>
                            <Text size="sm"><b>Cost in Credits:</b> {data.cost_in_credits}</Text>
                            <Text size="sm"><b>Length:</b> {data.length} meters</Text>
                            <Text size="sm"><b>Max Speed:</b> {data.max_atmosphering_speed} km/h</Text>
                            <Text size="sm"><b>Hyperdrive Rating:</b> {data.hyperdrive_rating}</Text>
                            <Text size="sm"><b>MGLT:</b> {data.MGLT}</Text>
                            <Text size="sm"><b>Crew:</b> {data.crew}</Text>
                            <Text size="sm"><b>Passengers:</b> {data.passengers}</Text>
                            <Text size="sm"><b>Cargo Capacity:</b> {data.cargo_capacity} kg</Text>
                            <Text size="sm"><b>Consumables:</b> {data.consumables}</Text>
                            <Text size="sm"><b>Films:</b> {data?.films?.map((e) => {
                                return (
                                    <>
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                            const parts = e?.split('/').filter(Boolean);
                                            if (!parts[3] || !parts[4]) return;
                                            const categoryToView = parts[3];
                                            const categoryId = parts[4]
                                            const path = `internal-detail/${categoryToView}/${categoryId}`;
                                            navigate(path);
                                        }}> film-{e?.split('/').filter(Boolean)[4]} |</span>
                                    </>
                                )
                            })}</Text>

                        </Stack>
                    </Card>
                }
                {category === 'vehicles' &&
                    <Card
                        shadow="md"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            margin: 'auto',
                        }}
                    >
                        <Text fw={700} size="xl" mb="sm">
                            🚗 {data.name}
                        </Text>

                        <Text size="sm" c="dimmed" mb="xs">
                            {data.description}
                        </Text>

                        <Divider my="sm" />

                        <Stack gap="xs">
                            <Text size="sm"><b>Model:</b> {data.model}</Text>
                            <Text size="sm"><b>Manufacturer:</b> {data.manufacturer}</Text>
                            <Text size="sm"><b>Vehicle Class:</b> {data.vehicle_class}</Text>
                            <Text size="sm"><b>Cost in Credits:</b> {data.cost_in_credits}</Text>
                            <Text size="sm"><b>Length:</b> {data.length} meters</Text>
                            <Text size="sm"><b>Max Speed:</b> {data.max_atmosphering_speed} km/h</Text>
                            <Text size="sm"><b>Crew:</b> {data.crew}</Text>
                            <Text size="sm"><b>Passengers:</b> {data.passengers}</Text>
                            <Text size="sm"><b>Cargo Capacity:</b> {data.cargo_capacity} kg</Text>
                            <Text size="sm"><b>Consumables:</b> {data.consumables}</Text>
                            <Text size="sm"><b>Films:</b> {data?.films?.map((e) => {
                                return (
                                    <>
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                            const parts = e?.split('/').filter(Boolean);
                                            if (!parts[3] || !parts[4]) return;
                                            const categoryToView = parts[3];
                                            const categoryId = parts[4]
                                            const path = `internal-detail/${categoryToView}/${categoryId}`;
                                            navigate(path);
                                        }}> film-{e?.split('/').filter(Boolean)[4]} |</span>
                                    </>
                                )
                            })}</Text>
                        </Stack>
                    </Card>
                }
                <Card shadow="sm" padding="lg" radius="md" style={{ flex: '1 1 350px', maxWidth: 400 }}>
                    <Text fw={600} size="lg" mb="sm" style={{ borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
                        Contact & Support
                    </Text>

                    <Stack gap={8} mb="md">
                        <Text size="sm">
                            <b>Email:</b> {supportInfo?.contact || 'Not available'}
                        </Text>
                        <Text size="sm">
                            <b>Donate:</b>{' '}
                            <a href={supportInfo?.donate} target="_blank" rel="noreferrer" style={{ color: '#1c7ed6' }}>
                                Support Us
                            </a>
                        </Text>
                    </Stack>

                    <Divider my="sm" />

                    <Text fw={600} size="lg" mb="sm" style={{ borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>
                        Social Links
                    </Text>

                    <Stack gap={6}>
                        {socialLinks?.discord && (
                            <a href={socialLinks.discord} target="_blank" rel="noreferrer" style={{ color: '#4263eb' }}>
                                Discord
                            </a>
                        )}
                        {socialLinks?.reddit && (
                            <a href={socialLinks.reddit} target="_blank" rel="noreferrer" style={{ color: '#f76707' }}>
                                Reddit
                            </a>
                        )}
                        {socialLinks?.github && (
                            <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#000' }}>
                                GitHub
                            </a>
                        )}
                    </Stack>
                </Card>
            </div>
        </>
    );



};

export default Detail;
