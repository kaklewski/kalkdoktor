import { sortedCalculators } from '../calculators'
import ListTabsLayout from '../layouts/ListTabsLayout'

export default function IndexPage() {
	return <ListTabsLayout calculators={sortedCalculators} />
}
