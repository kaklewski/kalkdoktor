import { sortedCalculators } from '../data/calculators-and-categories'
import ListTabsLayout from '../layouts/ListTabsLayout'

export default function IndexPage() {
	return <ListTabsLayout calculators={sortedCalculators} />
}
