import House from '../components/house'
import Layout from '../components/Layout'
import houses from '../houses'
import Link from 'next/link'
export default function Home() {
	return (
		<Layout content={
			<div>
				<h2> Places to stay </h2>
				<div className='houses'>
					{houses.map((house, index) => {
						return <House key={index} {...house} />

					})}
				</div>

				<style jsx>{`
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