import { FC, useEffect} from 'react';
import {Title} from "@mantine/core";

const Landing: FC = () => {
useEffect(()=>{
fetch('https://www.swapi.tech/api/').then(e=>e.json()).then(e=>console.log(e))
},[])

	return <>
		<Title order={4}> Hello World </Title>
	</>;
};

export default Landing

