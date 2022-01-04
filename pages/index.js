import House from '../components/house'
import Layout from '../components/Layout'
import houses from '../houses'
export default function Home() {
	return (
		<Layout content={<div>
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
		</div>} ></Layout>
	)
}