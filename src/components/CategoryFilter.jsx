import categories from '../data/categories.json'
const CategoryFilter = ({ category, setCategory }) => {
    return (
        <select className='category-filter'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="All">All</option>
            
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    )
}

export default CategoryFilter
