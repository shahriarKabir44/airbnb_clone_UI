import { useEffect, useState } from 'react'
import House from '../components/house'
import Layout from '../components/Shared/Layout'
import Globals from './Globals'
export default function Home() {
	const [houses, setHouses] = useState([])
	useEffect(() => {
		Globals.httpRequest(Globals.getAllHousesPath)
			.then(houseList => {
				console.log(houseList);
				setHouses(houseList)
			})

	}, [])
	return (
		<Layout content={
			<div>
				<h2> Places to stay </h2>
				<div className='houses'>
					{houses.map((house, index) => {
						return <House key={index} {...house} />

					})}
				</div>

				<style jsx="true">{`
				.houses {
					display: grid;
					grid-template-columns: 49% 49%;
					grid-template-rows: 300px 300px;
					grid-gap: 2%;
					
				}
      		`}
				</style>
			</div>} />


	)
}